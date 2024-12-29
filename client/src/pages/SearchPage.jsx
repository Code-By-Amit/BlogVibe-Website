import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBlogBySearch } from '../api/api'
import { SearchedBlogCard } from '../components/UI/SearchedBlogCard'

export const SearchPage = () => {
    const { search } = useParams()
    const [searchedBlog, setSearchedBlog] = useState([])
    const navigate = useNavigate()

    const fetchSearchedBlog = async () => {
        try {
            const res = await getBlogBySearch(search)
            setSearchedBlog(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSearchedBlog()
    }, [search])

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
