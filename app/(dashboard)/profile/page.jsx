'use client'
import { useContext } from "react";
import { Context } from "@/app/lib/ContextProvider";
import Individual from "./Individual";
import Firm from "./Firm";

export default function Page(){
    let {User} = useContext(Context);

    return(
        <>
        {true?<Individual/>:<Firm/>}
        </>
    )
}