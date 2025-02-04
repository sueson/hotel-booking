"use server"

import { signIn } from '@/auth';
import { register } from './user-actions';


export const signInWithGoogle = async () => {
    await signIn('google', { redirectTo: '/' });
}

export const signInWithGithub = async () => {
    await signIn('github', { redirectTo: '/' });
}

export const signInWithCredentials = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
) => {
    const result = await register({ username: name, email, password, confirmPassword });

    if(!result.success) return result;

    return await signIn("credentials", {
        email,
        password,
        redirectTo: "/"
    })
}
