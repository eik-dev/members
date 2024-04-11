'use client'
import SideNav from "@/app/ui/sidenav";
import { useContext, useState, useEffect } from "react"
import { Context } from "@/app/lib/ContextProvider"
import { Bars3Icon, BellIcon, ChevronDownIcon, LockClosedIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Overlay from "@/app/ui/overlay";
import ChangePassword from "../ui/Password";

export default function Layout({children}){
    let [showMenu, setShowMenu] = useState(false);
    let {User} = useContext(Context);

    let [showOverlay, setShowOverlay] = useState(false);
    let [overlay, setOverlay] = useState('');
    let [showOptions, setShowOptions] = useState(false);

    useEffect(()=>{
        console.clear();
        console.log('clicked')
        if (overlay=='') setShowOverlay(false)
        else setShowOverlay(true)
    },[overlay])

    return(
        <div className="flex h-lvh">
        <div className={`h-[100%] fixed mt-4 bg-white ${showMenu?'-translate-x-0':'-translate-x-96'} lg:translate-x-0`}>
            <SideNav control={setShowMenu}/>
        </div>
        <div onClick={e=>{showMenu?setShowMenu(false):null}} className="w-[100%] lg:w-[80%] fixed right-0 md:mr-10 2xl:mr-20">
            <header className="flex justify-between right-0 mt-4 md:my-6 md:mb-20">
                <div className="ml-4">
                    <Bars3Icon onClick={e=>setShowMenu(true)} className="w-8 h-8 lg:hidden block"/>
                </div>
                <div className="flex mr-4 relative">
                    <BellIcon className="w-6 h-6"/>
                    <span className="min-w-[2px] min-h-6 h-max bg-tertiary mx-4"></span>
                    <button className="flex items-center" onClick={e=>setShowOptions(!showOptions)}>
                        <span className="mx-4">{User[0].role}</span>
                        <ChevronDownIcon className="w-6 h-6"/>
                    </button>
                </div>
                <div className={`border-2 text-sm bg-white py-2 px-4 absolute right-4 2xl:right-32 top-12 md:top-14 ${showOptions?'block':'hidden'}`} onClick={e=>setShowOptions(false)}>
                    <button className="flex items-center border-b-2 whitespace-nowrap py-2" onClick={e=>setOverlay('password')}>
                        <LockClosedIcon className="w-6 h-6 mr-2"/>
                        Change Password
                    </button>
                    <button className="flex items-center text-warning py-2">
                        <ArrowLeftEndOnRectangleIcon className="w-6 h-6 mr-2"/>
                        Logout
                    </button>
                </div>
            </header>

            {children}

            <Overlay className={`${showOverlay?'block':'hidden'}`} >
                {overlay === 'password' && <ChangePassword control={setOverlay} />}
            </Overlay>
        </div>
        </div>
    )
}