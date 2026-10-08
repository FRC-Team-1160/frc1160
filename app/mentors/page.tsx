"use server";
import Image from "next/image";
import Link from 'next/link';
import { getMentors } from '@/app/lib/data';

export default async function Page() {
  const mentors = await getMentors();
  return (
    <main className="text-center md:text-left">
        <div id="cards" className="relative text-black w-full flex flex-1 flex-col opacity-85 bg-white">
            <div className="py-19 px-10 md:px-45 w-full">
                <div className="flex flex-row justify-center flex-wrap">
                    <div className="flex flex-col items-center justify-center space-y-5 w-full">
                        <h1 className="text-6xl font-light flex flex-col space-y-1">
                            Our Mentors
                        </h1>
                    </div>
                </div>
            </div>
            {
                mentors.map((mentor: any)=>{
                    const base64Image = mentor.image?.toString('base64');
                    const dataUrl = `data:image/png;base64,${base64Image}`;
                    return (
                        <div key={mentor.sort}>
                        <hr className="border-2 border-gray-400 mx-25 rounded-xl" />
                        <div className="py-19 px-10 md:px-45 w-full">
                            <div className="flex flex-col space-y-7 md:space-y-0 md:flex-row flex-wrap justify-center">
                                <div className="flex flex-col md:basis-1/4 items-center justify-center space-y-5">
                                    <Image src={dataUrl} width={410} height={615} loading="eager" alt={mentor.name}></Image>
                                </div>
                                <div className="flex flex-col md:basis-3/4 items-center px-8 space-y-5">
                                    <span className="text-5xl font-light flex flex-col space-y-1">
                                        {`${mentor.name} - ${mentor.position}`}
                                    </span>
                                    <span className="text-xl flex flex-col text-center font-light space-y-2">
                                        <span className="flex flex-row flex-wrap justify-center items-center"><b>Years on the team :</b>&nbsp;{mentor.years} years</span>
                                        <span className="flex flex-row flex-wrap justify-center items-center"><b>Specialty :</b>&nbsp;{mentor.specialty}</span>
                                        <span className="flex flex-row flex-wrap justify-center items-center"><b>Current Occupation :</b>&nbsp;{mentor.occupation}</span>
                                    </span>
                                    <span className="text-xl px-5 text-center font-light">
                                        {mentor.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                        </div>
                    )
                })
            }
        </div>
    </main>
  );
}
