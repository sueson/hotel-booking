"use client";


import { Button } from './ui/button'
import { MdFlight } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { usePathname } from 'next/navigation';


interface NavbarProps {
    position?: 'absolute' | 'relative';
}


const Navbar = ({ position = 'relative' }: NavbarProps) => {
    const { data: session } = useSession();
    const pathname = usePathname();

    return (
        <div 
            className={`flex items-center justify-between px-4 md:px-8 ${
                position === 'absolute' ? 'absolute top-0 w-full z-50' : 'relative'
            } min-h-[97px] ${pathname !== '/' ? 'shadow-md border-b' : ''}`}
        >

            <div className='hidden md:block'>
                {/* icons */}
                <Link 
                    href="/flights" 
                    className={`flex items-center absolute top-11 left-10 gap-2 pb-2 md:pb-7 ${
                        pathname?.startsWith('/flights') 
                            ? 'border-b-4 border-[#8DD3BB]' 
                            : ''
                    }`}
                >
                    <MdFlight className={`size-5 ${pathname === '/' ? 'text-white' : 'text-black'}`} />
                    <p className={`font-montserrat font-semiBold text-[14px] ${pathname === '/' ? 'text-white' : 'text-black'}`}>
                        Find Flight
                    </p>
                </Link>

                <Link 
                    href="/hotels" 
                    className={`flex items-center absolute top-11 left-40 gap-2 pb-2 md:pb-7 ${
                        pathname?.startsWith('/hotels') 
                            ? 'border-b-4 border-[#8DD3BB]' 
                            : ''
                    }`}
                >
                    <IoBedSharp className={`size-5 ${pathname === '/' ? 'text-white' : 'text-black'}`} />
                    <p className={`font-montserrat font-semiBold text-[14px] ${pathname === '/' ? 'text-white' : 'text-black'}`}>
                        Find Stays
                    </p>
                </Link>
            </div>

            {/* Logo */}
            <div className={`absolute top-10 left-1/2 -translate-x-1/2 text-3xl ${pathname === '/' ? 'text-white' : 'text-black'}`}>
                BookMe
            </div>

            {/* mobile Auth-buttons */}
            <div className='md:hidden absolute top-[40px] right-5'>
                {session?.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className='size-10'>
                                <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                                <AvatarFallback className='bg-[#0D417D] text-white border border-white flex items-center justify-center text-sm'>
                                    {session?.user?.name?.slice(0, 1).toUpperCase() || 'AV'}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='mt-2'>
                            <DropdownMenuItem
                                className="flex items-center justify-center cursor-pointer bg-white text-black hover:bg-black hover:text-white border-none outline-none"
                                onClick={async() => {
                                    await signOut({ redirect: false });
                                }}
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <FaRegUserCircle className='size-6 text-white cursor-pointer' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className='mt-2'>
                                <DropdownMenuItem
                                    className="flex items-center justify-center cursor-pointer bg-white text-black hover:bg-black hover:text-white border-none outline-none"
                                    onClick={async() => {
                                        await signOut({ redirectTo: "/auth" });
                                    }}
                                >
                                    Login
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )}
            </div>

            {/* Desktop buttons - shows only on md+ screens */}
            <div className="hidden md:flex md:absolute md:top-10 md:right-10 gap-4">
                {session?.user ? (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className='size-10'>
                                <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                                <AvatarFallback className='bg-[#0D417D] text-white border border-white flex items-center justify-center text-xl'>
                                    {session?.user?.name?.slice(0, 1).toUpperCase() || 'AV'}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='mt-2 w-32'>
                            <DropdownMenuItem
                                className="flex items-center justify-center cursor-pointer bg-white text-black hover:bg-black hover:text-white border-none outline-none" 
                                onClick={async() => {
                                    await signOut({ redirect: false });
                                }}
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
                ) : (
                <>
                    <Link href="/auth/sign-in">
                        <Button variant="outline" className="font-montserrat font-semiBold text-[14px] bg-transparent text-white hover:bg-white hover:text-black">
                            Login
                        </Button>
                    </Link>
                    <Link href="/auth/sign-up">
                        <Button className="bg-white font-montserrat font-semiBold text-[14px] hover:bg-gray-100">
                            Sign up
                        </Button>
                    </Link>
                </>
                )}
            </div>
        </div>
    )
}

export default Navbar
