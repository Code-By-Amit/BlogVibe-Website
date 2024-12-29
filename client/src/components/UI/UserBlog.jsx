import React from 'react'
import { Link } from 'react-router-dom'

export const UserBlog = ({ blog,handleDelete }) => {
    const likes = blog.likes.length
    const comments = blog.comments.length
    const reads = blog.reads
    
    const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <>
            <div className="blog p-2 w-[90%] flex gap-3 justify-between items-center">
                <div className='flex'>
                    <div className='min-w-28 h-16 border rounded-md overflow-hidden'>
                        <img className='w-full h-full object-cover' src={blog.blogImg} alt={blog.title} />
                    </div>
                    <div className='ml-6'>
                        <h3 className='text-xl font-bold mb-2'>{blog.title}</h3>
                        <p className='text-slate-700 text-sm'>Published on {date}</p>
                        <div className='my-4'>
                            <Link to={`/dashboard/editblog/${blog._id}`}>
                                <button className='underline text-gray-800 pr-2 hover:text-gray-950'>Edit</button>
                            </Link>
                            <button onClick={()=>handleDelete(blog._id)} className='underline text-red-600 px-3 hover:text-red-700'>Delete</button>
                        </div>
                    </div>
                </div>

                <div className='flex gap-6 mx-5 text-slate-900'>
                    <div className='text-center'>
                        <h2 className='text-xl'>{likes}</h2>
                        <p>Likes</p>
                    </div>
                    <div className='text-center'>
                        <h2 className='text-xl'>{comments}</h2>
                        <p>Comments</p>
                    </div>
                    <div className='text-center'>
                        <h2 className='text-xl'>{reads}</h2>
                        <p>Reads</p>
                    </div>
                </div>
            </div>
            <div className='w-[95%] mx-auto border'></div>
        </>
    )
}
