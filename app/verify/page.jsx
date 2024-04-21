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

    useEffect(()=>{
        if (id != null)
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify?id=${id}`).then(res=>res.json()).then(data=>{
                setData(data)
                console.log(data)
            })
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