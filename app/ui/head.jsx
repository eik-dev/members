'use client'
import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon, ChevronDownIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function Head({children, Range, Search, Title, TH, placeholder, Sort}){
    let pathname = usePathname();
    let [range, setRange] = Range;
    let [search, setSearch] = Search;
    let [sort, setSort] = Sort;
    let [showDropDown, setShowDropDown] = useState(false);
    return(
        <div className="mt-4">
            <div className="flex justify-between my-6">
                <h1 className="my-2 text-primary font-bold text-4xl">{Title}</h1>
                <div className="flex items-center">
                    <span className=" w-fit">1 - </span>
                    <input className="w-8 text-center bg-tertiary" placeholder="20" type="text" name="" id="" />
                    <span>of</span>
                    <span>{'100'}</span>
                    <button>
                        <ChevronLeftIcon className="w-6 h-6"/>
                    </button>
                    <button>
                        <ChevronRightIcon className="w-6 h-6"/>
                    </button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-4">
                <div className="flex rounded-md py-2 bg-tertiary w-4/5 mx-auto md:w-fit md:mx-1">
                    <MagnifyingGlassIcon className="w-6 h-6 mx-2"/>
                    <input className="bg-tertiary active:bg-none active:border-none" type="text" name="" id="" placeholder="Search registerd admins" />
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-y-4">
                    <div className="flex justify-around">
                        <div className="flex items-center" onClick={e=>setShowDropDown(!showDropDown)}>
                            <AdjustmentsVerticalIcon className="w-6 h-6 mr-2"/>
                            <span>Sort By</span>
                        </div>
                        <div className="flex bg-surface w-fit py-2 px-4 rounded-lg mx-6 relative" onClick={e=>setShowDropDown(!showDropDown)}>
                            {sort}
                            <ChevronDownIcon className="w-6 h-6"/>
                            <div className={`flex flex-col z-40 bg-white absolute top-10 gap-y-2 ${showDropDown?'block':'hidden'}`} onClick={e=>setShowDropDown(!showDropDown)}>
                                {
                                    TH.map((th, index) => {
                                        return (<div onClick={e=>setSort(th)} key={index}>{th}</div>)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    
                    {children}
                </div>
            </div>
        </div>
    )
}