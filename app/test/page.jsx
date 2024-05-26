'use client'
import { useState, useEffect } from 'react';
import { postData } from '../lib/data';

export default function Page(){
    let [data, setData] = useState([])

    let send = e=>{
        e.preventDefault();
        postData((response)=>{
            console.log(response)
        },{
            phone:'254791210705',
            amount: 5
        },'/pay/mpesa')
    }

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`).then(res=>res.json()).then(data=>{
            setData(data)
        })
    }, [])
    
    return(
        <div>
            <h3>Iconify</h3>
            <h1>Mpesa STK</h1>
            <button onClick={e=>send(e)}>Send</button>

            <h2 className='my-6'>Test DB</h2>
            {
                data.map((item, index) => (
                    <div key={index}>
                        <h3>{item.name}</h3>
                        <p>{item.author}</p>
                    </div>
                ))
            }
        </div>
    )
}