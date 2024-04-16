'use client'

export default function Page() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return (
    <div>
        <h1>Download Receipt</h1>
        <p>Download your receipt here. ID = {id}</p>
    </div>
    );
}