import Image from "next/image";


const CountryCard = ({ image, city, country }: { image: string; city: string; country: string }) => {
    return (
        <div className="w-[305px] h-[100px] p-4 rounded-lg border border-gray-200 shadow-md transition-all flex items-center gap-4 mt-7 cursor-pointer">
            <Image
                src={image}
                alt={city.toLowerCase()}
                width={72}
                height={72}
                className="rounded-lg shrink-0"
            />
            <div className="flex flex-col gap-1">
                <p className="font-montserrat font-semibold text-base text-gray-800">
                    {city}
                </p>
                <p className="font-montserrat font-regular text-sm text-gray-500">
                    {country}
                </p>
            </div>
        </div>
    )
};

export default CountryCard;