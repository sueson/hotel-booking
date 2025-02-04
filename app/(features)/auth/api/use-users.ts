import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { useSession } from "next-auth/react";


export const useUser = () => {
    const { data: session } = useSession();

    const data = useQuery(api.user.getUserByEmail, {
        email: session?.user?.email ?? ''
    });

    // if data is undefined the loading will become true...
    const isLoading = data === undefined;

    return {
        data, isLoading
    }
}