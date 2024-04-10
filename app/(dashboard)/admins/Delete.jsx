import { XMarkIcon } from "@heroicons/react/24/outline"

export default function Delete({control}){
    return(
        <div className="bg-white">
            <h1>Delete</h1>
            <XMarkIcon onClick={e=>control('')} />
        </div>
    )
}