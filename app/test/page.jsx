'use client'
import { useState, useEffect } from 'react';
import File from '@/app/ui/File';
import { load } from '../lib/storage';
import { popupE } from '../lib/trigger';

export default function Page(){
    let [data, setData] = useState([])
    let [files, setFiles] = useState([])
    let [requirements, setRequirements] = useState([]);

    let send = e=>{
        e.preventDefault();
        let token = load('token');
        console.log(token);

        const formData = new FormData();
        requirements.forEach((file, index) => {
            console.log(`${index} :: ${file.name}`);
            formData.append(`file`, file);
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/requirements`, {
                method: "POST",
                headers:{
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.error==null)
                    popupE('ok', 'Success', 'File sent')
                });
            });
    }

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`).then(res=>res.json()).then(data=>{
            setData(data)
        })
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/files`).then(res=>res.json()).then(data=>{
            setFiles(data)
        })
    }, [])
    
    return(
        <div>
            <h1>File upload</h1>
            <div className='mx-2 md:w-1/3 md:mx-auto my-5'>
                <File files={requirements} setFiles={setRequirements} type={'all'}/>
            </div>
            <button onClick={e=>send(e)}>Send</button>
            <h1>File download</h1>
            {
                files.map((file, index) => (
                    <div key={index}>
                        <a href={`${file}`} target='blank' download>{file}</a>
                    </div>
                ))
            }

            <h2 className='my-6'>Test DB</h2>
            {
                data.map((item, index) => (
                    <div key={index}>
                        <h3>{item.name}</h3>
                        <p>{item.author}</p>
                    </div>
                ))
            }
        </div>
    )
}