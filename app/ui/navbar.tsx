'use client';

import Image from "next/image";
import Link from 'next/link';
import TiLogo from '@/app/ui/TiLogo';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Dropdown from '@/app/ui/dropdown';
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react"


export default function NavBar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const links = [
      {"name":"Home","href":"/"},
      {"name":"About Us", "href":"/aboutus"},
      {"name":"Mentors","href":"/mentors"},
      {"name":"Cabinet","href":"/cabinet/engineering", "alt":"/cabinet/business"},
      {"name":"Robots","href":"/robots"},
      {"name":"Donate","href":"/donate"},
  ]
  return (
    <main className = {`flex flex-row space-x-0 justify-left items-center p-0 h-25 relative inset-0 z-50 bg-white md:bg-white/85 w-full`}>
        <Link
        className="flex items-center h-full flex-shrink-0 flex-grow-0 bg-white/85"
        href="/"
        >
            <TiLogo />
        </Link>

        <span 
            className = {`flex-1 md:hidden`} 
            />
        
        <span 
            className = {`flex flex-row space-x-8 justify-left bg-white/85 p-0 pl-2 pr-7 h-25 hidden md:flex w-full overflow-x-auto`}  
            >
            {
                links.map((link)=>{
                    return (
                        <Link 
                            key = {link.name}
                            className = {`text-xl flex items-center justify-center align-middle bg-clear text-black`} 
                            href={link.href}
                        >
                            <p className={clsx("transition hover:border-blue-500 border-4 px-2 py-1.5",{'border-blue-500' : pathname === link.href || pathname === link.alt,'border-transparent': !(pathname === link.href || pathname === link.alt)},)}>
                                {link.name}
                            </p>
                        </Link>
                    )
                })
            }
            <Link 
                className = {clsx(`text-xl flex items-center justify-center align-middle bg-clear text-black`,{"hidden":!session || session?.user?.role === "admin"})} 
                href="/dashboard"
            >
                <p className={clsx("transition hover:border-blue-500 border-4 px-2 py-1.5",{'border-blue-500' : pathname.includes("/dashboard"),'border-transparent': !(pathname.includes("/dashboard"))},)}>
                    Dashboard
                </p>
            </Link>
            <Link 
                className = {clsx(`text-xl flex items-center justify-center align-middle bg-clear text-black`,{"hidden":session?.user?.role !== "admin"})} 
                href="/admin"
            >
                <p className={clsx("transition hover:border-blue-500 border-4 px-2 py-1.5",{'border-blue-500' : pathname.includes("/admin"),'border-transparent': !(pathname.includes("/admin"))},)}>
                    Admin
                </p>
            </Link>
            <button onClick={() => signOut({ redirectTo: "/" })} className = {clsx(`text-xl flex items-center justify-center align-middle bg-clear text-black`, {'hidden':!session})}><p className={"transition border-transparent hover:border-blue-500 border-4 px-2 py-1.5 hover:cursor-pointer"}>
                Logout
            </p></button>
            <span className="text-xl flex flex-row flex-1 items-center justify-end align-middle bg-clear text-black m-3">
                <div className="relative w-24 h-full">
                    <Image
                        src="/homepage/FIRST.svg"
                        fill
                        alt="FIRST Logo"
                        className="object-scale-down"
                    />
                </div>
            </span>
        </span>

        <div className="md:hidden w-11 h-11">
            <Dropdown pathname={pathname} links={links} />
        </div>
        
        <span className={`flex flex-row space-x-0 justify-right bg-white p-0 h-10 mr-10 flex md:hidden`}>
            
        </span>
    </main>
  );
}
