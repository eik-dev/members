'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    let params = useSearchParams();
    let id = params.get('id');
    let [data, setData] = useState({});

    useEffect(()=>{
        setData({
            id: id,
            name: 'frida nyiva mutui',
            member: 'EIK/1/4247',
            date:'08/04/2024'
        })
    },[])

    return (
    <div>
        <h1>Download Receipt</h1>
        <p>Download your receipt here. ID = {data.id}</p>
    </div>
    );
}