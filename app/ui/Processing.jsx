import { XMarkIcon } from "@heroicons/react/24/outline"

export default function Processing({control}) {
    return (
        <div className='flex flex-col items-center justify-center h-96'>
            <div className="flex w-full mx-2 mb-4 justify-between items-center">
                <XMarkIcon className="w-8 h-8 text-white" onClick={e=>control('')} />
            </div>
            <img className='w-20 mb-5' src="/icons/loading.svg" alt="" />
        </div>
    )
}