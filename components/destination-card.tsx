import Image from "next/image";
import { Button } from "@/components/ui/button";

interface DestinationCardProps {
  image: string;
  alt: string;
  title: string;
  description: string;
  price: string;
}

export default function DestinationCard({
  image,
  alt,
  title,
  description,
  price
}: DestinationCardProps) {
  return (
    <div className="w-[300px] md:w-[296px] md:h-[420px] rounded-xl relative md:flex-shrink-0 md:mx-2">
      <div className="mt-5 md:mt-7">
        <Image
          src={image}
          alt={alt}
          width={296}
          height={420}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-[80%] md:top-[90%] lg:top-[90%] left-1/2 -translate-y-1/2 -translate-x-1/2 w-full">
          <p className="text-white font-montserrat font-semibold text-[20px] md:text-[24px] px-5">
            {title}
          </p>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-4 mb-2 md:mb-2 px-5">
            <p className="text-white text-sm md:text-base">{description}</p>
            <p className="text-white py-1 rounded-lg text-sm md:text-base">
              {price}
            </p>
          </div>
          <div className="w-full px-4">
            <Button className="bg-[#8DD3BB] font-montserrat font-medium text-[14px] md:text-base w-full">
              Book Flight
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
