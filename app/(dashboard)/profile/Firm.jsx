'use client'
import Image from "next/image"
import { PrinterIcon, EllipsisVerticalIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import Overlay from "@/app/ui/overlay"
import FirmDetails from "@/app/ui/FirmDetails"
import { useState, useEffect } from "react"

function SectionHead({section}){
    let [showEdit, setShowEdit] = useState(false);
    let [showOverlay, setShowOverlay] = useState(false);
    let [overlay, setOverlay] = useState('');

    useEffect(()=>{
        if (overlay=='') setShowOverlay(false)
        else setShowOverlay(true)
    },[overlay])
    return(
        <>
        <div onClick={e=>{showEdit?setShowEdit(false):null}} className="flex justify-between border-b-2 py-4 my-4 mx-2 relative">
            <h3 className="font-bold text-lg">{section}</h3>
            <button onClick={e=>setShowEdit(!showEdit)}>
                <EllipsisVerticalIcon className="h-6 w-6" />
            </button>
            {
                showEdit &&
                <div onClick={e=>setShowEdit(false)} className={`flex absolute z-50 right-4 top-10 md:right-0 bg-white flex-col gap-y-4 ${true?'block':'hidden'}`}>
                    <div className="flex gap-x-2" onClick={e=>setOverlay(section)}>
                        <PencilSquareIcon className="w-6 h-6"/>
                        Edit details
                    </div>
                </div>
            }
        </div>
        <Overlay className={`${showOverlay?'block':'hidden'}`} >
            {overlay=='Basic Information'?<FirmDetails control={setOverlay} />:null}
        </Overlay>
        </>
    )
}
export default function Firm({id}){
    
    return(
        <>
        <header className="flex flex-col gap-y-2 md:flex-row md:items-center md:justify-between ml-2 my-4">
            <h1 className="my-2 ml-2 md:ml-0 text-primary font-bold text-4xl">Profile</h1>
            <div className="flex items-center h-fit bg-secondary w-fit text-white font-semibold px-4 py-2 rounded-md justify-between text-sm" onClick={e=>{window.location.href = '/download/certificate?id='+'12345'}}>
                <PrinterIcon className="h-6 w-6 mr-2" />
                Print Certificate Request
            </div>
        </header>
        <div className="mx-2">
        <section>
            <SectionHead section={'Basic Information'}/>
            <div className="flex flex-col gap-x-3 md:flex-row w-full">
                <div className="w-32 md:w-64 h-fit relative mr-4 mb-4">
                    <Image
                        src="/profile_firm.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    />
                </div>
                <div className="grid gap-x-5 gap-y-2 text-sm w-full lg:w-1/2 2xl:w-1/3">
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Firm of Expert</span>
                        <span className="w-1/2">Sustainable Earth Limited</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold md:whitespace-pre-wrap w-1/2 whitespace-pre-wrap">NEMA Registration Number:</span>
                        <span className="w-1/2">NEMA/IAE/NA/12345</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Certificate Number:</span>
                        <span className="w-1/2">EIK/2/1234</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Firm PIN Number:</span>
                        <span className="w-1/2">A012345678</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Postal Address:</span>
                        <span className="w-1/2">987654 - 00100</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Town:</span>
                        <span className="w-1/2">Nairobi</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">County:</span>
                        <span className="w-1/2">Nairobi</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Phone Number:</span>
                        <span className="w-1/2">+254712329875</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Email Address:</span>
                        <span className="w-1/2">sel@email.com</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Alternative Email Address:</span>
                        <span className="w-1/2">x</span>
                    </div>
                </div>
            </div>
        </section>
        </div>
        </>
    )
}