'use client'
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'
import QRCode from 'qrcode'
import { getData } from "@/app/lib/data";

async function modifyPdf(e,data) {
    e.preventDefault();
    const url = '/certificates/eik-cert.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    let qrImageBytes = await fetch(await QRCode.toDataURL(`https://portal.eik.co.ke/verify?id=${data['number']}`)).then(res => res.arrayBuffer()).catch(err => console.error(err));
  
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    let qrCodeImage = await pdfDoc.embedPng(qrImageBytes);
    let qrCodeDims = qrCodeImage.scale(0.75);
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    firstPage.drawText(data['user'].name.toUpperCase(), {
        x: width/3 + 180,
        y: height / 2 + 60,
        size: 70,
        color: rgb(0, 0, 0),
    })
    firstPage.drawText('Member No: '+ data['number'], {
        x: width/2 - 290,
        y: height / 2 - 50,
        size: 50,
        color: rgb(0, 0, 0),
    })
    firstPage.drawText(data['verified'], {
        x: width - 1100,
        y: 365,
        size: 60,
        color: rgb(0, 0, 0),
    })
    firstPage.drawImage(qrCodeImage, {
        x: width/2,
        y: 300,
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
                <button className=' px-5 py-2 bg-secondary hover:bg-primary text-white my-4 rounded-full' onClick={e=>modifyPdf(e,data)}>Download</button>
            </div>
        }
    </Suspense>
    );
}