'use client'
import { createContext, useState } from "react";

export let SignupContext = createContext();

export default function SignupProvider({ children }) {
    let Type = useState(null);
    let Category = useState(null);
    let Name = useState('');
    let Last = useState('');
    let Username = useState('');
    let Email = useState('');
    let Nema = useState('');
    let Nationality = useState('');
    let Postal = useState('');
    let Town = useState('');
    let County = useState('');
    let Phone = useState('');
    let Alternate = useState('');
    let Password = useState('');
    let Confirm = useState('');
    let FirmName = useState('');
    let Pin = useState('');
    
    return(
        <SignupContext.Provider value={{
            Type, Category,
            Name, Last, Username, Email, Nema, Nationality, Postal, Town, County, Phone, Alternate, Password, Confirm,
            Pin, FirmName,
        }}>
            {children}
        </SignupContext.Provider>
    )
}