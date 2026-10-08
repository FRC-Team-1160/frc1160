import Image from "next/image";
import Link from 'next/link';
import { getPublicPhoto } from '@/app/lib/data';

export default async function Page() {
  const donate_donate = await getPublicPhoto('donate/donate') || null;
  return (
        <div id="cards" className="relative text-black w-full flex flex-1 flex-col opacity-100 bg-white/85">
            <div className="py-19 px-10 md:px-[10vw] w-full">
                <div className="flex flex-row flex-wrap">
                    <div className="flex flex-col items-center space-y-7">
                        <h1 className="text-6xl font-light flex flex-col space-y-1">
                            Contact Us (wip)
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
                                    why
                                </span>
                                <span className="text-xl font-light px-8">
                                    how
                                </span>
                                <div className="flex flex-row flex-wrap gap-5 pt-3 justify-center opacity-100">
                                    <Link href="/resources/sponsorpacket.pdf" className="p-3 border-5 border-blue-500 transition-colors ease-in-out duration-300 font-bold text-2xl text-blue-500 hover:border-blue-400 hover:text-blue-400">Sponsorship Packet</Link>
                                    <Link href="/sponsors" className="p-3 border-5 border-blue-500 transition-colors ease-in-out duration-300 font-bold text-2xl text-blue-500 hover:border-blue-400 hover:text-blue-400">Current Sponsors</Link>
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
