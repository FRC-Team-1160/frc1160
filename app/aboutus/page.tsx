import Image from "next/image";
import Link from 'next/link';
import { getPublicPhoto } from '@/app/lib/data';

// Add CTAs like how to contact us and how to support us.

export default async function Page() {
    const aboutus_bg = await getPublicPhoto('aboutus/bg') || "/team/parade.jpg";
    const aboutus_team = await getPublicPhoto('aboutus/team') || "/team/parade.jpg";
  return (
    <main className="text-center md:text-left">
        <div className="z-0 w-full h-[50vh] block relative" >
            <Image src={aboutus_bg} height={"1330"} width={"2000"} loading="eager" alt="hero photo" className="object-cover w-full mt-0 top-0 h-full overflow-hidden bg-center md:fixed filter brightness-75 block absolute" />
        </div>
        <div id="cards" className="relative text-black w-full flex flex-1 flex-col bg-white/85">  
            <div className="pb-19 md:py-19 px-10 md:px-45 w-full">
                <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 justify-center flex-wrap">
                    <div className="flex flex-col md:basis-1/5 items-center justify-center text-center space-y-3 font-light text-xl pt-10 md:pt-0">
                        <div className="flex flex-col space-y-1">
                            <span className="font-medium">ROOKIE YEAR</span>
                            <span>2003</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className="font-medium">LOCATION</span>
                            <span>San Marino, California</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className="font-medium">SCHOOL AFFILIATION</span>
                            <Link href="https://www.sanmarinohs.org" className="text-blue-500 underline">San Marino High School</Link>
                        </div>
                    </div>
                    <div className="flex flex-col md:basis-4/5 items-center space-y-5">
                        <h1 className="text-6xl font-light flex flex-col space-y-1">
                            About Titanium
                        </h1>
                        <span className="text-xl font-light px-8">
                            Titanium Robotics, in its 20+ years of existence, has been and continues to be committed to the creation of opportunities and inspiration to pursue STEAM for everyone and anyone. We work to provide a creative, innovative, spirited environment that teaches and promotes Science, Technology, Engineering, Art, and Mathematics in unique and engaging ways that a traditional classroom cannot. Our mission is to spread FIRST® values as well as STEAM to the younger generation in tandem with our belief that STEAM is for everyone.
                        </span>
                        <span className="text-xl font-light px-8">
                            In 2003, NASA engineer Dr. Jeng Yen founded our team and since then, anyone interested in joining the team has been welcomed, no matter their experience. Additionally, as a completely student-led organization, we rely on our <Link href="/cabinet/engineering" className="text-blue-500 underline font-normal">cabinet</Link> of solely members to run the team. Whether it be marketing an event or building a test board, student leadership is the core of the team’s success. Through this process, students also produce materials such as videos and guides that build a cycle of knowledge, allowing us to retain skills for the following years. As such, our students gain skills in how to learn, teach, lead, and push themselves to be the best both within and outside of the robotics room.
                        </span>
                        <span className="text-xl font-light px-8">
                            After years of solidifying our presence and constructing a strong foundation for outreach, Team 1160 has become an important part of not only our school, but also our entire community. Our influence continuously transcends our campus grounds as we guide our community members, sponsors, and local newspaper outlets through each and every FRC season.
                        </span>
                    </div>
                </div>
            </div>
            <hr className="border-2 border-gray-400 mx-25 rounded-xl" />
            <div className="py-19 px-10 md:px-45 w-full">
                <div className="flex flex-row flex-wrap justify-center items-center gap-5">
                    <div className="flex flex-col md:basis-3/4 items-center space-y-5">
                        <span className="text-6xl font-light flex flex-col space-y-1">
                            Our Team
                        </span>
                        <div className="flex flex-col text-center justify-center space-y-1">
                            <span className="text-4xl font-light px-8 italic">
                                "Feelings are important, but it's the Physics that matters."
                            </span>
                            <span className="text-2xl font-normal">- Team Motto</span>
                        </div>
                        <span className="text-xl font-light px-8">
                            Titanium Robotics is a team consisting of approximately 50 students.  Although most members come from San Marino High School, there are members from other schools who share a common interest in science, technology, engineering, and mathematics. Robotics gives students the opportunity to work with professional engineers from companies such as Boeing and JPL, who have volunteered to be <Link href="/mentors" className="text-blue-500 underline font-normal">mentors</Link> to the team.  Members not only learn to work with intricate machinery, but also learn to design and build a robot by hand. Programming is also an extremely important part of robotics that can be learned.  If mechanical or programming work does not interest prospective members, one can always work on the business side to the Titanium Robotics experience. Titanium Robotics offers a wonderful experience for everyone.
                        </span>
                    </div>
                    <div className="flex flex-col md:basis-1/4 items-center space-y-3">
                        <Image src={aboutus_team} width={800} height={600} alt="Team Picture" />
                    </div>
                </div>
            </div>
            <hr className="border-2 border-gray-400 mx-25 rounded-xl" />
            <div className="py-19 px-10 md:px-45 w-full">
                <div className="flex flex-row flex-wrap justify-center">
                    <div className="flex flex-col items-center space-y-5">
                        <span className="text-6xl font-light flex flex-col space-y-1">
                            Our History
                        </span>
                        <span className="text-xl font-light px-8">
                            Our team was founded in 2003 by Dr. Jeng Yen.  Four years after our team was founded, our present advisor and mentor, San Marino High School teacher Scott Barton, came forward to lead the team. Following the ideals of these two mentors, the team has always emphasized a student, not mentor, led workforce which equates to a unique experience not found anywhere else in San Marino.
                        </span>
                        <span className="text-xl font-light px-8">
                            Beginning as team “Titanium,” the team competed every year in the FIRST Robotics Competition. A few years later, we decided to change our image and thus became “Firebird Robotics.” After a couple years as “Firebird Robotics”, we have officially reinstated ourselves as “Titanium Robotics”.
                        </span>
                    </div>
                </div>
            </div>
            <hr className="border-2 border-gray-400 mx-25 rounded-xl" />
            <div className="py-19 px-10 md:px-45 w-full">
                <div className="flex flex-row justify-center flex-wrap">
                    <div className="flex flex-col items-center w-200 space-y-5">
                        <span className="text-6xl font-light flex flex-col space-y-1">
                            Our Brand
                        </span>
                        <div className="relative w-full h-0 overflow-hidden pt-[77.284050%] mt-[1.6em] mb-[0.9em] bg-white">
                          <iframe loading="eager" className="absolute top-0 left-0 w-full h-full border-none bg-white m-0"
                            src="https://www.canva.com/design/DAGgt8cX3Js/C4Htnz0lk4dnWK0-i8YSGQ/view?embed" allowFullScreen={true} allow="fullscreen">
                          </iframe>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}
