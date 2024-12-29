import React, { useEffect, useState } from 'react'
import { UserBlog } from '../components/UI/UserBlog'
import { deleteBlog, userBlog } from '../api/api'
import { showConfirmationToast } from '../../utils/customToast'
import { toast } from 'react-toastify'

export const YourBlogs = () => {
    const [yourBlog, setYourBlog] = useState(null)
    const [loading, setLoading] = useState(true)

    const toastStyle = {
        padding: "1rem 1rem",
        width: "25rem",
    }

    const fetchUserAllBlogs = async () => {
        try {
            const res = await userBlog()
            console.log(res.data.data.blogs)
            setLoading(false)
            setYourBlog(res.data.data.blogs)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUserAllBlogs()
    }, [])

    const handleDelete = (blogId) => {

        showConfirmationToast(
            'Are you sure you want to delete this blog?',
            () => {
                const response = deleteBlog(blogId)
                toast.promise(response, {
                    pending: "Deleting Blog...🧹🗑️",
                    success: "Blog Deleted Successfully! ✔️",
                    error: "Oops! Something went wrong while Deleting. ❌ Please try again. 🤔"
                }, { style: toastStyle })

                response.then(() => {
                    setYourBlog((prevBlog) => prevBlog.filter((blog) => blog._id !== blogId))
                })
            },
            () => toast.info('Blog Deletion Canceled. ❌', { style: toastStyle }) // Action when user clicks "No"
        );
    };

    if (loading) {
        return <div>Loading....</div>
    }
    return (
        <div className="flex flex-col justify-center items-center p-4 h-cover bg-slate-100">
            <h1 className='text-center text-2xl font-bold my-4'>Your Blogs</h1>
            <div className="bg-white shadow-lg flex flex-col justify-center items-center gap-4 rounded-lg w-11/12 p-6 relative">
                <ul>
                    {
                        yourBlog.map((blog) => {
                            return <li key={blog._id}> <UserBlog blog={blog} handleDelete={handleDelete} /></li>
                        })
                    }
                    {yourBlog.length==0 && <h1>You haven't published the blog yet.</h1>}
                </ul>
            </div>
        </div>
    )
}
