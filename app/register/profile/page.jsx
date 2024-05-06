'use client'
import { useState, useContext, useEffect } from 'react'
import { Context } from "@/app/lib/ContextProvider"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import Input from "@/app/ui/Input"
import {load, save, saveDB, loadDB} from "@/app/lib/storage"
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline'

export default function Page() {
    let {Signup} = useContext(Context)
    let [data, setData] = Signup
    let router = useRouter()

    let [image, setImage] = useState(null);
    const [dragging, setDragging] = useState(false);

    let [practicing, setPracticing] = useState(false);
    let [category, setCategory] = useState('Fellow');
    let [name, setName] = useState('');
    let [last, setLast] = useState('');
    let [firmName, setFirmName] = useState('');
    let [username, setUsername] = useState('');
    let [nema, setNema] = useState('');
    let [firm, setFirm] = useState('');
    let [pin, setPin] = useState('');
    let [nationality, setNationality] = useState('');
    let [ID, setID] = useState('');
    let [postal, setPostal] = useState('');
    let [town, setTown] = useState('');
    let [county, setCounty] = useState('');
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [alternate, setAlternate] = useState('');
    let [note, setNote] = useState('');

    useEffect(() => {
        loadDB('profile').then(res=>{
            setImage(res)
        })
        .catch(err=>console.log(err))
        if (load('data')){
            let saved = load('data')
            setData({...data, ...saved})
        }
        console.log(data)
    }, [])

    let validate = () => {
        if (email.length < 1) return false;
        return true;
    }

    let next = e => {
        e.preventDefault();
        if (validate()){
            save('data', {
                ...data,
                category: category,
                name: name,
                last: last,
                username: username,
                firm: firm,
                firmName: firmName,
                nema: nema,
                email:email
            })
            router.push('/register/requirements')
        } else{
            alert('Please fill Email field')
        }
    }
    const handleFileChange = (event) => {
        let file = event.target.files[0];
        if (file && file.type.startsWith('image/')){
            let url = URL.createObjectURL(file);
            // saveDB('profile', file)
            setImage(url);
        } else {
            alert ('File uploaded not image')
        }
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        let file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')){
            let url = URL.createObjectURL(file);
            // saveDB('profile', file)
            setImage(url);
        } else {
            alert ('File uploaded not image')
        }
    };
    let edit = true;

    return(
        <div className='md:w-2/3 md:mx-auto'>
            <h1 className='text-xl md:text-2xl font-medium mx-2 py-2 border-b-2 mb-8'>Profile info</h1>
            <div className='flex flex-col md:flex-row gap-5'>

                <div className='h-[50%]'>
                    <h4 className='mb-4'>Upload Profile Photo</h4>
                    <div
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`p-2 mx-2 rounded-md flex flex-col items-center justify-center ${dragging ? "border-2 border-primary" : "border-2"}`}
                    >
                        {
                            image?
                            <img src={image} alt="profile" className='h-56 w-56 rounded-lg'/>
                            :
                            <ViewfinderCircleIcon className='text-tertiary h-56 w-56'/>
                        }
                        <input 
                            type="file"
                            id='profile' 
                            accept=".jpg,.jpeg,.png"
                            multiple onChange={handleFileChange} 
                            placeholder='Upload profile photo'
                            className="
                                text-sm text-stone-500
                                file:mr-5 file:py-1 file:px-3 file:border-[1px]
                                file:text-xs file:font-medium
                                file:bg-stone-50 file:text-stone-700
                                hover:file:cursor-pointer hover:file:bg-blue-50
                                hover:file:text-blue-700
                                file:hidden
                            " 
                        />
                        <label htmlFor="profile" className='py-4'>
                            <span className='text-secondary'>Browse Files</span> or Drag into area
                        </label>
                    </div>
                </div>

                <div>
                    <h3>Select Category</h3>
                    <div className='my-4 flex flex-col md:flex-row gap-4'>
                        <select className="bg-white border-[2px] rounded-lg p-2" name="" id="" onChange={e=>setPracticing(!practicing)}>
                            <option className='bg-white hover:bg-white' value={false}>Non-Practicing Membership</option>
                            <option className='bg-white hover:bg-white' value={true}>Practising Membership</option>
                        </select>
                        {
                            data.type=='Individual'?
                            practicing?
                            <select className="bg-white border-[2px] rounded-lg p-2" name="" id="" onChange={e=>setCategory(e.target.value)}>
                                <option className='bg-white hover:bg-white' value="Fellow">Fellow membership</option>
                                <option className='bg-white hover:bg-white' value="Lead">Lead membership</option>
                                <option className='bg-white hover:bg-white' value="Associate">Associate membership</option>
                            </select>
                            :
                            <select className="bg-white border-[2px] rounded-lg p-2" name="" id="" onChange={e=>setCategory(e.target.value)}>
                                <option className='bg-white hover:bg-white' value="Honorary">Honorary membership</option>
                                <option className='bg-white hover:bg-white' value="Affiliate">Affiliate membership</option>
                                <option className='bg-white hover:bg-white' value="Student">Student membership</option>
                            </select>
                            :
                            null
                        }
                        {
                            data.type=='Firm'?
                            practicing?
                            <div>
                                Firms membership
                            </div>
                            :
                            <div>
                                Corporate membership
                            </div>
                            :null
                        }
                    </div>
                    <div className='grid gap-4 md:grid-cols-2'>
                        {
                            data.type=='Individual'?
                            <>
                            <Input value={name} setValue={setName} placeholder={'Jane'} type={'text'} name={'First name'}/>
                            <Input value={last} setValue={setLast} placeholder={'Doe'} type={'text'} name={'Last name'}/>
                            <Input value={username} setValue={setUsername} placeholder={'Username'} type={'username'} name={'username'}/>
                            <Input value={firm} setValue={setFirm} placeholder={'Firm name'} type={'text'} name={'Firm'}/>
                            </>
                            :
                            <Input value={firmName} setValue={setFirmName} placeholder={'XYZ ltd.'} type={'text'} name={'Firm of experts'}/>
                        }
                        <Input value={email} setValue={setEmail} placeholder={'jane@gmail.com'} type={'email'} name={'Email'}/>
                        <Input value={alternate} setValue={setAlternate} placeholder={'jane@gmail.com'} type={'email'} name={'Alternate email'}/>
                        <Input value={nationality} setValue={setNationality} placeholder={'Kenya'} type={'text'} name={'Nationality'}/>
                        <Input value={ID} setValue={setID} placeholder={'12345678'} type={'number'} name={'National ID'}/>
                        <Input value={postal} setValue={setPostal} placeholder={'1234-4321'} type={'text'} name={'Postal Address'}/>
                        <Input value={town} setValue={setTown} placeholder={'Town'} type={'text'} name={'Town'}/>
                        <Input value={county} setValue={setCounty} placeholder={'County'} type={'text'} name={'County'}/>
                        <Input value={nema} setValue={setNema} placeholder={'AXR/321'} type={'text'} name={'NEMA'}/>
                        <Input value={pin} setValue={setPin} placeholder={'4321'} type={'number'} name={'Firm PIN'}/>
                        <Input value={phone} setValue={setPhone} placeholder={'0712345678'} type={'phone'} name={'Phone number'}/>
                    </div>
                </div>
            </div>
            
            <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit mt-4 md:w-2/3 mx-2">
                <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Bio</span>
                <textarea disabled={!edit} className={`px-4 w-full h-48 ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Note" value={note} onChange={e=>setNote(e.target.value)} />
            </div>

            <div className='flex mt-8 ml-2 my-4 justify-between'>
                <div></div>
                <div className='flex gap-5'>
                    <Link href={'/register/type'}>
                        <div className="leading-6 bg-tertiary border-2 w-fit py-2 text-center mr-4 rounded-md px-6 md:text-xl">Back</div>
                    </Link>
                    <div onClick={e=>next(e)} className='font-semibold leading-6 text-white bg-primary w-fit text-center mr-4 py-2 rounded-md md:text-xl'>
                        <span className="px-6">Next</span>
                    </div>
                </div>
            </div>
        </div>
    )
}