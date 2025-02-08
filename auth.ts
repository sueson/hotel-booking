import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { ConvexHttpClient } from "convex/browser"
import { api } from "./convex/_generated/api";
import Credentials from "next-auth/providers/credentials";
import { authenticateUser } from "./hooks/user-actions";
import { Id } from "./convex/_generated/dataModel";


const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
 
interface GithubProfile {
    avatar_url: string;
    login: string;
    name?: string;
}

interface GoogleProfile {
    picture: string;
    name: string;
    email: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: "offline",
          response_type: "code",
        }
      }
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_CLIENT!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;

        const user = await authenticateUser(
            credentials.email as string,
            credentials.password as string
          );
          return user ? { 
            id: user._id, // Map Convex _id to NextAuth's expected id
            email: user.email,
            name: user.name,
            image: user.image
          } : null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
        // token.sub is NextAuth default ID
        if (token.id) {
            const user = await convex.query(api.user.getUserById, { id: token.id as Id<"users"> });

            if(!user) {
                console.log("User not found");
                return session;  // return existing session
            }

            if(user.provider !== token.provider) {
                console.log("Provider mismatch");
                return session;
            }
            
            // Merge session data
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    provider: user.provider
                }
            };
          }
        return session;
    },

    async jwt({ token, user, account, profile }) {
        if(account) {
            token.provider = account.provider;  // Store provider in JWT

            if(account.provider === 'github' && profile) {
                const githubProfile = profile as unknown as GithubProfile;
                token.picture = githubProfile.avatar_url;
                token.name = githubProfile.name || githubProfile.login;
            }

            if (account?.provider === 'google' && profile) {
                const googleProfile = profile as unknown as GoogleProfile;
                token.picture = googleProfile.picture;
                token.name = googleProfile.name;
            }
        }
        if (user) {
            token.id = user.id; // Store Convex user ID
            // NextAuth automatically sets token.sub to user.id
          }
          return token;
    },

    async signIn({ user, account, profile }): Promise<string | boolean> {
        // Handle provider-specific data formatting
        if(account?.provider === 'github' && profile) {
            const githubProfile = profile as unknown as GithubProfile;
            user.name = githubProfile.name || githubProfile.login;
            user.image = githubProfile.avatar_url;
        }

        if(account?.provider === 'google' && profile) {
            const googleProfile = profile as unknown as GoogleProfile;
            user.name = googleProfile.name;
            user.image = googleProfile.picture;
        }

      
        if(account?.provider === 'github' || account?.provider === 'google' || account?.provider === 'credentials') {
            const existingUser = await convex.query(api.user.getUserByEmail, {
                email: user.email!
            });

            // Save user
            if(!existingUser) {
                const userId = await convex.mutation(api.user.saveUsers, {
                    name: user.name!,
                    email: user.email!,
                    image: user.image!,
                    provider: account?.provider || "credentials",
                    createdAt: Date.now(),
                });
                // sets the user ID from database
                user.id = userId as string;
            }else {
                user.id = existingUser._id;
            }
        }

        return true;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,  // 30 days in seconds
    updateAge: 24 * 60 * 60  // update session every 24 hrs
  }
});