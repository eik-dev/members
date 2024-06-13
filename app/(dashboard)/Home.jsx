import Link from "next/link"
import { Suspense } from "react"
import useUser from "@/app/lib/hooks/useUser";
import Spinner from "@/app/ui/Spinner";

export default function Home(){
    const { user, isLoading, isError } = useUser()
    
    if (isLoading) return <Spinner />
    if (isError) return <></>

    const name = user.name.split(' ');
    if(name.length==1) name.push('');
    let displayName = (`${name[0]}, ${name[1].charAt(0)}!`);

    return(
        <Suspense fallback={<div>Loading....</div>}>
            <div className="m-2">
            <div className="flex flex-col md:flex-row">
                <div>
                    <h2 className="text-3xl 2xl:text-4xl text-right md:text-left mb-6 font-bold">Hello, <span className="text-primary">{displayName}</span></h2>
                    <p className="w-2/3 hidden md:block text-base 2xl:text-lg">This portal is your gateway to exclusive resources, networking opportunities, and support to enhance your professional journey.</p>
                </div>
                <div>
                    <img src="/icons/Home.svg" className="" alt="" />
                </div>
                <p className="block md:hidden">This portal is your gateway to exclusive resources, networking opportunities, and support to enhance your professional journey.</p>
            </div>
            <div>
                <h3 className="text-2xl 2xl:text-3xl text-right md:text-left mb-6 font-bold">Upcoming <span className="text-primary">Trainings</span></h3>
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
        </Suspense>
    )
}