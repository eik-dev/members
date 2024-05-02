'use client'
import { useState, useContext } from 'react'
import { Context } from '@/app/lib/ContextProvider';
import Link from 'next/link';

export default function Page() {
    let { User } = useContext(Context);
    let [user, setUser] = User;
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')


    let login = (e) => {
        e.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
            email: email,
            password: password,
            name: name
            })
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    
    return(
        <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="flex flex-col items-center justify-center">
                <img className="mx-auto h-24 w-auto" src="/transparent-logo.svg" alt="Your Company"/>
                <span className="text-primary font-bold text-xl md:text-4xl inline-block align-bottom ml-4 text-center">Environment Institute of Kenya</span>
            </div>

            <div className="mt-10 sm:mx-auto w-full max-w-sm">
            <form className="space-y-6">
            <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6">
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                        id="username"
                        name="username"
                        type="username"
                        autoComplete="username"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className="pl-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-geen-600 sm:text-sm sm:leading-6 text-black"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6">
                        Email
                    </label>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="pl-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-geen-600 sm:text-sm sm:leading-6 text-black"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6">
                        Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        id="password"
                        name="password"
                        type={true?"password":"text"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="pl-2 text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6">
                        Confirm Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        id="password"
                        name="password"
                        type={true?"password":"text"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="pl-2 text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                <button
                    onClick={e=>login(e)}
                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sign up
                </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?
                <Link href={'/login'}>
                    <span className="font-semibold leading-6 text-secondary hover:text-blue-500">Sign in</span>
                </Link>
            </p>
            </div>
        </div>
    )
}