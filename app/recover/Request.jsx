'use client'
import { useState } from 'react'
import Link from 'next/link';
import { popupE } from '@/app/lib/trigger';
import { useSearchParams } from "next/navigation";

export default function Request() {
    let [email, setEmail] = useState('')

    let send = (e) => {
        e.preventDefault()
        
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/recover?email=${email}`).then(res => res.json()).then(data => {
            console.log(data)
            if(data.success) popupE('ok', 'Success', data.success)
            if(data.error){
                popupE('error', 'Error', data.error)
            }
        }).catch(err => popupE('error', 'Error', "Server error"))
    }
    
    return(
        <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="flex flex-col items-center justify-center">
                <img className="mx-auto h-24 w-auto" src="/transparent-logo.svg" alt="Your Company"/>
            </div>

            <div className="mt-10 sm:mx-auto w-full max-w-sm">
            <form className="space-y-6">
                <div>
                <label htmlFor="username" className="block text-sm leading-6 font-bold">
                    Email
                </label>
                <div className="mt-2">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    placeholder='janedoe@gmail.com'
                    onChange={e=>setEmail(e.target.value)}
                    className="pl-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-geen-600 sm:text-sm sm:leading-6 text-black"
                    />
                </div>
                </div>

                <div>
                <button
                    onClick={e=>send(e)}
                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Recover
                </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                {'Don\'t have an account?'}
                <Link href={'/register'}>
                    <span className="font-semibold leading-6 text-secondary hover:text-blue-500">Sign Up</span>
                </Link>
            </p>
            </div>
        </div>
    )
}