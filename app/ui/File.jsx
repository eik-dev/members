'use client'
import { useState, useEffect } from "react"
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline'

export default function File({ destination }) {
    const [files, setFiles] = useState([]);
    const [dragging, setDragging] = useState(false);

    let submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        files.forEach((file, index) => {
            console.log(`${index} :: ${file.name}`);
            formData.append(`file`, file);
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
                method: "POST",
                headers:{
                    'Content-Type': 'multipart/form-data',
                    // 'X-CSRF-Token': 'YOUR_CSRF_TOKEN_HERE',
                },
                body: formData
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                });
        });
    }

    const handleFileChange = (event) => {
        setFiles([...files, ...event.target.files]);
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        setFiles([...files, ...event.dataTransfer.files]);
    };

    const removeFile = (index) => {
        setFiles(files.filter((file, i) => i !== index));
    };

    return (
        <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`p-2 flex flex-col items-center justify-center ${dragging ? "border-2" : "border-2"} rounded-xl`}
        >
            <img src="/icons/file.svg" className="w-24 h-24 md:w-56 md:h-56" alt="" />
            <input 
                type="file"
                id='profile' 
                multiple onChange={handleFileChange} 
                placeholder='Upload profile photo'
                className="
                    text-sm text-stone-500
                    file:mr-5 file:py-1 file:px-3 file:border-[1px]
                    file:text-xs file:font-medium
                    file:bg-stone-50 file:text-stone-700
                    hover:file:cursor-pointer hover:file:bg-blue-50
                    hover:file:text-blue-700
                    file:hidden
                " 
            />
            <label htmlFor="profile" className='py-4'>
                <span className='text-secondary'>Browse Files</span> or Drag into area
            </label>
            {files.map((file, index) => (
                <div className="text-sm md:text-base grid grid-cols-3 gap-x-2 auto-rows-max mb-2" key={index}>
                    <span className="whitespace-pre-wrap col-span-2 text-left">{file.name}</span>
                    <button className=" text-warning w-fit" onClick={() => removeFile(index)}>Remove</button>
                </div>
            ))}
        </div>
    );
}