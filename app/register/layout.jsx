'use client'
import { usePathname } from "next/navigation";
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

export default function Layout({children}){
    let pathname = usePathname();
    console.log(pathname)
    return(
        <div className='md:w-2/3 md:mx-auto'>
            <div className=" text-right text-sm my-4 mr-1">
                <span>Already have an account?</span>
                <Link href={'/login'}> <span className="text-secondary font-semibold">Sign in</span> </Link>
            </div>
            {
                (pathname === '/register/individual' || pathname === '/register/firm') && 
                <Link href={'/register'}>
                    <ArrowLeftIcon className="w-6 h-6 ml-2"/>
                </Link>
            }
            
            <div className="mt-6 mx-2">
                {children}
            </div>
        </div>
    )
}