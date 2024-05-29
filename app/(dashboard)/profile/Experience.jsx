import { useState, useEffect, useContext } from "react"
import { Context } from "@/app/lib/ContextProvider";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import Input from "@/app/ui/Input";
import { getData } from "@/app/lib/data";

export default function Experience({control}){
    let {Profile} = useContext(Context);
    let [profile, setProfile] = Profile;
    let [note, setNote] = useState('');
    let [Organization, setInstitution] = useState('');
    let [start, setStart] = useState('');
    let [end, setFinish] = useState('');
    let [Position, setTitle] = useState('');
    let [Location, setLocation] = useState('');
    let [index, setIndex] = useState(0);
    let [data, setData] = useState([]);
    
    useEffect(()=>{
        console.log(profile)
        setData(profile.profession)
    },[])
    useEffect(()=>{
        if(data.length>0){
            setInstitution(data[index].Organization)
            setStart(data[index].start)
            setFinish(data[index].end)
            setTitle(data[index].Position)
            setLocation(data[index].Location)
            setNote(data[index].Duties)
        }
    },[data])
    useEffect(()=>{
        if(data.length>0){
            setInstitution(data[index].Organization)
            setStart(data[index].start)
            setFinish(data[index].end)
            setTitle(data[index].Position)
            setLocation(data[index].Location)
            setNote(data[index].Duties)
        }
    },[index])

    let submit = e=>{
        e.preventDefault();
    }
    let delete_ = (e,id) => {
        e.preventDefault();
        if (id!=-1){
            setData(data.filter((item, index)=>index!=id));
            getData((_)=>{},'/profile/edit/profession',{id})
        }
        else setData(data.filter((item, i)=>i!=index))
    }
    let next = e=>{
        e.preventDefault();
        if (index<data.length-1) setIndex(index+1)
    }
    let back = e=>{
        e.preventDefault();
        if (index>0) setIndex(index-1)
    }

    let add = e => {
        e.preventDefault();
        setData([...data, {Organization:'', Location:'', Position:'', start:'', end:''}])
        setInstitution('')
        setTitle('')
        setLocation('')
        setStart('')
        setFinish('')
        setIndex(index+=1);
    }
    
    return(
    <div className="bg-white w-[80%] md:w-1/3 py-1 px-4 rounded-lg max-h-[89%] -mt-12 overflow-y-scroll">
        <div className="flex md:mx-2 mb-4 justify-between items-center py-3 sticky -top-1 bg-white z-50 border-b-2">
            <span className="font-semibold">Edit Work Experience</span>
            <XMarkIcon className="w-8 h-8" onClick={e=>control('')} />
        </div>

        <div className="flex justify-around md:w-3/5 md:mx-auto">
            <ChevronLeftIcon className="w-5 h-5" onClick={e=>back(e)} />
            <div>{index+1} <span className="mx-1">of</span> {data.length}</div>
            <ChevronRightIcon className="w-5 h-5" onClick={e=>next(e)} />
        </div>

        <div className="flex justify-between my-4">
            <div></div>
            <button onClick={e=>{
                data['id']?delete_(e,data['id']):delete_(e,-1)
            }} className="font-semibold text-warning px-4 py-1 rounded-sm">Delete</button>
        </div>

        <div className="flex md:w-4/5 md:mx-auto flex-col justify-center gap-y-8 gap-x-10 mt-8 mb-4">
            <Input value={Organization} setValue={setInstitution} placeholder={''} type={'text'} name={'Institution'}/>
            <Input value={Position} setValue={setTitle} placeholder={''} type={'text'} name={'Title'}/>
            <Input value={Location} setValue={setLocation} placeholder={''} type={'text'} name={'Location'}/>
            <Input value={start} setValue={setStart} placeholder={''} type={'date'} name={'Start Date'}/>
            <Input value={end} setValue={setFinish} placeholder={''} type={'date'} name={'Finish Date'}/>
            <Input value={note} setValue={setNote} placeholder={''} type={'textarea'} name={'Duties'}/>
        </div>

        <div className="flex items-center group md:px-8">
            <div className="bg-gray-200 w-full h-1 group-hover:bg-secondary"></div>
            <button onClick={e=>add(e)} className="text-xl bg-gray-200 group-hover:bg-secondary group-hover:text-white px-4 py-2 rounded-full">+</button>
        </div>

        <div className="flex w-full justify-between gap-4 my-4 text-sm">
            <button onClick={e=>submit(e)} className="py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold bg-primary text-white">Save Changes</button>
            <button className="border-2 py-2 px-4 w-[50%] whitespace-nowrap rounded-md font-semibold" onClick={e=>control('')}>Cancel</button>
        </div>
    </div>
    )
}