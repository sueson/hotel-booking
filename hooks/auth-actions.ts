"use server"

import { signIn } from '@/auth';
import { register } from './user-actions';

export const signInWithCredentials = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
) => {
    try {
        const result = await register({ 
            username: name, 
            email, 
            password, 
            confirmPassword });
        
        if (!result.success) {
            return result;
        }

        const signInResponse = await signIn("credentials", {
            name,
            email,
            password,
            redirect: false,
        });

        if(signInResponse?.error) {
            return {
                success: false,
                message: signInResponse.error
            }
        }

        return { success: true, message: "Registration successful" };
    } catch (error : unknown) {
        return { 
            success: false, 
            message: error instanceof Error ? error.message : "Registration failed" 
        };
    }
}