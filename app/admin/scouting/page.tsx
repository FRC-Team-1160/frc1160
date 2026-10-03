import { auth } from '@/auth';
import { getDiscordUsers, deleteDiscordUser, createDiscordUser, editDiscordUser, editDiscordUserRSVP, setAllDiscordRSVP, getCompSets, setCompSet, createCompSet, clearCompSet } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';
import Row from './row';
import RSVPRow from './rsvprow';
import SetRow from './setrow';

export default async function Page() {
  const users = await getDiscordUsers();

  const compsets = await getCompSets();

  async function reloadList() {
    'use server';
    revalidatePath('/admin/discord');
  }

  async function createUser(formData: FormData) {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    const id = formData.get("id") as string;
    const fname = formData.get("fname") as string;
    const lname = formData.get("lname") as string;
    const classof = formData.get("classof") as string;
    const email = formData.get("email") as string;
      

    if ( !id || !fname || !lname || !classof || !email ) return;

    await createDiscordUser(id, fname, lname, classof, email);

    revalidatePath('/admin/discord');
  }

  async function editUser(id: string, fname: string, lname: string, classof: string, email: string) {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    if (!id || !fname || !lname || !classof || !email) return;

    await editDiscordUser(id, fname, lname, classof, email);

    revalidatePath('/admin/discord');
  }

  async function deleteUser(formData: FormData) {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    const id = formData.get("id") as string;
    if (!id) return;

    await deleteDiscordUser(id);

    revalidatePath('/admin/discord');
  }

  async function resetRSVP(formData: FormData) {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    const compcode = formData.get("compcode") as string;
    if (!compcode) return;

    await clearCompSet();

    const TBA_API_KEY = process.env.TBA_API ?? '';

    if (!TBA_API_KEY) {
      throw new Error('TBA_API environment variable is not set.');
    }

    const event = await fetch(`https://www.thebluealliance.com/api/v3/event/${compcode}/simple`, {
        headers: {
            "X-TBA-Auth-Key" : TBA_API_KEY
        }
    });
    if (!event.ok) {
        throw new Error(`Response status: ${event.status}`);
    }
    const eventdata = await event.json();

    // Source - https://stackoverflow.com/a/50398144
    // Posted by enesn, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-08-04, License - CC BY-SA 4.0
    const getDaysArray = function(s,e) {const a=[];for(const d=new Date(s);d<=new Date(e);d.setDate(d.getDate()+1)){ a.push(new Date(d).toISOString().split('T')[0]);}return a;};

    const days = getDaysArray(eventdata.start_date, eventdata.end_date);

    const defaultRSVP = {compcode: compcode};

    for (const day of days) {
        defaultRSVP[day] = true;
    }

    await setAllDiscordRSVP(defaultRSVP);

    revalidatePath('/admin/discord');
  }

  async function editUserRSVP(id: string, date: string, rsvp: boolean) {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    if (!id || !date || typeof rsvp !== 'boolean') return;

    await editDiscordUserRSVP(id, date, rsvp);

    revalidatePath('/admin/discord');
  }
  
  async function getEventData() {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    const compcode = users.length > 0 ? users[users.length - 1].rsvp?.compcode : null;

    if (!compcode) {
      return null;
    }

    const TBA_API_KEY = process.env.TBA_API ?? '';

    if (!TBA_API_KEY) {
      throw new Error('TBA_API environment variable is not set.');
    }

    const event = await fetch(`https://www.thebluealliance.com/api/v3/event/${compcode}/simple`, {
        headers: {
            "X-TBA-Auth-Key" : TBA_API_KEY
        }
    });
    if (!event.ok) {
        throw new Error(`Response status: ${event.status}`);
    }
    const eventdata = await event.json();

    return eventdata;
  }

  const eventData = await getEventData();

  async function editMatch(day: string, matchIndex: number, matchData: any) {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    if (!day || !matchData) return;

    const sets = compsets.find((d: any) => d.day === day)?.set || null;

    sets[matchIndex] = matchData;

    await setCompSet(day, sets);

    revalidatePath('/admin/discord');
  }

  async function generateSets() {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    if (!eventData) {
      throw new Error('No event data available');
    }

    await clearCompSet();

    // Same day-range logic used in resetRSVP
    const getDaysArray = (s: string, e: string) => {
      const a: string[] = [];
      for (const d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
        a.push(new Date(d).toISOString().split('T')[0]);
      }
      return a;
    };

    const days = getDaysArray(eventData.start_date, eventData.end_date);

    const teamsPerMatch = 6; // 3 red + 3 blue

    for (const day of days) {
      // Filter to users who RSVP'd for this event AND are available on this specific day
      const rsvpUsers = users.filter(
        (user: any) => user.rsvp?.compcode === eventData?.key && user.rsvp?.[day] === true
      );

      if (rsvpUsers.length === 0) {
        await setCompSet(day, []);
        continue;
      }

      const shuffledUsers = [...rsvpUsers].sort(() => Math.random() - 0.5);
      const sets: any[] = [];

      for (let i = 0; i < shuffledUsers.length; i += teamsPerMatch) {
        const matchUsers: any[] = [];
        for (let j = 0; j < teamsPerMatch; j++) {
          matchUsers.push(shuffledUsers[(i + j) % shuffledUsers.length]);
        }
        sets.push({
          r1: matchUsers[0].discord_id,
          r2: matchUsers[1].discord_id,
          r3: matchUsers[2].discord_id,
          b1: matchUsers[3].discord_id,
          b2: matchUsers[4].discord_id,
          b3: matchUsers[5].discord_id,
        });
      }

      await createCompSet(day, sets);
    }

    revalidatePath('/admin/discord');
  }

  return (
    <main className="text-center md:text-left min-h-screen bg-white w-full">
      <div className="text-black w-full flex flex-col">
        <div className="py-19 px-10 md:px-45 w-full">
            <div className="flex flex-row justify-center flex-wrap">
                <div className="flex flex-col items-center space-y-5">
                    <span className="text-6xl font-light flex flex-col space-y-1">
                        Scouting
                    </span>
                </div>
            </div>
        </div>

        <hr className="border-2 border-gray-400 mx-10 mb-10 rounded-xl" />

        <span className="flex flex-col items-center mb-10">
          <h2 className="text-5xl font-light">Users</h2>
        </span>

        {/* Form */}
        <div className="pb-10 px-6 md:px-20 flex gap-5 justify-center">
            <div className="bg-gray-300 p-6 rounded-lg">
                <form action={reloadList}>
                    <button type="submit" className="p-2.5 bg-blue-500/25 hover:bg-blue-500/90 transition duration-300 ease-out rounded-xl hover:cursor-pointer" title="Reload List"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-white">{/*<!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->*/}<path d="M436.7 74.7L448 85.4 448 32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 128c0 17.7-14.3 32-32 32l-128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l47.9 0-7.6-7.2c-.2-.2-.4-.4-.6-.6-75-75-196.5-75-271.5 0s-75 196.5 0 271.5 196.5 75 271.5 0c8.2-8.2 15.5-16.9 21.9-26.1 10.1-14.5 30.1-18 44.6-7.9s18 30.1 7.9 44.6c-8.5 12.2-18.2 23.8-29.1 34.7-100 100-262.1 100-362 0S-25 175 75 75c99.9-99.9 261.7-100 361.7-.3z"/></svg></button>
                </form>
            </div>
            <div className="bg-gray-300 p-6 rounded-lg">
                <form
                action={createUser}
                className="flex flex-col lg:flex-row flex-wrap gap-4 justify-center items-center"
                >
                <input
                    placeholder="Discord ID"
                    name="id"
                    className="border-2 border-white p-2 rounded-lg"
                    required
                    autoFocus
                />
                <input
                    placeholder="First Name"
                    name="fname"
                    className="border-2 border-white p-2 rounded-lg"
                    required
                />
                <input
                    placeholder="Last Name"
                    name="lname"
                    className="border-2 border-white p-2 rounded-lg"
                    required
                />
                <input
                    placeholder="Class of"
                    name="classof"
                    className="border-2 border-white p-2 rounded-lg"
                    required
                />
                <input
                    placeholder="Email"
                    name="email"
                    className="border-2 border-white p-2 rounded-lg"
                    type="email"
                    required
                />
                <button
                    type="submit"
                    className="border-2 border-white rounded-lg px-4 py-2 bg-gray-200 hover:cursor-pointer"
                >
                    Add
                </button>
                </form>
            </div>
        </div>

        {/* Discord Users List */}
        <div className="py-10 mx-2 md:mx-20 flex justify-center items-center bg-gray-300 rounded-lg">
          {users.length === 0 ? (
            <p className="text-center">No Registered Discord Users yet</p>
          ) : (
            <div className="w-full">
              {/* Header Row */}
              <div className="grid grid-cols-12 font-semibold text-center border-b pb-2 px-4 mb-2">
                <div className="col-span-2">Discord ID</div>
                <div className="col-span-2">First Name</div>
                <div className="col-span-2">Last Name</div>
                <div className="col-span-2">Class of</div>
                <div className="col-span-2">Email</div>
              </div>
        
              {/* Data Rows */}
              <div className="flex flex-col gap-2">
                {users.map((user: any) => {       
                return (
                  <Row key={user.discord_id} user={user} editUser={editUser} deleteUser={deleteUser}/>
                )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <hr className="border-2 border-gray-400 mx-10 my-10 rounded-xl" />

      {/* Form */}
        <div className="pb-10 px-6 md:px-20 flex justify-center">
          <div className="bg-gray-300 p-6 rounded-lg">
              <form
              action={resetRSVP}
              className="flex flex-col lg:flex-row flex-wrap gap-4 justify-center items-center"
              >
              <input
                  placeholder="Comp Code"
                  name="compcode"
                  className="border-2 border-white p-2 rounded-lg"
                  required
                  autoFocus
              />
              <button
                  type="submit"
                  className="border-2 border-white rounded-lg px-4 py-2 bg-gray-200 hover:cursor-pointer"
              >
                  Set RSVP
              </button>
              </form>
          </div>
      </div>

      <span className="flex flex-col items-center mb-10">
        <h2 className="text-5xl font-light">{eventData?.name || "No Event Set"}</h2>
      </span>

      {/* Discord Users List */}
      <div className="py-10 mx-2 md:mx-20 flex justify-center items-center bg-gray-300 rounded-lg">
        {users.length === 0 ? (
          <p className="text-center">No Registered Discord Users yet</p>
        ) : (
          <div className="w-full">
            {/* Header Row */}
            <div className="grid grid-cols-5 font-semibold text-center border-b pb-2 px-4 mb-2">
              <div className="col-span-1">Name</div>
              <div className="col-span-1">Email</div>
              <div className="col-span-3">RSVP</div>
            </div>
      
            {/* Data Rows */}
            <div className="flex flex-col gap-2">
              {users.map((user: any) => {
                if (user.rsvp?.compcode === eventData?.key) {       
                  return (
                    <RSVPRow key={user.discord_id} user={user} editUserRSVP={editUserRSVP}/>
                  )
                }
              })}
            </div>
          </div>
        )}
      </div>

      <hr className="border-2 border-gray-400 mx-10 my-10 rounded-xl" />

      <span className="flex flex-col items-center gap-5 mb-5">
        <h2 className="text-5xl font-light">Sets</h2>
        <p>Sets are all combinations of students that get cycled through while scouting.</p>
      </span>

      {/* Form */}
        <div className="pb-10 px-6 md:px-20 flex justify-center">
          <div className="bg-gray-300 p-6 rounded-lg">
              <form
              action={generateSets}
              className="flex flex-col lg:flex-row flex-wrap gap-4 justify-center items-center"
              >
              <button
                  type="submit"
                  className="border-2 border-white rounded-lg px-4 py-2 bg-gray-200 hover:cursor-pointer"
              >
                  Generate Sets
              </button>
              </form>
          </div>
      </div>

      <div className="gap-10 flex flex-col justify-center">
      {compsets.length === 0 ? (
        <h3 className="text-center text-3xl">No Competition Sets yet</h3>
      ) : (
        compsets.map((day: any) => (
          <div key={day.day} className="py-10 mx-2 md:mx-20 flex justify-center items-center bg-gray-300 rounded-lg">
            <div className="w-full">
              <div>
                <h3 className="text-3xl font-semibold text-center mb-5">{day.day}</h3>
              </div>
              {/* Header Row */}
              <div className="grid grid-cols-8 font-semibold text-center border-b pb-2 px-4 mb-2">
                <div className="col-span-1">#</div>

                <div className="col-span-1">Red 1</div>
                <div className="col-span-1">Red 2</div>
                <div className="col-span-1">Red 3</div>
                <div className="col-span-1">Blue 1</div>
                <div className="col-span-1">Blue 2</div>
                <div className="col-span-1">Blue 3</div>
              </div>

              {/* Data Rows */}
              <div className="flex flex-col gap-2">
                {day.set.map((match: any, index: number) => {
                  const userkey: { [key: string]: string } = {};
                  Object.entries(match).forEach(([key, value]: [string, any]) => {
                    const user = users.find((u: any) => u.discord_id === value);
                    if (user) {
                      userkey[key] = `${user.first_name} ${user.last_name}`;
                    } else {
                      userkey[key] = value; // If user not found, keep the original value (discord_id)
                    }
                  });
                  return <SetRow key={index} index={index} day={day.day} match={match} userkey={userkey} editMatch={editMatch} />;
                })}
              </div>
            </div>
          </div>
        ))
      )}
      </div>

      <hr className="border-2 border-gray-400 mx-10 my-10 rounded-xl" />

      <div className="p-8 mx-2 md:mx-20 flex flex-col md:grid md:grid-cols-2 md:items-start gap-3 justify-center items-center bg-gray-300 rounded-lg">
        <div className="flex flex-col items-center gap-3 w-full h-full">
          <div className="flex flex-col justify-center items-center gap-5 bg-purple-500/25 border-purple-500/20 border-2 p-5 rounded-lg w-full h-full">
            <button className="border-3 border-green-500/35 bg-green-500/15 transition duration-200 ease-out hover:cursor-pointer hover:bg-green-500/45 text-2xl text-black font-semibold py-3 px-6 rounded-lg">
              Start
            </button>
            <div className="flex flex-col gap-3 items-end">
              <div>
                <span>Number of Matches Per Row from Set : </span>
                <input type="text" title="Number of Matches Per Row" className="border border-gray-400 rounded-md p-2 bg-gray-200/50"></input>
              </div>
              <div>
                <span>Discord Channel ID : </span>
                <input type="text" title="Discord Channel ID" className="border border-gray-400 rounded-md p-2 bg-gray-200/50"></input>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center gap-5 bg-purple-500/25 border-purple-500/20 border-2 p-5 rounded-lg w-full h-full">
            <div className="text-3xl font-bold">
              UPCOMING
            </div>
            <div className="flex flex-row gap-5 justify-between items-center w-full h-full">
              <div className="text-7xl font-bold p-5 aspect-square h-full flex flex-col gap-5 items-center justify-center bg-purple-500/25 border-purple-500/20 border-2 rounded-lg">
                <div className="text-5xl font-bold mb-[-15px]">
                  QUAL
                </div>
                <div>2</div>
                <div className="text-3xl font-bold mt-[-15px]">
                  REPLAY
                </div>
              </div>
              <div className="text-3xl font-semibold w-full overflow-hidden rounded-xl border-2 border-purple-500/20">
                <table className="w-full text-center table-fixed border-collapse">
                  <tbody>
                    <tr className="bg-red-500/25">
                      <td className="p-2 h-16 border border-purple-500/20">
                        <div className="flex flex-col items-center justify-center h-full">
                          <span>1160</span>
                          <span>William Chen</span>
                        </div>
                      </td>
                      <td className="p-2 h-16 border border-purple-500/20">
                        <div className="flex flex-col items-center justify-center h-full">
                          <span>1538</span>
                          <span>platypus</span>
                        </div>
                      </td>
                      <td className="p-2 h-16 border border-purple-500/20">
                        <div className="flex flex-col items-center justify-center h-full">
                          <span>523</span>
                          <span>perry</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="bg-blue-500/25 min-h-50">
                      <td className="p-2 h-16 border border-purple-500/20">
                        <div className="flex flex-col items-center justify-center h-full">
                          <span>1160</span>
                          <span>William Chen</span>
                        </div>
                      </td>
                      <td className="p-2 h-16 border border-purple-500/20">
                        <div className="flex flex-col items-center justify-center h-full">
                          <span>1538</span>
                          <span>platypus</span>
                        </div>
                      </td>
                      <td className="p-2 h-16 border border-purple-500/20">
                        <div className="flex flex-col items-center justify-center h-full">
                          <span>523</span>
                          <span>perry</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center gap-5 bg-purple-500/25 border-purple-500/20 border-2 p-5 rounded-lg w-full h-full">
          <div className="text-3xl font-bold" hidden>
            CURRENT
          </div>
          <div className="flex flex-col gap-5 items-center justify-center w-full h-full">
            <div className="text-5xl font-bold mb-[-15px]">
              QUAL
            </div>
            <div className="text-8xl font-bold m-0">
              8
            </div>
            <div className="text-3xl font-semibold w-full overflow-hidden rounded-xl border-2 border-purple-500/20 h-[50%]">
              <table className="w-full h-full text-center table-fixed border-collapse">
                <tbody>
                  <tr className="bg-red-500/25">
                    <td className="p-2 h-16 border border-purple-500/20">
                      <div className="flex flex-col items-center justify-center h-full">
                        <span>1160</span>
                        <span>William Chen</span>
                      </div>
                    </td>
                    <td className="p-2 h-16 border border-purple-500/20">
                      <div className="flex flex-col items-center justify-center h-full">
                        <span>1538</span>
                        <span>platypus</span>
                      </div>
                    </td>
                    <td className="p-2 h-16 border border-purple-500/20">
                      <div className="flex flex-col items-center justify-center h-full">
                        <span>523</span>
                        <span>perry</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-blue-500/25 min-h-50">
                    <td className="p-2 h-16 border border-purple-500/20">
                      <div className="flex flex-col items-center justify-center h-full">
                        <span>1160</span>
                        <span>William Chen</span>
                      </div>
                    </td>
                    <td className="p-2 h-16 border border-purple-500/20">
                      <div className="flex flex-col items-center justify-center h-full">
                        <span>1538</span>
                        <span>platypus</span>
                      </div>
                    </td>
                    <td className="p-2 h-16 border border-purple-500/20">
                      <div className="flex flex-col items-center justify-center h-full">
                        <span>523</span>
                        <span>perry</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="h-5" />
    </main>
  );
}