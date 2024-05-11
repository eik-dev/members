'use client'
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'
import QRCode from 'qrcode'
import { getData } from "@/app/lib/data";

async function downloadPDF(e,data){
    e.preventDefault();
    console.log('Downloading...');

    let pngImageBytes = await fetch('/certificates/transparent-logo.png').then(res =>res.arrayBuffer()).catch(err => console.error(err));

    let qrImageBytes = await fetch(await QRCode.toDataURL(`https://portal.eik.co.ke/verify?id=${data['number']}`)).then(res => res.arrayBuffer()).catch(err => console.error(err));

    const pdfDoc = await PDFDocument.create()
    pdfDoc.registerFontkit(fontkit)

    let pngImage = await pdfDoc.embedPng(pngImageBytes);
    let qrCodeImage = await pdfDoc.embedPng(qrImageBytes);

    let pngDims = pngImage.scale(1);
    let qrCodeDims = qrCodeImage.scale(0.25);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    let fontSize = 30;
    let fontBytes = await fetch('/certificates/DancingScript-Regular.ttf').then(res => res.arrayBuffer()).catch(err => console.error(err));
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
    page.drawText(data['user'].name.toUpperCase(), {
        x: 50,
        y: line,
        size: fontSize,
        color: rgb(0, 0, 0),
    })

    line = line - fontSize
    page.drawText('Member NO: '+ data['number'], {
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
    let [data, setData] = useState();
    useEffect(()=>{
        getData(setData, '/certificate/download', {id:id})
    },[])
    
    return (
    <Suspense>
        {
            data &&
            <div className='mx-2 md:mx-auto md:w-1/3'>
                <h1 className='text-primary text-center md:text-2xl font-bold my-10'>Download Certificate</h1>
                <h3>Issued to: {data['user'].name}</h3>
                <div className='my-3'>Member Number: {data['number']}</div>
                <div className='my-3'>Valid upto: {data['expiry']}</div>
                <button className=' px-5 py-2 bg-secondary hover:bg-primary text-white my-4 rounded-full' onClick={e=>downloadPDF(e,data)}>Download</button>
            </div>
        }
    </Suspense>
    );
}