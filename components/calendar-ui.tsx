import { useEffect, useRef, useState } from "react";
import Calendar from 'react-calendar';
import { IoCalendarNumberOutline } from "react-icons/io5";
import { Button } from "./ui/button";


type CalendarValuePiece = Date | null;

type CalendarValue = CalendarValuePiece | [CalendarValuePiece, CalendarValuePiece];

const CalendarUi = () => {

    const [value, onChange] = useState<CalendarValue>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    const handleDateChange = (newValue: CalendarValue) => {
        onChange(newValue);
        // Only auto-close on desktop (non-mobile) views
        if (Array.isArray(newValue) && newValue.length === 2 && window.innerWidth > 767) {
            setIsCalendarOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        };
    
        if (isCalendarOpen) {
            // Add both mouse and touch listeners
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isCalendarOpen]);
  return (
    <div className="relative w-full flex items-center justify-center py-3 md:py-0" ref={calendarRef}>
        {!isCalendarOpen ? (
            <button 
                onClick={() => setIsCalendarOpen(true)}
                className="w-full flex items-center md:justify-center gap-2 p-5 border-none rounded-lg border border-gray-200 text-[12px] md:text-[16px] mt-5 md:mt-0"
            >
                <IoCalendarNumberOutline className="size-5 text-black" />
                {Array.isArray(value) ? 
                    `${value[0]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${value[1]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 
                    'Select Date'}
            </button>
        ) : (
            <div className="fixed inset-0 md:absolute md:inset-auto md:top-full md:left-1/2 md:-translate-x-1/2 bg-white md:mt-2 z-50 md:shadow-lg md:rounded-lg">
                <Calendar 
                    onChange={handleDateChange}
                    value={value}
                    selectRange={true}
                    locale="en-US"
                    calendarType="gregory"
                    minDate={new Date()}
                    formatShortWeekday={(_, date) => 
                        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
                    }
                    formatMonthYear={(_, date) => 
                        `${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`
                    }
                    className="custom-calendar font-montserrat font-regular w-full h-full md:w-[400px]"
                />
                <div className="md:hidden sticky bottom-0 bg-white p-4 border-t">
                    <Button 
                        onClick={() => setIsCalendarOpen(false)}
                        className="w-full bg-[#8DD3BB] hover:bg-[#7abbac] text-black"
                    >
                        Done
                    </Button>
                </div>
            </div>
        )}
    </div>
  )
}

export default CalendarUi;
