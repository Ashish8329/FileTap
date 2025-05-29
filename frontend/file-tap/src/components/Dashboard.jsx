import { useState, useEffect, useRef } from "react"
import React from 'react'

const Dashboard = () => {
    const [count, setCount] = useState(0)
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState("select file");

    function toggleDropdown() {
        if (dropdownRef.current) {
            dropdownRef.current.classList.toggle("hidden");
        }
    }

    function handleFileSelect(file) {
        setSelectedFile(file)
        dropdownRef.current?.classList.add("hidden");
    }

    useEffect(() => {

        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                dropdownRef.current.classList.add("hidden");
            }
        }

        window.addEventListener("click", handleClickOutside)
        return () => {
            window.addEventListener("click", handleClickOutside)
        };
    }, []);


    window.addEventListener("click", function (e) {
        const button = document.getElementById("dropdown-button");
        const menu = document.getElementById("dropdown-menu");
        if (!button.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.add("hidden");
        }
    });


    return (
        <div className='h-lvh  place-content-center flex justify-around m-5 border'>

            <div className='w-150  place-content-center'>
                <div className='border h-10 rounded-md'>

                    <button
                        ref={buttonRef}
                        onClick={toggleDropdown}
                        className="bg-blue-500 text-white w-150 h-10 rounded-md px-4 flex items-center justify-between gap-2"
                    >
                        {selectedFile}
                        <span className="ml-2">▼</span>
                    </button>
                    <div
                        ref={dropdownRef}
                        className="hidden absolute mt-2 w-150 bg-white border rounded-md shadow-lg z-10"
                    >
                        <p
                            className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleFileSelect("file-1")}
                        >
                            file-1
                        </p>
                        <p
                            className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleFileSelect("file-2")}
                        >
                            file-2
                        </p>
                        <p
                            className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleFileSelect("file-3")}
                        >
                            file-3
                        </p>
                    </div>
                </div>
            </div>

            <div className='w-50  place-content-center'>
                <div className="border h-10 w-40 rounded-md flex justify-center bg-emerald-300">
                    <button onClick={() => { setCount(count + 1) }}>
                        {count}
                        View
                    </button>
                </div>
            </div>

            <div className='w-50  place-content-center'>
                <div className="border h-10 w-40 rounded-md flex justify-center bg-gray-500">
                    <button>
                        Download
                    </button>
                </div>
            </div>


        </div>
    )
}

export default Dashboard
