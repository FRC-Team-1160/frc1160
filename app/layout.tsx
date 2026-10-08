import type { Metadata } from "next";
import { Source_Sans_3, League_Spartan } from "next/font/google";
// @ts-ignore: CSS module declaration is handled by Next.js
import "./globals.css";
import NavBar from '@/app/ui/navbar';
import Link from 'next/link';
import type { Viewport } from 'next';
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from 'react';
import { SessionProvider } from "next-auth/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
});

export const leagueSpartan = League_Spartan({
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Titanium Robotics | 1160",
    description: "The Un-Official Titanium Robotics FRC Website",
    keywords: ["FRC", "Titanium Robotics", "Team 1160","San Marino", "Robotics",],
    creator: "William Chen",
    referrer: 'origin-when-cross-origin',
};

// Source - https://stackoverflow.com/a/77566936
// Posted by grekier, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-08, License - CC BY-SA 4.0

export const viewport: Viewport = {
    initialScale: 1,
    width: 'device-width'
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let currentYear = String(new Date().getFullYear());
  if (currentYear !== "2026") {
    currentYear = `2026-${currentYear}`; 
  }
  return (
    <html lang="en">
      <Analytics />
      <SpeedInsights />
      <body
        className={`${sourceSans3.className} antialiased bg-black min-h-screen flex flex-col`}
      >
        <SessionProvider>
            <NavBar />
        
            <Suspense fallback={<div className="bg-white/85 grow w-full" />}>
                <div className="flex-1 flex flex-col min-h-0">
                    {children}
                </div>
            </Suspense>
            <div>
                <footer className="flex flex-col md:flex-row h-55 pb-5 md:pb-0 md:h-25 px-10 md:px-25 relative bottom-0 w-full bg-white text-black content-center justify-center md:justify-between items-center text-center space-y-4">
                    <div className="flex flex-row flex-wrap justify-center content-center space-x-7 pt-5">
                        <Link href="https://www.instagram.com/titaniumrobotics" target="_blank" rel="noopener noreferrer" className="w-10 h-15 border-b-2 border-b-[#c13584]" >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" fill="#c13584" /></svg>
                        </Link>
                        <Link href="https://github.com/frc-team-1160" target="_blank" rel="noopener noreferrer" className="w-10 h-15 border-b-2 border-b-[#4078c0]" >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM252.8 8c-138.7 0-244.8 105.3-244.8 244 0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1 100-33.2 167.8-128.1 167.8-239 0-138.7-112.5-244-251.2-244zM105.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9s4.3 3.3 5.6 2.3c1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" fill="#4078c0" /></svg>
                        </Link>
                        <Link href="mailto:titaniumrobotics@gmail.com" target="_blank" rel="noopener noreferrer" className="w-10 h-15 border-b-2" suppressHydrationWarning >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M61.4 64C27.5 64 0 91.5 0 125.4 0 126.3 0 127.1 .1 128L0 128 0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256-.1 0c0-.9 .1-1.7 .1-2.6 0-33.9-27.5-61.4-61.4-61.4L61.4 64zM464 192.3L464 384c0 8.8-7.2 16-16 16L64 400c-8.8 0-16-7.2-16-16l0-191.7 154.8 117.4c31.4 23.9 74.9 23.9 106.4 0L464 192.3zM48 125.4C48 118 54 112 61.4 112l389.2 0c7.4 0 13.4 6 13.4 13.4 0 4.2-2 8.2-5.3 10.7L280.2 271.5c-14.3 10.8-34.1 10.8-48.4 0L53.3 136.1c-3.3-2.5-5.3-6.5-5.3-10.7z"/></svg>
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Link target="_blank" rel="noopener noreferrer" href="https://maps.app.goo.gl/4nZ67bJcaSAxxznT6" className="text-black font-normal text-gray-500 underline">
                            2701 Huntington Dr, San Marino, CA 91108
                        </Link>
                        <Link target="_blank" rel="noopener noreferrer" href="https://futureformlinkhere.com" className="text-black font-normal text-gray-500 underline hidden">
                            Notice a Problem?
                        </Link>
                        <span className="text-black font-normal text-gray-500">
                            © {currentYear} Titanium Robotics. Licensed under the <Link target="_blank" rel="noopener noreferrer" href="https://opensource.org/licenses/MIT" className="text-blue-500 hover:underline">MIT License</Link>
                        </span>
                    </div>
                </footer>
            </div>
        </SessionProvider>
      </body>
    </html>
  );
}
