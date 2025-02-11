import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";



const Footer = () => {
    return(
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Brand & Social Section */}
                <div className="flex flex-col items-center md:items-start">
                    <p className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
                        Book Me
                    </p>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <FaFacebook className="size-6 hover:text-blue-600 transition-colors" />
                        <FaTwitter className="size-6 hover:text-blue-400 transition-colors" />
                        <AiFillInstagram className="size-6 hover:text-pink-500 transition-colors" />
                    </div>
                </div>

                {/* Contact Section */}
                <div className="text-center md:text-left mt-8 md:mt-0">
                    <p className="font-montserrat font-bold text-xl mb-4">
                        Contact Us
                    </p>
                    <div className="space-y-2">
                        <p className="font-montserrat font-medium text-sm md:text-base">
                            Bookme@gmail.com
                        </p>
                        <p className="font-montserrat font-medium text-sm md:text-base">
                            0924 725 1783
                        </p>
                    </div>
                </div>

                {/* Additional Section (Optional) */}
                <div className="mt-8 md:mt-0 text-center md:text-left">
                    <p className="font-montserrat font-bold text-xl mb-4">
                        About Us
                    </p>
                    <div className="space-y-2">
                        <p className="font-montserrat font-medium text-sm md:text-base">
                            Terms of Service
                        </p>
                        <p className="font-montserrat font-medium text-sm md:text-base">
                            Privacy Policy
                        </p>
                    </div>
                </div>
            </div>

            {/* Copyright Text */}
            <div className="mt-8 md:mt-12 text-center">
                <p className="font-montserrat font-medium text-xs md:text-sm text-gray-500">
                    © 2025 Book Me. All rights reserved.
                </p>
            </div>
        </div>
    )
};

export default Footer;