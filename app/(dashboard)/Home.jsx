'use client'
import Link from "next/link"
import { Suspense, useState } from "react"
import useUser from "@/app/lib/hooks/useUser";
import useProfile from "@/app/lib/hooks/useProfile"
import Spinner from "@/app/ui/Spinner";
import Overlay from "@/app/ui/overlay"
import Pay from "@/app/ui/Pay"
import { XMarkIcon } from "@heroicons/react/24/outline";

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
        default:
            break;
    }
}
export default function Home(){
    let [overlay, setOverlay] = useState('');
    const { user, isLoading, isError } = useUser()
    let { data:profile, isProfileLoading, isProfileError } = useProfile()
    
    if (isLoading  || isProfileLoading) return <Spinner />
    if (isError || isProfileError) return <div>Server error</div>

    const name = user.name.split(' ');
    if(name.length==1) name.push('');
    let displayName = (`${name[0]}, ${name[1].charAt(0)}!`);

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
                        <div className="grid grid-cols-2 md:w-1/2 gap-y-1">
                            <div className="font-semibold text-lg">Membership status:</div>
                            <div className={`${user?.active?'':'text-warning'}`}>{user?.active?'Active':'Expired'}</div>
                            <div className="font-semibold text-lg">Membership type:</div>
                            <div>{profile?.profile?.category}</div>
                            <div className="font-semibold text-lg">Expiry date:</div>
                            <div>{`31st December, ${user?.active?'2024':'2023'}`}</div>
                            <div className="font-semibold text-lg">CPD Points:</div>
                            <div>{user?.points} points.</div>
                        </div>
                        {
                            !user?.active &&
                            <div className="md:w-1/2 mt-4">
                                <p>
                                Your membership expired on <span className="font-semibold">31st December, 2023.</span> Please make a payment to renew your subscription and continue enjoying the benefits of being an EIK member.
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
            <div>
                <h3 className="text-2xl 2xl:text-3xl text-right md:text-left my-6 font-bold">Upcoming <span className="text-primary">Trainings</span></h3>
            </div>
            <div className="flex flex-col md:flex-row gap-12 mt-12 bg-gradient-to-r from-white from-70% to-primary/70 to-95% py-12">
                <div>
                    <img className="w-96" src="/home/Hero-Image.png" alt="" />
                </div>
                <div className="md:w-1/3">
                    <h3 className="text-secondary text-xl 2xl:text-2xl font-bold">Principles of Sustainable Waste Management</h3>
                    <p className="mt-4">
                    Discover innovative solutions and practical tips to reduce, reuse, and recycle waste effectively. Together, lets pave the way towards a greener, cleaner future. RSVP now and be part of the change!
                    </p>
                    <a href="https://elearning.eik.co.ke/" target="_blank" rel="noopener noreferrer">
                    <button className="bg-secondary text-white py-2 px-4 font-semibold mt-6 rounded-lg hover:scale-105">Register Now</button></a>
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
        <Overlay className={`${overlay!=''?'block':'hidden'}`} >
            {
            overlay=='Pay' &&
            <div className="bg-white px-8 py-6 rounded-md md:w-1/3">
                <div className="flex justify-between mb-6">
                    <h6 className="font-semibold text-lg">Make Payment</h6>
                    <button onClick={e=>setOverlay('')}><XMarkIcon className="w-8 h-8"/></button>
                </div>
                <Pay title={'Annual Fees'} description={'Annual subscription fee'} amount={getAmount(profile?.profile?.category)} email={profile?.profile?.email} phone={profile?.profile?.phone} name={profile?.profile?.name} />
            </div>
            }
        </Overlay>
        </Suspense>
    )
}