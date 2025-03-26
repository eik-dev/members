'use client'
import Link from "next/link"
import { Suspense, useState } from "react"
import useSWR from "swr";
import { fetcher, getData } from "@/app/lib/data";
import Spinner from "@/app/ui/Spinner";
import useUser from "@/app/lib/hooks/useUser";
import useProfile from "@/app/lib/hooks/useProfile"
import Overlay from "@/app/ui/overlay"
import Pay from "@/app/ui/Pay"
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import Countdown from "@/app/ui/Countdown";
import dynamic from 'next/dynamic'
const DotLottieReact = dynamic(() =>import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact),{ssr: false,})

let getAmount = (role) => {
    switch (role) {
        case 'Student':
            return 500;
        case 'Affiliate':
            return 7500;
        case 'Honorary':
            return 0;
        case 'Associate':
            return 3000;
        case 'Lead':
            return 5000;
        case 'Fellow':
            return 0;
        case 'Corporate':
            return 7500;
        default:
            break;
    }
}

export function TWG({joined, twg, key}){
    let [show, setShow] = useState(false);

    let join = (e, twg, action) => {
        e.preventDefault();
        if(action) getData(()=>{},'/twg/join',{twg})
        else getData(()=>{},'/twg/exit',{twg})
    }

    return(
        <div key={key} className="bg-white rounded-lg shadow-lg p-4 my-2 md:mx-2">
            <div className="flex items-center justify-between">
                <h6 className="font-semibold text-lg">{twg.name}</h6>
                <button onClick={e=>setShow(true)} className="block md:hidden">
                    {
                        show?
                        <MinusIcon className="w-8 h-8"/>
                        :
                        <PlusIcon className="w-8 h-8"/>
                    }
                </button>
            </div>
            <div className={`${!show?'hidden':'block'} md:block`}>
                <p className="py-4">{twg.text}</p>
                <button onClick={e=>join(e,twg.name, !joined)} className={`${joined?'text-warning':'text-secondary'} font-light hover:font-normal`}>
                    {
                        joined?'<< Leave':'Join >>'
                    }
                </button>
            </div>
        </div>
    )
}

export function TWGs(){
    const { data:twgs, error, isLoading } = useSWR(['/twg/index',{}], fetcher)
    console.log(twgs)

    return(
        <section className="mb-12">
            <h3 className="text-2xl 2xl:text-3xl text-right md:text-left my-6 font-bold">Technical Working <span className="text-primary">Groups (TWGs)</span></h3>
            <div className="flex flex-col-reverse md:flex-row items-center mb-5">
                <div className="flex-grow">
                    <DotLottieReact
                        src="/animations/group.lottie"
                        loop
                        autoplay
                    />
                </div>
                <p className="md:w-1/2 text-justify leading-6">
                    The Environmental Institute of Kenya (EIK) offers specialized Technical Working Groups (Professional Chapters) that focus on key disciplines within the environmental field. These groups provide members with a platform to collaborate, share knowledge, and contribute to the advancement of environmental conservation and sustainability. By joining a chapter aligned with your expertise or interest, you can engage with like-minded professionals and actively shape the future of Kenya{"\'"}s environmental sector. <span className="font-semibold text-secondary">Select your preferred working group below to get started</span>.
                </p>
            </div>
            {
                (isLoading || error) ?
                <div className="w-full h-[10vh]"><Spinner internal={true} /></div>
                :
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {
                        twgs.all.map((twg, i) => {
                            return <TWG key={i} twg={twg} joined={twgs.twgs.includes(twg.name)} />
                        })
                    }
                </div>
            }
        </section>
    )
}

export default function Home(){
    let [overlay, setOverlay] = useState('');
    let [paymentMeta, setPaymentMeta] = useState({
        title: 'Annual Fees',
        description:'Annual subscription fee'
    })
    const { user, isLoading, isError } = useUser()
    let { data:profile, isProfileLoading, isProfileError } = useProfile()
    
    if (isLoading  || isProfileLoading) return <Spinner />
    if (isError || isProfileError) return <div>Server error</div>

    const name = user.name.split(' ');
    if(name.length==1) name.push('');
    let displayName = (`${name[0]}, ${name[1].charAt(0)}!`);

    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    return(
        <Suspense fallback={<div>Loading....</div>}>
        <div className="m-2">
            {
                !user?.active &&
                <div className="bg-warning text-white flex flex-col md:flex-row gap-3 px-4 py-5 rounded-md mb-10 items-center">
                    <p>Your membership with the EIK has expired. Please renew your membership to continue receiving member privileges.</p>
                    <button onClick={e=>setOverlay('Pay')} className="bg-secondary text-white font-semibold ml-5 py-3 rounded-md px-4 hover:scale-105">Renew Membership</button>
                </div>
            }
            <div className="flex flex-col md:flex-row">
                <div>
                    <h2 className="text-3xl 2xl:text-4xl text-right md:text-left mb-6 font-bold">Hello, <span className="text-primary">{displayName}</span></h2>
                    <p className="w-2/3 hidden md:block text-base 2xl:text-base">This portal is your gateway to exclusive resources, networking opportunities, and support to enhance your professional journey.</p>
                    <div className="my-5">
                        <div className="grid md:grid-cols-2 md:w-1/2 gap-1">
                            <div className="font-semibold whitespace-nowrap text-lg">Membership status:</div>
                            <div className={`${user?.active?'':'text-warning'}`}>{user?.active?'Active':'Expired'}</div>
                            <div className="font-semibold whitespace-nowrap text-lg">Membership type:</div>
                            <div>{profile?.profile?.category}</div>
                            <div className="font-semibold whitespace-nowrap text-lg">Expiry date:</div>
                            <div>{`31st December, ${user?.active?currentYear:previousYear}`}</div>
                            <div className="font-semibold whitespace-nowrap text-lg">CPD Points:</div>
                            <div>{user?.points} points.</div>
                            <div className="font-semibold whitespace-nowrap text-lg">Technical Working Groups:</div>
                            <div>
                                {
                                 profile?.twgs?.twgs.map((twg,i)=>(<span className="block my-1 md:whitespace-nowrap" key={i}>{twg}</span>))   
                                }
                            </div>
                        </div>
                        {
                            !user?.active &&
                            <div className="md:w-1/2 mt-4">
                                <p>
                                Your membership expired on <span className="font-semibold">31st December, {previousYear}.</span> Please make a payment to renew your subscription and continue enjoying the benefits of being an EIK member.
                                </p>
                                <button onClick={e=>setOverlay('Pay')} className="bg-secondary text-white font-semibold mt-5 py-3 rounded-md px-4 hover:scale-105">Make Payment</button>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <img src="/icons/Home.svg" className="" alt="" />
                </div>
                <p className="block md:hidden">This portal is your gateway to exclusive resources, networking opportunities, and support to enhance your professional journey.</p>
            </div>
            <TWGs />
            <div>
                <h3 className="text-2xl 2xl:text-3xl text-right md:text-left font-bold">Upcoming <span className="text-primary">Trainings</span></h3>
            </div>
            <div className="flex flex-col md:flex-row gap-12 bg-gradient-to-r from-white from-70% to-primary/70 to-95% py-12">
                <div>
                    <img className="md:w-3/4" src="/Training1.jpeg" alt="" />
                </div>
                <div className="md:w-2/5">
                    <h3 className="text-secondary text-xl 2xl:text-2xl font-bold">EIK Land Acquisition & Resettlement Planning</h3>
                    <p className="mt-4 text-right text-lg font-semibold">9<span className="align-super text-xs">th</span> - 27<span className="align-super text-xs">th</span> September 2024</p>
                    <p className="mt-2">
                    Land acquisition and resettlement planning is crucial in infrastructure projects as demand for services rises. Resettlement Action Planning (RAP) is vital for fair compensation, livelihood restoration, and minimizing social disruption. It integrates social and environmental safeguards, emphasizing inclusivity, transparency, and protection of vulnerable groups. RAP addresses stakeholder engagement, gender considerations, and human rights, balancing development with social equity and environmental sustainability.
                    </p>
                    <a href="https://bit.ly/eik-course" target="_blank" rel="noopener noreferrer">
                        <button className="bg-secondary text-white py-2 px-4 font-semibold mt-6 rounded-lg hover:scale-105">Register Now</button>
                    </a>
                </div>
            </div>
            <div className="w-4/5 2xl:w-2/3 mx-auto my-12">
                <h3 className="text-2xl 2xl:text-3xl mb-6 font-bold text-center">Our Latest <span className="text-primary">Newsletters</span></h3>
                <p className="text-center">
                Stay informed with the most recent updates on environmental initiatives, research insights, and community engagement efforts. Stay connected, stay informed, and join us as we strive towards a sustainable future for Kenya and beyond.
                </p>
            </div>
            <div className="flex flex-col md:flex-row my-4 gap-5 2xl:gap-8 justify-center">
                <div className="md:w-1/3 2xl:w-1/4 rounded-lg shadow-lg">
                    <img src="/home/transforming.png" alt="" />
                    <div className="p-4">
                        <h6 className="font-bold">Transforming Trash Into Treasure</h6>
                        <p className="py-4 whitespace-pre-wrap">
                        Explore how every piece of trash we collected brings us one step closer to a cleaner, healthier future for our community and the planet.
                        </p>
                        <Link href={'#'}><span className="text-secondary font-light hover:font-normal">Read More {">>"} </span></Link>
                    </div>
                </div>
                <div className="md:w-1/3 2xl:w-1/4 rounded-lg shadow-lg">
                    <img src="/home/oasis.png" alt="" />
                    <div className="p-4">
                        <h6 className="font-bold">An Oasis ofHope</h6>
                        <p className="py-4 whitespace-pre-wrap">
                        Explore how this vital resource is not just water, but the promise of a brighter, more sustainable future for generations to come.
                        </p>
                        <Link href={'#'}><span className="text-secondary font-light hover:font-normal">Read More {">>"} </span></Link>
                    </div>
                </div>
                <div className="md:w-1/3 2xl:w-1/4 rounded-lg shadow-lg">
                    <img src="/home/sustainability.png" alt="" />
                    <div className="p-4">
                        <h6 className="font-bold">Sowing seeds of sustainability</h6>
                        <p className="py-4 whitespace-pre-wrap">
                        Explore how each seedling planted symbolizes not just a tree, but a pledge to nurture nature and cultivate a sustainable future.
                        </p>
                        <Link href={'#'}><span className="text-secondary font-light hover:font-normal">Read More {">>"} </span></Link>
                    </div>
                </div>
            </div>
            <h3 className="text-2xl 2xl:text-3xl my-10 font-bold text-center">Frequently Asked <span className="text-primary">Questions (FAQs) </span></h3>
        </div>
        <Overlay control={setOverlay} className={`${overlay!=''?'flex items-center justify-center':'hidden'}`} >
            {
            overlay=='Pay' &&
            <div className="bg-white px-8 py-6 rounded-md md:w-1/3">
                <div className="flex justify-between mb-6">
                    <h6 className="font-semibold text-lg">Make Payment</h6>
                    <button onClick={e=>setOverlay('')}><XMarkIcon className="w-8 h-8"/></button>
                </div>
                <Pay title={paymentMeta.title} description={paymentMeta.description} amount={getAmount(profile?.profile?.category)} email={profile?.profile?.email} phone={profile?.profile?.phone} name={profile?.profile?.name} />
            </div>
            }
        </Overlay>
        </Suspense>
    )
}