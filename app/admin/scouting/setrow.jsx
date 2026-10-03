"use client";
import { useState, useRef } from 'react';

export default function SetRow(params) {
    const day = params.day;
    const match = params.match;
    const index = params.index;
    const editMatch = params.editMatch;
    const userkey = params.userkey;
    const [selected, setSelected] = useState(false);

    // refs
    const r1Input = useRef(null);
    const r2Input = useRef(null);
    const r3Input = useRef(null);
    const b1Input = useRef(null);
    const b2Input = useRef(null);
    const b3Input = useRef(null);

    function submitEdit() {
        const r1 = r1Input.current?.innerText;
        const r2 = r2Input.current?.innerText;
        const r3 = r3Input.current?.innerText;
        const b1 = b1Input.current?.innerText;
        const b2 = b2Input.current?.innerText;
        const b3 = b3Input.current?.innerText;
        match.r1=r1;
        match.r2=r2;
        match.r3=r3;
        match.b1=b1;
        match.b2=b2;
        match.b3=b3;
        editMatch(day, index, match);
        setSelected(false);
    }
    
    return (
          <div
            className="grid grid-cols-8 items-center text-center bg-gray-200 rounded p-2 mx-2"
          >
            {
                !selected && (
                    <>
                    <div className="col-span-1">{index + 1}</div>
                    <div className="col-span-1">{userkey.r1}</div>
                    <div className="col-span-1">{userkey.r2}</div>
                    <div className="col-span-1">{userkey.r3}</div>
                    <div className="col-span-1">{userkey.b1}</div>
                    <div className="col-span-1">{userkey.b2}</div>
                    <div className="col-span-1">{userkey.b3}</div>
                    </>
                )
            }
            {
                selected && (
                    <>
                        <div className="col-span-1">{index + 1}</div>
                        <div contentEditable suppressContentEditableWarning ref={r1Input} className="col-span-1 text-center border-2 border-gray-500 rounded mx-3">{match.r1}</div>
                        <div contentEditable suppressContentEditableWarning ref={r2Input} className="col-span-1 text-center border-2 border-gray-500 rounded mx-3">{match.r2}</div>
                        <div contentEditable suppressContentEditableWarning ref={r3Input} className="col-span-1 text-center border-2 border-gray-500 rounded mx-3">{match.r3}</div>
                        <div contentEditable suppressContentEditableWarning ref={b1Input} className="col-span-1 text-center border-2 border-gray-500 rounded mx-3">{match.b1}</div>
                        <div contentEditable suppressContentEditableWarning ref={b2Input} className="col-span-1 text-center border-2 border-gray-500 rounded mx-3">{match.b2}</div>
                        <div contentEditable suppressContentEditableWarning ref={b3Input} className="col-span-1 text-center border-2 border-gray-500 rounded mx-3">{match.b3}</div>
                    </>
                )
            }
            <div className="col-span-1 flex flex-col py-2 space-y-2 justify-center items-center">
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
              </div>
            </div>
          </div>
    )
}