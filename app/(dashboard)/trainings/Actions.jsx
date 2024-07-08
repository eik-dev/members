import { useEffect, useState } from 'react';
import File from '@/app/ui/File';
import { ArrowUpTrayIcon, PaperAirplaneIcon, ArrowDownOnSquareIcon, CogIcon} from '@heroicons/react/24/outline';
import { postFile, getFile, getData, postData } from '@/app/lib/data';

export default function Actions({id}){
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
    return(
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
                                        <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                                        <td><input type="checkbox" name="" id={`checkbox-${index}`} /></td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data['Name']}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${data['Sent']!=null?(data['Sent']==1?'text-primary':'text-warning'):null}`}>{data['Email']}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{data['Number']}</td>
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
    )
}