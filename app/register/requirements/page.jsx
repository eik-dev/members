'use client'
import { useState, useContext, useEffect } from 'react'
import { Context } from "@/app/lib/ContextProvider"
import Link from "next/link"
import Input from "@/app/ui/Input"
import Pay from '@/app/ui/Pay'
import File from '@/app/ui/File';
import {load, save} from "@/app/lib/storage"
import {useRouter} from 'next/navigation'
import {Student, Affiliate, Honorary,Corporate,Fellow, Lead, Associate, Firms} from './instructions.json'

export default function Page() {
    let {Signup} = useContext(Context)
    let [data, setData] = Signup
    let [instructions, setInstructions] = useState(Student);
    let router = useRouter()

    useEffect(() => {
        if (load('data')){
            let saved = load('data')
            switch (saved.category) {
                case 'Student':
                    setInstructions(Student)
                    break;
                case 'Affiliate':
                    setInstructions(Affiliate)
                    break;
                case 'Honorary':
                    setInstructions(Honorary)
                    break;
                case 'Associate':
                    setInstructions(Associate)
                    break;
                case 'Lead':
                    setInstructions(Fellow)
                    break;
                case 'Fellow':
                    setInstructions(Lead)
                    break;
                case 'Corporate':
                    setInstructions(Corporate)
                    break;
                case 'Firms':
                    setInstructions(Firms)
                    break;
                default:
                    break;
            }
            console.log(saved)
            setData({...data, ...saved})
        } else {
            router.push('/register/profile')
        }
    }, [])

    let next = e => {
        e.preventDefault()
    }

    return(
        <div className='md:w-2/3 mx-auto'>
            <h1 className='text-xl md:text-2xl font-medium mx-2 py-2 border-b-2 mb-8'>Requirements</h1>
            <div className='text-sm md:text-base mx-2'>
                <p className=''>The following requirements must be satisfied for {data.category} Membership</p>
                {
                    instructions.map((value,index)=>{
                        return(
                            <div className='ml-4' key={index}>{`${index+1}.) `} {value}</div>
                        )
                    })
                }
            </div>
            <div className='mx-2 md:w-1/3 md:mx-auto my-5'>
                <File/>
            </div>

            <h1 className='text-xl md:text-xl font-medium mx-2 py-2 border-b-2 mb-8'>Payment</h1>
            <div className='mx-2'>
                <div className='flex gap-2 mb-2'>
                    <div>Amount due: </div>
                    <div>30 Ksh</div>
                </div>
                <div className='flex gap-2'>
                    <div>Receipt sent to: </div>
                    <div>{data.email}</div>
                </div>

                <div className='flex mt-4'>
                    <button className='leading-6 bg-tertiary border-2 w-fit py-2 text-center mr-4 rounded-md px-6 md:text-xl'>Pay later</button>
                    <Pay title={'Registration fee'} description={'First time registration fee'} amount={30} email={data.email} phone={data.phone} name={`${data.firstname} ${data.lastname}`} />
                </div>
            </div>

            <div className='flex mt-8 ml-2 my-4 justify-between'>
                <div></div>
                <div className='flex gap-5'>
                    <Link href={'/register/profile'}>
                        <div className="leading-6 bg-tertiary border-2 w-fit py-2 text-center mr-4 rounded-md px-6 md:text-xl">Back</div>
                    </Link>
                    <div onClick={e=>next(e)} className='font-semibold leading-6 text-white bg-primary w-fit text-center mr-4 py-2 rounded-md md:text-xl'>
                        <Link href={'/register/preview'}>
                            <span className="px-6">Next</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}