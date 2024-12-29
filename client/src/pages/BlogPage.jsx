import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBlogById, getBlogComments, likeUnlike, postComment } from '../api/api'
import { Heart, MessageCircle } from 'lucide-react'
import useAuth from '../Store/AuthContext'
import { Comment } from '../components/UI/Comment'
import { CommentInputBox } from '../components/UI/CommentInputBox'

export const BlogPage = () => {
  const { id } = useParams()
  const { user } = useAuth();

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [blog, setBlog] = useState(null)
  const [likes, setLikes] = useState(blog?.likes.length)
  const [isLiked, setIsLiked] = useState(blog?.likes.includes(user?._id))

  const [comments, setComments] = useState([])


  const fetchBlog = async () => {
    setLoading(true)
    try {
      const response = await getBlogById(id)

      if (response.data.success) {
        const data = response.data.data;
        setBlog(data)
        setLikes(data.likes.length)
        setIsLiked(data.likes.includes(user?._id))
        setLoading(false)
        setError(false)
      }
    } catch (error) {
      console.log(error)
      setError(true)
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    if (!blog?._id) return; // Exit early if blog ID is undefined
    if (!user) return
    try {
      const res = await getBlogComments(blog?._id)
      if (res.data.success) {
        setComments(res.data.comments)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBlog()
  }, [])

  useEffect(() => {
    if (blog?._id) {
      fetchComments();
    }
  }, [blog?._id]);

  const PostLike = async () => {
    try {
      const res = await likeUnlike(blog?._id)
      if (res.data.success) {
        setIsLiked(res.data.message === 'Blog Liked')
        setLikes(res.data.likes.length)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const date = new Date(blog?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });



  if (loading) {
    return <div>Loading.............</div>
  }
  if (error) {
    return <div>Something Went Wrong.........</div>
  }

  return (
    <>
      <div className='w-full min-h-cover'>
        <div className='w-7/12 m-auto border border-l border-r p-4'>
          <div className='w-auto mx-auto pt-3'>
            <img src={blog.blogImg} className='w-full h-full object-cover' alt="" />
          </div>
          <h1 className='text-3xl font-bold my-7 mx-4'>{blog.title}</h1>


          <div className="flex justify-between px-3">
            <div className="p-4 flex gap-4 justify-start items-center profile">

              <div className="img w-9 h-9 rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2 ring-offset-white">
                <img src={blog.author.profileImg} className='w-full h-full object-cover' alt="" />
              </div>
              <div className='leading-4'>
                <p className='text-slate-800 font-semibold'>{blog.author.fullName}</p>
                <p className='text-slate-700 text-sm'>  <span>@</span><span className="underline underline-offset-4">{blog.author.username}</span></p>
              </div>
            </div>
            <p className='text-gray-700 text-sm font-mono p-3'>Published on {date}</p>
          </div>
          <div className='w-[90%] mx-auto my-3 border border-slate-300'></div>
          <div className="content px-14 py-10 leading-10 tracking-wide font-sans">
            {blog.content}
          </div>

          <div className='w-[90%] mx-auto my-3 border border-slate-300'></div>
          {user ?
            <div>

              <div className='flex justify-between items-center text-slate-600 px-14'>
                <div className="comments flex flex-col justify-center items-center gap-1 p-4 cursor-pointer">
                  <p className='text-blue-700'><MessageCircle size={30} /></p>
                  <p className='font-mono'>{comments.length}  Comments</p>
                </div>
                <div onClick={PostLike} className={`likes select-none flex flex-col justify-center items-center gap-1 p-4 cursor-pointer`}>
                  <p>{isLiked ? <Heart size={30} fill='red' color='red' /> : <Heart size={30} />}</p>
                  <p className='font-mono'>{likes} Likes</p>
                </div>
              </div>

              <div>

                <CommentInputBox profileImg={user.profileImg} blogId={blog?._id} authorId={user?._id} setComments={setComments} />

                <div className='w-[90%] mx-auto my-3 border border-slate-300'></div>

                <div className='flex flex-col gap-4 w-[90%] mx-auto justify-start items-start'>
                  <div className='flex justify-start items-center gap-4'>
                    <h3 className='text-2xl font-semibold'>Comments </h3><p className='px-3 py-1 text-center font-mono bg-slate-700 text-white rounded-full'>{comments.length}</p>
                  </div>

                  <ul className='p-4 w-full'>
                    {
                      comments?.map((comment) => {
                        return <li key={comment._id}><Comment comment={comment} /></li>
                      })
                    }
                  </ul>
                  <div>

                  </div>
                </div>
              </div>
            </div>
            :
            <div className="text-center my-10 py-8 w-[90%] mx-auto px-6 text-lg font-semibold">
              <h1 className="text-blue-500">
                Log in to like this post and join the conversation by sharing your thoughts in the comments!
              </h1>
            </div>

          }
        </div>
      </div>
    </>
  )
}
