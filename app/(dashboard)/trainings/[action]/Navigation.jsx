'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation(){
    let path = usePathname().replaceAll('%20',' ');
    let pathArray = path.split('/')
    let sub = pathArray[pathArray.length-1];
    let pages = ['Basic Information','Calendar','Media','Certificate','Publish']

    return (
        <nav>
            {
                pages.map((page,index)=>{
                    return(
                        <Link key={index} href={`/trainings/create/${index==0?'':page}`} className={`flex items-center my-5 ${path.includes('Basic')?'':''}`}>
                            <div className="mr-1">
                                {sub=='calendar' && <div className="text-primary border-l-2 border-primary flex items-center"><span className="w-6 h-6 icon-[fluent--radio-button-16-filled]"/></div>}
                                {(sub!='Publish' && sub!='media') && <span className="w-6 h-6 icon-[fluent--radio-button-16-regular]"/>}
                                {sub=='Publish' && <span className="w-6 h-6 icon-[teenyicons--tick-circle-outline] text-primary"/>}
                            </div>
                            {page}
                        </Link>
                    )
                })
            }
        </nav>
    )
}