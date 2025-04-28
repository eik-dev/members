'use client'

import { useState, useEffect } from "react"
import { postFile } from "@/app/lib/data";
import File from "@/app/ui/File";
import Image from "next/image"

export default function Page(){
    let [media, setMedia] = useState([]);
    let [files, setFiles] = useState([]);

    useEffect(()=>{
        setMedia(files);
    },[files])

    const handleSubmit = (e)=>{
        e.preventDefault();
        postFile(
            (response)=>{
                if(response.success){
                    router.push('/trainings/create/media');
                }
            },
            files,
            '/training/media'
        )
    }
    return(
        <div>
            <h5 className="text-lg font-semibold mb-4">Media <span className="text-sm text-gray-500 ml-1">(Images, videos, or 3D models)</span></h5>
            <h5 className="text-lg font-semibold my-4">Carousel Media</h5>
            <section>
                <div className="flex gap-10 flex-wrap">
                    {
                        media.map((file, index) => {
                            return (
                                <div key={index} className="relative w-1/4">
                                    <img 
                                        src={URL.createObjectURL(file)} 
                                        alt="" 
                                        className="object-cover w-full h-40 rounded-lg"
                                    />
                                    <button className="absolute top-0 right-0 bg-white p-1 w-6 h-6 rounded-full text-red-500" onClick={() => setMedia(media.filter((_, i) => i !== index))}>X</button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-1/2 mx-auto mt-7">
                    <File files={files} setFiles={setFiles} type={'image'}/>
                </div>
            </section>
        </div>
    )
}