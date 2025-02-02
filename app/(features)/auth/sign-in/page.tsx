"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image"
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa";
import Link from "next/link";


const images = [
    "/images/auth-slide-image1.png",
    "/images/auth-slide-image2.png",
    "/images/auth-slide-image3.png"
];

const SignIn = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const imageChangeTimer = setTimeout(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000)

        return () => clearTimeout(imageChangeTimer);
    },[currentImage]);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen md:ms-10 px-4">

        <div className="mt-10 md:mr-5 lg:mr-10 text-center">
            <div className="flex-col space-y-5 md:space-y-7 items-center justify-center text-center">
                <p className="font-montserrat font-bold text-2xl md:text-[40px]">
                    Login
                </p>

                <p className="font-montserrat text-sm md:text-[16px] text-black/50">
                    Join us and start booking your perfect stays
                    in just a few clicks!
                </p>
            </div>
            
            <div className="flex items-center justify-center text-center gap-3 mt-5">
                <Button 
                    variant={"ghost"} 
                    className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] border-black border rounded-full flex items-center justify-center"
                >
                    <FcGoogle className="size-5" />
                </Button>
                <Button 
                    variant={"ghost"} 
                    className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] border-black border rounded-full flex items-center justify-center"
                >
                    <FaGithub className="size-5"/>
                </Button>
            </div>

            <div className="flex items-center justify-between gap-2 w-full">
                <Separator className="bg-black/10 my-10 flex-1"/>
                <p className="font-montserrat font-regular text-[12px] md:text-[16px]">
                    or Login with
                </p>
                <Separator className="bg-black/10 my-10 flex-1"/>
            </div>
            
            <div className=" mb-5 flex-col flex justify-center items-center gap-3">
                <Input
                    value=""
                    onChange={() => {}}
                    placeholder="Email" 
                />

                <Input
                    value=""
                    onChange={() => {}}
                    placeholder="Password" 
                />
                
                <div className="w-full mt-5">
                    <Button className="font-montserrat font-semibold text-sm md:text[14px] w-full bg-[#8DD3BB]">
                        Login
                    </Button>

                    <p className="font-montserrat font-semibold text-sm md:text-[14px] mt-5">
                        Don&apos;t have an account? 
                        <Link href="/auth/sign-up">
                            <span className="text-[#FF8682] ms-2">
                                Sign up
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>

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
    </section>
  )
}

export default SignIn
