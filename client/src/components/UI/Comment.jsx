import React, { useEffect, useState } from 'react'
import { fetchCommentAuthor } from '../../api/api';

export const Comment = ({ comment }) => {
  const [author, setAuthor] = useState(null)
  const fetchAuthor = async () => {
    const res = await fetchCommentAuthor(comment.author)
    if (res.data.success) {
      setAuthor(res.data.data)
    }
  }
  useEffect(() => {
    fetchAuthor()
  }, [])
  return (
    <div className='comment flex flex-col'>
      <div className=" flex gap-4 my-2">
        <div className="img w-10 h-10  rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2 ring-offset-white">
          <img src={author?.profileImg} className='w-full h-full object-cover' alt="" />
        </div>
      
        <div>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-lg text-gray-800'>{author?.fullName}</p>
            <p className='text-sm text-gray-500'>@{author?.username}</p>
          </div>
          <p className='max-w-3xl font-sans mt-1'>{comment.content}</p>
          {/* <button onClick={toggleIsReply} className='underline my-3 text-slate-600'>Reply</button> */}
        </div>
      </div>
      <div className='w-full mx-auto my-3 border border-slate-300'></div>


      {/* Comment Reply
                  {isReply &&
                    <div className="commentBox flex justify-center items-start gap-4 m-4 p-4">
                      <div className="img w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2 ring-offset-white">
                        <img src={user.profileImg} className='w-full h-full object-cover' alt="" />
                      </div>
                      <div className='w-full'>
                        <textarea name="comment" className='w-full p-3 outline-none border' placeholder='Reply Here....'></textarea>
                        <div className='text-right'>
                          <button className='outline-none border-none bg-blue-600 text-white font-semibold px-2 py-1 rounded-sm my-2'>Reply</button>
                        </div>
                      </div>
                    </div>
                  } */}

    </div>
  )
}

