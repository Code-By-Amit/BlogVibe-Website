import React, { useState } from 'react'
import { postComment } from '../../api/api';
export const CommentInputBox = ({ profileImg, blogId, authorId,setComments }) => {

    const [commentText, setCommentText] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const obj = { blogId, authorId, content: commentText }
            console.log(obj)
            const res = await postComment(obj)
            if (res.data.success) {
                setComments((prev) => [res.data.comment, ...prev])
                setCommentText('')
            }
            console.log('Response: ', res.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <form method='post' onSubmit={handleSubmit}>
            <div className="commentBox flex justify-center items-start gap-4 m-4 p-4">
                <div className="img w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2 ring-offset-white">
                    <img src={profileImg} className='w-full h-full object-cover' alt="" />
                </div>
                <div className='w-full'>
                    <textarea name="comment" required value={commentText} onChange={(e) => setCommentText(e.target.value)} className='w-full p-3 outline-none border' placeholder='Add Comment....'></textarea>
                    <div className='text-right'>
                        <button type="submit" className='outline-none border-none bg-blue-600 text-white font-semibold px-2 py-1 rounded-sm my-2'>Comment</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
