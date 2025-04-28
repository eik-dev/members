'use client'

import { useState } from 'react'
import Editor from "@/app/ui/WYSIWYG/Editor"
import useSWR from 'swr'
import { postData, postFile, fetcher } from "@/app/lib/data"
import File from "@/app/ui/File"

export default function Page() {
    const [sessions, setSessions] = useState([])
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [youtubeUrl, setYoutubeUrl] = useState('')
    const [description, setDescription] = useState('')
    const [files, setFiles] = useState([])
    const [selectedTrainers, setSelectedTrainers] = useState([])
    const [trainer, setTrainer] = useState(null)

    const { data: trainers, isLoading, error } = useSWR(['/trainers', {}, null, process.env.NEXT_PUBLIC_TRAININGS_URL], fetcher)

    const handleAddSession = (e) => {
        e.preventDefault()
        const newSession = {
            title,
            date,
            youtubeUrl,
            description,
            resources: files
        }
        setSessions([...sessions, newSession])
        
        // Reset form
        setTitle('')
        setDate('')
        setYoutubeUrl('')
        setDescription('')
        setFiles([])
    }

    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleSave = (e)=>{
        e.preventDefault();
        sessions.forEach(session => {
            postData(
                (response)=>{
                    if(response.success){
                        postFile(
                            (response)=>{
                                if(response.success){
                                    router.push('/trainings/create/sessions');
                                }
                            },
                            files,
                            '/training/sessions'
                        )
                    }
                },
                session
            )
        })
    }

    return (
        <div className="space-y-8">
            <h5 className="text-lg font-semibold mb-4">Sessions</h5>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <h6 className="text-lg font-medium mb-4">Add New Session</h6>
                
                <form onSubmit={handleAddSession} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Session Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border-2 border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter session title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                        </label>
                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border-2 border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        {
                            selectedTrainers.map((trainer, index) => (
                                <button 
                                    key={index} 
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex"
                                    onClick={() => setSelectedTrainers(selectedTrainers.filter((_, i) => i !== index))}
                                >
                                    <span>{trainer.name}</span>
                                    <span className='icon-[mdi--close] w-4 h-4'/>
                                </button>
                            ))
                        }
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trainers
                        </label>
                        <select
                            onChange={(e) => setSelectedTrainers([...selectedTrainers, trainers.find(trainer => trainer.name === e.target.value)])}
                            className="w-full border-2 border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                        >
                            <option value={null}>Select Trainer</option>
                            {trainers?.map((trainer) => (
                                <option key={trainer.id} value={trainer.name}>{trainer.name}</option>
                            ))}
                        </select>
                        <div className="flex items-center gap-10 w-3/4">
                            <input 
                                type="text" 
                                value={trainer} 
                                onChange={(e) => setTrainer(e.target.value)}
                                className="w-full border-2 border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mt-3"
                            />
                            <button 
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                onClick={() => setSelectedTrainers([...selectedTrainers, {name: trainer}])}
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            YouTube URL
                        </label>
                        <input
                            type="url"
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                            className="w-full border-2 border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter YouTube video URL"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <Editor content={description} setContent={setDescription} placeholder={'Enter session description'} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Resources & Documents
                        </label>
                        <File files={files} setFiles={setFiles} />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Add Session
                    </button>
                </form>
            </div>

            <div className="space-y-4">
                {sessions.map((session, index) => (
                    <div key={index} className="flex flex-col p-5 bg-gray-100 rounded-lg">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h6 className="text-lg font-medium">{session.title}</h6>
                            <p className="text-gray-600">{new Date(session.date).toLocaleString()}</p>
                            
                            {session.youtubeUrl && (
                                <div className="my-4 aspect-video">
                                    <iframe
                                        className="w-full h-full rounded-lg"
                                        src={`https://www.youtube.com/embed/${getYouTubeId(session.youtubeUrl)}`}
                                        title={session.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            )}
                            
                            <div className="mt-2" dangerouslySetInnerHTML={{ __html: session.description }}></div>
                            
                            {session.resources && session.resources.length > 0 && (
                                <div className="mt-4">
                                    <h6 className="text-sm font-medium text-gray-700 mb-2">Resources:</h6>
                                    <div className="flex flex-wrap gap-2">
                                        {session.resources.map((file, fileIndex) => (
                                            <a
                                                key={fileIndex}
                                                href={file.url}
                                                className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span>{file.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleSave}
            >
                Save
            </button>
        </div>
    )
}