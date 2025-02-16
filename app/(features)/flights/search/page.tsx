"use client";


import FlightSearchbar from "@/components/flight-searchbar";


export default function SearchResults () {
    return (
        <div>
            <div className="mt-[130px] md:mt-[100px] lg:mt-[160px] pb-4 md:pb-5 lg:pb-6 shadow-none md:shadow-md w-full md:w-[95%] lg:w-[90%] xl:w-[1232px] h-auto md:h-[120x] lg:min-h-[190px] xl:h-[200px] mx-auto rounded-lg">
                <FlightSearchbar />
            </div>
        </div>
    )
}