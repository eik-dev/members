'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react";
import { SignupContext } from "@/app/lib/SignupProvider";

export default function Trail(){
    let path = usePathname();
    let {Category} = useContext(SignupContext)
    let [category, _] = Category

    let paths = ['/register','/register/profile','/register/bio','/register/education', '/register/experience']
    let index = paths.indexOf(path)

    let [steps, setSteps] = useState([
        {
            icon: 'icon-[mynaui--ticket]',
            title: 'Type',
            link: '/register'
        },
        {
            icon: 'icon-[iconamoon--profile-circle-fill]',
            title: 'Profile',
            link: '/register/profile'
        },
        {
            icon: 'icon-[ic--round-fingerprint]',
            title: 'Bio',
            link: '/register/bio'
        },
        {
            icon: 'icon-[game-icons--graduate-cap]',
            title: 'Education',
            link: '/register/education'
        },
        {
            icon: 'icon-[mdi--worker-outline]',
            title: 'Experience',
            link: '/register/experience'
        }
    ]);

    useEffect(()=>{
        if(category==='Student' || category === 'Lead'){
            if(steps.find(step => step.title === 'Education')==undefined)
            setSteps([...steps, {
                icon: 'icon-[game-icons--graduate-cap]',
                title: 'Education',
                link: '/register/education'
            }])
        }else{
            let newSteps = steps.filter(step => step.title !== 'Education')
            setSteps(newSteps)
        }

        if(category === 'Lead'){
            if(steps.find(step => step.title === 'Experience')==undefined)
            setSteps([...steps, {
                icon: 'icon-[mdi--worker-outline]',
                title: 'Experience',
                link: '/register/experience'
            }])
        }else{
            let newSteps = steps.filter(step => step.title !== 'Experience')
            setSteps(newSteps)
        }

        if(category === 'Firm'){
            if(steps.find(step => step.title === 'Requirements')==undefined)
            setSteps([...steps, {
            icon: 'icon-[bi--files]',
            title: 'Requirements',
            link: '/register/requirements'
            }])
        }else{
            let newSteps = steps.filter(step => step.title !== 'Requirements')
            setSteps(newSteps)
        }
    },[category])

    return(
        <section className="flex text-xs md:text-base">
            {
                steps.map((step, i) => (
                    <Link href={step.link} key={i} className="flex-grow">
                        <div className="relative flex justify-center">
                            <div className={`absolute ${index>=i?'bg-secondary':'bg-gray-300'} top-1/2 h-1 w-full`}></div>
                            <div className={`${index>=i?'bg-secondary text-white':'bg-gray-300 text-gray-600'} w-14 h-14 rounded-full flex justify-center items-center`}>
                                <div className={step.icon + ' w-8 h-8'}/>
                            </div>
                        </div>
                        <p className={`text-center font-semibold ${index>=i?'text-secondary':'text-gray-600'}`}>{step.title}</p>
                    </Link>
                ))
            }
        </section>
    )
}