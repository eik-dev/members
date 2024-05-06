'use client'
import { useContext } from 'react';
import { Context } from '@/app/lib/ContextProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
    let {Signup} = useContext(Context)
    let [data, setData] = Signup

    let router = useRouter()
    let signup = (e) => {
        e.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            email: email,
            password: password,
            name: name
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error != null) {
                throw new Error(data.error)
            }
            if(!save('token', data.user.token)) alert('Error saving token');
            setUser({...data.user});
            setTimeout(() => {
                router.push('/')
            }, 1000);
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <h1>Preview & Submit</h1>
            <h3>Profile</h3>
            <div className='flex gap-5 mt-8 ml-2 my-4'>
                <Link href={'/register/requirements'}>
                    <div className="leading-6 bg-tertiary border-2 w-fit py-2 text-center mr-4 rounded-md px-6 md:text-xl">Back</div>
                </Link>
                <button className='font-semibold leading-6 text-white bg-primary w-fit text-center mr-4 py-2 px-6 rounded-md md:text-xl' onClick={e=>signup(e)}>
                Submit
                </button>
            </div>
        </div>
    )
}