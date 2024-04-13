import { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function Introductory({control}){
    let [note, setNote] = useState('As a dedicated member of the Environmental Institute of Kenya, I am committed to fostering sustainability and environmental stewardship within our community and beyond. With a passion for conservation and a drive to effect positive change, I actively engage in initiatives aimed at preserving our natural resources and promoting eco-friendly practices. Through collaboration, education, and advocacy, I strive to inspire others to join me in safeguarding our planet for future generations.');

    let [edit, setEdit] = useState(true);

    let submit = e=>{
        e.preventDefault();
    }

    return(
    <div className="bg-white w-[80%] md:w-[50%] py-1 px-4 rounded-lg max-h-[89%] md:max-h-fit -mt-12 overflow-y-scroll">
        <div className="flex md:mx-2 mb-4 justify-between items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
            <span className="font-semibold">Edit Introductory Statement</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        <div className="flex w-full flex-col justify-center gap-y-8 gap-x-10 md:flex-row">
            <div className="border-2 w-full rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Introductory note</span>
                <textarea disabled={!edit} className={`px-4 w-full h-96 md:h-48 ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Note" value={note} onChange={e=>setNote(e.target.value)} />
            </div>
        </div>

        <div className="flex lg:w-1/2 lg:float-right justify-between gap-4 my-4 text-sm">
            <button onClick={e=>submit(e)} className="py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white">Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}