'use client'
import { Scanner } from '@yudiel/react-qr-scanner';
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getData } from "@/app/lib/data";

export default function Page(){
    let params = useSearchParams();
    let id = params.get('id');
    let [data, setData] = useState({
        name: '',
        member: '',
        date:''
    });

    useEffect(()=>{
        if (id != null)
        getData(setData, '/certificate/verify', {id})
    },[])

    let verify = result=>{
        if (result.includes('https://portal.eik.co.ke/verify?id='))
            window.location.href = result
        else
            alert('Invalid QR code')
    }

    return(
        <Suspense>
            {
                id == null?
                <>
                <h3 className='my-4 text-center text-xl'>Scan QR Code</h3>
                <Scanner
                    onResult={(text, result) => verify(text)}
                    onError={(error) => console.log(error?.message)}
                    styles={{
                        container: {
                            height: '10%',
                            width: '100%'
                        },
                        finderBorder: 0,
                        video:{}
                    }}
                    options={{}}
                    components={{
                        audio: false,
                    }}
                />
                </>
                :
                <div className="mx-4 md:mx-auto md:w-2/3">
                    <span className="bg-primary text-white px-4 py-2 block my-4 text-center text-xl font-semibold lg:w-1/2">Certificate Valid</span>
                    <div className='my-2'>Issued to: {data['user'].name}</div>
                    <div className='my-2'>Member Number: {data['number']}</div>
                    <div className='my-2'>Date issued: {data['created_at']}</div>
                </div>
            }
        </Suspense>
    )
}