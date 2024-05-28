'use client'
import { useContext } from "react";
import { useSearchParams } from "next/navigation";
import { Context } from "@/app/lib/ContextProvider";
import Individual from "./Individual";
import Firm from "./Firm";

export default function Page(){
    let {User} = useContext(Context);
    let params = useSearchParams();
    let id = params.get('id');
    let role = params.get('role');

    return(
        <>
        {(User[0].role=='Individual' || role=='Individual')?<Individual id={id} role={role}/>:<Firm id={id} role={role}/>}
        </>
    )
}