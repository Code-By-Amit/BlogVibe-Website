import React from 'react'
import { NavLink } from 'react-router-dom';

export const Card = ({ post }) => {
  const { blogImg, content, title, createdAt, tags, _id } = post

  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit", 
    // minute: "2-digit", 
    // second: "2-digit", 
  });

  return (
    <NavLink to={`/blog/${_id}`}>
      <div className="w-96 rounded-lg shadow-lg overflow-hiden">
        <div className='relative'>
          <p className="bg-white/50 font-semibold text-white top-3 left-4 absolute z-20 backdrop-blur-xl inline-block text-xs px-3 py-1  rounded-full shadow-2xl"> {tags[0]} </p>
          <div className="w-full h-56 bg-gray-200">
            <img className="w-full h-full object-cover" src={blogImg} alt="Image Description" />
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-5 ml-4">{date}</p>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800"> {title} </h2>
          <p className="text-gray-600 mt-2 line-clamp-4"> {content} </p>
        </div>
      </div>
    </NavLink>
  )
}
