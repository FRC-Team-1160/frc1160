import { getRobot } from '@/app/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function Page({ params }) {
    const { slug } = await params;
    const robot = await getRobot(slug);

    if (!robot?.published || false) {
        return notFound();
    }

    async function fetchCompData(eventKey) {
        "use server"
        try {
            const status = await fetch(`https://www.thebluealliance.com/api/v3/team/frc1160/event/${eventKey}/status`, {
                headers: {
                    "X-TBA-Auth-Key" : process.env.TBA_API
                }
            });
            if (!status.ok) {
              throw new Error(`Response status: ${status.status}`);
            }
            const awards = await fetch(`https://www.thebluealliance.com/api/v3/team/frc1160/event/${eventKey}/awards`, {
                headers: {
                    "X-TBA-Auth-Key" : process.env.TBA_API
                }
            });
            if (!awards.ok) {
              throw new Error(`Response status: ${awards.status}`);
            }
            const event = await fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/simple`, {
                headers: {
                    "X-TBA-Auth-Key" : process.env.TBA_API
                }
            });
            if (!event.ok) {
                throw new Error(`Response status: ${event.status}`);
            }
            const eventdata = await event.json();
            const statusdata = await status.json();
            const awardsdata = await awards.json();

            if (awardsdata.length === 0) {
                awardsdata.push({name: "None"});
            }
            const convertDate = (dateStr) => {
                const [year, month, day] = dateStr.split('-').map(Number);
                
                // JavaScript months are 0-indexed (January is 0)
                const date = new Date(year, month - 1, day);
                
                const getOrdinal = (n) => {
                  const s = ["th", "st", "nd", "rd"];
                  const v = n % 100;
                  return n + (s[(v - 20) % 10] || s[v] || s[0]);
                };
                
                const formattedDate = date.toLocaleDateString('en-US', { month: 'long' }) + 
                                      ' ' + getOrdinal(date.getDate()) + 
                                      ', ' + date.getFullYear();
                return formattedDate;
            }
            const data = {
                name: eventdata.name,
                dates: `${convertDate(eventdata.start_date)} to ${convertDate(eventdata.end_date)}`,
                status: `Team 1160 was Rank ${statusdata.qual.ranking.rank} with a record of ${statusdata.qual.ranking.record.wins+(statusdata.playoff?.record.wins || 0)}-${statusdata.qual.ranking.record.losses+(statusdata.playoff?.record.losses || 0)}-${statusdata.qual.ranking.record.ties+(statusdata.playoff?.record.ties || 0)}`,
                awards: awardsdata.map(award => award.name)
            }
            return data;
        } catch (error) {
            console.error("Error fetching competition data:", error);
            return null;
        }
    }

    const compData = [];
    for (const comp of robot.competitions || []) {
        const data = await fetchCompData(comp);
        if (data) {
            compData.push(data);
        }
    }
    
    return (
        <div className="relative text-black w-full flex flex-col flex-1 text-center opacity-100 bg-white/85">
            <div className="py-19 px-10 md:px-45 w-full">
                <div className="flex flex-row justify-center flex-wrap">
                    <div className="flex flex-col items-center space-y-10 px-8 text-center">
                        <div>
                            <h1 className="text-6xl font-light text-center flex flex-col space-y-1">{robot.name}</h1>
                            <h2 className="text-4xl font-normal">{robot.seasonname || ""}</h2>
                        </div>
                        <span className="flex flex-row space-x-5 items-center justify-center">
                            <Image src={robot.photos.thumbnail} width={800} height={600} alt={robot.name} />
                        </span>
                        <span className="text-xl text-center font-light w-[67%]">{robot.description || ""}</span>
                    </div>
                </div>
            </div>
            {compData?.length > 0 && (
            <>
            <hr className="border-2 border-gray-400 mx-25 rounded-xl" />
            <div className="py-19 px-10 md:px-45 w-full">
                <div className="flex flex-row justify-center flex-wrap">
                    <div className="flex flex-col items-center space-y-5 px-8">
                        <span className="flex flex-row space-x-7 items-center justify-center">
                            <span className="text-6xl font-light flex flex-col space-y-1">
                                Competitions
                            </span>
                        </span>
                        <span className="flex flex-col justify-center text-center space-y-7">
                            {compData.map((comp) => {
                                return (
                                    <span key={comp.name} className="text-xl font-light flex flex-col justify-center text-center space-y-1">
                                        <span className="text-3xl font-medium">{comp.name}</span>
                                        <span className="text-2xl font-medium pb-1">{comp.dates}</span>
                                        <span>{comp.status}</span>
                                        <span className="text-2xl font-normal">Awards</span>
                                        <span>
                                            {comp.awards.map((award, index) => (
                                                <span key={index}>
                                                {award}
                                                {index < comp.awards.length - 1 && <br />}
                                                </span>
                                            ))}
                                        </span>
                                    </span>
                                )
                            })
                                
                            }
                        </span>
                    </div>
                </div>
            </div>
            </>
            )}
            {Object.entries(robot.resources || {}).length > 0 && (
            <>
            <hr className="border-2 border-gray-400 mx-25 rounded-xl" />
            <div className="py-19 px-10 md:px-45 md:width-[50%]">
                <div className="flex flex-row justify-center flex-wrap">
                    <div className="flex flex-col items-center space-y-5 px-8">
                        <span className="flex flex-row space-x-5 items-center justify-center">
                            <span className="text-6xl font-light flex flex-col space-y-1">
                                Resources
                            </span>
                        </span>
                        {Object.entries(robot.resources || {}).map(([key, value]) => (
                            <div key={value} className="flex justify-center opacity-100">
                                <Link href={value} className="p-3 border-5 border-blue-500 transition-colors ease-in-out duration-300 font-bold text-2xl text-blue-500 hover:border-blue-400 hover:text-blue-400">{key}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </>
            )}
        </div>
    )
}