'use client'
import { createContext, useState } from "react";

export let Context = createContext();

export default function ContextProvider({ children }) {
    let User = useState({});
    return(
        <Context.Provider value={{User}}>
        {children}
        </Context.Provider>
    )
}