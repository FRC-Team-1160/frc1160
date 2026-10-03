"use client";
import { useState, useRef } from 'react';

export default function Row(params) {
    const user = params.user;
    const deleteUser = params.deleteUser;
    const editUser = params.editUser;
    const [selected, setSelected] = useState(false);

    // refs
    const fnameInput = useRef(null);
    const lnameInput = useRef(null);
    const classofInput = useRef(null);
    const emailInput = useRef(null);

    
    function submitEdit() {
        const fname = fnameInput.current?.innerText;
        const lname = lnameInput.current?.innerText;
        const classof = classofInput.current?.innerText;
        const email = emailInput.current?.innerText;
        user.first_name=fname;
        user.last_name=lname;
        user.class_of=classof;
        user.email=email;
        editUser(user.discord_id,user.first_name,user.last_name,user.class_of,user.email);
        setSelected(false);
    }
    
    return (
          <div
            className="grid grid-cols-12 items-center text-center bg-gray-200 rounded p-2 mx-2"
          >
            {
                !selected && (
                    <>
                    <div className="col-span-2">{user.discord_id}</div>
                    <div className="col-span-2">{user.first_name}</div>
                    <div className="col-span-2">{user.last_name}</div>
                    <div className="col-span-2">{user.class_of}</div>
                    <div className="col-span-2">{user.email}</div>
                    </>
                )
            }
            {
                selected && (
                    <>
                        <div className="col-span-2">{user.discord_id}</div>
                        <div contentEditable suppressContentEditableWarning ref={fnameInput} className="col-span-2 text-center border-2 border-gray-500 rounded mx-3">{user.first_name}</div>
                        <div contentEditable suppressContentEditableWarning ref={lnameInput} className="col-span-2 text-center border-2 border-gray-500 rounded mx-3">{user.last_name}</div>
                        <div contentEditable suppressContentEditableWarning ref={classofInput} className="col-span-2 text-center border-2 border-gray-500 rounded mx-3">{user.class_of}</div>
                        <div contentEditable suppressContentEditableWarning ref={emailInput} className="col-span-2 text-center border-2 border-gray-500 rounded mx-3">{user.email}</div>
                    </>
                )
            }
            <div className="col-span-2 flex flex-col py-2 space-y-2 justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                { !selected && (
                  <button onClick={() => setSelected(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-8 w-8 p-2 hover:cursor-pointer hover:fill-white transition hover:bg-blue-500/67 duration-300 ease-out rounded-xl"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L368 46.1 465.9 144 490.3 119.6c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L432 177.9 334.1 80 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                  </button>)
                }
                { selected && (
                  <button onClick={() => submitEdit()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 hover:cursor-pointer hover:fill-white transition hover:bg-blue-500/67 duration-300 ease-out rounded-xl" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm32 96c0-17.7 14.3-32 32-32l160 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-160 0c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                  </button>
                )}
                <form action={deleteUser} className="flex justify-center items-center">
                  <input type="hidden" name="id" value={user.discord_id} />

      
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
          </div>
    )
}