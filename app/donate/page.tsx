import Image from "next/image";
import Link from 'next/link';
import { getPublicPhoto } from '@/app/lib/data';

export default async function Page() {
  const donate_donate = await getPublicPhoto('donate/donate') || null;
  return (
        <div id="cards" className="relative text-black w-full flex flex-1 flex-col opacity-100 bg-white/85">
            <div className="py-19 px-10 md:px-[10vw] w-full">
                <div className="flex flex-row flex-wrap">
                    <div className="flex flex-col items-center space-y-7 w-full">
                        <h1 className="text-6xl font-light flex flex-col space-y-1">
                            Donate
                        </h1>
                        <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row md:space-x-10">
                            {donate_donate && 
                                (
                                    <div className="md:basis-1/2">
                                        <Image src={donate_donate} width={800} height={0} alt="Team Picture" className="w-full" />
                                    </div>
                                )
                            }
                            <div className="md:basis-1/2 flex flex-col space-y-5 text-center justify-center">
                                <span className="text-xl font-light w-full px-8">
                                    Your monetary donation to the team (that is tax-deductible) would go a long way in not just helping our team achieve bigger heights in FIRST competitions, but also promoting a better learning environment here at the high school by allowing us to use more materials to develop future leaders. Any amount would be much appreciated, and from the bottom of our hearts the team would like to thank you for your interest and consideration in supporting our program. If you are a corporation, please feel free to contact us through email. Other donations may be done through this Zelle (with comment ‘For Titanium Robotics’), check (written to San Marino High School with Titanium Robotics in the memo line), or cash.
                                </span>
                                <div className="flex flex-row flex-wrap gap-5 pt-3 justify-center opacity-100">
                                    <Link href="/resources/sponsorpacket.pdf" className="p-3 border-5 border-blue-500 transition-colors ease-in-out duration-300 font-bold text-2xl text-blue-500 hover:border-blue-400 hover:text-blue-400">Sponsorship Packet</Link>
                                    <Link href="/#sponsors" className="p-3 border-5 border-blue-500 transition-colors ease-in-out duration-300 font-bold text-2xl text-blue-500 hover:border-blue-400 hover:text-blue-400">Current Sponsors</Link>
                                    <Link href="mailto:titaniumrobotics@gmail.com?subject=Donating To Titanium" className="p-3 border-5 border-blue-500 transition-colors ease-in-out duration-300 font-bold text-2xl text-blue-500 hover:border-blue-400 hover:text-blue-400">Email Us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}
