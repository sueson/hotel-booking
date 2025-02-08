"use client";

import Image from "next/image";
import Navbar from "../components/navbar";
import { Button } from "@/components/ui/button";
import { MdFlight } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { TbArrowsTransferUpDown } from "react-icons/tb";
import { RiFlightTakeoffFill } from "react-icons/ri";
import { MdOutlineFlightLand } from "react-icons/md";
import { Input } from "@/components/ui/input";
import CalendarUi from "@/components/calendar-ui";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import GuestModal from "@/components/guest-modal";

// Landing page...
export default function Home() {
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [flightClass, setFlightClass] = useState("economy");

    const handleGuestSubmit = () => {
        setIsGuestModalOpen(true);
    };

    const handleDone = () => {
        setIsGuestModalOpen(false);
    };

    return (
        <>
            <header className="relative">
                <div className="overflow-hidden rounded-b-3xl w-full">
                    <Image
                        src="/images/landingPage-hero-image.png"
                        alt="landing-hero-section"
                        width={1380}
                        height={600}
                        className="w-full h-[600px] object-cover" 
                    />

                    {/* Glass-effect overlay */}
                    <div className="absolute inset-0 backdrop-blur-sm border border-white/20 rounded-b-3xl" />
                </div>

                <Navbar />

                <div>
                    <h1 className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-montserrat font-bold text-[35px] md:text-[60px] lg:text-[80px]">
                        Fly & Stay
                    </h1>
                    <h2 className="absolute top-[47%] md:top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-montserrat font-semiBold text-[12px] md:text-[20px] whitespace-nowrap">
                        Seamless Travel, Unforgettable Stays.
                    </h2>
                </div>

                {/* options for flights or stays */}
                <div className="w-[300px] h-[500px] absolute top-[60%] left-1/2 -translate-x-1/2 md:h-[300px] md:w-[700px] md:top-[400px] lg:w-[1000px] lg:top-[520px] md:left-1/2 rounded-xl bg-white">
                    {/* Flight/Stay Toggle */}
                    <div className="w-full flex justify-between px-4 gap-4 h-12 rounded-xl md:px-4 md:gap-4 mt-3">
                        <Button variant={"ghost"} className="text-sm md:text-base md:px-4">
                            <MdFlight className='size-5 text-black' />
                            Flights
                        </Button>

                        <Button variant={"ghost"} className="text-sm md:text-base md:px-4">
                            <IoBedSharp className='size-5 text-black' />
                            Stays
                        </Button>
                    </div>

                    <div>
                        <Separator className="bg-black/10 my-2" />
                    </div>

                    {/* Main Content*/}
                    <div className="md:flex md:items-center md:justify-between md:px-6 md:gap-4">
                        <div className="w-full h-32 rounded-xl md:h-auto md:flex-1">
                            <div className="w-full h-12 rounded-xl p-3 flex items-center gap-4">
                                <RiFlightTakeoffFill className="size-5 text-black"/>
                                <Input
                                    name="From"
                                    value=""
                                    onChange={() => {}}
                                    placeholder="From" 
                                    className="border-none placeholder:text-sm md:text-lg md:placeholder:text-base"
                                />
                            </div>

                            <div className="flex items-center justify-center gap-3 px-3 my-4 md:my-2">
                                <TbArrowsTransferUpDown className="size-6 text-blue-800"/>
                            </div>

                            <div className="w-full h-12 rounded-xl p-3 flex items-center gap-4">
                                <MdOutlineFlightLand className="size-6 text-black"/>
                                <Input
                                    name="To"
                                    value=""
                                    onChange={() => {}}
                                    placeholder="To" 
                                    className="border-none placeholder:text-sm md:text-lg md:placeholder:text-base"
                                />
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <Separator orientation="vertical" className="h-20 bg-black/10" />
                        </div>

                        {/* Calendar Section */}
                        <div className="md:flex-1">
                            <CalendarUi />
                        </div>

                        <div className="hidden md:block">
                            <Separator orientation="vertical" className="h-20 bg-black/10" />
                        </div>

                        {/* Guests Section */}
                        <div className="md:flex-1">
                            <div className="w-full rounded-xl p-3">
                                <div className="w-full ms-2 flex items-center gap-2">
                                    <FaRegUser className="size-5" />
                                    <button 
                                        onClick={handleGuestSubmit}
                                        className="font-montserrat font-regular text-sm md:text-[16px]"
                                    >
                                        {adults + children > 0 
                                            ? `Adults ${adults}, Children ${children}, ${flightClass.charAt(0).toUpperCase() + flightClass.slice(1)}`
                                            : "Guest's"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Guest Modal */}
                    {isGuestModalOpen && (
                        <GuestModal
                            adults={adults}
                            childrenCount={children}
                            flightClass={flightClass}
                            setAdults={setAdults}
                            setChildren={setChildren}
                            setFlightClass={setFlightClass}
                            onClose={handleDone}
                        />
                    )}

                    {/* Search Button */}
                    <div className="w-full h-12 mt-4 px-4">
                        <Button className="w-full h-12 bg-[#8DD3BB] mx-auto flex justify-center">
                            Search
                        </Button>
                    </div>
                </div>
            </header>

            <section>
                
            </section>
        </>
        
    );
}
