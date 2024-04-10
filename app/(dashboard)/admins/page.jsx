'use client'
import { useState, useEffect } from "react"
import Head from '@/app/ui/head';
import Overlay from "@/app/ui/overlay";
import Edit from "./Edit";
import Delete from "./Delete";
import { UserPlusIcon, EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Page(){
    let Range = useState(20);
    let Search = useState("");
    let TH = ['Full name', 'Username', 'Email']
    let Sort = useState(TH[0]);
    let [showOverlay, setShowOverlay] = useState(false);
    let [overlay, setOverlay] = useState('');
    let [optionsAt, setOptionsAt] = useState(-1);
    
    let [data, setData] = useState([
        {
            full_name: 'John Doe',
            username: 'johndoe',
            email: 'admin@eik.co.ke'
        },
        {
            full_name: 'John Doe',
            username: 'johndoe',
            email: 'admin@eik.co.ke'
        }
    ]);

    useEffect(()=>{},[])
    useEffect(()=>{},[Sort[0]])
    useEffect(()=>{
        console.clear();
        console.log('clicked')
        if (overlay=='') setShowOverlay(false)
        else setShowOverlay(true)
    },[overlay])

    return(
        <div onClick={e=>{optionsAt>=0?setOptionsAt(-1):null}}>
        <Head Range={Range} Search={Search} Title={'Admin panel'} TH={TH} Sort={Sort} placeholder={'Search registerd admins'}>
            <span className="min-w-[2px] hidden md:block min-h-6 h-max bg-tertiary mx-4"></span>
            <div className="bg-secondary text-white flex md:w-fit px-4 py-2 rounded-lg mx-auto w-2/3 items-center justify-center">
                <UserPlusIcon className="w-6 h-6 mr-2"/>
                <span className="font-semibold">New Admin</span>
            </div>
        </Head>
        <div className="overflow-x-scroll mt-2 md:mt-10 mx-2 md:mx-0">
        <table className="w-full text-sm lg:text-xs 2xl:text-sm text-left table-auto">
            <thead className="capitalize bg-tertiary bg-opacity-30 sticky top-0">
                <tr>
                {
                    TH.map((th, index) => {
                        return (<th key={index} scope="col" className="px-6 py-3 whitespace-nowrap">{th}</th>)
                    })
                }
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((data,index)=>{
                        return(
                            <tr key={index} className="border-b border-gray-700">
                                {
                                    Object.keys(data).map((key, index) => {
                                        return(
                                            <td key={index} className="px-6 py-4 whitespace-nowrap">{data[key]}</td>
                                        )
                                    })
                                }
                                <td className="px-6 py-4 whitespace-nowrap relative">
                                    <button onClick={e=>setOptionsAt(index)}>
                                        <EllipsisVerticalIcon className="w-6 h-6"/>
                                    </button>
                                    {
                                        optionsAt === index &&
                                        <div className={`flex absolute z-50 right-12 md:right-44 bg-white flex-col gap-y-4 ${true?'block':'hidden'}`}>
                                            <div className="flex gap-x-2" onClick={e=>setOverlay('edit')}>
                                                <PencilSquareIcon className="w-6 h-6"/>
                                                Edit details
                                            </div>
                                            <div className="flex gap-x-2" onClick={e=>setOverlay('delete')}>
                                                <TrashIcon className="w-6 h-6"/>
                                                Delete admin
                                            </div>
                                        </div>
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
        <Overlay className={`${showOverlay?'block':'hidden'}`} >
            {overlay === 'edit' && <Edit control={setOverlay} />}
            {overlay === 'delete' && <Delete control={setOverlay} />}
        </Overlay>
        </div>
    )
}