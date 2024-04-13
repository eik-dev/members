import { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function Training({control}){
    let [institution, setInstitution] = useState('Nairobi University');
    let [start, setStart] = useState('8th March, 2021');
    let [finish, setFinish] = useState('20th April, 2023');
    let [certification, setCertification] = useState('BSc. Computer Science');
    let [grade, setGrade] = useState('Second Class Honours');

    let [edit, setEdit] = useState(true);

    let submit = e=>{
        e.preventDefault();
    }

    return(
    <div className="bg-white w-[80%] md:w-fit py-1 px-4 rounded-lg max-h-[89%] md:max-h-fit -mt-12 overflow-y-scroll">
        <div className="flex md:mx-2 mb-4 justify-between items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
            <span className="font-semibold">Edit Training Details</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        <div className="flex flex-col justify-center gap-y-8 gap-x-10">
            <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Institution</span>
                <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Institution" value={institution} onChange={e=>setInstitution(e.target.value)} />
            </div>
            <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Start Date</span>
                <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="date" placeholder="8th March, 2021" value={start} onChange={e=>setStart(e.target.value)} />
            </div>
            <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Finish Date</span>
                <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="date" placeholder="8th March, 2021" value={finish} onChange={e=>setFinish(e.target.value)} />
            </div>
            <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Certification</span>
                <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Certification" value={certification} onChange={e=>setCertification(e.target.value)} />
            </div>
            <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
                <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Grade</span>
                <input disabled={!edit} className={`px-4 w-full ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Grade" value={grade} onChange={e=>setGrade(e.target.value)} />
            </div>
        </div>

        <div className="flex w-full justify-between gap-4 my-4 text-sm">
            <button onClick={e=>submit(e)} className="py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white">Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}