import Link from "next/link";
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export default function Page(){
    return(
        <div className="flex flex-col gap-y-10 md:flex-row mt-6 justify-center md:justify-around rounded-xl items-center h-[90vh]">
            <Link href={'/register/individual'}>
                <div className={`flex px-8 md:px-10 py-2 justify-center items-center gap-5 rounded-md text-white bg-secondary hover:bg-primary w-56 h-40`}>
                    <UserIcon className={`w-6 h-8 md:w-12 md:h-12`}/>
                    <span>Individual</span>
                </div>
            </Link>
            <Link href={'/register/firm'}>
                <div className={`flex px-8 md:px-10 py-2 justify-center items-center gap-5 rounded-md text-white bg-secondary hover:bg-primary w-56 h-40`}>
                    <UserGroupIcon className={`w-6 h-8 md:w-12 md:h-12 `}/>
                    <span>Business</span>
                </div>
            </Link>
        </div>
    )
}