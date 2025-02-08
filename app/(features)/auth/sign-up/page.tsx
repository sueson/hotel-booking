"use client";


import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image"
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { signInWithCredentials } from "../../../../hooks/auth-actions";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";



const images = [
    "/images/auth-slide-image1.png",
    "/images/auth-slide-image2.png",
    "/images/auth-slide-image3.png"
];

const SignUp = () => {
    const { toast } = useToast();
    const router = useRouter();
    const { update } = useSession();

    const [currentImage, setCurrentImage] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const imageChangeTimer = setTimeout(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000)

        return () => clearTimeout(imageChangeTimer);
    },[currentImage]);

    const handleCredentialsSubmit = async (formData: FormData) => {
        setIsLoading(true);
        try {
            const response = await signInWithCredentials(
                formData.get("name") as string,
                formData.get("email") as string,
                formData.get("password") as string,
                formData.get("confirmPassword") as string
            );

            if (response.message === "User already exists") {
                toast({
                    title: "User already exists",
                    description: "This email is already exists, Please sign in instead"
                });
                return;
            } 
            
            if (response.success) {
                await update();
                toast({
                    title: "Success",
                    description: "Account created successfully!",
                    duration: 5000
                });
                router.push("/home");
            } else {
                toast({
                    title: "Registration Failed",
                    description: "Please try again"
                });
            }
        } catch {
            toast({
                title: "Error",
                description: "Registration failed. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen md:ms-10 px-4">

        <div className="mt-3 relative w-[350px] h-[600px] md:w-[600px] md:h-[600px] hidden md:block">
            <Image
                src={images[currentImage]}
                alt="image-slider"
                width={350}
                height={300}
                className="w-full h-full object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Dot Navigation animation */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ease-in-out ${
                        currentImage === index ? "bg-white" : "bg-gray-400"
                    }`}
                    />
                ))}
            </div>
        </div>

        <div className="mt-10 md:ms-5 lg:ms-10 text-center">
            <div className="flex-col space-y-5 md:space-y-7 items-center justify-center text-center">
                <p className="font-montserrat font-bold text-2xl md:text-[40px]">
                    Sign Up
                </p>

                <p className="font-montserrat text-sm md:text-[16px] text-black/50">
                    Sign up to explore exclusive deals and manage 
                    your bookings effortlessly!
                </p>
            </div>
            
            <div className="flex items-center justify-center text-center gap-3 mt-5">
                <Button
                    onClick={async () => await signIn('google', { redirectTo: "/home" })}
                    className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] border border-black  rounded-full flex items-center justify-center"
                >
                        <FcGoogle className="size-5 md:size-7" />
                </Button>

                <Button  
                    onClick={async () => await signIn('github', { redirectTo: "/home" })}
                    className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] border border-black rounded-full flex items-center justify-center"
                >
                    <FaGithub className="size-5 md:size-7"/>
                </Button>
            </div>

            <div className="flex items-center justify-between gap-2 w-full">
                <Separator className="bg-black/10 my-10 flex-1"/>
                <p className="font-montserrat font-regular text-[12px] md:text-[16px]">
                    or Sign up with
                </p>
                <Separator className="bg-black/10 my-10 flex-1"/>
            </div>
            
            <div className=" mb-5 flex-col flex justify-center items-center gap-3">
                <form action={handleCredentialsSubmit} className="w-full space-y-3">
                    <Input
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name" 
                        required
                    />

                    <Input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email" 
                        required
                    />

                    <Input
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password" 
                        required
                    />

                    <Input
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Confirm Password" 
                        required
                    />

                        <Button 
                            type="submit" 
                            className="font-montserrat font-semibold text-sm md:text[14px] w-full bg-[#8DD3BB]"
                            disabled={isLoading}
                        >
                            Sign Up
                        </Button>
                    </form>
                
                
                <div className="w-full mt-5">
                    <p className="font-montserrat font-semibold text-sm md:text-[14px] mt-5">
                        Already have an account? 
                        <Link href="/auth/sign-in">
                            <span className="text-[#FF8682] ms-2">
                                Sign In
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>

        
    </section>
  )
}

export default SignUp
