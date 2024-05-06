'use client'
import { usePathname } from "next/navigation";

export default function Layout({children}){
    let pathname = usePathname();
    console.log(pathname)
    return(
        <>
        {children}
        </>
    )
}