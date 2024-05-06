'use client'
import Link from 'next/link';

export default function Page() {

    return(
        <div className=''>
            <h1>Some basic info</h1>
            <div className='w-2/3 mt-8 mx-auto'>
                <Link href={'/register/type'}>
                    <div className="font-semibold leading-6 text-white bg-primary w-fit py-2 text-center mr-4 rounded-md px-6 text-xl">Start</div>
                </Link>
            </div>
        </div>
    )
}