import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus } from "react-icons/fa";

interface GuestModalProps {
    type?: 'flights' | 'hotels';
    adults: number;
    childrenCount: number;
    rooms?: number;
    flightClass?: string;
    setAdults: (value: number) => void;
    setChildren: (value: number) => void;
    setRooms?: (value: number) => void;
    setFlightClass?: (value: string) => void;
    onClose: () => void;
}

function GuestModal({
    type = 'flights',
    adults,
    childrenCount,
    rooms = 1,
    flightClass = 'economy',
    setAdults,
    setChildren,
    setRooms,
    setFlightClass,
    onClose,
}: GuestModalProps) {
  const guestModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestModalRef.current && !guestModalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/20">
      <div
        ref={guestModalRef}
        className="fixed inset-0 md:absolute md:inset-auto md:top-full md:right-6 bg-white md:w-[400px] md:mt-2 md:rounded-2xl md:shadow-lg"
      >
        {/* Modal Content */}
        <div className="p-6 space-y-8">
          {/* Adults */}
          <div className="flex items-center justify-between">
            <span className="font-montserrat text-lg font-medium">Adults</span>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#8DD3BB] hover:bg-blue-50"
              >
                <FaMinus className="size-4" />
              </button>
              <span className="w-8 text-center text-lg font-medium">{adults}</span>
              <button
                onClick={() => setAdults(adults + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#8DD3BB] hover:bg-blue-50"
              >
                <FaPlus className="size-4" />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between">
            <span className="font-montserrat text-lg font-medium">Children</span>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setChildren(Math.max(0, childrenCount - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#8DD3BB] hover:bg-blue-50"
              >
                <FaMinus className="size-4" />
              </button>
              <span className="w-8 text-center text-lg font-montserrat font-medium">{childrenCount}</span>
              <button
                onClick={() => setChildren(childrenCount + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#8DD3BB] hover:bg-blue-50"
              >
                <FaPlus className="size-4" />
              </button>
            </div>
          </div>

          {type === 'hotels' ? (
            /* Rooms Section */
            <div className="flex items-center justify-between">
              <span className="font-montserrat text-lg font-medium">Rooms</span>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setRooms?.(Math.max(1, rooms - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#8DD3BB] hover:bg-blue-50"
                >
                  <FaMinus className="size-4" />
                </button>
                <span className="w-8 text-center text-lg font-medium">{rooms}</span>
                <button
                  onClick={() => setRooms?.(rooms + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#8DD3BB] hover:bg-blue-50"
                >
                  <FaPlus className="size-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Flight Class Section */
            <div className="space-y-3">
              <span className="font-montserrat text-lg font-medium">Flight Class</span>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="economy"
                    name="flightClass"
                    value="economy"
                    checked={flightClass === "economy"}
                    onChange={(e) => setFlightClass?.(e.target.value)}
                    className="accent-[#8DD3BB] w-4 h-4 appearance-none rounded-full border border-[#8DD3BB] checked:border-[#8DD3BB] checked:bg-[#8DD3BB] checked:border-4"
                  />
                  <label htmlFor="economy" className="font-montserrat text-sm">
                    Economy
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="business"
                    name="flightClass"
                    value="business"
                    checked={flightClass === "business"}
                    onChange={(e) => setFlightClass?.(e.target.value)}
                    className="accent-[#8DD3BB] w-4 h-4 appearance-none rounded-full border border-[#8DD3BB] checked:border-[#8DD3BB] checked:bg-[#8DD3BB] checked:border-4"
                  />
                  <label htmlFor="business" className="font-montserrat text-sm">
                    Business
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="firstClass"
                    name="flightClass"
                    value="firstClass"
                    checked={flightClass === "firstClass"}
                    onChange={(e) => setFlightClass?.(e.target.value)}
                    className="accent-[#8DD3BB] w-4 h-4 appearance-none rounded-full border border-[#8DD3BB] checked:border-[#8DD3BB] checked:bg-[#8DD3BB] checked:border-4"
                  />
                  <label htmlFor="firstClass" className="font-montserrat text-sm">
                    First Class
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t">
          <Button
            onClick={onClose}
            className="w-full bg-[#8DD3BB] h-12 rounded-full font-montserrat font-medium"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GuestModal;