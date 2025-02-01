"use client";


import React from 'react'
import { Button } from './ui/button'
import { MdFlight } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link';

const Navbar = () => {

  return (
    <div className='flex items-center justify-between px-4 md:px-8'>

        <div className='hidden lg:block'>
            {/* icons */}
            <Link href="/" className="flex items-center absolute top-10 left-10 gap-2">
                <MdFlight className='size-5 text-white' />
                <p className='text-white font-montserrat font-semiBold text-[14px]'>
                    Find Flight
                </p>
            </Link>

            <Link href="/" className="flex items-center absolute top-10 left-52 gap-2">
                <IoBedSharp className='size-5 text-white' />
                <p className='text-white font-montserrat font-semiBold text-[14px]'>
                    Find Stays
                </p>
            </Link>
        </div>

        {/* Logo */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-white text-3xl">
            BookMe
        </div>

        {/* Auth-buttons */}
        <div className='md:hidden absolute top-[48px] right-5'>
            <Link href="/">
                <FaRegUserCircle className='size-6 text-white' />
            </Link>
        </div>

        {/* Desktop buttons - shows only on md+ screens */}
        <div className="hidden md:flex md:absolute md:top-10 md:right-10 gap-4">
            <Link href="/">
                <Button variant="outline" className="font-montserrat font-semiBold text-[14px] bg-transparent text-white hover:bg-white hover:text-black">
                    Login
                </Button>
            </Link>
            <Link href="/">
                <Button className="bg-white font-montserrat font-semiBold text-[14px] hover:bg-gray-100">
                    Sign up
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default Navbar
