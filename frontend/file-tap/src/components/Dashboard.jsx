import React, { useState, useEffect, useRef } from "react";
import { getFileNames } from "../apis/getFiles";
import { processTextFile } from "../apis/viewTextFile";

const Dashboard = () => {
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const [fileList, setFileList] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const toggleDropdown = () => {
        dropdownRef.current?.classList.toggle("hidden");
    };

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        dropdownRef.current?.classList.add("hidden");
    };

    const extractFileKey = (fileUrl) => {
        const nameWithExt = fileUrl.split("/").pop(); // text-1.txt
        return nameWithExt.split(".")[0];             // text-1
    };

    const handleViewClick = async () => {
        if (!selectedFile?.file) return;

        const fileKey = extractFileKey(selectedFile.file);

        try {
            const res = await processTextFile(fileKey); // this should be an API call
            console.log("View response:", res);
            // Handle response logic: open in notepad if successful
        } catch (error) {
            console.error("Error viewing file:", error);
        }
    };

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await getFileNames();  // should return { data: [...] }
                setFileList(res.data);
            } catch (error) {
                console.error("Failed to fetch files", error);
            }
        };

        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                dropdownRef.current.classList.add("hidden");
            }
        };

        fetchFiles();
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 p-6 w-full border rounded-md">

                {/* Dropdown Button */}
                <div className="relative w-1/2">
                    <button
                        ref={buttonRef}
                        onClick={toggleDropdown}
                        className="bg-blue-500 text-white w-full h-10 rounded-md px-4 flex items-center justify-between"
                    >
                        {selectedFile ? selectedFile.name : "Select File"}
                        <span className="ml-2">▼</span>
                    </button>

                    <div
                        ref={dropdownRef}
                        className="hidden absolute mt-2 w-full bg-white border rounded-md shadow-lg z-10 max-h-60 overflow-auto"
                    >
                        {Array.isArray(fileList) && fileList.map(file => (
                            <p
                                key={file.id}
                                className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleFileSelect(file)}
                            >
                                {file.name}
                            </p>
                        ))}
                    </div>
                </div>

                {/* View Button */}
                <div className="relative w-1/2">
                    <div className={`border h-10 w-full rounded-md flex justify-center items-center ${selectedFile ? 'bg-emerald-300' : 'bg-gray-300'}`}>
                        <button
                            onClick={handleViewClick}
                            disabled={!selectedFile}
                            className="w-full h-full"
                        >
                            View
                        </button>
                    </div>
                </div>

                {/* Download Button */}
                <div className="relative w-1/2">
                    <div className="border h-10 w-full rounded-md flex justify-center items-center bg-gray-500 text-white">
                        <a
                            href={selectedFile?.file}
                            download
                            className={`w-full h-full flex justify-center items-center ${selectedFile ? '' : 'pointer-events-none opacity-50'}`}
                        >
                            Download
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
