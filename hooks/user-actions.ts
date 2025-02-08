"use server";

import { api } from "@/convex/_generated/api";
import bcrypt from "bcryptjs";
import { ConvexHttpClient } from "convex/browser"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const authenticateUser = async( 
    email: string, 
    password: string ) => {
        try {
            const existingUser = await convex.query(api.user.getUserByEmail, {email});

            if(!existingUser || existingUser.provider !== "credentials") return null;

            if(!existingUser?.password) return null;

            const isPasswordMatches = await bcrypt.compare(password, existingUser.password);
            return isPasswordMatches ? existingUser : null;
        } catch (error) {
            console.log("Authentication error: ", error);
            return null;
        }
}

export const register = async({ 
    username, 
    email, 
    password, 
    confirmPassword 
} : { 
    username: string, 
    email: string, 
    password: string, 
    confirmPassword:string 
}) => {
    try {
        if(password !== confirmPassword) {
            return { success: false, message: "Invalid password" };
        }

        const existingUser = await convex.query(api.user.getUserByEmail, {email});
        if(existingUser) {
            return { success: false, message: "User already exists" };
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await convex.mutation(api.user.saveUsers, {
            name: username,
            email,
            password: passwordHash,
            provider: "credentials",
            createdAt: Date.now()
        })

        return { success: true, message: "Registration successfull" }
    } catch (error) {
        console.log("Registration failed: ", error);
        return { success: false, message: "Registration failed" };
    }
}