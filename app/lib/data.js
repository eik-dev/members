import {load} from './storage.js'
import { popupE } from "@/app/lib/trigger"

export function getData(setData,endpoint,parameters) {
    let token = load('token');
    //map parameters to get parameter format
    let params = new URLSearchParams(parameters).toString();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}?${params}`, {
    headers: {
        'Authorization': `Bearer ${token}`,
    }
    })
    .then(response => response.json())
    .then(data => {
        console.log(`From ${endpoint}`, data)
        if (data.error) popupE('error', 'Error', data.error)
        else setData(data);
        if (data.message) popupE('ok', 'Success', data.message)
    })
    .catch(err => {
        console.log(err)
        popupE('error', 'Error', 'Server Error')
    });
}

export function postFile(file,endpoint) {
    let token = load('token');
    const formData = new FormData();
    formData.append(`file`, file);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: "POST",
        headers:{
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.error==null)
            popupE('ok', 'Success', 'File sent')
        });
}

export async function postData(setData,data,endpoint) {
    let token = load('token');
    console.log(`Data:`, data)
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: "POST",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(`From ${endpoint}`, data)
        if (data.error) popupE('error', 'Error', data.error)
        if (data.message) popupE('ok', 'Success', data.message)
        setData(data);
    });
}