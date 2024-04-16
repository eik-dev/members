'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'
import QRCode from 'qrcode'

async function downloadPDF(e,data){
    e.preventDefault();
    console.log('Downloading...');

    let pngImageBytes = await fetch('/transparent-logo.png').then(res =>res.arrayBuffer()).catch(err => console.error(err));

    let qrImageBytes = await fetch(await QRCode.toDataURL(`https://members-sooty.vercel.app/verify?id=${data.id}`)).then(res => res.arrayBuffer()).catch(err => console.error(err));

    const pdfDoc = await PDFDocument.create()
    pdfDoc.registerFontkit(fontkit)

    let pngImage = await pdfDoc.embedPng(pngImageBytes);
    let qrCodeImage = await pdfDoc.embedPng(qrImageBytes);

    let pngDims = pngImage.scale(1);
    let qrCodeDims = qrCodeImage.scale(0.25);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    let fontSize = 30;
    let fontBytes = await fetch('/DancingScript-Regular.ttf').then(res => res.arrayBuffer()).catch(err => console.error(err));
    let dancingScript = await pdfDoc.embedFont(fontBytes, {subset: true});

    let line = height - pngDims.height;
    page.drawImage(pngImage, {
        x: width/2 - pngDims.width/2,
        y: line,
        width: pngDims.width,
        height: pngDims.height,
    });
    
    line = line - pngDims.height;
    page.drawText('Certificate of Membership', {
        x: 50,
        y: line,
        size: fontSize,
        font: dancingScript,
        color: rgb(0, 0.53, 0.71),
    })
    
    line = line - fontSize
    fontSize = 10;
    page.drawText('This is to verify that', {
        x: 50,
        y: line,
        size: fontSize,
        color: rgb(0, 0, 0),
    })

    line = line - fontSize
    page.drawText(data.name.toUpperCase(), {
        x: 50,
        y: line,
        size: fontSize,
        color: rgb(0, 0, 0),
    })

    line = line - fontSize
    page.drawText('Member NO: '+ data.member, {
        x: 50,
        y: line,
        size: fontSize,
        color: rgb(0, 0, 0),
    })

    line = line - fontSize*4
    page.drawImage(qrCodeImage, {
        x: 50,
        y: line,
        width: qrCodeDims.width,
        height: qrCodeDims.height,
    });
    

    const pdfBytes = await pdfDoc.save()

    //download pdf
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'certificate.pdf';
    link.click();
}

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
    <div className='mx-2'>
        <h1>Download Certificate</h1>
        <h3>Certificate No: {data.id} <br /> issued to {data.name}</h3>
            <div>Member Number: {data.member}</div>
            <div>Date issued: {data.date}</div>
        <button className=' px-4 py-2 bg-secondary text-white my-4' onClick={e=>downloadPDF(e,data)}>Download</button>
    </div>
    );
}