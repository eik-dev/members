'use client'
import Link from "next/link";
import { useContext } from "react";
import { Context } from "@/app/lib/ContextProvider";
import { usePathname } from "next/navigation";
import {RectangleGroupIcon, UserPlusIcon, Square3Stack3DIcon, UserGroupIcon, BuildingLibraryIcon, AcademicCapIcon, ArrowLeftEndOnRectangleIcon} from '@heroicons/react/24/outline';

export default function SideNav({control}){
    let {User} = useContext(Context);
    let pathname = usePathname();


    let links = [
        {
            name: "Dashboard",
            icon: RectangleGroupIcon,
            href: "/",
            roles:['Admin','Member','Firm']
        },
        {
            name: "Admins",
            icon: UserPlusIcon,
            href: "/admins",
            roles:['Admin']
        },
        {
            name: "User Logs",
            icon: Square3Stack3DIcon,
            href: "/logs",
            roles:['Admin']
        },
        {
            name: "Members",
            icon: UserGroupIcon,
            href: "/members",
            roles:['Admin']
        },
        {
            name: "Firms",
            icon: BuildingLibraryIcon,
            href: "/firms",
            roles:['Admin']
        },
        {
            name: "Certificates",
            icon: AcademicCapIcon,
            href: "/certificates",
            roles:['Admin']
        }
    ]
    return(<>
    <img className="w-48" src="/transparent-logo.svg" alt="" />
    {
        links.map((link, index) => {
            if(link.roles.includes(User[0].role)){
                return(
                    <Link key={index} href={link.href} onClick={e=>control(false)}>
                        <div className={`flex items-center p-4 ${pathname === link.href ? ' border-l-8 border-primary text-primary' : ''}`}>
                            <link.icon className="w-6 h-8 mr-2"/>
                            {link.name}
                        </div>
                    </Link>
                )
            }
        })
    }
        <div className="flex items-center text-warning absolute bottom-10 ml-4">
            <ArrowLeftEndOnRectangleIcon className="w-6 h-8 mr-2"/>
            Logout
        </div>
    </>)
}