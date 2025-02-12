"use client";

import Image from "next/image";
import Navbar from "../components/navbar";
import { Button } from "@/components/ui/button";
import { MdFlight } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import TrendingPlaces from "@/components/trending-places";
import { FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";
import ReviewSection from "@/components/review-section";
import Footer from "@/components/footer";
import FlightSearchbar from "@/components/flight-searchbar";
import HotelSearchbar from "@/components/hotel-searchbar";

// Landing page...
export default function Home() {
    const [activeTab, setActiveTab] = useState<'flights' | 'hotels'>('flights');

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

                <Navbar position="absolute" />

                <div>
                    <h1 className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-montserrat font-bold text-[35px] md:text-[60px] lg:text-[80px]">
                        Fly & Stay
                    </h1>
                    <h2 className="absolute top-[43%] md:top-[45%] lg:top-[49%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-montserrat font-semiBold text-[12px] md:text-[20px] whitespace-nowrap">
                        Seamless Travel, Unforgettable Stays.
                    </h2>
                </div>

                {/* search options for flights or stays */}
                <div className="w-[300px] h-[460px] absolute top-[60%] lg:top-[87%] left-1/2 -translate-x-1/2 md:h-[320px] md:w-[95%] md:max-w-[800px] md:top-[70%] lg:max-w-[900px] xl:max-w-[1200px] rounded-xl bg-white shadow-md">
                    {/* Flight/Stay Toggle */}
                    <div className="w-full flex px-4 gap-4 h-12 rounded-xl md:px-6 md:gap-6 mt-3">
                        <Button 
                            variant={"ghost"}
                            onClick={() => setActiveTab('flights')}
                            className={`text-sm md:text-base md:px-4 ${
                                activeTab === 'flights'
                                    ? 'border-b-4 border-[#8DD3BB]'
                                    : 'text-black'
                            }`}
                        >
                            <MdFlight className='size-5 text-black' />
                                Flights
                        </Button>

                        <Button 
                            variant={"ghost"} 
                            onClick={() => setActiveTab('hotels')}
                            className={`text-sm md:text-base md:px-4 ${
                                activeTab === 'hotels'
                                    ? 'border-b-4 border-[#8DD3BB]'
                                    : 'text-black'
                            }`}
                        >
                            <IoBedSharp className='size-5 text-black' />
                                Stays
                        </Button>
                    </div>

                    <div>
                        <Separator className="bg-black/10 my-2" />
                    </div>

                    {/* Search bar Content*/}
                    {
                        activeTab === 'flights' ? (
                            <FlightSearchbar />
                        ) : (
                            <HotelSearchbar />
                        )
                    }
                </div>
            </header>

            <section className="mt-[300px] md:mt-[200px] lg:mt-[300px] mx-auto w-[90%] h-[400px] md:w-[700px] md:h-[450px] xl:w-[1232px] xl:h-[542px] md:flex md:flex-row md:items-center md:justify-center">
                <TrendingPlaces />
            </section>

            <section className="mt-28 md:mt-20 px-4 lg:mt-10 max-lg:w-[90%] lg:w-[90%] xl:w-[1232px] h-auto mx-auto rounded-lg flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
                <div className="w-full lg:flex-1 min-lg:w-[45%] h-[500px] lg:h-[559px] relative">
                    <Image 
                        src={"/images/flight-card-home.png"}
                        alt="flight-section"
                        fill
                        className="w-full h-full object-cover rounded-3xl"
                    />

                    <div className="absolute max-lg:top-[75%] lg:top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full px-2">
                        <div className="text-center flex flex-col items-center gap-2">
                            <p className="font-montserrat font-bold text-xl md:text-3xl lg:text-4xl text-white">
                                Flights
                            </p>
                            <span className="font-montserrat font-regular text-xs md:text-[15px] lg:text-base text-white">
                                Explore Popular Routes and Plan Your Journey
                            </span>
                        </div>

                        <div className="mt-3 flex justify-center">
                            <Link href="/flights">
                                <Button className="bg-[#8DD3BB] hover:bg-[#8DD3BB]/90 max-lg:py-2 lg:py-4">
                                    <FaTelegramPlane className="max-lg:size-4 lg:size-5" />
                                    <p className="font-montserrat font-medium max-lg:text-sm lg:text-base ml-1.5">
                                        Show Flights
                                    </p>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:flex-1 min-lg:w-[45%] h-[500px] lg:h-[559px] relative">
                    <Image 
                        src={"/images/hotel-card-home.png"}
                        alt="hotel-section"
                        fill
                        className="w-full h-full object-cover rounded-3xl"
                    />

                    <div className="absolute max-lg:top-[75%] lg:top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full px-2">
                        <div className="text-center flex flex-col items-center gap-2">
                            <p className="font-montserrat font-bold text-xl md:text-3xl lg:text-4xl text-white">
                                Hotels
                            </p>
                            <span className="font-montserrat font-regular text-xs md:text-[15px] lg:text-base text-white">
                                Find the best accommodations at unbeatable prices
                            </span>
                        </div>

                        <div className="mt-3 flex justify-center">
                            <Link href="/hotels">
                                <Button className="bg-[#8DD3BB] hover:bg-[#8DD3BB]/90 max-lg:py-2 lg:py-4">
                                    <FaTelegramPlane className="max-lg:size-4 lg:size-5" />
                                    <p className="font-montserrat font-medium max-lg:text-sm lg:text-base ml-1.5">
                                        Show Hotels
                                    </p>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-12">
                <ReviewSection />
            </section>

            <section className="w-full h-[500px] md:h-[270] mt-10 bg-[#8DD3BB]">
                <Footer />
            </section>
        </>
        
    );
}
