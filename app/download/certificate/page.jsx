'use client'
import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import { fetcher } from "@/app/lib/data";
import useSWR from 'swr';
import Spinner from '@/app/ui/Spinner';
import Certificate from '@/app/ui/Certificate';

export default function Page() {
    let params = useSearchParams();
    let id = params.get('id');
    let certificateRef = useRef();

    let handlePrint = useReactToPrint({
        content: () => certificateRef.current,
    });

    let {data, isLoading, error} = useSWR(['/certificate/download', {id:id}, ''], fetcher);

    if (isLoading) return <Spinner />

    console.log(data)
    
    return (
        
        <div className=''>
            <h1 className='text-primary text-center text-xl md:text-2xl font-bold mt-8 md:mb-8'>Download Certificate</h1>
            <div className='flex items-center justify-center gap-12'>
                <div className=''>Valid upto: 31-12-2024</div>
                <button className=' px-5 py-2 bg-secondary hover:bg-primary text-white my-4 rounded-full' onClick={handlePrint}>Download</button>
            </div>

            <div className='hidden md:flex justify-center'>
                <Certificate data={data} ref={certificateRef}/>
            </div>
            <div className='md:hidden flex flex-col mx-2 justify-center'>
                <p>Issued to: {data.user.name.toUpperCase()}</p>
                <p>On: {data.verified}</p>
                <p>Member number: {data.number}</p>
            </div>
        </div>
    );
}