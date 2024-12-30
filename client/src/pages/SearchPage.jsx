import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBlogBySearch } from '../api/api'
import { SearchedBlogCard } from '../components/UI/SearchedBlogCard'

export const SearchPage = () => {
    const { search } = useParams()
    const [searchedBlog, setSearchedBlog] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const fetchSearchedBlog = async () => {
        setLoading(true)
        try {
            const res = await getBlogBySearch(search)
            if (res.data.success) {
                setSearchedBlog(res.data.data)
                setLoading(false)
                setError(false)
            }
            else if (res.data.success == false) {
                setLoading(false)
                setError(true)
            }
        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSearchedBlog()
    }, [search])

    if (loading) {
        return (
            <div className='w-full h-cover flex justify-center items-center'>
                <div className="loader"></div>
            </div>
        )
    }
    if (error) {
        return <div className='w-full h-cover flex justify-center items-center'>
            <div className='text-xl text-slate-700 font-bold'>Something Went Wrong.........</div>
        </div>
    }
    return (
        <div className='w-full flex flex-col justify-center items-center' >

            <ul className='w-[80%] m-10'>

                {
                    searchedBlog?.map((blog) => {
                        return <li key={blog._id}><SearchedBlogCard blog={blog} /></li>
                    })
                }

            </ul>
        </div>
    )
}
