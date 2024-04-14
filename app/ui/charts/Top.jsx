export default function Top({title, contorl}){
    return(
        <div className='flex justify-between py-6'>
            <div className='text-primary font-bold text-xl'>{title}</div>
            <select className="bg-white border-[2px] rounded-lg p-2" name="" id="">
                <option className='bg-white hover:bg-white' value="daily">Daily</option>
                <option className='bg-white hover:bg-white' value="weekly">Weekly</option>
                <option className='bg-white hover:bg-white' value="monthly">Monthly</option>
                <option className='bg-white hover:bg-white' value="monthly">Custom</option>
            </select>
        </div>
    )
}