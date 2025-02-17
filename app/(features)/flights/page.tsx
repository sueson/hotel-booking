"use client";


import FlightSearchbar from "@/components/flight-searchbar";
import HotelSearchbar from "@/components/hotel-searchbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MdFlight } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react";
import TrendingPlaces from "@/components/trending-places";
import Footer from "@/components/footer";
import DestinationCard from "@/components/destination-card";



export default function FlightScreen () {
    const [activeTab, setActiveTab] = useState<'flights' | 'hotels'>('flights');

    return (
        <>
            <header className="relative pt-24 md:pt-0">
                <div className="overflow-hidden rounded-b-3xl w-full z-0">
                    <Image
                        src={"/images/flight-hero-image.png"} 
                        alt="flight-hero"
                        width={1380}
                        height={600}
                        className="w-full h-[600px] object-cover"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 md:left-[15%] md:-translate-x-[10%] text-center w-full md:w-auto px-4">
                        <p className="font-montserrat font-bold text-white text-[24px] md:text-[45px] leading-tight">
                            Find your perfect flight
                        </p>
                        <p className="font-montserrat font-bold text-white text-[24px] md:text-[45px] leading-tight">
                            Book, Fly & Explore
                        </p>
                    </div>
                </div>

                {/* search options for flights or stays */}
                <div className="w-[300px] h-[460px] absolute top-[70%] lg:top-[87%] left-1/2 -translate-x-1/2 md:h-[320px] md:w-[95%] md:max-w-[800px] md:top-[70%] lg:max-w-[900px] xl:max-w-[1200px] rounded-xl bg-white shadow-md">
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

            <section className="mt-[110px] md:mt-10 mx-auto w-[90%] h-[400px] md:w-[700px] md:h-[450px] xl:w-[1232px] xl:h-[542px]">
                <div>
                    <p className="font-montserrat font-semibold text-[24px] md:text-[32px]">
                        Fall into travel
                    </p>
                    <p className="font-montserrat font-regular text-[12px] md:text-[16px]">
                        Your Next Adventure Awaits, Book Now!
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center md:flex md:flex-row md:items-center md:justify-start md:overflow-x-auto md:overflow-y-hidden md:w-full md:gap-6 md:px-4 md:py-11 scrollbar-hide h-auto">
                    {[
                        {
                            image: "/images/melbourne-travel-section.png",
                            alt: "melbourne",
                            title: "Melbourne",
                            description: "An amazing journey",
                            price: "$ 700"
                        },
                        {
                            image: "/images/london-travel-section.png",
                            alt: "london",
                            title: "London",
                            description: "London eye adventure",
                            price: "$ 350"
                        },
                        {
                            image: "/images/paris-travel-section.png",
                            alt: "paris",
                            title: "Paris",
                            description: "A Paris adventure",
                            price: "$ 400"
                        },
                        {
                            image: "/images/columbia-travel-section.png",
                            alt: "columbia",
                            title: "Columbia",
                            description: "Amazing streets",
                            price: "$ 700"
                        }
                    ].map((destination, index) => (
                        <DestinationCard
                            key={index}
                            image={destination.image}
                            alt={destination.alt}
                            title={destination.title}
                            description={destination.description}
                            price={destination.price}
                        />
                    ))}
                </div>
            </section>

            <section>
                
            </section>

            <section className="w-full h-[500px] md:h-[270] mt-[1500px] md:mt-40 lg:mt-48 xl:mt-28 bg-[#8DD3BB]">
                <Footer />
            </section>
        </>
    )
};