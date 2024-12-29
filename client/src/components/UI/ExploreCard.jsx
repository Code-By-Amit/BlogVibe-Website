import React from 'react'
import { Link } from 'react-router-dom';

export const ExploreCard = ({ blog }) => {
    const { blogImg, content, title, createdAt, tags, _id } = blog;

    const date = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }); 

    return (
        <Link to={`/blog/${_id}`} >
            <div className="card flex flex-col md:flex-row ld:h-52 mb-8 rounded-lg shadow-2xl justify-center overflow-hidden">

                <div className='relative w-[30rem]'>
                    <p className="bg-white/50 text-white top-3 left-4 absolute backdrop-blur-md inline-block text-sm px-3 py-1 rounded-full shadow-md">{tags[0]}</p>
                    <div className="lg:w-full h-full lg:h-56 bg-gray-200">
                        <img className="w-full h-full object-cover" src={blogImg} alt="Image Description" />
                    </div>
                </div>

                <div className="flex flex-col p-4 w-full">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <p className="text-sm text-gray-600 mt-2 max-h-20 overflow-hidden line-clamp-4">{content}</p>
                    <p className="text-xs text-gray-500 mt-4">{date}</p>
                </div>
            </div>
        </Link>
    )
}
