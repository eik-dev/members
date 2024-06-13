'use client'
import { useState, useEffect } from 'react';
import { postFile } from '../lib/data';
import File from '../ui/File';
import Echo from 'laravel-echo';
 
import Pusher from 'pusher-js';
// window.Pusher = Pusher;
 
// window.Echo = new Echo({
//     broadcaster: 'reverb',
//     key: process.env.REVERB_APP_KEY,
//     wsHost: process.env.REVERB_HOST,
//     wsPort: process.env.REVERB_HOST,
//     wssPort: process.env.REVERB_PORT,
//     forceTLS: (process.env.REVERB_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });

export default function Page(){
    let [data, setData] = useState([])
    let [files, setFiles] = useState([])

    let upload = (e) => {
        e.preventDefault()
        files.forEach(file => {
            postFile((_)=>{},file,'requirement_test','/files/requirements')
        });
    }

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`).then(res=>res.json()).then(data=>{
            setData(data)
        })
    }, [])
    
    return(
        <div>
            <h2>Test file upload</h2>
            <div className='w-1/3 my-6 mx-auto'>
            <File files={files} setFiles={setFiles} type={'all'}/>
            </div>
            <button onClick={e=>upload(e)} className='px-4 py-2 ml-2 bg-secondary text-white'>Upload</button>
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