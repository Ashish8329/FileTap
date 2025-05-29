import { useState, useEffect, useRef } from "react";
import React from "react";

const Dashboard = () => {
    const [count, setCount] = useState(0);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState("select file");

    function toggleDropdown() {
        dropdownRef.current?.classList.toggle("hidden");
    }

    function handleFileSelect(file) {
        setSelectedFile(file);
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

        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 p-6 w-full border rounded-md">

                {/* Dropdown Button */}
                <div className="relative w-1/2  ">
                    <button
                        ref={buttonRef}
                        onClick={toggleDropdown}
                        className="bg-blue-500 text-white w-full h-10 rounded-md px-4 flex items-center justify-between"
                    >
                        {selectedFile}
                        <span className="ml-2">▼</span>
                    </button>

                    <div
                        ref={dropdownRef}
                        className="hidden absolute mt-2 w-full bg-white border rounded-md shadow-lg z-10"
                    >
                        {["file-1", "file-2", "file-3"].map(file => (
                            <p
                                key={file}
                                className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleFileSelect(file)}
                            >
                                {file}
                            </p>
                        ))}
                    </div>
                </div>

                {/* View Button */}
                <div className="relative w-1/2  ">
                    <div className="border h-10 w-full rounded-md flex justify-center items-center bg-emerald-300">
                        <button onClick={() => setCount(count + 1)}>
                            {count} View
                        </button>
                    </div>
                </div>

                {/* Download Button */}
                <div className="relative w-1/2 ">
                    <div className="border h-10 w-full rounded-md flex justify-center items-center bg-gray-500 text-white">
                        <button>
                            Download
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
