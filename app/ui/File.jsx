'use client'
import { useState, useEffect } from "react"

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
                // headers:{
                //     'Content-Type': 'multipart/form-data',
                //     'X-CSRF-Token': 'YOUR_CSRF_TOKEN_HERE', // Replace with your CSRF token
                // },
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
            style={{
                border: dragging ? "2px dashed blue" : "2px solid black",
                padding: "1rem",
            }}
        >
            <input type="file" multiple onChange={handleFileChange} />
            {files.map((file, index) => (
                <div key={index}>
                    <span>{file.name}</span>
                    <button onClick={() => removeFile(index)}>Remove</button>
                </div>
            ))}
            <button onClick={e=>submit(e)}>Upload</button>
        </div>
    );
}