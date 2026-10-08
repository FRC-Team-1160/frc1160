'use server';
import Image from "next/image";
import Link from 'next/link';
import Navbar2 from '@/app/cabinet/navbar2';
import { getEngineering } from '@/app/lib/data';
import clsx from 'clsx';

export default async function Page() {
  const engineering = await getEngineering();
  let bg=0;
  return (
    <main className="text-center md:text-left">
        <Navbar2 />
        <div id="cards" className="relative text-black w-full flex flex-1 flex-col opacity-85 bg-white space-y-7">
            <div className="py-10 md:py-19 px-10 md:px-45 w-full">
                <div className="flex flex-row justify-center flex-wrap">
                    <div className="flex flex-col items-center space-y-5 w-full justify-center">
                        <h1 className="text-6xl font-light flex flex-col space-y-1">
                            Engineering Cabinet
                        </h1>
                    </div>
                </div>
            </div>
            <hr className="border-2 border-gray-400 mx-15 md:mx-25 rounded-xl" />
            <div className="py-10 md:py-19 md:px-45 w-full md:grid md:grid-cols-[repeat(2,1fr)] text-center md:text-left justify-center md:auto-rows-fr md:grid-flow-row">
                {
                    engineering.map((member)=>{
                        if (bg===0) {bg=1} else {bg=0}
                        const base64Image = member.image?.toString('base64');
                        const dataUrl = `data:image/png;base64,${base64Image}`;
                        return (
                            <div key={member.name} className={clsx(`flex flex-col space-y-7 md:space-y-0 md:flex-row flex-wrap justify-center py-7 px-10 w-full h-full md:px-0`,{'bg-[#a9c4e6]/67 md:bg-inherit':bg===1})}>
                                <div className="flex flex-col md:basis-1/3 items-center justify-center space-y-5">
                                    <Image src={dataUrl} alt={member.name} width={410} height={615} />
                                </div>
                                <div className="flex flex-col md:basis-2/3 md:pl-8 items-left space-y-2">
                                    <span className="text-5xl font-light flex flex-col space-y-1">
                                        <span>{member.name}</span>
                                        <span className="text-2xl font-medium">{member.position}</span>
                                    </span>
                                    <span className="text-xl flex flex-col text-center font-light space-y-1">
                                        <span className="flex flex-row flex-wrap justify-center md:justify-start items-center"><b>Grade :</b>&nbsp;{member.grade}</span>
                                        <span className="flex flex-row flex-wrap justify-center md:justify-start items-center"><b>Years on the team :</b>&nbsp;{member.years}</span>
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </main>
  );
}
