import { useState } from "react"
import { XMarkIcon, UserPlusIcon } from "@heroicons/react/24/outline"

export default function New({control}){
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
            <span className="font-semibold">Add New Admin</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        <input className="px-4 py-2 border-2 rounded-md w-full mb-6 focus:border-black" type="text" placeholder="Full Name" value={fullName} onChange={e=>setFullName(e.target.value)} />
        <input className="px-4 py-2 border-2 rounded-md w-full mb-6 focus:border-black" type="text" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="px-4 py-2 border-2 rounded-md w-full mb-6 focus:border-black" type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />

        <div className="bg-secondary text-white flex px-4 py-2 rounded-lg mx-auto w-full items-center justify-center mb-6" onClick={e=>submit(e)}>
            <UserPlusIcon className="w-6 h-6 mr-2"/>
            <span className="font-semibold">Add Admin</span>
        </div>
    </div>
    )
}