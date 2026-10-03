import { auth } from '@/auth';
import { getSponsors, removeSponsor, deleteSponsorFR, createSponsorFR, getRealSponsors, addSponsor } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

export default async function Page() {
  const sponsors = await getSponsors();
  const realsponsors = await getRealSponsors();

  async function createSponsor(formData: FormData) {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    const sponsor = formData.get('sponsor') as string;
    const amount = Math.round(parseFloat(formData.get('amount') as string));

    if (!sponsor || isNaN(amount)) return;

    await addSponsor(sponsor, amount);

    revalidatePath('/admin/sponsors');
    revalidatePath('/');
    revalidatePath('/sponsors');
  }

  async function deleteSponsor(formData: FormData) {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    const sponsor = formData.get('sponsor') as string;

    if (!sponsor) return;

    await removeSponsor(sponsor);

    revalidatePath('/admin/sponsors');
    revalidatePath('/');
    revalidatePath('/sponsors');
  }

  async function createRealSponsor(formData: FormData) {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    const name = formData.get("name") as string;
    const file = formData.get('image') as File;
      
    // 1. Convert File to ArrayBuffer, then to Node.js Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (!name || !buffer) return;

    await createSponsorFR(name, buffer);

    revalidatePath('/admin/sponsors');
    revalidatePath('/');
    revalidatePath('/sponsors');
  }

  async function deleteRealSponsor(formData: FormData) {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    const name = formData.get("name") as string;

    if (!name) return;

    await deleteSponsorFR(name);

    revalidatePath('/admin/sponsors');
    revalidatePath('/');
    revalidatePath('/sponsors');
  }

  return (
    <main className="text-center md:text-left min-h-screen bg-white">
      <div className="text-black w-full flex flex-col">
        
        <div className="py-19 px-10 md:px-45 w-full">
            <div className="flex flex-row justify-center flex-wrap">
                <div className="flex flex-col items-center space-y-5">
                    <span className="text-6xl font-light flex flex-col space-y-1">
                        Sponsors
                    </span>
                </div>
            </div>
        </div>

        <hr className="border-2 border-gray-400 mx-10 rounded-xl" />

        {/* Form */}
        <div className="py-10 px-6 md:px-20 flex justify-center">
          <div className="bg-gray-300 p-6 rounded-lg">
            <form
              action={createSponsor}
              className="flex flex-col md:flex-row gap-4 items-center"
            >
              <input
                placeholder="____ Family"
                name="sponsor"
                className="border-2 border-white p-2 rounded-lg"
                required
                autoFocus
              />
              <input
                placeholder="Amount (for ordering)"
                name="amount"
                type="number"
                className="border-2 border-white p-2 rounded-lg"
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

        {/* Sponsors List */}
        <div className="pb-10 px-6 md:px-20 flex justify-center">
          <div className="bg-gray-300 p-6 rounded-lg w-full max-w-lg space-y-3">
            {sponsors.length === 0 ? (
              <p className="text-center">No sponsors yet</p>
            ) : (
              sponsors.map((sponsor: any) => (
                <div
                  key={sponsor.id}
                  className="flex justify-between items-center bg-white p-2 rounded"
                >
                  <span>{sponsor.name}</span>
                  {sponsor.amount !== null && (
                    <span>${sponsor.amount}</span>
                  )}
                  <form action={deleteSponsor} className="h-8 w-8">
                    <input type="hidden" name="sponsor" value={sponsor.id} />
                    <button type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="h-8 w-8 p-2 hover:cursor-pointer hover:fill-white transition hover:bg-red-500/50 duration-300 ease-out rounded-xl"
                          >
                            <path d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-32-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z"/>
                          </svg>
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>
        </div>

        <hr className="border-2 border-gray-400 mx-10 rounded-xl" />

        {/* Form */}
        <div className="py-10 px-6 md:px-20 flex justify-center">
          <div className="bg-gray-300 p-6 rounded-lg">
            <form
              action={createRealSponsor}
              className="flex flex-col md:flex-row gap-4 items-center"
            >
              <input
                name="image"
                className="border-2 border-white p-2 rounded-lg hover:cursor-pointer bg-white"
                type="file"
                required
                accept="image/jpeg, image/png, image/webp"
              />
              <input
                placeholder="Sponsor Name"
                name="name"
                className="border-2 border-white p-2 rounded-lg"
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

        {/* Real Sponsors List */}
        <div className="pb-10 px-6 md:px-20 flex justify-center">
          <div className="bg-gray-300 p-6 rounded-lg w-full max-w-md space-y-3">
            {realsponsors.length === 0 ? (
              <p className="text-center">No sponsors yet</p>
            ) : (
              realsponsors.map((sponsor: any) => {
                const base64Image = sponsor.image?.toString('base64');
                const dataUrl = `data:image/png;base64,${base64Image}`;
                return (
                <div
                  key={sponsor.name}
                  className="flex flex-col justify-between items-center bg-white p-2 rounded"
                >
                  <Image src={dataUrl} alt={sponsor.name} width={200} height={200} />
                  <div className="flex flex-row justify-between w-full items-center">
                  <span>{sponsor.name}</span>
                  <form action={deleteRealSponsor} className="h-8 w-8">
                    <input type="hidden" name="name" value={sponsor.name} />
                    <button type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="h-8 w-8 p-2 hover:cursor-pointer hover:fill-white transition hover:bg-red-500/50 duration-300 ease-out rounded-xl"
                          >
                            <path d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-32-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z"/>
                          </svg>
                    </button>
                  </form>
                  </div>
                </div>
              )
            })
            )}
          </div>
        </div>

      </div>
    </main>
  );
}