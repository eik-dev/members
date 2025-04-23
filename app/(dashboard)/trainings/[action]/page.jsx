'use client'

import { useContext, useState } from "react"
import { useRouter } from "next/navigation";
import { Training } from "./TrainingProvider"
import Editor from "@/app/ui/WYSIWYG/Editor";
import Edit from "../users/Edit";
import { postData } from "@/app/lib/data";

export default function Page(){
    const router = useRouter();
    let {Title,TWG, Description} = useContext(Training);
    let [title, setTitle] = Title;
    let [description, setDescription] = Description;
    let [twg, setTWG] = TWG;
    const [membersPrice, setMembersPrice] = useState(null);
    const [nonMembersPrice, setNonMembersPrice] = useState(null);
    const [studentPrice, setStudentPrice] = useState(null);
    // let []
    const twgs = ['Environmental Educators','Watershed Catchment Management (Blue economy)','Sustainable Waste Management','Climate Science','Biodiversity / Natural Sciences','Built Environment & Construction','Clean Energy and Renewables','Environmental Policy & Governance','Environmental Advocacty'];

    const handleSubmit = (e) => {
        e.preventDefault();
        postData(
            (response)=>{
                if(response.success){
                    router.push('/trainings/create/media');
                }
            },
            {
                title: title,
                description: description,
                twg: twg,
                membersPrice: membersPrice,
                nonMembersPrice: nonMembersPrice,
                studentPrice: studentPrice
            },
            '/training/create'
        )
    }

    return(
        <div className="max-w-3xl mx-auto p-6">
            <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h5 className="text-2xl font-semibold mb-6 text-gray-800">Basic Information</h5>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Training Title
                        </label>
                        <input 
                            className="w-full border-2 border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500" 
                            name="title" 
                            placeholder="Enter training title" 
                            type="text" 
                            value={title} 
                            onChange={e=>setTitle(e.target.value)} 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="TWG">
                            Member Groups
                        </label>
                        <div className="mb-3 flex flex-wrap gap-2">
                            {twg.length>0 && twg.map((group,i)=>(
                                <span key={i} className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                                    {group}
                                    <button 
                                        onClick={()=>setTWG(twg.filter((g,j)=>j!==i))} 
                                        className="ml-2 text-blue-500 hover:text-blue-700"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        <select 
                            className="w-full bg-white border-2 border-gray-200 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500" 
                            name="TWG"
                        >
                            <option value="">Select TWG</option>
                            {twgs.map((group,i)=>(
                                <option key={i} value={group} onClick={()=>setTWG([...twg,group])}>
                                    {group}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Class Description
                        </label>
                        <Editor 
                            className="min-h-72 border-2 border-gray-200 rounded-md" 
                            content={description} 
                            setContent={setDescription} 
                            placeholder="Training Info"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-white rounded-lg shadow-sm p-6">
                <h5 className="text-2xl font-semibold mb-6 text-gray-800">Pricing Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Members Price
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2">Ksh.</span>
                            <input 
                                type="number" 
                                className="w-full pl-16 pr-4 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500" 
                                placeholder="0.00"
                                value={membersPrice}
                                onChange={e=>setMembersPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Non-Members Price
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2">Ksh.</span>
                            <input 
                                type="number" 
                                className="w-full pl-16 pr-4 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500" 
                                placeholder="0.00"
                                value={nonMembersPrice}
                                onChange={e=>setNonMembersPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Student Price
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2">Ksh.</span>
                            <input 
                                type="number" 
                                className="w-full pl-16 pr-4 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500" 
                                placeholder="0.00"
                                value={studentPrice}
                                onChange={e=>setStudentPrice(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex justify-end my-5">
                <button 
                className="bg-secondary text-white px-4 py-2 rounded-md"
                onClick={handleSubmit}
                >
                    Save Draft
                </button>
            </section>
        </div>
    )
}