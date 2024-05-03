export default function Input({type, value, setValue, placeholder, disabled, name }){
    return(
        <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit">
            <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">{name}</span>
            <input disabled={disabled} className={`px-4 w-full ${disabled?'text-black':'text-gray-600'}`} type={type} placeholder={placeholder} value={value} onChange={e=>setValue(e.target.value)} />
        </div>
    )
}