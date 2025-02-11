import { FaStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const ReviewCard = ({ 
  title, 
  description, 
  author,
  starCount = 5 
}: {
  title: string;
  description: string;
  author: string;
  starCount?: number;
}) => (
  <div className="min-w-[300px] max-w-[425px] w-full h-[350px] rounded-3xl shadow-xl border">
    <div className="mx-auto w-[90%] h-[377px] mt-5">
      <p className="font-montserrat font-bold text-[20px] md:text-[24px]">
        &quot;{title}&quot;
      </p>
      <p className="font-montserrat font-medium text-[12px] text-gray-400 md:text-[14px] mt-5">
        {description}
      </p>

      <div className="mt-5 flex gap-3">
        {[...Array(starCount)].map((_, i) => (
          <FaStar key={i} className="size-5 text-[#FFC107]"/>
        ))}
      </div>

      <p className="font-montserrat font-bold text-[12px] md:text-[14px] mt-5">
        {author}
      </p>

      <div className="mt-2 flex gap-2 items-center">
        <FcGoogle className="size-6"/>
        <p className="font-montserrat font-bold text-[10px] md:text-[12px] text-gray-400">
          Google
        </p>
      </div>
    </div>
  </div>
);

const ReviewSection = () => {
  const reviews = [
    {
      title: "Exceptional Service and Comfort",
      description: "From the moment I arrived, the staff made me feel at home. The room was spotless, and the bed was incredibly comfortable. Highly recommend!",
      author: "Alex Thompson"
    },
    {
      title: "Perfect Location for Sightseeing",
      description: "The hotel is centrally located, making it easy to explore the city's attractions. The complimentary breakfast was a great start to each day",
      author: "Samantha Lee"
    },
    {
      title: "Great Value for Money",
      description: "Considering the affordable price, the quality of service and amenities exceeded my expectations. A true gem in the city.",
      author: "Jordan Kim"
    }
  ];

  return(
    <div className="w-full overflow-hidden">
      <div className="w-full md:ms-[150px]">
        <p className="font-montserrat font-semibold text-[32px]">
          Reviews
        </p>

        <p className="font-montserrat font-regular text-[16px]">
          What people says about our facilities
        </p>
      </div>

      <div className="w-full px-4">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6"
             style={{ 
               maxWidth: '1315px'
             }}>
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;