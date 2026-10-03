import Image from 'next/image';
import Link from 'next/link';
import { getRobots } from '@/app/lib/data';
import clsx from 'clsx';

export default async function Page() {
    const robots = await getRobots();
    return (
        <main>
            <div id="cards" className="relative text-black w-full flex flex-1 flex-col opacity-100 bg-white/85">
                <div className="py-19 px-10 md:px-45 w-full">
                    <div className="flex flex-row justify-center flex-wrap">
                        <div className="flex flex-col items-center space-y-5 px-8 text-center">
                            <h1 className="text-6xl font-light flex flex-col space-y-2">
                                Our Robots
                            </h1>
                        </div>
                    </div>
                </div>
                {robots.map(robot => (
                    <div key={robot.slug}>
                        <hr className="border-2 border-gray-400 mx-25 rounded-xl" />
                        <div className="py-19 px-10 md:px-45 w-full flex flex-col gap-5 md:flex-row justify-center items-center">
                            <div className="flex flex-col space-y-7 justify-between">
                                <div className="flex flex-col items-center space-y-5 px-8 text-center">
                                    <span className="text-6xl font-light flex flex-col space-y-2">
                                        {robot.name}
                                        <span className="text-4xl font-normal">
                                            {robot.seasonname || robot.season}
                                        </span>
                                    </span>
                                    <span className="flex justify-center">
                                        <Image src={robot.photos.thumbnail} width={635} height={508} alt={robot.name} />
                                    </span>
                                </div>
                                <span className="flex justify-center items-center">
                                    <Link href={`/robots/${robot.slug}`} className="p-3 border-5 border-blue-500 transition-colors ease-in-out duration-300 font-bold text-2xl text-blue-500 hover:border-blue-400 hover:text-blue-400">More Details</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}