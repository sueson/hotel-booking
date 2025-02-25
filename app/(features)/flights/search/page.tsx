"use client";


import FlightSearchbar from "@/components/flight-searchbar";
import RangeSlider from "@/components/slider";
import Image from "next/image";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiFilter } from "react-icons/fi";
import Footer from "@/components/footer";
import { useSearchParams } from "next/navigation";
import { useFlightSearch, Itinerary } from "@/hooks/use-flight-search";
import { MdOutlineCancel } from "react-icons/md";




export default function SearchResults () {
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
    const [departureTimeRange, setDepartureTimeRange] = useState<[string, string]>(['00:00', '23:59']);

    const searchParams = useSearchParams();

    const { loading, searchRoundTrip } = useFlightSearch();

    const [searchError, setSearchError] = useState<string | null>(null);
    const [detailedItineraries, setDetailedItineraries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = {
                    origin: searchParams.get('origin') || '',
                    destination: searchParams.get('destination') || '',
                    departureDate: searchParams.get('departure') || '',
                    returnDate: searchParams.get('return') || '',
                    adults: Number(searchParams.get('adults')) || 1,
                    children: Number(searchParams.get('children')) || 0,
                    cabinType: searchParams.get('cabin') || 'economy',
                    page: currentPage,
                    departureTime: departureTimeRange,
                };

                const response = await searchRoundTrip(params);
                
                if (response?.data) {
                    console.log('API Response:', response);
                    console.log('Total Bundles:', response.data.totalBundles);
                    console.log('Bundles:', response.data.bundles);

                    const detailed = response.data.bundles.map((bundle) => {
                        if (!bundle.outboundSlice) {
                            console.log(`Bundle ${bundle.key} has no outboundSlice`);
                            return null;
                        }

                        const cabinClass = searchParams.get('cabin') || 'economy';

                        // Access the price based on the cabin class
                        let price = 0;
                        const priceInfo = bundle.bundlePrice[0]?.price; // Access the price object
                        if (priceInfo && priceInfo.usd && priceInfo.usd.charges && priceInfo.usd.charges.length > 0) {
                            price = priceInfo.usd.charges[0].total.inc || 0; // Access the inclusive price directly
                        } else {
                            console.log(`No inclusive price found for cabin class: ${cabinClass}`);
                        }

                        const outboundSlice = bundle.outboundSlice;
                        const segments = outboundSlice.segments || [];

                        // Ensure segments exist and access the first segment
                        const firstSegment = segments[0] || {};
                        const departureTime = firstSegment.departDateTime || 'N/A';
                        const arrivalTime = firstSegment.arrivalDateTime || 'N/A';
                        const departureAirport = firstSegment.originAirport || 'N/A';
                        const arrivalAirport = firstSegment.destinationAirport || 'N/A';
                        const terminal = firstSegment.terminal || 'N/A';

                        return {
                            id: bundle.key,
                            segments: [{
                                departure: {
                                    time: departureTime,
                                    airport: departureAirport,
                                    terminal: terminal
                                },
                                arrival: {
                                    time: arrivalTime,
                                    airport: arrivalAirport,
                                    terminal: terminal
                                },
                                duration: outboundSlice.duration || 'N/A',
                                carrierContent: outboundSlice.carrierContent || {}
                            }],
                            price: {
                                total: {
                                    inc: price || 'N/A' // Ensure price is set correctly
                                }
                            }
                        };
                    }).filter((item: Itinerary | null) => item !== null);
                    
                    console.log('Detailed Itineraries:', detailed);
                    setDetailedItineraries(detailed);

                    // Update price range based on detailed itineraries
                    if (detailed.length > 0) {
                        const prices = detailed.map((item: Itinerary) => 
                            item.price?.total?.inc || 0
                        );
                        const minPrice = Math.min(...prices);
                        const maxPrice = Math.max(...prices);
                        setPriceRange([minPrice, maxPrice]);
                    }
                }
            } catch (error) {
                console.error('Error fetching flights:', error);
                setSearchError("Failed to load flight results");
            }
        };

        fetchData();
    }, [searchParams, currentPage, searchRoundTrip, departureTimeRange]);
    

    const handleFilterChange = (airline: string) => {
        setSelectedAirlines(prev => 
            prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]
        );
    };

    const applyFilters = () => {
        setCurrentPage(1);
        fetchData();
    };

    return (
        <div>
            <div className="mt-[50px] md:mt-[50px] lg:mt-[50px] pb-4 md:pb-5 lg:pb-6 shadow-none md:shadow-md w-full md:w-[95%] lg:w-[90%] xl:w-[1232px] h-auto md:h-[120x] lg:min-h-[190px] xl:h-[200px] mx-auto rounded-lg relative">
                <div className="md:relative z-50 overflow-visible">
                    <FlightSearchbar 
                        customModalClasses="md:absolute md:top-[330px] md:right-[20px] md:z-[100]"
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
                    <div className={`lg:block ${showFilters ? 'fixed inset-0 z-[100] bg-black bg-opacity-50' : 'hidden'}`}>
                        <div className={`w-[343px] min-h-[880px] bg-white p-6 rounded-xl shadow-md lg:relative ${showFilters ? 'animate-slide-in' : 'lg:animate-none'}`}>
                            <div className="flex justify-between items-center mb-8">
                                <p className="font-montserrat font-bold text-2xl text-gray-900">Filters</p>
                                <button 
                                    onClick={() => setShowFilters(false)}
                                    className="lg:hidden text-gray-500 hover:text-gray-700"
                                >
                                    <MdOutlineCancel className="size-6 text-black"/>
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
                                        <RangeSlider 
                                            value={priceRange} 
                                            onChange={setPriceRange}
                                        />
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 mt-4">
                                        <span>{priceRange[0]}</span>
                                        <span>{priceRange[1]}</span>
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
                                        <RangeSlider 
                                            value={departureTimeRange} 
                                            onChange={setDepartureTimeRange}
                                        />
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 mt-4">
                                        <span>00:00</span>
                                        <span>23:59</span>
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
                                        {['Emirates', 'Fly Dubai', 'Qatar Airways'].map(airline => (
                                            <div key={airline} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg">
                                                <button 
                                                    onClick={() => handleFilterChange(airline)}
                                                    className="flex items-center"
                                                >
                                                    {selectedAirlines.includes(airline) ? 
                                                        <ImCheckboxChecked className="w-6 h-6 fill-[#8DD3BB]"/> : 
                                                        <ImCheckboxUnchecked className="w-6 h-6 text-gray-400"/>
                                                    }
                                                </button>
                                                <span className="font-montserrat text-gray-700">{airline}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Add Done Button */}
                                <div className="flex justify-end mt-4">
                                    <Button 
                                        onClick={applyFilters}
                                        className="bg-[#8DD3BB] hover:bg-[#7dc3ab] px-4 py-2"
                                    >
                                        Done
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Flight details - Responsive width */}
                    <div className={`flex-grow ${showFilters ? 'lg:flex-1' : 'w-full'}`}>
                        {loading ? (
                            <div className="text-center py-8 text-gray-500">Searching for flights...</div>
                        ) : searchError ? (
                            <div className="text-center py-8 text-red-500">{searchError}</div>
                        ) : detailedItineraries.length > 0 ? (
                            detailedItineraries.map((itinerary: Itinerary, index) => {
                                if (!itinerary || !itinerary.segments || itinerary.segments.length === 0) {
                                    return null;
                                }

                                const firstSegment = itinerary.segments[0];
                                const carrierContent = firstSegment.carrierContent || {};
                                const price = itinerary.price?.total?.inc || 0;

                                return (
                                    <div key={itinerary.id || `itinerary-${index}`} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {/* Departure */}
                                            <div className="flex flex-col">
                                                <p className="text-gray-500 text-sm">Departure</p>
                                                <p className="font-semibold">
                                                    {firstSegment.departure?.time ? 
                                                        new Date(firstSegment.departure.time).toLocaleString() : 
                                                        'N/A'
                                                    }
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Airport {firstSegment.departure?.airport || 'N/A'}
                                                </p>
                                            </div>
                                            
                                            {/* Arrival */}
                                            <div className="flex flex-col">
                                                <p className="text-gray-500 text-sm">Arrival</p>
                                                <p className="font-semibold">
                                                    {firstSegment.arrival?.time ? 
                                                        new Date(firstSegment.arrival.time).toLocaleString() : 
                                                        'N/A'
                                                    }
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Airport {firstSegment.arrival?.airport || 'N/A'}
                                                </p>
                                            </div>
                                            
                                            {/* Duration */}
                                            <div className="flex flex-col">
                                                <p className="text-gray-500 text-sm">Duration</p>
                                                <p className="font-semibold">
                                                    {firstSegment.duration ? 
                                                        `${Math.floor(firstSegment.duration / 60)}h ${firstSegment.duration % 60}m` : 
                                                        'N/A'
                                                    }
                                                </p>
                                            </div>

                                            <div className="flex flex-col">
                                                <Button className="bg-[#8DD3BB] w-full">
                                                    View Details
                                                </Button>
                                            </div>
                                            
                                            {/* Price */}
                                            <div className="flex flex-col">
                                                <p className="text-gray-500 text-sm">Price</p>
                                                <p className="font-semibold text-[#1CDB9A]">
                                                    {price ? `$${price}` : 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Airline Info */}
                                        {carrierContent.carrierIcon && (
                                            <div className="mt-4 flex items-center gap-2">
                                                <Image 
                                                    src={carrierContent.carrierIcon}
                                                    alt={carrierContent.carrierName || 'Airline'}
                                                    width={40}
                                                    height={40}
                                                    className="rounded"
                                                />
                                                <p className="font-semibold">
                                                    {carrierContent.carrierName || 'Unknown Airline'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-8 text-gray-500">No flights found</div>
                        )}
                    </div>
                </div>
            </div>

            <section className="w-full h-[500px] md:h-[270] mt-10 md:mt-10 lg:mt-10 xl:mt-10 bg-[#8DD3BB]">
                <Footer />
            </section>
        </div>
    )
}