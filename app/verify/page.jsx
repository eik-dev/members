'use client'
export default function Page(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return(
        <div className="mx-4">
            <span className="bg-primary text-white px-4 py-2 block my-4">Certificate Valid</span>
            <h3>Certificate {id} <br /> issued to {'FRIDA NYIVA MUTUI'}</h3>
            <div>Member Number: {'EIK/1/4247'}</div>
            <div>Date issued: {'08/04/2024'}</div>
        </div>
    )
}