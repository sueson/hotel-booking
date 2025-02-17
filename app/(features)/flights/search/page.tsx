"use client";


import FlightSearchbar from "@/components/flight-searchbar";
import RangeSlider from "@/components/slider";
import Image from "next/image";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FiFilter } from "react-icons/fi";
import Footer from "@/components/footer";



export default function SearchResults () {
    const [isEmiratesChecked, setIsEmiratesChecked] = useState(false);
    const [isFlyDubaiChecked, setIsFlyDubaiChecked] = useState(false);
    const [isQatarChecked, setIsQatarChecked] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div>
            <div className="mt-[50px] md:mt-[50px] lg:mt-[50px] pb-4 md:pb-5 lg:pb-6 shadow-none md:shadow-md w-full md:w-[95%] lg:w-[90%] xl:w-[1232px] h-auto md:h-[120x] lg:min-h-[190px] xl:h-[200px] mx-auto rounded-lg relative">
                <div className="relative z-50 overflow-visible">
                    <FlightSearchbar 
                        customModalClasses="md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:z-[100]"
                    />
                </div>
            </div>

            <div className="mt-10 rounded-xl p-5 flex justify-center w-full">
                {/* Mobile Filter Button */}
                <div className="fixed bottom-6 right-6 z-50 lg:hidden">
                    <Button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="rounded-full px-6 py-6 bg-[#8DD3BB] hover:bg-[#7dc3ab] shadow-lg"
                    >
                        <FiFilter className="w-6 h-6" />
                    </Button>
                </div>

                <div className="flex max-w-[1232px] w-full gap-10">
                    {/* Filter Section - Always visible on desktop, collapsible on mobile */}
                    <div className={`lg:block ${showFilters ? 'fixed inset-0 z-40 bg-black bg-opacity-50' : 'hidden'}`}>
                        <div className={`w-[343px] min-h-[880px] bg-white p-6 rounded-xl shadow-md lg:relative ${showFilters ? 'animate-slide-in' : 'lg:animate-none'}`}>
                            <div className="flex justify-between items-center mb-8">
                                <p className="font-montserrat font-bold text-2xl text-gray-900">Filters</p>
                                <button 
                                    onClick={() => setShowFilters(false)}
                                    className="lg:hidden text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="space-y-8">
                                {/* Price Filter */}
                                <div className="border-b border-gray-200 pb-8">
                                    <div className="mb-4">
                                        <p className="font-montserrat font-bold text-lg text-gray-900">
                                            Price Range ($)
                                        </p>
                                    </div>
                                    <div className="px-2">
                                        <RangeSlider />
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 mt-4">
                                        <span>0</span>
                                        <span>10,000</span>
                                    </div>
                                </div>

                                {/* Departure Time */}
                                <div className="border-b border-gray-200 pb-8">
                                    <div className="mb-4">
                                        <p className="font-montserrat font-bold text-lg text-gray-900">
                                            Departure Time
                                        </p>
                                    </div>
                                    <div className="px-2">
                                        <RangeSlider />
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 mt-4">
                                        <span>12:00 AM</span>
                                        <span>11:59 PM</span>
                                    </div>
                                </div>

                                {/* Airlines */}
                                <div className="pb-4">
                                    <div className="mb-6">
                                        <p className="font-montserrat font-bold text-lg text-gray-900">
                                            Airlines
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg">
                                            <button 
                                                onClick={() => setIsEmiratesChecked(!isEmiratesChecked)}
                                                className="flex items-center"
                                            >
                                                {isEmiratesChecked ? 
                                                    <ImCheckboxChecked className="w-6 h-6 fill-[#8DD3BB]"/> : 
                                                    <ImCheckboxUnchecked className="w-6 h-6 text-gray-400"/>
                                                }
                                            </button>
                                            <span className="font-montserrat text-gray-700">Emirates</span>
                                        </div>

                                        <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg">
                                            <button 
                                                onClick={() => setIsFlyDubaiChecked(!isFlyDubaiChecked)}
                                                className="flex items-center"
                                            >
                                                {isFlyDubaiChecked ? 
                                                    <ImCheckboxChecked className="w-6 h-6 fill-[#8DD3BB]"/> : 
                                                    <ImCheckboxUnchecked className="w-6 h-6 text-gray-400"/>
                                                }
                                            </button>
                                            <span className="font-montserrat text-gray-700">Fly Dubai</span>
                                        </div>

                                        <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg">
                                            <button 
                                                onClick={() => setIsQatarChecked(!isQatarChecked)}
                                                className="flex items-center"
                                            >
                                                {isQatarChecked ? 
                                                    <ImCheckboxChecked className="w-6 h-6 fill-[#8DD3BB]"/> : 
                                                    <ImCheckboxUnchecked className="w-6 h-6 text-gray-400"/>
                                                }
                                            </button>
                                            <span className="font-montserrat text-gray-700">Qatar Airways</span>
                                        </div>

                                        {/* Add more airlines here */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Flight details - Responsive width */}
                    <div className={`flex-grow ${showFilters ? 'lg:flex-1' : 'w-full'}`}>
                        {/* Emirates Card */}
                        <div className="md:shadow-md rounded-xl p-4 md:p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Airline Info */}
                                <div className="w-full md:w-[160px] flex flex-col gap-2 md:gap-4">
                                    <Image 
                                        src={"/images/emirates-logo.png"}
                                        alt="Emirates"
                                        width={160}
                                        height={110}
                                        className="w-full max-w-[160px] md:w-full h-auto object-contain mx-auto"
                                    />
                                    <div className="flex flex-row justify-between items-center md:flex-col md:items-start">
                                        <div className="flex items-center gap-2">
                                            <div className="w-[40px] h-[32px] border border-[#8DD3BB] rounded-md grid place-items-center">
                                                4.2
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="font-montserrat font-bold text-xs">Very Good</p>
                                                <p className="font-montserrat text-xs text-gray-500">54 reviews</p>
                                            </div>
                                        </div>
                                        <p className="font-montserrat font-bold text-2xl text-[#FF8682] md:mt-4">$150</p>
                                    </div>
                                </div>

                                {/* Flight Details */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
                                        <div className="w-full md:w-auto">
                                            <p className="font-semibold text-base md:text-lg">12:00 pm - 01:28pm</p>
                                            <p className="text-xs md:text-sm text-gray-500">Emirates</p>
                                        </div>
                                        <div className="hidden md:block h-full w-px bg-gray-200" />
                                        <div className="w-full md:w-auto flex items-center justify-center gap-2 px-3 py-1 md:px-4 md:py-2 border rounded-full text-sm">
                                            <span>non stop</span>
                                        </div>
                                        <div className="hidden md:block h-full w-px bg-gray-200" />
                                        <div className="w-full md:w-auto">
                                            <p className="font-semibold text-base md:text-lg">2h 28m</p>
                                            <p className="text-xs md:text-sm text-gray-500">DXB-LHR</p>
                                        </div>
                                    </div>
                                    <Separator className="my-3 md:my-4 bg-gray-200" />
                                    <div className="flex justify-end">
                                        <Button className="bg-[#8DD3BB] hover:bg-[#7dc3ab] px-4 py-3 md:px-8 md:py-6 rounded-full w-full md:w-auto">
                                            <span className="font-semibold text-sm md:text-base">View Deals</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fly Dubai Card */}
                        <div className="md:shadow-md rounded-xl p-4 md:p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-[160px] flex flex-col gap-2 md:gap-4">
                                    <Image 
                                        src={"/images/flydubai-logo.png"}
                                        alt="Fly Dubai"
                                        width={160}
                                        height={110}
                                        className="w-full max-w-[160px] md:w-full h-auto object-contain mx-auto"
                                    />
                                    <div className="flex flex-row justify-between items-center md:flex-col md:items-start">
                                        <div className="flex items-center gap-2">
                                            <div className="w-[40px] h-[32px] border border-[#8DD3BB] rounded-md grid place-items-center">
                                                4.0
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="font-montserrat font-bold text-xs">Good</p>
                                                <p className="font-montserrat text-xs text-gray-500">48 reviews</p>
                                            </div>
                                        </div>
                                        <p className="font-montserrat font-bold text-2xl text-[#FF8682] md:mt-4">$130</p>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
                                        <div className="w-full md:w-auto">
                                            <p className="font-semibold text-base md:text-lg">08:30 am - 10:45am</p>
                                            <p className="text-xs md:text-sm text-gray-500">Fly Dubai</p>
                                        </div>
                                        <div className="hidden md:block h-full w-px bg-gray-200" />
                                        <div className="w-full md:w-auto flex items-center justify-center gap-2 px-3 py-1 md:px-4 md:py-2 border rounded-full text-sm">
                                            <span>1 stop</span>
                                        </div>
                                        <div className="hidden md:block h-full w-px bg-gray-200" />
                                        <div className="w-full md:w-auto">
                                            <p className="font-semibold text-base md:text-lg">3h 15m</p>
                                            <p className="text-xs md:text-sm text-gray-500">DXB-IST</p>
                                        </div>
                                    </div>
                                    <Separator className="my-3 md:my-4 bg-gray-200" />
                                    <div className="flex justify-end">
                                        <Button className="bg-[#8DD3BB] hover:bg-[#7dc3ab] px-4 py-3 md:px-8 md:py-6 rounded-full w-full md:w-auto">
                                            <span className="font-semibold text-sm md:text-base">View Deals</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Qatar Airways Card */}
                        <div className="md:shadow-md rounded-xl p-4 md:p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-[160px] flex flex-col gap-2 md:gap-4">
                                    <Image 
                                        src={"/images/qatar-logo.png"}
                                        alt="Qatar Airways"
                                        width={160}
                                        height={110}
                                        className="w-full max-w-[160px] md:w-full h-auto object-contain mx-auto"
                                    />
                                    <div className="flex flex-row justify-between items-center md:flex-col md:items-start">
                                        <div className="flex items-center gap-2">
                                            <div className="w-[40px] h-[32px] border border-[#8DD3BB] rounded-md grid place-items-center">
                                                4.5
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="font-montserrat font-bold text-xs">Excellent</p>
                                                <p className="font-montserrat text-xs text-gray-500">62 reviews</p>
                                            </div>
                                        </div>
                                        <p className="font-montserrat font-bold text-2xl text-[#FF8682] md:mt-4">$170</p>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
                                        <div className="w-full md:w-auto">
                                            <p className="font-semibold text-base md:text-lg">03:15 pm - 05:30pm</p>
                                            <p className="text-xs md:text-sm text-gray-500">Qatar Airways</p>
                                        </div>
                                        <div className="hidden md:block h-full w-px bg-gray-200" />
                                        <div className="w-full md:w-auto flex items-center justify-center gap-2 px-3 py-1 md:px-4 md:py-2 border rounded-full text-sm">
                                            <span>non stop</span>
                                        </div>
                                        <div className="hidden md:block h-full w-px bg-gray-200" />
                                        <div className="w-full md:w-auto">
                                            <p className="font-semibold text-base md:text-lg">2h 15m</p>
                                            <p className="text-xs md:text-sm text-gray-500">DOH-CDG</p>
                                        </div>
                                    </div>
                                    <Separator className="my-3 md:my-4 bg-gray-200" />
                                    <div className="flex justify-end">
                                        <Button className="bg-[#8DD3BB] hover:bg-[#7dc3ab] px-4 py-3 md:px-8 md:py-6 rounded-full w-full md:w-auto">
                                            <span className="font-semibold text-sm md:text-base">View Deals</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Etihad Card */}
                        <div className="md:shadow-md rounded-xl p-4 md:p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-[160px] flex flex-col gap-2 md:gap-4">
                                    <Image 
                                        src={"/images/ethihad-logo.png"}
                                        alt="Etihad"
                                        width={160}
                                        height={110}
                                        className="w-full max-w-[160px] md:w-full h-auto object-contain mx-auto"
                                    />
                                    <div className="flex flex-row justify-between items-center md:flex-col md:items-start">
                                        <div className="flex items-center gap-2">
                                            <div className="w-[40px] h-[32px] border border-[#8DD3BB] rounded-md grid place-items-center">
                                                4.3
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="font-montserrat font-bold text-xs">Very Good</p>
                                                <p className="font-montserrat text-xs text-gray-500">58 reviews</p>
                                            </div>
                                        </div>
                                        <p className="font-montserrat font-bold text-2xl text-[#FF8682] md:mt-4">$160</p>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
                                        <div className="w-full md:w-auto">
                                            <p className="font-semibold text-base md:text-lg">10:00 am - 12:15pm</p>
                                            <p className="text-xs md:text-sm text-gray-500">Etihad</p>
                                        </div>
                                        <div className="hidden md:block h-full w-px bg-gray-200" />
                                        <div className="w-full md:w-auto flex items-center justify-center gap-2 px-3 py-1 md:px-4 md:py-2 border rounded-full text-sm">
                                            <span>non stop</span>
                                        </div>
                                        <div className="hidden md:block h-full w-px bg-gray-200" />
                                        <div className="w-full md:w-auto">
                                            <p className="font-semibold text-base md:text-lg">2h 15m</p>
                                            <p className="text-xs md:text-sm text-gray-500">AUH-LHR</p>
                                        </div>
                                    </div>
                                    <Separator className="my-3 md:my-4 bg-gray-200" />
                                    <div className="flex justify-end">
                                        <Button className="bg-[#8DD3BB] hover:bg-[#7dc3ab] px-4 py-3 md:px-8 md:py-6 rounded-full w-full md:w-auto">
                                            <span className="font-semibold text-sm md:text-base">View Deals</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Show More Button */}
                        <div className="mt-6 flex justify-center w-full">
                            <Button 
                                className="bg-black text-white hover:bg-[#7dc3ab] px-8 py-6 rounded-full w-full md:w-auto"
                                onClick={() => console.log('Load more results')}
                            >
                                <span className="font-semibold text-base">Show more results</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <section className="w-full h-[500px] md:h-[270] mt-10 md:mt-10 lg:mt-10 xl:mt-10 bg-[#8DD3BB]">
                <Footer />
            </section>
        </div>
    )
}