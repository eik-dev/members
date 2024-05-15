import { useEffect, useState } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export function Institutions({data, setData}){
    let [Institution, setInstitution] = useState('');
    let [Certification, setCourse] = useState('');
    let [start, setStartDate] = useState('');
    let [end, setEndDate] = useState('');

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
        setData([...data, {
            Institution,
            Certification,
            start,
            end
        }])
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

    return(
        <>
        <div className="w-[90%]">
            {
                data.map((item, index)=>{
                    return(
                        <div key={index} className='my-8 flex flex-col gap-4 md:flex-row justify-between items-center'>
                            <Input disabled={true} value={item.Institution} placeholder={'University of Nairobi'} type={'text'} name={'Institution'}/>
                            <Input disabled={true} value={item.Certification} placeholder={'Enviromental Science'} type={'text'} name={'Course'}/>
                            <Input disabled={true} value={item.start} placeholder={''} type={'date'} name={'Start date'}/>
                            <Input disabled={true} value={item.end}  placeholder={''} type={'date'} name={'End date'}/>
                            <button onClick={e=>remove(e,index)} className="text-2xl px-6 h-fit rounded-md bg-warning font-semibold text-white">-</button>
                        </div>
                    )
                })
            }
            <div className='my-8 flex flex-col gap-4 md:flex-row justify-between'>
                <Input required={true} value={Institution} setValue={setInstitution} placeholder={'University of Nairobi'} type={'text'} name={'Institution'}/>
                <Input value={Certification} setValue={setCourse} placeholder={'BSc. Enviromental Science'} type={'text'} name={'Certification'}/>
                <Input value={start} setValue={setStartDate} placeholder={''} type={'date'} name={'Start date'}/>
                <Input value={end} setValue={setEndDate} placeholder={''} type={'date'} name={'End date'}/>
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
    let [Organization, setInstitution] = useState('');
    let [Position, setCourse] = useState('');
    let [Location, setLocation] = useState('');
    let [start, setStartDate] = useState('');
    let [end, setEndDate] = useState('');

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
        setData([...data, {Organization, Location, Position, start, end}])
        setInstitution('')
        setCourse('')
        setLocation('')
        setStartDate('')
        setEndDate('')
    }

    let remove = (e, i) => {
        e.preventDefault();
        let temp = data.filter((item, index)=>index!=i)
        setData(temp)
    }

    return(
        <>
        <div className="w-[90%]">
            {
                data.map((item, index)=>{
                    return(
                        <div key={index} className='my-8 flex flex-col gap-4 md:flex-row justify-between items-center'>
                            <Input disabled={true} value={item.Organization} placeholder={''} type={'text'} name={'Organization'}/>
                            <Input disabled={true} value={item.Position} placeholder={''} type={'text'} name={'Position'}/>
                            <Input disabled={true} value={item.Location} placeholder={''} type={'text'} name={'Location'}/>
                            <Input disabled={true} value={item.start} placeholder={''} type={'date'} name={'Start date'}/>
                            <Input disabled={true} value={item.end}  placeholder={''} type={'date'} name={'End date'}/>
                            <button onClick={e=>remove(e,index)} className="text-2xl px-6 h-fit rounded-md bg-warning font-semibold text-white">-</button>
                        </div>
                    )
                })
            }
            <div className='my-8 flex flex-col gap-4 md:flex-row justify-between'>
                <Input required={true} value={Organization} setValue={setInstitution} placeholder={''} type={'text'} name={'Organization'}/>
                <Input value={Position} setValue={setCourse} placeholder={''} type={'text'} name={'Position'}/>
                <Input value={Location} setValue={setLocation} placeholder={'Nairobi, Kenya'} type={'text'} name={'Location'}/>
                <Input value={start} setValue={setStartDate} placeholder={''} type={'date'} name={'Start date'}/>
                <Input value={end} setValue={setEndDate} placeholder={''} type={'date'} name={'End date'}/>
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
    let [show, setShow] = useState(type=='password'?true:false)

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
        <div id={name.replace(/\s+/g, '').toLowerCase()} className={`border-2 flex rounded-md focus-within:border-primary focus-within:text-primary py-2 pr-4 relative h-fit w-full ${error?'text-warning border-warning':'text-gray-500'}`}>
            <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">{name} {required ? '*' : ''}</span>
            {
                type=='textarea'?
                <textarea required disabled={disabled} className={`px-4 w-full h-48 ${disabled?'text-black':'text-gray-600'}`} type="text" placeholder={placeholder} value={value} onChange={e=>setValue(e.target.value)} />
                :
                <input disabled={disabled} className={`px-4 w-full ${disabled ? 'text-black' : 'text-gray-600'}`} type={show?'password':type=='password'?'text':type} placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} />
            }
            {
                type=='password'?
                show?
                <EyeIcon onClick={e=>{setShow(false)}} className="w-5 h-5"/>
                :
                <EyeSlashIcon onClick={e=>{setShow(true)}} className="w-5 h-5"/>
                :
                null
            }
        </div>
    );
}