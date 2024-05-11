'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { PrinterIcon, EllipsisVerticalIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import Overlay from "@/app/ui/overlay"
import MemberDetails from "@/app/ui/MemberDetails"
import Attachments from "./Attachments"
import Training from "./Training"
import Qualifications from "./Qualifications"
import Experience from "./Experience"
import Introductory from "./Introductory"
import { useState, useEffect } from "react"
import { getData } from "@/app/lib/data"
import { popupE } from "@/app/lib/trigger"

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
export default function Individual({id}){
    let [files, setFiles] = useState([])
    let [profilePhoto, setProfilePhoto] = useState([])
    let [profile, setProfile] = useState({});
    let router = useRouter();

    useEffect(() => {
        getData(setFiles, '/files/requirements', {})
        getData(setProfilePhoto, '/files/profile', {})
        getData(setProfile, '/profile', {})
    }, [])

    let print = e => {
        e.preventDefault();
        if(profile['certificate']){
            if(profile['certificate'].verified){
                router.push(`/download/certificate?id=${profile['certificate'].id}`)
            } else{
                popupE('error','Error' ,'Certificate request has not been approved')
            }
        }else  getData((_)=>{}, '/request', {})
    }
    
    return(
        <>
        <header className="flex flex-col gap-y-2 md:flex-row md:items-center md:justify-between ml-2 my-4">
            <h1 className="my-2 ml-2 md:ml-0 text-primary font-bold text-4xl">Profile</h1>
            <button className="flex items-center h-fit bg-secondary w-fit text-white font-semibold px-4 py-2 rounded-md justify-between text-sm" onClick={e=>print(e)}>
                <PrinterIcon className="h-6 w-6 mr-2" />
                Print Certificate Request
            </button>
        </header>
        <div className="mx-2">
        <section>
            <SectionHead section={'Basic Information'}/>
            <div className="flex flex-col gap-x-3 md:flex-row w-full">
                <div className="w-32 md:w-64 h-fit relative mr-4 mb-4">
                    {
                        profilePhoto.length>0?
                        <img src={profilePhoto[0].url} alt="" />
                        :
                        <Image
                            src="/profile.png"
                            width={500}
                            height={500}
                            alt="Picture of the author"
                        />
                    }
                </div>
                {
                    profile.profile != undefined &&
                    <div className="grid gap-x-5 gap-y-3 md:grid-cols-2 text-sm w-full">
                        <div className="flex gap-4 justify-between">
                            <span className="font-bold whitespace-nowrap w-1/2">Name of Expert:</span>
                            <span className="w-1/2">{profile.profile.name}</span>
                        </div>
                        <div className="flex gap-4 justify-between">
                            <span className="font-bold whitespace-nowrap w-1/2">Category:</span>
                            <span className="w-1/2">{profile.profile.category}</span>
                        </div>
                        <div className="flex gap-4 justify-between">
                            <span className="font-bold whitespace-nowrap w-1/2">Identification Number:</span>
                            <span className="w-1/2">{profile.profile.nationalID}</span>
                        </div>
                        <div className="flex gap-4 justify-between">
                            <span className="font-bold whitespace-nowrap w-1/2">Postal Address:</span>
                            <span className="w-1/2">{profile.profile.postal}</span>
                        </div>
                        <div className="flex gap-4 justify-between">
                            <span className="font-bold whitespace-nowrap md:whitespace-pre-wrap w-1/2">NEMA Registration Number:</span>
                            <span className="w-1/2">{profile.profile.nema}</span>
                        </div>
                        <div className="flex gap-4 justify-between">
                            <span className="font-bold whitespace-nowrap w-1/2">Town:</span>
                            <span className="w-1/2">{profile.profile.town}</span>
                        </div>
                        <div className="flex gap-4 justify-between">
                            <span className="font-bold whitespace-nowrap w-1/2">Certificate Number:</span>
                            <span className="w-1/2">{profile['certificate'] && profile['certificate'].number}</span>
                        </div>
                        <div className="flex gap-4 justify-between">
                            <span className="font-bold whitespace-nowrap w-1/2">County:</span>
                            <span className="w-1/2">{profile.profile.county}</span>
                        </div>
                        <div className="flex gap-4 justify-between">
                            <span className="font-bold whitespace-nowrap w-1/2">Firm of Experts:</span>
                            <span className="w-1/2">{profile.profile.firm}</span>
                        </div>
                        <div className="flex gap-4 justify-between">
                            <span className="font-bold whitespace-nowrap w-1/2">Phone Number:</span>
                            <span className="w-1/2">{profile.profile.phone}</span>
                        </div>
                        <div className="flex gap-4 justify-between">
                            <span className="font-bold whitespace-nowrap w-1/2">KRA PIN:</span>
                            <span className="w-1/2">{profile.profile.kra}</span>
                        </div>
                        <div className="flex gap-4 justify-between">
                            <span className="font-bold whitespace-nowrap w-1/2">Email:</span>
                            <span className="w-1/2">{profile.profile.email}</span>
                        </div>
                        <div className="flex gap-4 justify-between">
                            <span className="font-bold whitespace-nowrap w-1/2">Nationality:</span>
                            <span className="w-1/2">{profile.profile.nationality}</span>
                        </div>
                        <div className="flex gap-4 justify-between">
                            <span className="font-bold whitespace-nowrap w-1/2">Alternative Email Address:</span>
                            <span className="w-1/2">{profile.profile.alternate}</span>
                        </div>
                    </div>
                }
            </div>
        </section>
        <section>
            <SectionHead section={'Introductory Statement'}/>
            <p className="font-light text-md">
                {profile.profile != undefined && profile.profile.bio}
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
            {
                files.map((file, index) => (
                    <div key={index}>
                        <a className="text-secondary underline mb-2 block" href={`${file.url}`} target='blank' download>{file.name}</a>
                    </div>
                ))
            }
        </section>
        </div>
        </>
    )
}