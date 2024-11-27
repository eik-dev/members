'use client'
import { useContext } from "react"
import { Training } from "./TrainingProvider"

export default function Page(){
    let {Title,TWG, Description} = useContext(Training);
    let [title, setTitle] = Title;
    let [description, setDescription] = Description;
    let [twg, setTWG] = TWG;
    const twgs = ['Environmental Educators','Watershed Catchment Management (Blue economy)','Sustainable Waste Management','Climate Science','Biodiversity / Natural Sciences','Built Environment & Construction','Clean Energy and Renewables','Environmental Policy & Governance','Environmental Advocacty'];

    return(
        <div>
            <h5 className="text-2xl font-semibold mb-4">Basic information</h5>
            <div>
                <label htmlFor="title">Training title</label>
                <input className="block border-2 px-2 py-1 rounded-sm mt-1" name="title" placeholder="Training title" type="text" value={title} onChange={e=>setTitle(e.target.value)} />
            </div>
            <div>
                <label className="block" htmlFor="TWG">Member groups</label>
                {
                    twg.length>0 &&
                    twg.map((group,i)=>(<span key={i} className="m-2 p-2 rounded-lg bg-gray-100">{group} <button onClick={()=>setTWG(twg.filter((g,j)=>j!==i))} className="text-warning text-xl">X</button></span>))
                }
                <select className="block mt-2 w-[30] py-2 px-5 text-left" name="TWG" id="" >
                    <option value="">Select TWG</option>
                    {
                        twgs.map((group,i)=>(<option key={i} value={group} onClick={()=>setTWG([...twg,group])}>{group}</option>))
                    }
                </select>
            </div>
            <div className="mt-6">
                <label htmlFor="description">Class Description</label>
                <textarea className="block p-2 bg-transparent border-2 w-4/5 h-56 rounded-lg" placeholder="Training description" name="description" id="" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
            </div>
            
            <h5 className="text-xl mt-8 font-semibold mb-4">Pricing Information</h5>
        </div>
    )
}