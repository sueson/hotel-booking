import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { ConvexHttpClient } from "convex/browser"
import { api } from "./convex/_generated/api";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./app/hooks/user-actions";
import { Id } from "./convex/_generated/dataModel";


const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: 'consent'
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

        const user = await getUserFromDb(
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
    async jwt({ token, user }) {
        if (user) {
            token.sub = user.id; // Store Convex user ID
            token.email = user.email;
            token.name = user.name;
            token.picture = user.image;
          }
          return token;
    },

    async session({ session, token }) {
        if (token.sub) {
            const user = await convex.query(api.user.getUserById, { id: token.sub as Id<"users"> });
            
            session.user = {
              id: token.sub,
              email: token.email ?? '',
              name: user?.name || token.name,
              image: user?.image || token.picture,
              emailVerified: user?.emailVerified ? new Date(user.emailVerified) : null
            };
          }
          return session;
    },

    async signIn({ user}) {
      await convex.mutation(api.user.saveUsers, {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        createdAt: Date.now()
      })
      return true;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,  // 30 days in seconds
    updateAge: 24 * 60 * 60  // update session every 24 hrs
  }
});