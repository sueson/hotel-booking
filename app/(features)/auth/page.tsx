"use client";


import { Button } from "@/components/ui/button";
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";


const images = [
    "/images/auth-slide-image1.png",
    "/images/auth-slide-image2.png",
    "/images/auth-slide-image3.png"
];

// Auth-page
const AuthScreen = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const imageChangeTimer = setTimeout(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000)

        return () => clearTimeout(imageChangeTimer);
    },[currentImage]);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen md:ms-10 px-4">
        <div className="mt-3 relative w-[350px] h-[600px] md:w-[600px] md:h-[600px]">
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

        <div className="mt-10 md:px-10 mx-4 text-center">
            <div className="flex-col space-y-3 items-center justify-center text-center">
                <p className="font-montserrat font-bold text-2xl">
                    Your Perfect Vacation Awaits
                </p>

                <p className="font-montserrat text-md text-black/50">
                    Create an Account and Start Booking Your Dream Vacation.
                </p>
            </div>
            
            <div className="mt-10 mb-5 flex-row space-x-3">
                <Link href="/auth/sign-in">
                    <Button 
                        variant={"outline"} 
                        className="bg-white text-black hover:bg-black hover:text-white size-12 px-16">
                        Login
                    </Button>
                </Link>

                <Link href="/auth/sign-up">
                    <Button 
                        className="bg-black text-white hover:bg-white hover:text-black size-12 px-16">
                        Sign Up
                    </Button>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default AuthScreen
