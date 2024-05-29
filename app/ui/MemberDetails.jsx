import { useState, useEffect, useContext } from "react"
import { Context } from "@/app/lib/ContextProvider";
import Image from "next/image";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import Input from "./Input";
import { getData, postData } from "@/app/lib/data";

export default function MemberDetails({control,id}){
    let {Profile} = useContext(Context);
    let [profile, setProfile] = Profile;
    let [data, setData] = useState();
    let [fullName, setFullName] = useState('');
    let [email, setEmail] = useState('');
    let [category, setCategory] = useState('');
    let [nema, setNema] = useState('');
    let [certificate, setCertificate] = useState('');
    let [firm, setFirm] = useState('');
    let [nationality, setNationality] = useState('');
    let [nationalID, setNationalID] = useState('');
    let [postal, setPostal] = useState('');
    let [town, setTown] = useState('');
    let [county, setCounty] = useState('');
    let [phone, setPhone] = useState('');
    let [alternative, setAlternative] = useState('');

    useEffect(()=>{
        if(Object.keys(profile).length > 0){
            console.log('PROFILE ',profile);
            setFullName(profile.profile['name']);
            setEmail(profile.profile['email']);
            setNema(profile.profile['nema']);
            if (profile.certificate) setCertificate(profile.certificate['number']);
            setCategory(profile.profile['category']);
            setFirm(profile.profile['firm']);
            setNationality(profile.profile['nationality']);
            setNationalID(profile.profile['nationalID']);
            setPostal(profile.profile['postal']);
            setTown(profile.profile['town']);
            setCounty(profile.profile['county']);
            setPhone(profile.profile['phone']);
            setAlternative(profile.profile['alternate']);
        }
        else getData(setData, '/admin/member', {id})
    },[])

    useEffect(()=>{
        if(data){
            setFullName(data[0]['name']);
            setEmail(data[0]['email']);
            setNema(data[0]['nema']);
            setCertificate(data[0]['certificates']['number']);
            setCategory(data[0]['individual']['category']);
            setFirm(data[0]['individual']['firm']);
            setNationality(data[0]['individual']['nationality']);
            setNationalID(data[0]['individual']['nationalID']);
            setPostal(data[0]['individual']['postal']);
            setTown(data[0]['individual']['town']);
            setCounty(data[0]['individual']['county']);
            setPhone(data[0]['individual']['phone']);
            setAlternative(data[0]['individual']['alternate']);
        }
    },[data])

    let submit = e=>{
        e.preventDefault();
        let data = {
            id,
            fullName,
            email,
            nema,
            individual: {
                category,
                firm,
                nationalID,
                nationality,
                postal,
                town,
                county,
                phone,
                alternate: alternative
            },
            certificates: {
                number: certificate
            },
        }
        console.log('Sending :: ',data)
        postData((_)=>{},data, '/admin/members')
    }

    return(
    <div className="bg-white w-[80%] md:w-fit py-1 px-4 rounded-lg max-h-[89%] md:max-h-fit -mt-12 overflow-y-scroll">
        <div className="flex md:mx-2 mb-4 justify-between items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
            <span className="font-semibold">Member Details</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        <div className="flex flex-col justify-center gap-y-8 gap-x-10 md:flex-row">
            <div className="w-32 md:w-64 h-fit relative">
            <Image
                src="/profile.svg"
                width={500}
                height={500}
                alt="Picture of the author"
            />
            <div className="bg-secondary p-1 rounded-md w-fit absolute -right-2 -bottom-2">
                <PencilSquareIcon className="w-6 h-6 text-white"/>
            </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 w-full">
                <Input value={fullName} setValue={setFullName} placeholder={''} type={'text'} name={'Full name'}/>
                <Input value={category} setValue={setCategory} placeholder={''} type={'text'} name={'Category'}/>
                <Input value={nema} setValue={setNema} placeholder={''} type={'text'} name={'NEMA Registration Number'}/>
                <Input value={certificate} setValue={setCertificate} placeholder={''} type={'text'} name={'Certificate Number'}/>
                <Input value={firm} setValue={setFirm} placeholder={''} type={'text'} name={'Firm of Experts'}/>
                <Input value={nationality} setValue={setNationality} placeholder={''} type={'text'} name={'Nationality'}/>
                <Input value={nationalID} setValue={setNationalID} placeholder={''} type={'text'} name={'Identification Number'}/>
                <Input value={postal} setValue={setPostal} placeholder={''} type={'text'} name={'Postal Address'}/>
                <Input value={town} setValue={setTown} placeholder={''} type={'text'} name={'Town'}/>
                <Input value={county} setValue={setCounty} placeholder={''} type={'text'} name={'County'}/>
                <Input value={phone} setValue={setPhone} placeholder={''} type={'text'} name={'Phone Number'}/>
                <Input value={email} setValue={setEmail} placeholder={''} type={'email'} name={'Email Address'}/>
                <Input value={alternative} setValue={setAlternative} placeholder={''} type={'text'} name={'Alternative Email Address'}/>
            </div>
        </div>

        <div className="flex md:w-1/2 md:float-right mt-4 md:mt-12 justify-between gap-4 my-4 text-sm">
            <button className={`py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white`} onClick={e=>submit(e)}>Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}