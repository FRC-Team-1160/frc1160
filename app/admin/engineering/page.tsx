import { auth } from '@/auth';
import { getEngineering, createEngineering, editEngineering, uploadImageEngineering, removeEngineering, sql } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';
import Row from './row';

export default async function Page() {
  const cabinet = await getEngineering();
    
  async function createCabinet(formData: FormData) {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const grade = formData.get("grade") as string;
    const years = formData.get("years") as string;

    const file = formData.get('image') as File;
      
    // 1. Convert File to ArrayBuffer, then to Node.js Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (!name || !position || !grade || !years || !buffer) return;

    await createEngineering(name, position, grade, years, buffer);

    revalidatePath('/admin/engineering');
    revalidatePath('/cabinet/engineering');
  }

  async function editCabinet(sort: string,name: string,pos: string,grade: string,years: string) {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    if (!sort || !name || !pos || !grade || !years) return;

    await editEngineering(sort,name,pos,grade,years);

    revalidatePath('/admin/engineering');
    revalidatePath('/cabinet/engineering');
  }

  async function uploadEngineering(formData: FormData) {
    "use server";

    const file = formData.get('image') as File;
    const sort = formData.get('sort') as string;
      
    // 1. Convert File to ArrayBuffer, then to Node.js Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await uploadImageEngineering(sort,buffer);

    revalidatePath('/admin/engineering');
    revalidatePath('/cabinet/engineering');
  }
    
  async function deleteCabinet(formData: FormData) {
    'use server';

    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const grade = formData.get("grade") as string;
    const years = formData.get("years") as string;

    if (!name || !position || !grade || !years) return;

    await removeEngineering(name,position,grade,years);

    revalidatePath('/admin/engineering');
    revalidatePath('/cabinet/engineering');
  }

  return (
    <main className="text-center md:text-left min-h-screen bg-white w-full">
      <div className="text-black w-full flex flex-col">
        
        <div className="py-19 px-10 md:px-45 w-full">
            <div className="flex flex-row justify-center flex-wrap">
                <div className="flex flex-col items-center space-y-5">
                    <span className="text-6xl font-light flex flex-col space-y-1">
                        Engineering
                    </span>
                </div>
            </div>
        </div>

        <hr className="border-2 border-gray-400 mx-10 rounded-xl" />

        {/* Form */}
        <div className="py-10 px-6 md:px-20 flex justify-center">
          <div className="bg-gray-300 p-6 rounded-lg">
            <form
              action={createCabinet}
              className="flex flex-col lg:flex-row flex-wrap gap-4 justify-center items-center"
            >
              <input type="file" name="image" accept=".jpg, .jpeg, .png" className="border-2 border-white p-2 rounded-lg hover:cursor-pointer bg-gray-200 hover:bg-gray-100 flex justify-center items-center" required/>
              <input
                placeholder="Name"
                name="name"
                className="border-2 border-white p-2 rounded-lg"
                required
                autoFocus
              />
              <input
                placeholder="Position"
                name="position"
                className="border-2 border-white p-2 rounded-lg"
                required
              />
              <input
                placeholder="Grade"
                name="grade"
                className="border-2 border-white p-2 rounded-lg"
                required
              />
              <input
                placeholder="Years on Team"
                name="years"
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

        {/* Cab List */}
        <div className="py-10 mx-2 md:mx-20 flex justify-center items-center bg-gray-300 rounded-lg">
          {cabinet.length === 0 ? (
            <p className="text-center">No Engineering Cab. Members yet</p>
          ) : (
            <div className="w-full">
              {/* Header Row */}
              <div className="grid grid-cols-12 font-semibold text-center border-b pb-2 px-4 mb-2">
                <div className="col-span-3">Name</div>
                <div className="col-span-2">Position</div>
                <div className="col-span-2">Grade</div>
                <div className="col-span-2">Years</div>
                <div className="col-span-3">Action</div>
              </div>
        
              {/* Data Rows */}
              <div className="flex flex-col gap-2">
                {cabinet.map((cab: any) => {       
                delete cab.image;
                return (
                  <Row key={cab.sort} cab={cab} editCabinet={editCabinet} uploadImage={uploadEngineering} deleteCabinet={deleteCabinet}/>
                )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}