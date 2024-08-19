import { useState, useEffect } from "react"
import useSWR from "swr";
import Spinner from "@/app/ui/Spinner";
import { XMarkIcon } from "@heroicons/react/24/outline"
import Input from "@/app/ui/Input";
import { postData, fetcher } from "@/app/lib/data";

export default function Introductory({control}){
    const { data, isError, isLoading } = useSWR(['/profile/get/bio',{}], fetcher, {revalidateIfStale: false})
    let [note, setNote] = useState('');
    useEffect(()=>{
        if(!isError && !isLoading) setNote(data.bio)
    },[isLoading, isError])
    let submit = e=>{
        e.preventDefault();
        postData((_)=>{},{bio:note},'/profile/edit/bio')
    }

    return(
    <div className="bg-white w-[80%] md:w-[50%] py-1 px-4 rounded-lg max-h-[89%] md:max-h-fit -mt-12 overflow-y-scroll">
        <div className="flex md:mx-2 mb-4 justify-between items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
            <span className="font-semibold">Edit Introductory Statement</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        {isLoading && <Spinner internal={true}/>}
        {isError && <p>Error fetching bio </p>}
        {(!isLoading && !isError) && <Input required={true} value={note} setValue={setNote} placeholder={'Bio'} type={'textarea'} name={'Introductory Note'}/>}

        <div className="flex lg:w-1/2 lg:float-right justify-between gap-4 my-4 text-sm">
            <button onClick={e=>submit(e)} className="py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white">Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}