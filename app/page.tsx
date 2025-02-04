import Image from "next/image";
import Navbar from "../components/navbar";



// Landing page...
export default function Home() {

  return (
    <header className="relative">
        <div className="relative overflow-hidden rounded-b-3xl">
            <Image
                src="/images/landingPage-hero-image.png"
                alt="landing-hero-section"
                width={1380}
                height={600}
                className="w-[1380px] h-[600px] object-cover" 
            />

            {/* Glass-effect overlay */}
            <div className="absolute inset-0 backdrop-blur-sm border border-white/20 rounded-b-3xl" />
        </div>

        <Navbar />

        <div>
            <h1 className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-montserrat font-bold text-[35px] md:text-[40px] lg:text-[40px]">
                Fly & Stay
            </h1>
            <h2 className="absolute top-[47%] md:top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-montserrat font-semiBold text-[12px] md:text-[20px] whitespace-nowrap">
                Seamless Travel, Unforgettable Stays.
            </h2>
        </div>
    </header>
  );
}
