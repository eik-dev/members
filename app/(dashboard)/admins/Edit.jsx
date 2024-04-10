import { XMarkIcon } from "@heroicons/react/24/outline"

export default function Edit({control}){
    return(
    <div className="bg-white">
        <h1>Edit</h1>
        <XMarkIcon onClick={e=>control('')} />
    </div>
    )
}