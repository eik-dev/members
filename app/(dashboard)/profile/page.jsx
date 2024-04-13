'use client'
import Image from "next/image"
import { PrinterIcon, EllipsisVerticalIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import Overlay from "@/app/ui/overlay"
import MemberDetails from "@/app/ui/MemberDetails"
import Attachments from "./Attachments"
import Training from "./Training"
import Qualifications from "./Qualifications"
import Experience from "./Experience"
import Introductory from "./Introductory"
import { useState, useEffect } from "react"

function SectionHead({section}){
    let [showEdit, setShowEdit] = useState(false);
    let [showOverlay, setShowOverlay] = useState(false);
    let [overlay, setOverlay] = useState('');

    useEffect(()=>{
        console.clear();
        console.log('clicked')
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
            {overlay=='Basic Information'?<MemberDetails control={setOverlay} />:null}
            {overlay=='Introductory Statement'?<Introductory control={setOverlay} />:null}
            {overlay=='Training'?<Training control={setOverlay} />:null}
            {overlay=='Professional Qualification'?<Qualifications control={setOverlay} />:null}
            {overlay=='Work Experience'?<Experience control={setOverlay} />:null}
            {overlay=='Attachments'?<Attachments control={setOverlay} />:null}
        </Overlay>
        </>
    )
}
export default function Page({id}){
    
    return(
        <>
        <header className="flex flex-col gap-y-2 md:flex-row md:items-center md:justify-between ml-2 my-4">
            <h1 className="my-2 ml-2 md:ml-0 text-primary font-bold text-4xl">Profile</h1>
            <div className="flex items-center h-fit bg-secondary w-fit text-white font-semibold px-4 py-2 rounded-md justify-between text-sm">
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
                        src="/profile.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    />
                </div>
                <div className="grid gap-x-5 gap-y-3 md:grid-cols-2 text-sm w-full">
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Name of Expert:</span>
                        <span className="w-1/2">Sifa Kilomena</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Category:</span>
                        <span className="w-1/2">Associate</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Identification Number:</span>
                        <span className="w-1/2">21435690</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Postal Address:</span>
                        <span className="w-1/2">Sifa Kilomena</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap md:whitespace-pre-wrap w-1/2">NEMA Registration Number:</span>
                        <span className="w-1/2">NEMA/IAE/NA/12345</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Town:</span>
                        <span className="w-1/2">Nairobi</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Certificate Number:</span>
                        <span className="w-1/2">EIK/2/1234</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">County:</span>
                        <span className="w-1/2">Nairobi</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Firm of Experts:</span>
                        <span className="w-1/2">*</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Phone Number:</span>
                        <span className="w-1/2">+254712329875</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Firm of Experts PIN:</span>
                        <span className="w-1/2">*</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Email:</span>
                        <span className="w-1/2">sifa@email.com</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Nationality:</span>
                        <span className="w-1/2">Kenyan</span>
                    </div>
                    <div className="flex gap-4 justify-between">
                        <span className="font-bold whitespace-nowrap w-1/2">Alternative Email Address:</span>
                        <span className="w-1/2">x</span>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <SectionHead section={'Introductory Statement'}/>
            <p className="font-light text-md">
            As a dedicated member of the Environmental Institute of Kenya, I am committed to fostering sustainability and environmental stewardship within our community and beyond. With a passion for conservation and a drive to effect positive change, I actively engage in initiatives aimed at preserving our natural resources and promoting eco-friendly practices. Through collaboration, education, and advocacy, I strive to inspire others to join me in safeguarding our planet for future generations.
            </p>
        </section>
        <section>
            <SectionHead section={'Training'}/>
            <div className="grid grid-cols-2 md:w-1/3 gap-y-1">
                <span className="font-bold w-fit">Institution:</span>
                <span className="md:whitespace-nowrap">Nairobi University</span>
                <span className="font-bold w-fit">Start & Finish Date:</span>
                <span className="md:whitespace-nowrap">8th March, 2021 - 17th March, 2023</span>
                <span className="font-bold w-fit">Certification</span>
                <span className="md:whitespace-nowrap">Bachelors Degree in Environmental Studies and Community Development (Second Class Honours)</span>
            </div>
        </section>
        <section>
            <SectionHead section={'Professional Qualification'}/>
            <div className="grid grid-cols-2 md:w-1/3 gap-y-1">
                <span className="font-bold w-fit">Institution:</span>
                <span className="md:whitespace-nowrap">Nairobi University</span>
                <span className="font-bold w-fit">Start & Finish Date:</span>
                <span className="md:whitespace-nowrap">8th March, 2021 - 17th March, 2023</span>
                <span className="font-bold w-fit">Location</span>
                <span className="md:whitespace-nowrap">Nairobi, Kenya</span>
                <span className="font-bold w-fit">Specialization</span>
                <span className="md:whitespace-nowrap">Bachelors Degree in Environmental Studies and Community Development (Second Class Honours)</span>
            </div>
        </section>
        <section>
            <SectionHead section={'Work Experience'}/>
            <div className="grid grid-cols-2 md:w-1/3 gap-y-1">
                <span className="font-bold w-fit">Company:</span>
                <span className="md:whitespace-nowrap">Nairobi County Government</span>
                <span className="font-bold w-fit">Start & Finish Date:</span>
                <span className="md:whitespace-nowrap">8th March, 2021 - 17th March, 2023</span>
                <span className="font-bold w-fit">Job title</span>
                <span className="md:whitespace-nowrap">Intern</span>
                <span className="font-bold w-fit">Company Telephone</span>
                <span className="md:whitespace-nowrap">+254 712345678</span>
                <span className="font-bold w-fit">Company Email</span>
                <span className="md:whitespace-nowrap">ncg@go.ke</span>
            </div>
        </section>
        <section>
            <SectionHead section={'Attachments'}/>
            <button className="text-secondary underline mb-2 block">EIK Receipt.jpg</button>
            <button className="text-secondary underline mb-2 block">NEMA Registration Certificate.pdf</button>
            <button className="text-secondary underline mb-2 block">EIK Registration Certificate.pdf</button>
            <button className="text-secondary underline mb-2 block">Degree Certificate.png</button>
            <button className="text-secondary underline mb-2 block">EIA Training Certificate.pdf</button>
        </section>
        </div>
        </>
    )
}