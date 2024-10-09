import Navigation from "./Navigation"
import Status from "./Status"

export default function CreateLayout({children}){
    return(
        <main className="mx-2">
            <div className="flex gap-4 mt-8">
                <div className="w-1/4"><Navigation/></div>
                <div className="w-2/3">{children}</div>
                <Status/>
            </div>
        </main>
    )
}