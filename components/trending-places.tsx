import CountryCard from "./country-card";



const TrendingPlaces = () => {
    const countries = [
        { image: "/images/istanbul-image.png", city: "Istanbul", country: "Turkey" },
        { image: "/images/maldives-image.png", city: "Male", country: "Maldives" },
        { image: "/images/london-image.png", city: "London", country: "UK" },
        { image: "/images/australia-image.png", city: "Sydney", country: "Australia" },
        { image: "/images/france-image.png", city: "Paris", country: "France" },
        { image: "/images/japan-image.png", city: "Tokyo", country: "Japan" },
        { image: "/images/us-image.png", city: "New York", country: "US" },
        { image: "/images/dubai-image.png", city: "Dubai", country: "UAE" },
        { image: "/images/germany-image.png", city: "Munich", country: "Germany" },
    ]

    return (
        <div>
            <div className="w-full h-full">
                <p className="font-montserrat font-semibold text-[24px] md:text-[32px]">
                    Plan your perfect trip
                </p>
                <p className="font-montserrat font-regular text-[12px] md:text-[16px]">
                    Exclusive Offers on Flights and Accommodations
                </p>
            </div>

            <div className="grid grid-rows-3 md:grid-rows-2 grid-flow-col auto-cols-[305px] gap-4 overflow-x-auto pb-4 scrollbar-hide md:grid-flow-row md:grid-cols-3 lg:overflow-x-visible">
                {
                    countries.map((country, index) => (
                        <CountryCard key={index} {...country}/>
                    ))
                }
            </div>
            
        </div>
    )
}

export default TrendingPlaces;