import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createBlog, editBlog } from '../../api/api'
import { toast } from 'react-toastify'

export const CreateUpdateForm = ({ blog, setBlog, forCreate }) => {
    const { blogId } = useParams()
    const navigate = useNavigate()
    const [previewImg, setPreviewImg] = useState(null)

      

    const toastStyle = {
        padding: "1rem 1rem",
        width: "25rem",
    }
  
      
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlog((prevProfile) => ({ ...prevProfile, [name]: value }));
        validateInput(name, value)
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setBlog((prev) => ({ ...prev, blogImg: file }))
            const objUrl = URL.createObjectURL(file)
            if (previewImg) {
                URL.revokeObjectURL(previewImg);
            }
            setPreviewImg(objUrl)
        }
    }

    const handleClearImage = (e) => {
        setBlog((previous) => ({
            ...previous,
            blogImg: ""
        }))
        if (previewImg) {
            URL.revokeObjectURL(previewImg)
            setPreviewImg(null)
        }
    }
    
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
           
            const response = forCreate ? createBlog(blog) : editBlog(blog, blogId)    //! Don't use await here, want promise for toast.promise 

            const str = forCreate ? "Publishing" : "Updating"
            toast.promise(response, {
                pending: `${str} Blog...✍️ Hang tight! 🚀`,
                success: `Blog ${forCreate ? "Published" : "Updated"} Successfully! 🌟`,
                error: `Oops! Something went wrong while ${str}.❌  Please try again. 🤔`
            }, { style: toastStyle })

            if ((await response).data.success) {
                if (forCreate) {
                    setBlog({
                        blogImg: '',
                        title: '',
                        content: '',
                        tags: '',
                    })
                    URL.revokeObjectURL(previewImg)
                    setPreviewImg(null)
                }
                if (!forCreate) {
                    navigate('/dashboard/yourblogs')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='m-4 p-4'>

            <h1 className='text-center text-3xl font-bold my-5 '>{forCreate ? "Publish" : "Edit"} Blog from Here</h1>

            <div className='w-full mx-auto my-3 sm:my-6 border'></div>

            <div className='m-4 p-4'>
                <form method='POST' onSubmit={handleFormSubmit} className='w-full h-full flex flex-col gap-7 '>
                    <div className='flex flex-col gap-2'>
                        {
                            previewImg || blog.blogImg ?
                                (<div className="mt-4 h-96 flex justify-center items-center">
                                    <img src={previewImg || blog.blogImg} alt="Preview" className="w-full h-full object-contain" />
                                </div>)
                                :
                                (<>
                                    <div className='font-semibold'>Upload Image</div>
                                    <div className="flex items-center justify-center w-full mb-4">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">JPG, JPEG, PNG, GIF,WEP (MAX. 1920px x 1080px)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" onChange={handleFileChange} name="blogImg" className="hidden" />
                                        </label>
                                    </div>
                                </>)
                        }
                    </div>

                    <div className='flex'>
                        <button type='button' onClick={handleClearImage} className='outline-none bg-black text-white rounded font-semibold mx-4 my-5 py-2 px-4'>Clear Image</button>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="title" className='font-semibold'>Title</label>
                        <input className='w-full border outline-none box-border p-2 sm:px-3 text-base bg-slate-100' value={blog.title} onChange={handleInputChange} type="text" name="title" id='title' placeholder='Write a Short Title Here...' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="content" className='font-semibold'>Content</label>
                        <textarea className='outline-none w-full p-4 border min-h-56 text-base bg-slate-100' value={blog.content} onChange={handleInputChange} name="content" id="content" placeholder='Start Writing From Here....'></textarea>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="tags" className='font-semibold'>Tags</label>
                        <input className='w-full border outline-none box-border p-2 sm:px-3 text-base bg-slate-100' value={blog.tags} onChange={handleInputChange} name="tags" id='tags' type="text" placeholder='Tags' />
                        <p className='font-mono font-thin text-slate-500 text-xs'>Sepereated by , (example: web Development,JavaScript etc...)</p>
                    </div>

                    <button type='submit' className='outline-none bg-black text-white rounded font-semibold mx-4 my-5 py-2 px-4'>{forCreate ? "Post" : "Edit"}</button>

                </form>
            </div>
        </div>
    )
}
