'use client'
import SideNav from "@/app/ui/sidenav";
import { useContext, useState, useEffect } from "react"
import { Context } from "@/app/lib/ContextProvider"
import { Bars3Icon, BellIcon, ChevronDownIcon, LockClosedIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Overlay from "@/app/ui/overlay";
import ChangePassword from "../ui/Password";
import { useRouter } from "next/navigation";
import {load, remove} from '@/app/lib/storage';
import { popupE } from "@/app/lib/trigger";
import { Suspense } from "react";

export default async function Layout({children}){
    let [showMenu, setShowMenu] = useState(false);
    let {User} = useContext(Context);
    let [user, setUser] = User;

    let [showOverlay, setShowOverlay] = useState(false);
    let [overlay, setOverlay] = useState('');
    let [showOptions, setShowOptions] = useState(false);
    let router = useRouter();

    let logout = e => {
        remove('token');
        setUser({});
    }

    useEffect(()=>{
        let token = load('token');
        
        if (Object.keys(user).length === 0 && token){
            //previous login but user info not in memory -> get user info from server
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.status === 401){
                    res.json().then(data => {
                        popupE('error', 'Session expired',data.message)
                        router.push('/login')
                    })
                }
                return res.json()
            })
            .then(data => {
                console.log("Getting session data")
                if (Object.keys(data).length != 0){
                    console.log(data);
                    setUser({...data.user})
                }else{
                    //if token is invalid
                    router.push('/login')
                }
            })
            .catch(err => {
                popupE('error', 'Server error','Internal server error')
                console.log(err)
            });
        }
        else if (Object.keys(user).length === 0 && !token){
            //no previous login
            router.push('/login')
        }

    },[])
    useEffect(()=>{
    },[user])

    useEffect(()=>{
        if (overlay=='') setShowOverlay(false)
        else setShowOverlay(true)
    },[overlay])

    return(
        <Suspense fallback={<div>Loading....</div>}>
            <div className="flex">
                <div className={`h-[100%] fixed mt-4 bg-white ${showMenu?'-translate-x-0 z-10':'-translate-x-96'} lg:translate-x-0`}>
                    <SideNav control={setShowMenu}/>
                </div>
                <div onClick={e=>{showMenu?setShowMenu(false):null}} className="w-[100%] no-scroll lg:w-[80%] absolute right-0 lg:mr-10 2xl:mr-20 overflow-y-auto">
                    <header className="flex justify-between right-0 mt-4 md:my-6 md:mb-12 2xl:mb-20">
                        <div className="ml-4">
                            <Bars3Icon onClick={e=>setShowMenu(true)} className="w-8 h-8 lg:hidden block"/>
                        </div>
                        <div className="flex mr-4 relative">
                            <img className="w-6 h-6 rounded-full" src={user.photo?user.photo:'/profile.svg'} alt="" />
                            <span className="min-w-[2px] min-h-6 h-max bg-tertiary mx-4"></span>
                            <button className="flex items-center" onClick={e=>setShowOptions(!showOptions)}>
                                {
                                    user.name &&
                                    <span className="mx-4 lg:text-xs 2xl:text-base">{user.name.split(' ')[0]}</span>
                                }
                                <ChevronDownIcon className="w-6 h-6"/>
                            </button>
                        </div>
                        <div className={`border-2 text-sm bg-white py-2 px-4 absolute right-4 2xl:right-32 top-12 md:top-14 ${showOptions?'block':'hidden'}`} onClick={e=>setShowOptions(false)}>
                            <button className="flex items-center border-b-2 whitespace-nowrap py-2" onClick={e=>setOverlay('password')}>
                                <LockClosedIcon className="w-6 h-6 mr-2"/>
                                Change Password
                            </button>
                            <button className="flex items-center text-warning py-2" onClick={e=>logout(e)}>
                                <ArrowLeftEndOnRectangleIcon className="w-6 h-6 mr-2"/>
                                Logout
                            </button>
                        </div>
                    </header>

                    {children}

                    <Overlay className={`${showOverlay?'block':'hidden'}`} >
                        {overlay === 'password' && <ChangePassword control={setOverlay} />}
                    </Overlay>

                    <footer className="my-10"></footer>
                </div>
            </div>
        </Suspense>
    )
}