import { useState } from "react"
import Image from "next/image";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { Stalinist_One } from "next/font/google";

export default function FirmDetails({control}){
    let [email, setEmail] = useState('sifa@email.com');
    let [nema, setNema] = useState('NEMA/IAE/NA/12345');
    let [certificate, setCertificate] = useState('EIK/2/1234');
    let [firm, setFirm] = useState('Sustainable Earth Ltd.');
    let [pin, setPin] = useState('A0123456');
    let [postal, setPostal] = useState('987654 - 00100');
    let [town, setTown] = useState('Nairobi');
    let [county, setCounty] = useState('Nairobi');
    let [phone, setPhone] = useState('+254 712345678');
    let [alternative, setAlternative] = useState('x');

    let [edit, setEdit] = useState(false);

    return(
    <div className="bg-white w-[80%] md:w-fit py-1 px-4 rounded-lg max-h-[89%] md:max-h-fit -mt-12 overflow-y-scroll">
        <div className="flex md:mx-2 mb-4 justify-between items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
            <span className="font-semibold">Member Details</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        <div className="flex flex-col justify-center gap-y-8 gap-x-10 md:flex-row">
            <div className="w-32 md:w-64 h-fit relative">
            <Image
                src="/profile_firm.png"
                width={500}
                height={500}
                alt="Picture of the author"
            />
            <div className="bg-secondary w-fit absolute -right-2 -bottom-2">
                <PencilSquareIcon className="w-6 h-6 text-white" onClick={e=>setEdit(!edit)} />
            </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 w-full">
                <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                    <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Firm of Experts</span>
                    <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Full name" value={firm} onChange={e=>setFirm(e.target.value)} />
                </div>
                <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                    <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">NEMA Registration Number</span>
                    <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Full name" value={nema} onChange={e=>setNema(e.target.value)} />
                </div>
                <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                    <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Certificate Number</span>
                    <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Full name" value={certificate} onChange={e=>setCertificate(e.target.value)} />
                </div>
                <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                    <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Firm PIN Number</span>
                    <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Full name" value={pin} onChange={e=>setPin(e.target.value)} />
                </div>
                <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                    <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Postal Address</span>
                    <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Full name" value={postal} onChange={e=>setPostal(e.target.value)} />
                </div>
                <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                    <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Town</span>
                    <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Full name" value={town} onChange={e=>setTown(e.target.value)} />
                </div>
                <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                    <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">County</span>
                    <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Full name" value={county} onChange={e=>setCounty(e.target.value)} />
                </div>
                <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                    <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Phone Number</span>
                    <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Full name" value={phone} onChange={e=>setPhone(e.target.value)} />
                </div>
                <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                    <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Email Address</span>
                    <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Full name" value={email} onChange={e=>setEmail(e.target.value)} />
                </div>
                <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                    <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Alternative Email Address</span>
                    <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Full name" value={alternative} onChange={e=>setAlternative(e.target.value)} />
                </div>
            </div>
        </div>

        <div className="flex md:w-1/2 md:float-right mt-4 md:mt-12 justify-between gap-4 my-4 text-sm">
            <div className={`${!edit?'block':'hidden'}`}></div>
            <button className={`py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white ${edit?'block':'hidden'}`}>Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}