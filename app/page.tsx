import Image from "next/image";
import Link from 'next/link';
import { getSponsors, getRealSponsors, getPublicPhoto } from '@/app/lib/data';
import { head, list } from "@vercel/blob";
import { blob } from "stream/consumers";
import { leagueSpartan } from "./layout";
import { strasua } from "@/app/lib/strasua";

export default async function Page() {
  let sponsors = await getSponsors();
  const realsponsors = await getRealSponsors()
  const herophoto = await getPublicPhoto('homepage/herophoto') || '/homepage/homepage.jpg';
  const yippee = await getPublicPhoto('homepage/yippee') || "/homepage/yippee.jpg";

  return (
    <main className="text-center md:text-left flex flex-col">
        
        <div className="z-0 w-full h-[50vh] md:h-screen block relative" >
            <Image src={herophoto} height={"1330"} width={"2000"} loading="eager" alt="hero photo" className="object-cover w-full mt-0 top-0 h-full overflow-hidden bg-center md:fixed filter brightness-65 block absolute" />
            <div className="z-10 absolute text-white font-light flex flex-col items-center justify-center h-full w-full p-5 bottom-0 md:bottom-15 md:px-25 text-center">
                <h1 className={`${strasua.className} text-5xl md:text-8xl font-normal`}>Titanium Robotics</h1>
                <h2 className="text-4xl md:text-6xl italic font-light">Feelings are important, but <br className="hidden lg:block"/>it's the Physics that matters.</h2>
                <div className="flex justify-center mt-7 opacity-100">
                    <Link href="/aboutus" className="p-3 border-5 border-blue-500 transition-colors ease-in-out duration-300 font-bold text-3xl text-blue-500 hover:border-blue-400 hover:text-blue-400 bg-white/85 hover:bg-white/95">About Us</Link>
                </div>
            </div>
        </div>
        <div id="cards" className="pt-10 md:pt-15 relative top-0 md:top-full text-black w-full flex flex-col space-y-15 pb-15 opacity-100 bg-white/85">
            <div className="px-10 md:px-[10vw] w-full flex flex-col">
                <span className="items-center text-6xl font-light pb-6 text-center">Who We Are</span>
                <div className="flex flex-col w-full md:w-auto md:flex-row">
                    
                    <span className="md:basis-1/2 items-center">
                        <Image src={yippee} width={1000} height={665} alt="yippe" />
                    </span>
                    <div className="md:basis-1/2 md:pl-7 pt-4 md:pt-0 text-xl font-light">
                        Titanium Robotics is a First Robotics Competition team with roughly 50 members, mostly from San Marino High School in San Marino, CA, although some members are from surrounding schools and areas such as South Pasadena and Arcadia.
                        <br />
                        <span className="relative top-2">
                            Team 1160 provides a place outside the normal school environment for students to learn how to apply their skills in in Science, Technology, Engineering, and Mathematics. We're a group of students and mentors whose main goal is to provide the world with the next generation of STEM leaders.
                        </span>
                        <div className="flex justify-center mt-10 opacity-100">
                            <Link href="/aboutus" className="p-3 border-5 border-blue-500 transition-colors ease-in-out duration-300 font-bold text-3xl text-blue-500 hover:border-blue-400 hover:text-blue-400">About Us</Link>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-2 border-gray-400 mx-25 rounded-xl" />
            <div className="px-10 md:px-[10vw] w-full flex flex-col md:flex-row gap-10 md:gap-15 justify-center items-center">
                <Image src="/homepage/FIRST.svg" width={150} height={150} alt="FIRST Logo" />
                <div className="flex flex-col items-center space-y-5 pr-5 md:basis-3/4">
                    <span className="text-6xl font-light flex w-full flex-col space-y-1">
                        <span>
                            Team 1160 is a FIRST® FRC Team
                        </span>
                        
                        <span className="text-3xl font-normal">
                            What is FIRST® and what do they do?
                        </span>
                    </span>
                    <span className="text-xl font-light">
                        <b>FIRST</b> stands for <b>For Inspiration and Recognition of Science and Technology.</b> Accomplished inventor Dean Kamen founded FIRST® in 1989 to inspire appreciation of science and technology in young people. FIRST® inspires people young and old to learn through robotics.
                        <br />
                        <span>
                            <b>FRC</b>, the league that Titanium Robotics competes in, is the High School level (9-12) robotics league and stands for <b>FIRST Robotics Competition</b>.
                        </span>
                        <br />
                        <span className="relative top-3">
                            Learn more about FIRST®, at&nbsp;
                            <Link href="https://www.firstinspires.org/about" className="text-blue-500 underline font-medium" >
                                www.firstinspires.org/about
                            </Link>
                        </span>
                        
                    </span>
                </div>
            </div>
            <hr className="border-2 border-gray-400 mx-25 rounded-xl"/>
            <div className="px-10 md:px-[10vw] w-full" id="sponsors">
                <div className="flex flex-col items-center">
                    <span className="items-center text-6xl font-light pb-6 text-center">Titanium Sponsors</span>
                    <div className="items-center font-light items-stretch">
                        <div className="flex flex-col md:flex-row flex-wrap pt-8 md:p-8 md:space-x-8 space-y-8 justify-center items-center">
                            {
                                realsponsors.map((sponsor: any) => {
                                    const base64Image = sponsor.image?.toString('base64');
                                    const dataUrl = `data:image/png;base64,${base64Image}`;
                                    return (
                                      <Image
                                        key={sponsor.name}
                                        src={dataUrl}
                                        width={300}
                                        height={150}
                                        alt={sponsor.name}
                                        className="object-contain"
                                      />
);
                                })
                            }
                        </div>
                        <div className="text-2xl font-normal flex flex-col pt-10 space-y-5 text-center">
                            {
                                sponsors.map((sponsor) => {
                                    return (<span key={sponsor.name}>{sponsor.name}</span>);
                                })
                            }
                        </div>
                        <div className="flex justify-center mt-10 opacity-100">
                            <Link href="/donate" className="p-3 border-5 border-blue-500 transition-colors ease-in-out duration-300 font-bold text-3xl text-blue-500 hover:border-blue-400 hover:text-blue-400">Become a Sponsor</Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}
