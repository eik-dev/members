'use client'
import { Scanner } from '@yudiel/react-qr-scanner';
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
export default function Page(){
    let params = useSearchParams();
    let id = params.get('id');
    let [data, setData] = useState({
        name: '',
        member: '',
        date:''
    });
    let [link, setLink] = useState('');

    useEffect(()=>{
        setData({
            name: 'frida nyiva mutui',
            member: 'EIK/1/4247',
            date:'08/04/2024'
        })
    },[])

    let verify = result=>{
        if (result.includes('https://members-sooty.vercel.app/verify?id='))
            window.location.href = result
        else
            alert('Invalid QR code')
    }

    return(
        <Suspense>
            {
                id == null?
                <>
                <h3>Scan QR Code</h3>
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
                <div className="mx-4">
                    <span className="bg-primary text-white px-4 py-2 block my-4 text-center text-xl font-semibold lg:w-1/2">Certificate Valid</span>
                    <h3>Certificate {id} <br /> issued to {data.name.toUpperCase()}</h3>
                    <div>Member Number: {data.member}</div>
                    <div>Date issued: {data.date}</div>
                </div>
            }
        </Suspense>
    )
}