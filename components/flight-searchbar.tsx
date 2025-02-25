import { TbArrowsTransferUpDown } from "react-icons/tb";
import { RiFlightTakeoffFill } from "react-icons/ri";
import { MdOutlineFlightLand } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import CalendarUi from "@/components/calendar-ui";
import { FaRegUser } from "react-icons/fa";
import GuestModal from "@/components/guest-modal";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useFlightSearch, Location } from "@/hooks/use-flight-search";
import { useRouter } from "next/navigation";


const FlightSearchbar = ({ customModalClasses = "" }) => {
    const router = useRouter();

    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [flightClass, setFlightClass] = useState("economy");
    const [fromQuery, setFromQuery] = useState("");
    const [toQuery, setToQuery] = useState("");
    const [showFromSuggestions, setShowFromSuggestions] = useState(false);
    const [showToSuggestions, setShowToSuggestions] = useState(false);
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [originCode, setOriginCode] = useState("");
    const [destinationCode, setDestinationCode] = useState("");

    const { result, loading, error, searchFlight, searchRoundTrip } = useFlightSearch();

    const handleGuestSubmit = () => {
        setIsGuestModalOpen(prev => !prev);
    };

    const handleDone = () => {
        setIsGuestModalOpen(false);
    };

    const handleSearchSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        await searchRoundTrip({
            origin: originCode,
            destination: destinationCode,
            departureDate,
            returnDate,
            adults,
            children,
            cabinType: flightClass
        });

        router.push(`/flights/search?origin=${encodeURIComponent(originCode)}&destination=${encodeURIComponent(destinationCode)}&departure=${departureDate}&return=${returnDate}&adults=${adults}&children=${children}&cabin=${flightClass}`);
    };

    return (
        <>
            <div className="relative md:flex md:items-center md:justify-between md:px-4 md:gap-4 md:h-auto md:py-4 w-full md:w-[95%] md:max-w-[650px] lg:max-w-none">
                {/* Flight Inputs Section */}
                <div className="md:flex md:items-center md:gap-4 md:h-full md:flex-grow md:w-full">
                    <div className="md:flex md:items-center md:gap-4 md:flex-1 w-full md:w-[90%]">
                        {/* Where From Input with Suggestions */}
                        <div className="w-full h-12 rounded-xl p-3 flex items-center gap-4 md:min-w-[160px] relative">
                            <RiFlightTakeoffFill className="size-5 text-black"/>
                            <Input
                                name="Where from"
                                value={fromQuery}
                                onChange={(e) => {
                                    setFromQuery(e.target.value);
                                    searchFlight(e.target.value);
                                }}
                                onFocus={() => setShowFromSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                                placeholder="Where from?" 
                                className="border placeholder:text-sm md:text-lg md:placeholder:text-base flex-grow"
                            />
                            
                            {/* Suggestions Dropdown */}
                            {showFromSuggestions && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50">
                                    {loading ? (
                                        <div className="p-3 text-gray-500">Searching flights...</div>
                                    ) : error ? (
                                        <div className="p-3 text-red-500">{error}</div>
                                    ) : result.data?.length > 0 ? (
                                        result.data.map((location: Location) => (
                                            <div
                                                key={location.id}
                                                className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    setFromQuery(location.name);
                                                    setOriginCode(location.code);
                                                    setShowFromSuggestions(false);
                                                }}
                                            >
                                                <div className="font-medium">
                                                    {location.name} ({location.code})
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {location.country?.name || 'Unknown country'}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-3 text-gray-500">No matching flights found</div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-center gap-3 px-3 my-4 md:my-0 md:mx-0">
                            <TbArrowsTransferUpDown className="size-6 text-blue-800 md:transform md:rotate-90"/>
                        </div>

                        {/* Where To Input with Suggestions */}
                        <div className="w-full h-12 rounded-xl p-3 flex items-center gap-4 md:min-w-[160px] relative">
                            <MdOutlineFlightLand className="size-6 text-black"/>
                            <Input
                                name="Where to"
                                value={toQuery}
                                onChange={(e) => {
                                    setToQuery(e.target.value);
                                    searchFlight(e.target.value);
                                }}
                                onFocus={() => setShowToSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                                placeholder="Where to?" 
                                className="border placeholder:text-sm md:placeholder:text-xs lg:placeholder:text-base flex-grow"
                            />
                            
                            {/* Suggestions Dropdown */}
                            {showToSuggestions && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50">
                                    {loading ? (
                                        <div className="p-3 text-gray-500">Searching flights...</div>
                                    ) : error ? (
                                        <div className="p-3 text-red-500">{error}</div>
                                    ) : result.data?.length > 0 ? (
                                        result.data.map((location: Location) => (
                                            <div
                                                key={location.id}
                                                className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    setToQuery(location.name);
                                                    setDestinationCode(location.code);
                                                    setShowToSuggestions(false);
                                                }}
                                            >
                                                <div className="font-medium">
                                                    {location.name} ({location.code})
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {location.country?.name || 'Unknown country'}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-3 text-gray-500">No matching flights found</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    <Separator orientation="vertical" className="h-20 bg-black/10" />
                </div>

                {/* Calendar Section */}
                <div className="md:flex-1 md:min-w-[160px] lg:min-w-[200px]">
                    <CalendarUi 
                        onDatesChange={(start, end) => {
                            setDepartureDate(start);
                            setReturnDate(end);
                        }}
                    />
                </div>

                <div className="hidden md:block">
                    <Separator orientation="vertical" className="h-20 bg-black/10" />
                </div>

                {/* Guests Section */}
                <div className="md:flex-1 md:min-w-[100px] md:max-w-[180px] lg:min-w-[180px] relative">
                    <div className="w-full ms-2 flex items-center gap-2 md:justify-center max-w-[90%]">
                        <FaRegUser className="size-5" />
                        <button 
                            onClick={handleGuestSubmit}
                            className="font-montserrat font-regular text-sm md:text-[11px] lg:text-sm whitespace-nowrap truncate"
                        >
                            {adults + children > 0 
                                ? `Adults ${adults}, Children ${children}, ${flightClass.charAt(0).toUpperCase() + flightClass.slice(1)}`
                                : "Guest's"
                            }
                        </button>
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
                            className={`md:top-full md:right-0 md:mt-4 ${customModalClasses}`}
                        />
                    )}
                </div>
            </div>

            {/* Search Button */}
            <form 
                onSubmit={handleSearchSubmit}
                className="w-full h-12 mt-10 md:mt-4 px-4 md:flex md:items-center md:justify-end"
            >
                <Button 
                    type="submit"
                    className="w-full h-12 bg-[#8DD3BB] mx-auto md:flex md:justify-center text-[14px] text-center"
                >
                    <FaTelegramPlane className="size-5" />
                    <p className="font-montserrat font-medium text-[14px]">
                        Search Flights
                    </p>
                </Button>
            </form>
        </>
)}

export default FlightSearchbar;