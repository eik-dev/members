'use client'
import { useState, useContext, useEffect } from 'react'
import { Context } from '@/app/lib/ContextProvider';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Login() {
    let { User } = useContext(Context);
    let [user, setUser] = User;
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    let router = useRouter();


    let login = (e) => {
        e.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.error != null) {
                throw new Error(data.error)
            }
            setUser({...data.user});
            setTimeout(() => {
                router.push('/')
            }, 1000);
        })
        .catch(err => console.log(err))

    }
    
    return(
        <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
            {
                Object.keys(user).length>0?(
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline">You have successfully logged in.</span>
                        {
                            Object.keys(user).map((key) => (
                                <div key={key}>
                                    <span>{key}: </span>
                                    <span>{user[key]}</span>
                                </div>
                            ))
                        }
                    </div>
                ):null
            }
            <div className="flex flex-col items-center justify-center">
                <img className="mx-auto h-24 w-auto" src="/transparent-logo.svg" alt="Your Company"/>
                <span className="text-primary font-bold text-xl md:text-4xl inline-block align-bottom ml-4 text-center">Environment Institute of Kenya</span>
            </div>

            <div className="mt-10 sm:mx-auto w-full max-w-sm">
            <form className="space-y-6">
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
                    <div className="text-sm">
                    <Link href={'/recover'}>
                        <span className="font-semibold leading-6 text-secondary hover:text-blue-500">Forgot password?</span>
                    </Link>
                    </div>
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
                    Sign In
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