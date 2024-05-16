export default function Home(){

    return(
        <div>
            <div className="flex">
                <div>
                    <h2 className="text-2xl">Hello <span>Sifa. K!</span></h2>
                    <p className="w-2/3 text-lg">This portal is your gateway to exclusive resources, networking opportunities, and support to enhance your professional journey.</p>
                </div>
                <div>
                    <img src="/icons/Home.svg" className="" alt="" />
                </div>
            </div>
            <div>
                <h3>Upcoming <span>Trainings</span></h3>
            </div>
            <h3>Our Latest <span>Newsletters</span></h3>
            <p>
            Stay informed with the most recent updates on environmental initiatives, research insights, and community engagement efforts. Stay connected, stay informed, and join us as we strive towards a sustainable future for Kenya and beyond.
            </p>
            <div className="flex">
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    <h3>Principles of Sustainable Waste Management</h3>
                    <p className="">
                    Discover innovative solutions and practical tips to reduce, reuse, and recycle waste effectively. Together, lets pave the way towards a greener, cleaner future. RSVP now and be part of the change!
                    </p>
                    <button className="bg-secondary text-white py-2 px-4 font-semibold mt-6">Register Now</button>
                </div>
            </div>
        </div>
    )
}