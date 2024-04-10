'use client'
import { useState, useEffect } from "react"
import Head from '@/app/ui/head';
import Overlay from "@/app/ui/overlay";
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Page(){
    let Range = useState(20);
    let Search = useState("");
    let TH = ['Full name', 'Email', 'NEMA Reg. No.', 'Certificate No.', 'Date Registered', 'Action'];
    let Sort = useState(TH[0]);
    let [showOverlay, setShowOverlay] = useState(false);
    let [overlay, setOverlay] = useState('');
    let [optionsAt, setOptionsAt] = useState(-1);
    
    let [data, setData] = useState([
        {
            full_name: 'Sifa Kilomena',
            email: 'sifa@email.com',
            nema:'NEMA/IAE/NA/12345',
            cert_no:'EIK/2/1234',
            date:'12/12/2021'
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

    let accept = (e,index) => {
        e.preventDefault();
    }
    let deny = (e,index) => {
        e.preventDefault();
    }

    return(
        <div onClick={e=>{optionsAt>=0?setOptionsAt(-1):null}}>
        <Head Range={Range} Search={Search} Title={'Certificates'} TH={TH} Sort={Sort} placeholder={'Search certificates'}>
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
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="border-2 border-primary text-primary mr-4" onClick={e=>accept(e, index)}>
                                        <CheckIcon className="w-5 h-5"/>
                                    </button>
                                    <button className="border-2 border-warning text-warning" >
                                        <XMarkIcon className="w-5 h-5"/>
                                    </button>
                                </td>
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
        </Overlay>
        </div>
    )
}