'use client'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { postFile, getData, postData, getFile } from "@/app/lib/data";
import TrainingCert from '@/app/ui/TrainingCert';
import File from '@/app/ui/File';
import Head from '@/app/ui/head';
import { ArrowUpTrayIcon, PaperAirplaneIcon, ArrowDownOnSquareIcon, CogIcon, ChevronLeftIcon, ChevronRightIcon, PhotoIcon, QrCodeIcon, CalendarDaysIcon, UserIcon, IdentificationIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

let category = '';
export default function Page() {
    let params = useSearchParams();
    let id = params.get('id');
    let [csv, setCSV] = useState([]);
    let [data, setData] = useState([]);
    let [selection, setSelection] = useState([]);
    let [filtered, setFiltered] = useState([]);

    let generate = (e)=>{
        e.preventDefault();
        postData((response)=>{
            setData(response.data)
        },{
            data:filtered,
            training:1
        },'/training/members')
    }
    let download = (e)=>{
        e.preventDefault();
        filtered.forEach(participant => {
            getFile(`${participant.Name}.pdf`,'/training/download',{number:participant.Number})
        });
    }
    let email = (e)=>{
        e.preventDefault();
        filtered.forEach(participant => {
            getData((_)=>{},'/training/email',{number:participant.Number})
        });
    }

    useEffect(()=>{
        if(csv.length>0){
            csv.forEach(file => {
                postFile((response)=>{
                    console.log(response)
                    if(response.data) setData(response.data);
                }, file, 'csv', '/csv')
            });
        }
    },[csv])

    useEffect(()=>{
        let temp = data.filter((item, i)=>selection.includes(i))
        console.log(temp);
        setFiltered(temp);
    },[selection])

    let onRowClick = (e, index)=>{
        let checkbox = document.getElementById(`checkbox-${index}`);
        if(checkbox.checked){
            let iRemove = selection.indexOf(index)
            let temp = selection.slice(0,iRemove).concat(selection.slice(iRemove+1));
            setSelection(temp);
            checkbox.checked=false;
        }
        else{
            setSelection([...selection, index]);
            checkbox.checked = true;
        }
        console.log(index,'!!!!')
    }

    let selectAll = (e)=>{
        for(let i=0;i<data.length;i++){
            document.getElementById(`checkbox-${i}`).checked = e.target.checked;
            if(e.target.checked && !selection.includes(i)) selection.push(i)
        }
        if(!e.target.checked) setSelection([])
        console.log(selection)
    }
    
    return (
    <div className=''>
        <div className='flex md:mb-8'>
            <h1 className='text-primary text-xl md:text-2xl font-bold'>Certificate Generator</h1>
            <button></button>
        </div>
        <div className='flex items-center justify-between mb-2'>
            <button onClick={e=>{}}><ChevronLeftIcon onClick={e=>{}} className='w-8 h-8'/></button>
            <div className='text-xl font-bold text-center'>Developing Quality Environment Audit Report<br /> <span className='font-medium'>(1/1)</span> </div>
            <button onClick={e=>{}}><ChevronRightIcon onClick={e=>{}} className='w-8 h-8'/></button>
        </div>

        <div className='hidden md:flex justify-between bg-gray-200/70 py-8 px-4'>
            {/* <TrainingCert data={{}} /> */}
            <div className='bg-white px-4 py-4 flex flex-col h-3/4 w-56 gap-5 rounded-lg'>
                <button className='flex items-center gap-2 flex-grow hover:scale-105'><PhotoIcon className='w-8 h-8'/> <span className=''>Background</span></button>
                <button className='flex items-center gap-2 flex-grow hover:scale-105'><UserIcon className='w-8 h-8'/> <span className=''>Name</span></button>
                <button className='flex items-center gap-2 flex-grow hover:scale-105'><ChatBubbleBottomCenterTextIcon className='w-8 h-8'/> <span className=''>Info</span></button>
                <button className='flex items-center gap-2 flex-grow hover:scale-105'><IdentificationIcon className='w-8 h-8'/> <span className=''>Number</span></button>
                <button className='flex items-center gap-2 flex-grow hover:scale-105'><QrCodeIcon className='w-8 h-8'/> <span className=''>QRcode</span></button>
                <button className='flex items-center gap-2 flex-grow hover:scale-105'><CalendarDaysIcon className='w-8 h-8'/> <span className=''>Date</span></button>
            </div>
            <iframe className='w-[1045px] h-[740px]' src={`${process.env.NEXT_PUBLIC_BASE_URL}/certificates/training`} frameborder="0"></iframe>
            <div className=''>
            </div>
        </div>
        
        <div className='flex my-8 justify-between max-w-[99%] max-h-96 overflow-y-scroll'>
            <div className='flex items-center mx-auto'>
            {
                csv.length==0?
                <div>
                    <h4 className='text-xl mb-4'>Upload Spreadsheet</h4>
                    <File files={csv} setFiles={setCSV}/>
                </div>
                :
                <div>
                    <div className='grid grid-cols-2 grid-rows-2 gap-8'>
                        <button className='py-3 px-3 rounded-md bg-secondary hover:bg-primary text-white' onClick={e=>generate(e)}><CogIcon className='w-6 h-6 inline-block'/> Generate Certificate numbers</button>
                        <button className='py-3 px-3 rounded-md bg-secondary hover:bg-primary text-white' onClick={e=>email(e)}><PaperAirplaneIcon className='w-6 h-6 inline-block'/> Send</button>
                        <button className='py-3 px-3 rounded-md bg-secondary hover:bg-primary text-white' onClick={e=>download(e)}><ArrowDownOnSquareIcon className='w-6 h-6 inline-block'/> Download Certificates</button>
                        <button className='py-3 px-3 rounded-md bg-secondary hover:bg-primary text-white' onClick={e=>setCSV([])}><ArrowUpTrayIcon className='w-6 h-6 inline-block'/> Upload New file</button>
                    </div>
                    <div className='text-center mt-8'>{filtered.length}/{data.length} selected</div>
                </div>
            }
            </div>
            <div className='w-1/2 max-w-1/2 max-h-96 overflow-y-scroll'>
                <table className="w-full text-sm lg:text-xs 2xl:text-sm text-left table-auto">
                    <thead className="capitalize bg-gray-100 sticky top-0">
                        <tr>
                        {
                            ['','','name','email','Number'].map((th, index) => {
                                if(index==1) return <th key={index} onClick={e=>selectAll(e)}><input className='scale-125' type="checkbox" name="" id="" /></th>
                                return (<th key={index} scope="col" className="px-6 py-3 whitespace-nowrap">{th}</th>)
                            })
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((data,index)=>{
                                return(
                                    <tr key={index} className="border-b border-gray-300" onClick={e=>{onRowClick(e,index)}}>
                                        <td key={index} className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                                        <td key={index+1}><input type="checkbox" name="" id={`checkbox-${index}`} /></td>
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
                            [...new Array(data.length>10?0:10-data.length)].map((_,index)=>{
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
    </div>
    );
}