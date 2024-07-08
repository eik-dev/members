'use client'
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/app/lib/data';
import Spinner from '@/app/ui/Spinner';
import New from './New';
import Modify from './Modify';
import Action from './Actions';
import Overlay from '@/app/ui/overlay';
import { ChevronLeftIcon, ChevronRightIcon, PhotoIcon, QrCodeIcon, CalendarDaysIcon, UserIcon, IdentificationIcon, ChatBubbleBottomCenterTextIcon, PlusIcon } from '@heroicons/react/24/outline';

let category = '';
export default function Page() {
    let [action, setAction] = useState('');
    let [overlay, setOverlay] = useState('');
    let [training, setTraining] = useState(0);

    const { data:trainings, error, isLoading } = useSWR(['/training/all',{}], fetcher)
    if (isLoading) return <Spinner/>
    if (error) return <p>Error when fetching trainings</p>

    console.log(`Trainings :: `,trainings)

    return (
    <div className=''>
        <div className='flex justify-between md:mb-8'>
            <h1 className='text-primary text-xl md:text-2xl font-bold'>Certificate Generator</h1>
            <button className='flex items-center bg-secondary text-white px-4 py-2 rounded-md font-semibold gap-2' onClick={e=>setOverlay('new')}> <PlusIcon className='w-5 h-5'/> New training</button>
        </div>
        <div className='flex items-center justify-between mb-2'>
            <button onClick={e=>{}}><ChevronLeftIcon onClick={e=>{training>0?setTraining(training-1):null}} className='w-8 h-8'/></button>
            <div className='text-xl font-bold text-center'>{trainings.data[training].Name}<br /> <span className='font-medium'>({training+1}/{trainings.data.length})</span> </div>
            <button onClick={e=>{}}><ChevronRightIcon onClick={e=>{trainings.data.length!=training+1?setTraining(training+1):null}} className='w-8 h-8'/></button>
        </div>

        <div className='hidden md:flex justify-between bg-gray-200/70 py-8 px-4'>
            {/* <TrainingCert data={{}} /> */}
            <div className='bg-white px-4 py-4 flex flex-col h-3/4 w-56 gap-5 rounded-lg mr-2'>
                <button className={`flex items-center gap-2 flex-grow hover:scale-105 ${action=='Background'?'text-primary scale-105':''}`} onClick={e=>setAction('Background')}><PhotoIcon className='w-8 h-8'/> <span className=''>Background</span></button>
                <button className={`flex items-center gap-2 flex-grow hover:scale-105 ${action=='Name'?'text-primary scale-105':''}`} onClick={e=>setAction('Name')}><UserIcon className='w-8 h-8'/> <span className=''>Name</span></button>
                <button className={`flex items-center gap-2 flex-grow hover:scale-105 ${action=='Info'?'text-primary scale-105':''}`} onClick={e=>setAction('Info')}><ChatBubbleBottomCenterTextIcon className='w-8 h-8'/> <span className=''>Info</span></button>
                <button className={`flex items-center gap-2 flex-grow hover:scale-105 ${action=='Number'?'text-primary scale-105':''}`} onClick={e=>setAction('Number')}><IdentificationIcon className='w-8 h-8'/> <span className=''>Number</span></button>
                <button className={`flex items-center gap-2 flex-grow hover:scale-105 ${action=='QRcode'?'text-primary scale-105':''}`} onClick={e=>setAction('QRcode')}><QrCodeIcon className='w-8 h-8'/> <span className=''>QRcode</span></button>
                <button className={`flex items-center gap-2 flex-grow hover:scale-105 ${action=='Date'?'text-primary scale-105':''}`} onClick={e=>setAction('Date')}><CalendarDaysIcon className='w-8 h-8'/> <span className=''>Date</span></button>
            </div>
            <iframe className='w-[1045px] h-[740px]' src={`${process.env.NEXT_PUBLIC_BASE_URL}/view/certificates/training/${trainings.data[training].id}`} frameborder="0"></iframe>
            {
                action!='' && <Modify control={setAction} action={action} />
            }
        </div>
        <Action id={trainings.data[training].id}/>
        <Overlay className={`${overlay!=''?'block':'hidden'}`} >
            {overlay === 'new' && <New control={setOverlay} />}
        </Overlay>
    </div>
    );
}