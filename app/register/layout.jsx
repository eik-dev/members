'use client'
import { usePathname } from "next/navigation";
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/outline'
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
            <div className="flex mt-6 justify-center md:justify-around rounded-xl">
                <Link href={'/register/individual'}>
                    <div className={`flex px-8 md:px-10 py-2 md:w-56 justify-center items-center gap-5 rounded-s-xl md:rounded-md ${pathname=='/register/individual'?'text-white bg-secondary':'bg-tertiary/40'}`}>
                        <UserIcon className={`w-6 h-8 md:w-12 md:h-12`}/>
                        <span>Individual</span>
                    </div>
                </Link>
                <Link href={'/register/firm'}>
                    <div className={`flex px-8 md:px-10 py-2 md:w-56 justify-center items-center gap-5 rounded-e-xl md:rounded-md ${pathname=='/register/firm'?'text-white bg-secondary':'bg-tertiary/40'}`}>
                        <UserGroupIcon className={`w-6 h-8 md:w-12 md:h-12 `}/>
                        <span>Firm</span>
                    </div>
                </Link>
            </div>
            <div className="mt-6 mx-2">
                {children}
            </div>
        </div>
    )
}