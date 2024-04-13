import { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function Attachments({control}){
    let [fullName, setFullName] = useState('Sifa Kilomena');

    let [edit, setEdit] = useState(true);

    return(
    <div className="bg-white w-[80%] md:w-fit py-1 px-4 rounded-lg max-h-[89%] md:max-h-fit -mt-12 overflow-y-scroll">
        <div className="flex md:mx-2 mb-4 justify-between items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
            <span className="font-semibold">Attachments</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        <div className="flex flex-col justify-center gap-y-8 gap-x-10 md:flex-row">
            <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Full name</span>
                <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Full name" value={fullName} onChange={e=>setFullName(e.target.value)} />
            </div>
        </div>

        <div className="flex md:w-1/2 md:float-right mt-4 md:mt-12 justify-between gap-4 my-4 text-sm">
            <button className={`py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white`}>Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}