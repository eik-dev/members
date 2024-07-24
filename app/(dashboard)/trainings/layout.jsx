'use client'
import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function TrainingsLayout({children}){
    let path = usePathname();

    return(
        <div>
            {
                path!=='/trainings' && <Link href={'/trainings'}><ChevronLeftIcon className="w-6 h-6"/></Link>
            }
            {children}
        </div>
    )
}