'use client'
import { useContext } from "react";
import { Context } from "@/app/lib/ContextProvider";
import Individual from "./Individual";
import Firm from "./Firm";

export default function page(){
    let {User} = useContext(Context);

    return(
        <>
        {false?<Individual/>:<Firm/>}
        </>
    )
}