'use client'
import { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from '@/app/lib/data';
import Spinner from '@/app/ui/Spinner';
import { MagnifyingGlassIcon, PhotoIcon, EllipsisVerticalIcon, DocumentIcon, UserIcon, PlusIcon } from '@heroicons/react/24/outline';
import Overlay from '@/app/ui/overlay';
import New from './New';

export default function Page() {
    let [search, setSearch] = useState('')
    let [overlay, setOverlay] = useState('');

    const { data:trainings, error, isLoading } = useSWR(['/training/all',{}], fetcher)
    if (isLoading) return <Spinner/>
    if (error) return <p>Error when fetching trainings</p>
    
    console.log(trainings)

    return (
    <div className="">
        <div className='flex justify-between md:mb-8'>
            <h1 className='text-primary text-xl md:text-2xl font-bold'>Trainings</h1>
            <div className='flex'>
                <div className="flex items-center rounded-full px-1 py-2 bg-tertiary bg-opacity-55 w-4/5 mx-auto md:w-4/12 md:mx-1">
                    <MagnifyingGlassIcon className="w-4 h-4 2xl:w-6 2xl:h-6 mx-2 mr-3"/>
                    <input className="bg-tertiary bg-opacity-5 active:bg-none active:border-none w-full text-xs 2xl:text-base" type="text" name="" id="" placeholder={'Search'} value={search} onChange={e=>setSearch(e.target.value)} />
                </div>
                <button className='flex items-center bg-secondary text-white px-4 py-2 rounded-md font-semibold gap-2' onClick={e=>setOverlay('new')}> <PlusIcon className='w-5 h-5'/> New training</button>
            </div>
        </div>
        {
            trainings.data.map((training,i)=>{
                return(
                    <div key={i} className='shadow-md rounded-xl shadow-gray-400 relative my-9 p-3 flex w-4/5 mx-auto'>
                        <button className='absolute right-0'><EllipsisVerticalIcon className='w-7 h-7'/></button>
                        <div className='flex-grow'>
                            <PhotoIcon className='w-40 h-40 text-gray-400'/>
                            <div className='flex gap-5'>
                                <Link className='text-secondary flex items-center justify-center hover:font-semibold gap-1' href={`/trainings/users?id=${training.id}`}><UserIcon className='w-4 h-4'/> Attendees</Link>
                                <Link className='text-secondary flex items-center justify-center hover:font-semibold gap-1' href={`/trainings/certificate?id=${training.id}`}><DocumentIcon className='w-4 h-4'/> Certificate</Link>
                            </div>
                        </div>
                        <div className='flex-grow'>
                            <h3 className='font-bold text-xl text-primary'>{training.Name}</h3>
                            <p className='text-sm'>{training.Info}</p>
                            <p className=''>{training.StartDate}</p>
                        </div>
                    </div>
                )
            })
        }
        <Overlay className={`${overlay!=''?'block':'hidden'}`} >
            {overlay === 'new' && <New control={setOverlay} />}
        </Overlay>
    </div>
    );
}