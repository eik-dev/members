export default function Page(){
    return(
        <div>
            <h5 className="text-2xl font-semibold mb-4">Basic information</h5>
            <div>
                <label htmlFor="title">Training title</label>
                <input className="block border-2 px-2 py-1 rounded-sm mt-1" name="title" placeholder="Training title" type="text" />
            </div>
            <div>
                <label htmlFor="title">Member groups</label>
                <input className="block border-2 px-2 py-1 rounded-sm mt-1" name="title" placeholder="Training category" type="text" />
            </div>
            <div className="mt-6">
                <label htmlFor="title">Class Description</label>
                <textarea className="block p-2 bg-transparent border-2 w-4/5 h-56 rounded-lg" placeholder="Training description" name="" id=""></textarea>
            </div>
            
            <h5 className="text-xl mt-8 font-semibold mb-4">Pricing Information</h5>
        </div>
    )
}