'use client'
import { useContext } from "react"
import { Context } from "@/app/lib/ContextProvider"
import {BellIcon, ChevronDownIcon} from '@heroicons/react/24/outline'

export default function Header(){
    let {User} = useContext(Context);
    return(
        <header className="">
            <img className="w-48" src="/transparent-logo.svg" alt="" />
            EIK
        </header>
    )
}