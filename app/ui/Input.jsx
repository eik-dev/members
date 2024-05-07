import { useEffect, useState } from "react"

export function Institutions({data, setData}){
    let [institution, setInstitution] = useState('');
    let [course, setCourse] = useState('');
    let [startDate, setStartDate] = useState('');
    let [endDate, setEndDate] = useState('');

    let handler = e => {
    }

    useEffect(()=>{
        //register to the verify event that's sent to all input elements
        let elem = document.getElementsByTagName('input')
        for (let e of elem){
            e.addEventListener('verify', e=>handler(e))
        }
    },[])

    let add = e => {
        e.preventDefault();
        setData([...data, {institution, course, startDate, endDate}])
        setInstitution('')
        setCourse('')
        setStartDate('')
        setEndDate('')
    }

    let remove = (e, i) => {
        e.preventDefault();
        let temp = data.filter((item, index)=>index!=i)
        setData(temp)
    }

    useEffect(()=>{
    },[institution, course, startDate, endDate])

    return(
        <>
        <div className="w-[90%]">
            {
                data.map((item, index)=>{
                    return(
                        <div key={index} className='my-8 flex flex-col gap-4 md:flex-row justify-between items-center'>
                            <Input disabled={true} value={item.institution} placeholder={'University of Nairobi'} type={'text'} name={'Institution'}/>
                            <Input disabled={true} value={item.course} placeholder={'Enviromental Science'} type={'text'} name={'Course'}/>
                            <Input disabled={true} value={item.startDate} placeholder={''} type={'date'} name={'Start date'}/>
                            <Input disabled={true} value={item.endDate}  placeholder={''} type={'date'} name={'End date'}/>
                            <button onClick={e=>remove(e,index)} className="text-2xl px-6 h-fit rounded-md bg-warning font-semibold text-white">-</button>
                        </div>
                    )
                })
            }
            <div className='my-8 flex flex-col gap-4 md:flex-row justify-between'>
                <Input required={true} value={institution} setValue={setInstitution} placeholder={'University of Nairobi'} type={'text'} name={'Institution'}/>
                <Input value={course} setValue={setCourse} placeholder={'Enviromental Science'} type={'text'} name={'Course'}/>
                <Input value={startDate} setValue={setStartDate} placeholder={''} type={'date'} name={'Start date'}/>
                <Input value={endDate} setValue={setEndDate} placeholder={''} type={'date'} name={'End date'}/>
            </div>
        </div>
        <div className="flex items-center group">
            <div className="bg-gray-200 w-full h-1 group-hover:bg-secondary"></div>
            <button onClick={e=>add(e)} className="text-xl bg-gray-200 group-hover:bg-secondary group-hover:text-white px-4 py-2 rounded-full">+</button>
        </div>
        </>
    )
}

export function Organizations({data, setData}){
    let [institution, setInstitution] = useState('');
    let [course, setCourse] = useState('');
    let [startDate, setStartDate] = useState('');
    let [endDate, setEndDate] = useState('');

    let handler = e => {
    }

    useEffect(()=>{
        //register to the verify event that's sent to all input elements
        let elem = document.getElementsByTagName('input')
        for (let e of elem){
            e.addEventListener('verify', e=>handler(e))
        }
    },[])

    let add = e => {
        e.preventDefault();
        setData([...data, {institution, course, startDate, endDate}])
        setInstitution('')
        setCourse('')
        setStartDate('')
        setEndDate('')
    }

    let remove = (e, i) => {
        e.preventDefault();
        let temp = data.filter((item, index)=>index!=i)
        setData(temp)
    }

    useEffect(()=>{
    },[institution, course, startDate, endDate])

    return(
        <>
        <div className="w-[90%]">
            {
                data.map((item, index)=>{
                    return(
                        <div key={index} className='my-8 flex flex-col gap-4 md:flex-row justify-between items-center'>
                            <Input disabled={true} value={item.institution} placeholder={''} type={'text'} name={'Organization'}/>
                            <Input disabled={true} value={item.course} placeholder={''} type={'text'} name={'Position'}/>
                            <Input disabled={true} value={item.startDate} placeholder={''} type={'date'} name={'Start date'}/>
                            <Input disabled={true} value={item.endDate}  placeholder={''} type={'date'} name={'End date'}/>
                            <button onClick={e=>remove(e,index)} className="text-2xl px-6 h-fit rounded-md bg-warning font-semibold text-white">-</button>
                        </div>
                    )
                })
            }
            <div className='my-8 flex flex-col gap-4 md:flex-row justify-between'>
                <Input required={true} value={institution} setValue={setInstitution} placeholder={''} type={'text'} name={'Organization'}/>
                <Input value={course} setValue={setCourse} placeholder={''} type={'text'} name={'Position'}/>
                <Input value={startDate} setValue={setStartDate} placeholder={''} type={'date'} name={'Start date'}/>
                <Input value={endDate} setValue={setEndDate} placeholder={''} type={'date'} name={'End date'}/>
            </div>
        </div>
        <div className="flex items-center group">
            <div className="bg-gray-200 w-full h-1 group-hover:bg-secondary"></div>
            <button onClick={e=>add(e)} className="text-xl bg-gray-200 group-hover:bg-secondary group-hover:text-white px-4 py-2 rounded-full">+</button>
        </div>
        </>
    )
}

export default function Input({type, value, setValue, placeholder, disabled, name, required }){
    let [error, setError] = useState(false)

    let handler = e => {
        if (required && value=='') setError(true)
        else setError(false)
    }
    useEffect(()=>{
        //register to the verify event that's sent to all input elements
        let elem = document.getElementsByTagName('input')
        for (let e of elem){
            e.addEventListener('verify', e=>handler(e))
        }
    },[])
    return (
        <div id={name.replace(/\s+/g, '').toLowerCase()} className={`border-2 rounded-md focus-within:border-primary focus-within:text-primary py-2 relative h-fit w-full ${error?'text-warning border-warning':'text-gray-500'}`}>
            <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">{name} {required ? '*' : ''}</span>
            <input disabled={disabled} className={`px-4 w-full ${disabled ? 'text-black' : 'text-gray-600'}`} type={type} placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} />
        </div>
    );
}