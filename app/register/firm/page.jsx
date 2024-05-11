'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Input from "@/app/ui/Input"
import Pay from '@/app/ui/Pay'
import File from '@/app/ui/File'
import { Corporate, Firms } from '@/app/lib/instructions'
import { popupE, verifyE } from '@/app/lib/trigger'

export default function Page() {
    let router = useRouter()

    let [image, setImage] = useState([]);
    let [requirements, setRequirements] = useState([]);

    let [category, setCategory] = useState('Corporate');
    let [firmName, setFirmName] = useState('');
    let [nema, setNema] = useState('');
    let [pin, setPin] = useState('');
    let [nationality, setNationality] = useState('');
    let [postal, setPostal] = useState('');
    let [town, setTown] = useState('');
    let [county, setCounty] = useState('');
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [alternate, setAlternate] = useState('');
    let [note, setNote] = useState('');
    let [password, setPassword] = useState('');
    let [confirm, setConfirm] = useState('');

    let [instructions, setInstructions] = useState(Corporate);
    let [amount, setAmount] = useState(300);

    useEffect(() => {
        switch (category) {
            case 'Corporate':
                setInstructions(Corporate)
                setAmount(300)
                break;
            case 'Firms':
                setInstructions(Firms)
                setAmount(500)
                break;
            default:
                break;
        }
    }, [category])

    let validate = () => {
        //validate all required fields
        if (email == '' || password == '') {
            verifyE();
            popupE('error', 'Error', 'Fill all mandatory fields')
            return false;
        }
        return true;
    }

    let submit = e => {
        e.preventDefault();
        if (validate()){
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: firmName,
                    role: 'Firm',
                    nema: nema,
                    profile:{
                        category: category,
                        alternate: alternate,
                        nationality: nationality,
                        postal: postal,
                        town: town,
                        county: county,
                        kra: pin,
                        phone: phone,
                        note: note,
                    }
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error != null) {
                    throw new Error(data.message)
                }
                if (data.success != null) {
                    if (image.length>0) { //sending profile photo
                        let token = data.token;
                        console.log(`Token: ${token}`)
                        let imageform = new FormData();
                        imageform.append(`file`, image[0]);
                        console.log(image[0].name)
                        fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/profile`, {
                            method: "POST",
                            headers:{
                                'Authorization': `Bearer ${token}`,
                            },
                            body: imageform
                        })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data);
                            if (requirements.length>0){// sending requirements
                                const formData = new FormData();
                                requirements.forEach((file, index) => {
                                    console.log(`${index} :: ${file.name}`);
                                    formData.append(`file`, file);
                                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/requirements`, {
                                        method: "POST",
                                        headers:{
                                            'Authorization': `Bearer ${token}`,
                                        },
                                        body: formData
                                    })
                                        .then((res) => res.json())
                                        .then((data) => {
                                            console.log(data);
                                            popupE('ok', 'Success', 'Account created successfully')
                                            router.push('/login')
                                        });
                                });
                            } else { // no files
                                popupE('ok', 'Success', 'Account created successfully')
                                router.push('/login')
                            }
                        });
                    } else { //no profile photo
                        popupE('ok', 'Success', 'Account created successfully')
                        router.push('/login')
                    }
                }
            })
            .catch(err => {
                console.log(err)
                popupE('error', 'Server Error', err.message)
            })
        }
    }
    

    let edit = true;

    return(
        <div>
            <h1 className='text-xl md:text-2xl font-medium mx-2 py-2 border-b-2 mb-8'>Profile info</h1>
            <div className='flex flex-col gap-5'>

                <div className='h-[50%]'>
                    <h4 className='mb-4'>Upload Profile Photo</h4>
                    <div className='w-1/3'>
                        <File type='image' files={image} setFiles={setImage} />
                    </div>
                </div>

                <div>
                    <h3>Select Category</h3>
                    <div className='my-4 flex flex-col md:flex-row gap-4'>
                        <select className="bg-white border-[2px] rounded-lg p-2" name="" id="" onChange={e=>setCategory(e.target.value)}>
                            <option className='bg-white hover:bg-white' value={'Corporate'}>Corporate Membership</option>
                            <option className='bg-white hover:bg-white' value={'Firms'}>Firms Membership</option>
                        </select>
                    </div>
                    <div className='grid gap-x-6 gap-y-4 md:gap-y-8 md:grid-cols-2'>
                        <Input required={true} value={firmName} setValue={setFirmName} placeholder={'XYZ ltd.'} type={'text'} name={'Firm of experts'}/>
                        <Input required={true} value={email} setValue={setEmail} placeholder={'jane@gmail.com'} type={'email'} name={'Email'}/>
                        <Input value={alternate} setValue={setAlternate} placeholder={'jane@gmail.com'} type={'email'} name={'Alternate email'}/>
                        <Input value={nationality} setValue={setNationality} placeholder={'Kenya'} type={'text'} name={'Nationality'}/>
                        <Input value={postal} setValue={setPostal} placeholder={'1234-4321'} type={'text'} name={'Postal Address'}/>
                        <Input value={town} setValue={setTown} placeholder={'Town'} type={'text'} name={'Town'}/>
                        <Input value={county} setValue={setCounty} placeholder={'County'} type={'text'} name={'County'}/>
                        <Input value={nema} setValue={setNema} placeholder={'AXR/321'} type={'text'} name={'NEMA'}/>
                        <Input required={true} value={pin} setValue={setPin} placeholder={'4321'} type={'text'} name={'Firm KRA PIN'}/>
                        <Input value={phone} setValue={setPhone} placeholder={'0712345678'} type={'phone'} name={'Phone number'}/>
                        <Input required={true} value={password} setValue={setPassword} placeholder={'******'} type={'password'} name={'Password'}/>
                        <Input value={confirm} setValue={setConfirm} placeholder={'******'} type={'password'} name={'Confirm password'}/>
                    </div>
                </div>
            </div>
            
            <div className="border-2 rounded-md focus-within:border-primary text-gray-400 focus-within:text-primary py-2 relative h-fit mt-4 md:mt-8 md:w-2/3 mx-2">
                <span className="text-xs absolute -top-2 left-2 bg-white px-2 focus-within:text-primary font-semibold">Bio</span>
                <textarea disabled={!edit} className={`px-4 w-full h-48 ${edit?'text-black':'text-gray-600'}`} type="text" placeholder="Note" value={note} onChange={e=>setNote(e.target.value)} />
            </div>

            <h1 className='text-xl md:text-2xl font-medium mx-2 py-2 border-b-2 my-8'>Requirements</h1>
            <div className='text-sm md:text-base mx-2'>
                <p className=''>The following requirements must be satisfied for {category} Membership</p>
                {
                    instructions.map((value,index)=>{
                        return(
                            <div className='ml-4' key={index}>{`${index+1}.) `} {value}</div>
                        )
                    })
                }
            </div>
            <div className='mx-2 md:w-1/3 md:mx-auto my-5'>
                <File files={requirements} setFiles={setRequirements} type={'all'}/>
            </div>

            <h1 className='text-xl md:text-xl font-medium mx-2 py-2 border-b-2 mb-8'>Payment</h1>
            <div className='mx-2'>
                <div className='flex gap-2 mb-2'>
                    <div>Amount due: </div>
                    <div>{amount} Ksh</div>
                </div>
                <div className='flex gap-2'>
                    <div>Receipt sent to: </div>
                    <div>{email}</div>
                </div>

                <div className='flex mt-4'>
                    <Pay title={'Registration fee'} description={'First time registration fee'} amount={30} email={email} phone={phone} name={`${firmName}`} />
                </div>
            </div>

            <div className='flex justify-between'>
                <div></div>
                <button className="bg-primary px-4 md:px-6 py-2 text-white font-semibold my-8 rounded-md" onClick={e=>submit(e)}>Sign Up</button>
            </div>

        </div>
    )
}