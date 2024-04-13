'use client'
import { useState, useEffect } from "react"
import Head from '@/app/ui/head';
import FirmDetails from "@/app/ui/FirmDetails";
import Delete from "./Delete";
import Overlay from "@/app/ui/overlay";
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Page(){
    let Range = useState(20);
    let Search = useState("");
    let TH = ['Firm name', 'Email', 'NEMA Reg. No.', 'Certificate No.', 'PIN', 'Date Registered', 'Action'];
    let Sort = useState(TH[0]);
    let [showOverlay, setShowOverlay] = useState(false);
    let [overlay, setOverlay] = useState('');
    let [optionsAt, setOptionsAt] = useState(-1);
    
    let [data, setData] = useState([
        {
            firm_name: 'Sustainable Earth Ltd.',
            email: 'sel@email.com',
            nema:'NEMA/IAE/NA/12345',
            cert_no:'EIK/2/1234',
            pin:'A0123456',
            date:'12/12/2021'
        }
    ]);

    useEffect(()=>{},[])
    useEffect(()=>{},[Sort[0]])
    useEffect(()=>{console.log(`Pulling ${Range[0]} rows`)},[Range[0]])
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
        <Head Range={Range} Search={Search} Title={'Firms'} TH={TH} Sort={Sort} placeholder={'Search registered firms'}>
        </Head>
        <div className="overflow-x-scroll mt-2 md:mt-10 mx-2 lg:mx-0 max-h-96 md:max-h-[65vh] overflow-y-scroll">
        <table className="w-full text-sm lg:text-xs 2xl:text-sm text-left table-auto">
            <thead className="capitalize bg-gray-100 sticky top-0">
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
                    data.slice(0,Range[0]).map((data,index)=>{
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
                                    <button className="border-2 border-warning text-warning" onClick={e=>accept(e, index)}>
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
                                            <div className="flex gap-x-2" onClick={e=>setOverlay('details')}>
                                                <PencilSquareIcon className="w-6 h-6"/>
                                                Edit details
                                            </div>
                                            <div className="flex gap-x-2 text-warning" onClick={e=>setOverlay('delete')}>
                                                <TrashIcon className="w-6 h-6"/>
                                                Delete firm
                                            </div>
                                        </div>
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
                {
                    [...new Array((Range[0]-data.length>0)?Range[0]-data.length:0)].map((_,index)=>{
                        return(
                            <tr key={index} className="border-b border-gray-700">
                                <td className="py-6"></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
        <Overlay className={`${showOverlay?'block':'hidden'}`} >
            {overlay=='details'?<FirmDetails control={setOverlay} />:null}
            {overlay=='delete'?<Delete control={setOverlay} />:null}
        </Overlay>
        </div>
    )
}