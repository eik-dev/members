import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { getData } from "@/app/lib/data";
import { popupE } from "@/app/lib/trigger";

export default function Delete({control, data}){
    let submit = e=>{
        e.preventDefault();
        popupE('ok', 'processing', 'Please wait...')
        getData((_)=>{}, '/training/member/delete', {number:data.Number})
        control('');
    }

    return(
    <div className="bg-white max-w-[60vw] py-1 px-4 rounded-lg">
        <div className="flex flex-col items-center justify-center gap-y-4 my-4">
            <div className="bg-warning bg-opacity-20 rounded-full p-4">
                <ExclamationTriangleIcon className="w-8 h-8 text-warning"/>
            </div>
            <span className="text-warning font-bold">Delete User</span>
        </div>
        <p className="my-8 text-center text-sm">
        Are you sure? This action cannot be undone. All values associated with this user will be lost.
        </p>
        <div className="flex w-full justify-between gap-4 my-4 text-xs md:text-sm">
            <button className="py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-warning text-white" onClick={e=>submit(e)}>Yes, Delete Member</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}