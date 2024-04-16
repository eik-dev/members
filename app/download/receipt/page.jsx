'use client'
import { useEffect, useState } from "react";

export default function Page() {
    let [data, setData] = useState({});

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
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