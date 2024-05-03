'use client'
import { createContext, useState } from "react";

export let Context = createContext();

export default function ContextProvider({ children }) {
    let User = useState({});
    let Signup = useState({});
    return(
        <Context.Provider value={{User, Signup}}>
        {children}
        </Context.Provider>
    )
}