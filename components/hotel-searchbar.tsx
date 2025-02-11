import { FaTelegramPlane } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import CalendarUi from "@/components/calendar-ui";
import { FaRegUser } from "react-icons/fa";
import GuestModal from "@/components/guest-modal";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";


const HotelSearchbar = () => {
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);

    const handleGuestSubmit = () => {
        setIsGuestModalOpen(true);
    };

    const handleDone = () => {
        setIsGuestModalOpen(false);
    };
    return (
        <>
        <div className="md:flex md:items-center md:justify-between md:px-6 md:gap-4 md:h-[120px] w-full">
            {/* Destination Input Section */}
            <div className="md:flex md:items-center md:gap-4 md:h-full md:max-w-[800px] lg:max-w-[1000px] w-full">
                <div className="w-full h-12 rounded-xl p-3 flex items-center gap-4 md:min-w-[200px] md:flex-1">
                    <Input
                        name="From"
                        value=""
                        onChange={() => {}}
                        placeholder="Search destinations" 
                        className="border placeholder:text-sm md:text-xs md:placeholder:text-sm flex-grow"
                    />
                </div>
            </div>

            <div className="hidden md:block">
                <Separator orientation="vertical" className="h-20 bg-black/10" />
            </div>

            {/* Calendar Section */}
            <div className="md:flex-1 md:min-w-[180px] lg:min-w-[200px]">
                <CalendarUi />
            </div>

            <div className="hidden md:block">
                <Separator orientation="vertical" className="h-20 bg-black/10" />
            </div>

            {/* Guests Section */}
            <div className="md:flex-1 md:min-w-[180px] lg:min-w-[200px] lg:max-w-[240px]">
                <div className="w-full ms-2 flex items-center gap-2 md:justify-center">
                    <FaRegUser className="size-5" />
                    <button 
                        onClick={handleGuestSubmit}
                        className="font-montserrat font-regular text-sm md:text-xs lg:text-sm whitespace-nowrap truncate"
                    >
                        {adults + children > 0 
                            ? `Adults ${adults}, Children ${children}, Rooms ${rooms}`
                            : "Guest's"
                        }
                    </button>
                </div>
            </div>
        </div>

        {/* Guest Modal */}
        {isGuestModalOpen && (
            <GuestModal
                type="hotels"
                adults={adults}
                childrenCount={children}
                rooms={rooms}
                setAdults={setAdults}
                setChildren={setChildren}
                setRooms={setRooms}
                onClose={handleDone}
            />
        )}

        {/* Search Button */}
        <div className="w-full h-12 mt-10 md:mt-4 px-4 md:flex md:items-center md:justify-end">
            <div className="md:flex md:items-center md:justify-end">
                <Button 
                    className="w-full h-12 bg-[#8DD3BB] mx-auto md:flex md:justify-center text-sm md:text-xs"
                >
                    <FaTelegramPlane className="size-5" />
                    <p className="font-montserrat font-medium text-sm">
                        Search Hotels
                    </p>
                </Button>
            </div>
        </div>
    </>
)}

export default HotelSearchbar;