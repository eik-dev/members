'use client'
import Dashboard from "./Dashboard";
import Home from './Home';
import { useContext } from "react";
import { Context } from "@/app/lib/ContextProvider";

export default function Page(){
    let {User} = useContext(Context);
    return(
        <>
        {User[0].role=='Admin'?<Dashboard/>:<Home/>}
        </>
    )
}