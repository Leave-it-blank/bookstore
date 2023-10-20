import { Disclosure } from '@headlessui/react'
import { Menu, Transition } from "@headlessui/react";
import { Fragment, SVGProps, useState } from "react";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect } from 'react';

import Image from 'next/image';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useUser } from '../store/user';

export default function NavBar() {
    const location = useRouter()
    const UserContext = useUser();
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        if (UserContext.user) {
            setLogged(true);
        } else {
            setLogged(false);
        }
    }, [UserContext]);

    const logout = (e: any) => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        setLogged(false);
        UserContext.setUser(null);
        toast.success("Successfully logged out");
    }
    const nav = [
        {
            name: "Login",
            href: "/login",
            current: location.pathname === "/login" ? true : false,
            guest: !logged,
        },
        {
            name: "Register",
            href: "/register",
            current: location.pathname === "/register" ? true : false,
            guest: !logged,
        },
        {
            name: "Orders",
            href: "/orders",
            current: location.pathname === "/orders" ? true : false,
            guest: logged,
        },
        {
            name: "Cart",
            href: "/cart",
            current: location.pathname === "/cart" ? true : false,
            guest: undefined,
        },
        {
            name: "Profile",
            href: "/profile",
            current: location.pathname === "/profile" ? true : false,
            guest: logged,
        },

    ];
    const books = [
        {
            name: "Home",
            href: "/",
            current: location.pathname === "/" ? true : false,
            guest: true,
        },
        {
            name: "Part 1",
            href: "/books/fundamentals-of-sourcing-and-procurement-part-one",
            current: location.pathname === "/books/fundamentals-of-sourcing-and-procurement-part-one" ? true : false,
            guest: true,
        },
        {
            name: "Part 2",
            href: "/books/fundamentals-of-sourcing-and-procurement-part-two",
            current: location.pathname === "/books/fundamentals-of-sourcing-and-procurement-part-two" ? true : false,
            guest: true,
        },
    ]
    return <>
        <div className="nav  w-full bg-white shadow-sm">
            <div className="container mx-auto h-14 ">
                <nav className="  flex-row h-full justify-between  mx-5 items-center hidden sm:flex">

                    <ul className="  font-bold text-xl">
                        <Link href={"/"}>
                            <Image src="/images/logo_rm.png" width={100} height={100} alt={""} className="w-fit h-12 self-center object-contain rounded-full border-2 border-black " />
                        </Link>
                    </ul>

                    <ul className="flex flex-row gap-5">
                        {nav.map((navItem) => {
                            if (navItem.guest || undefined === navItem.guest) {
                                return (
                                    <li className={` ${navItem.current ? " text-sky-500 " : " text-black"}`} key={navItem.name}> <Link href={navItem.href}> {navItem.name}</Link></li>
                                )
                            }


                        })}
                        {
                            logged && (
                                <button className="text-black" onClick={logout}>Logout</button>
                            )
                        }


                    </ul>

                </nav>
                <nav className=" z-50  relative  py-3 w-full sm:hidden   text-black gap-3  select-none flex flex-row justify-between items-center">
                    <div className="w-full ">
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <div className="flex flex-row justify-between items-center px-3">
                                        <Link href={"/"}>
                                            <Image src="/images/logo_rm.png" width={100} height={100} alt={""} className="w-fit -mt-2 h-12 self-center object-contain rounded-full border-2 border-black " />
                                        </Link>
                                        <Disclosure.Button className="flex     justify-between rounded-lg  bg-[#E0E4EF] px-4 py-2 text-left text-md font-medium items-center   ">
                                            {open ? <XMarkIcon
                                                className={` "
                                                 h-5 w-5 text-black`}
                                            /> : <Bars4Icon
                                                className={` "
                                             h-5 w-5 text-black`} />}
                                        </Disclosure.Button>


                                    </div>
                                    <Disclosure.Panel className=" pt-4 pb-2 text-sm bg-white drop-shadow-md px-3 relative">
                                        <div className=" flex flex-col justify-center gap-3 flex-nowrap">
                                            {nav.map((navItem) => {
                                                if (navItem.guest || undefined === navItem.guest) {
                                                    return (
                                                        <Link
                                                            href={navItem.href}
                                                            key={navItem.name}
                                                            className="w-full"
                                                        >
                                                            {navItem.current ?
                                                                <div className=" btn hover:animate-pulse  bg-[#E0E4EF]  py-2 px-2 cursor-pointer rounded-md   w-full text-right">
                                                                    {navItem.name}
                                                                </div>
                                                                : <div className="btn hover:animate-pulse hover:bg-[#E0E4EF]    py-2 px-2 cursor-pointer rounded-md   w-full text-right">
                                                                    {navItem.name}
                                                                </div>
                                                            }


                                                        </Link>
                                                    );
                                                }

                                            })}
                                            {
                                                logged && (
                                                    <button className=" btn hover:animate-pulse  bg-[#efe0e0]  py-2 px-2 cursor-pointer rounded-md   w-full text-right" onClick={logout}>Logout</button>
                                                )
                                            }
                                        </div>

                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </nav></div>
        </div>



    </>
}