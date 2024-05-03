import {load} from './storage.js'

export function getAdmin(length, search, page){
    token = load('token');
    fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(err => console.log(err));
}