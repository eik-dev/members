'use client'
import { useState, useEffect } from "react";
import { UserCircleIcon, PlusIcon, EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { getData, postFile } from '@/app/lib/data';
import Overlay from '@/app/ui/overlay';
import Head from '@/app/ui/head';
import Add from "./Add";
import Upload from "./Upload";
import Delete from "./Delete";
import Edit from "./Edit";

export default function Users(){
    let params = useSearchParams();
    let id = params.get('id')
    let Range = useState(20);
    let Genesis = useState(0);//pointer to the first data
    let Search = useState("");
    let [total, setTotal] = useState(0);
    let TH = ['Name', 'Email', 'Number'];
    let Sort = useState(TH[0]);
    let [overlay, setOverlay] = useState('');
    let [selection, setSelection] = useState([]);
    let [filtered, setFiltered] = useState([]);
    let [optionsAt, setOptionsAt] = useState(-1);
    let [userID, setUserID] = useState(0);
    let [data, setData] = useState([]);
    let [csv, setCSV] = useState([]);

    useEffect(()=>{
        getData(setData,'/training/attendee',{id})
    },[])
    useEffect(()=>{
        if(csv.length>0){
            csv.forEach(file => {
                postFile((response)=>{
                    console.log(response)
                    if(response.data) setData(response.data);
                    setCSV([])
                    setOverlay('')
                }, file, 'csv', '/csv')
            });
        }
    },[csv])

    useEffect(()=>{
        if(data){
            let temp = data.filter((item, i)=>selection.includes(i))
            console.log(temp);
            setFiltered(temp);
        }
    },[selection])
    useEffect(()=>{
        console.log('Genesis:',Genesis[0])
        // if (Range[0] > data.length) getData(setData, '/training/attendee', {search:Search[0], limit:Range[0], Genesis:Genesis[0]})
        // if (Search[0].length > 3) getData(setData, '/training/attendee', {search:Search[0], limit:Range[0], Genesis:Genesis[0]})
        // else getData(setData, '/training/attendee', {search:Search[0], limit:Range[0], Genesis:Genesis[0]})
    },[Range[0],Search[0], Genesis[0]])

    let onRowClick = (e, index)=>{
        e.preventDefault()
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
        setOptionsAt(index)
    }

    let selectAll = (e)=>{
        for(let i=0;i<data.length;i++){
            document.getElementById(`checkbox-${i}`).checked = e.target.checked;
            if(e.target.checked && !selection.includes(i)) selection.push(i)
        }
        if(!e.target.checked) setSelection([])
        console.log(selection)
    }

    let generate = (e)=>{
        e.preventDefault();
        postData((response)=>{
            setData(response.data)
        },{
            data:filtered,
            training:id
        },'/training/members')
    }
    let download = (e)=>{
        e.preventDefault();
        filtered.forEach(participant => {
            getFile(`${participant.Name}.pdf`,'/training/download',{number:participant.Number,training:id})
        });
    }
    let email = (e)=>{
        e.preventDefault();
        filtered.forEach(participant => {
            getData((_)=>{},'/training/email',{number:participant.Number,training:id})
        });
    }

    return(
        <div>
            <Head Range={Range} total={total} Search={Search} Title={'Attendees'} TH={TH} Sort={Sort} placeholder={'Search attendees'} Genesis={Genesis}>
                <div className="flex gap-4">
                    <button className='flex items-center bg-secondary text-white px-4 py-2 rounded-md font-semibold gap-2' onClick={e=>setOverlay('add')}> <PlusIcon className='w-5 h-5'/> Add user</button>
                    <button className='flex items-center bg-secondary text-white px-4 py-2 rounded-md font-semibold gap-2' onClick={e=>setOverlay('upload')}> <PlusIcon className='w-5 h-5'/> Upload file</button>
                </div>
            </Head>

            <div className='text-center mt-8'>{filtered.length}/{data.length} selected</div>

            <div className="max-h-[90vh] overflow-y-scroll large-scroll mt-8">
                <table className="w-full text-sm lg:text-xs 2xl:text-sm text-left table-auto" onClick={e=>{optionsAt>=0?setOptionsAt(-1):null}}>
                    <thead className="capitalize bg-gray-100 sticky top-0 z-20">
                        <tr>
                        {
                            ['','','name','email','Number'].map((th, index) => {
                                if(index==1) return <th key={index} onClick={e=>selectAll(e)}><input className='scale-125' type="checkbox" name="" id="" /></th>
                                return (<th key={index} scope="col" className="px-6 py-3 whitespace-nowrap">{th}</th>)
                            })
                        }
                        <th className="px-6 py-3 whitespace-nowrap">
                            <button onClick={e=>setOptionsAt(-2)}>
                                <EllipsisVerticalIcon className="w-6 h-6"/>
                            </button>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((data,index)=>{
                                return(
                                    <tr key={index} className="border-b border-gray-300" onClick={e=>{onRowClick(e,index)}}>
                                        <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                                        <td><input type="checkbox" name="" id={`checkbox-${index}`}/></td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data['Name']}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${data['Sent']!=null?(data['Sent']==1?'text-primary':'text-warning'):null}`}>{data['Email']}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data['Number']}</td>
                                        <td className="px-6 py-4 whitespace-nowrap relative">
                                            <button>
                                                <EllipsisVerticalIcon className="w-6 h-6"/>
                                            </button>
                                            {
                                                optionsAt === index &&
                                                <div className={`flex shadow-xl p-4 absolute z-50 right-12 md:right-20 bg-white flex-col gap-y-4 ${true?'block':'hidden'}`}>
                                                    <button className="flex gap-x-2" onClick={e=>setOverlay('edit')}>
                                                        <UserCircleIcon className="w-6 h-6"/>
                                                        Edit details
                                                    </button>
                                                    <button className="flex gap-x-2 text-warning" onClick={e=>setOverlay('delete')}>
                                                        <TrashIcon className="w-6 h-6"/>
                                                        Delete member
                                                    </button>
                                                </div>
                                            }
                                        </td>
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

            <Overlay className={`${overlay!=''?'block':'hidden'}`} >
                {overlay === 'add' && <Add control={setOverlay} />}
                {overlay === 'upload' && <Upload control={setOverlay} csv={csv} setCSV={setCSV} />}
                {overlay === 'delete' && <Delete control={setOverlay} id={userID} />}
                {overlay === 'edit' && <Edit control={setOverlay} id={userID} data={data[userID]} />}
            </Overlay>
        </div>
    )
}