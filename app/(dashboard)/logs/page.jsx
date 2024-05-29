'use client'
import { useState, useEffect } from "react"
import Head from '@/app/ui/head';

export default function Page(){
    let Range = useState(20);
    let Search = useState("");
    let Genesis = useState(0);
    let TH = ['Date', 'Username', 'Email', 'Action'];
    let Sort = useState(TH[0]);
    let [optionsAt, setOptionsAt] = useState(-1);
    
    let [data, setData] = useState([
        {
            date: '12/12/2021',
            username: 'johndoe',
            email: 'admin@eik.co.ke',
            action: 'login'
        }
    ]);

    useEffect(()=>{},[])
    useEffect(()=>{},[Sort[0]])
    useEffect(()=>{console.log(`Pulling ${Range[0]} rows`)},[Range[0]])

    return(
        <div onClick={e=>{optionsAt>=0?setOptionsAt(-1):null}}>
        <Head Range={Range} Search={Search} Title={'User Logs'} TH={TH} Sort={Sort} placeholder={'Search user logs'} Genesis={Genesis}>
        </Head>
        <div className="overflow-x-scroll mt-2 md:mt-10 mx-2 lg:mx-0 max-h-[60vh] 2xl:max-h-[67vh] overflow-y-scroll">
        <table className="w-full text-sm lg:text-xs 2xl:text-sm text-left table-auto">
            <thead className="capitalize bg-gray-100 sticky top-0">
                <tr>
                {
                    TH.map((th, index) => {
                        return (<th key={index} scope="col" className="px-6 py-3 whitespace-nowrap">{th}</th>)
                    })
                }
                </tr>
            </thead>
            <tbody>
                {
                    data.slice(0,Range[0]).map((data,index)=>{
                        return(
                            <tr key={index} className="border-b border-gray-300">
                                {
                                    Object.keys(data).map((key, index) => {
                                        return(
                                            <td key={index} className="px-6 py-4 whitespace-nowrap">{data[key]}</td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
                {
                    [...new Array((Range[0]-data.length>0)?Range[0]-data.length:0)].map((_,index)=>{
                        return(
                            <tr key={index} className="border-b border-gray-300">
                                <td className="py-6"></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
        </div>
    )
}