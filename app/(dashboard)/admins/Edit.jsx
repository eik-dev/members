import { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function Edit({control}){
    let [fullName, setFullName] = useState('');
    let [email, setEmail] = useState('');
    let [username, setUsername] = useState('');

    let submit = e=>{
        e.preventDefault();
        console.log('submitting')
    }

    return(
    <div className="bg-white w-[80%] md:w-1/2 lg:w-1/3 2xl:w-[20%] py-1 px-4 rounded-lg">
        <div className="flex mx-2 mb-4 justify-between items-center border-b-2 py-3">
            <span className="font-semibold">Edit Admin Details</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 mb-6 relative">
            <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Full name</span>
            <input className="px-4 w-full text-black" type="text" placeholder="Full name" value={fullName} onChange={e=>setFullName(e.target.value)} />
        </div>
        <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 mb-6 relative">
            <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Email</span>
            <input className="px-4 w-full text-black" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 mb-6 relative">
            <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Username</span>
            <input className="px-4 w-full text-black" type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        </div>

        <div className="flex w-full justify-between gap-4 my-4 text-sm">
            <button className="py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white">Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}