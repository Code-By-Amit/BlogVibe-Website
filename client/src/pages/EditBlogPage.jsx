import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBlogById } from '../api/api';
import { CreateUpdateForm } from '../components/UI/CreateUpdateForm';

export const EditBlogPage = () => {
    const { blogId } = useParams();

    const [blog, setBlog] = useState({
        blogImg: '',
        title: '',
        content: '',
        tags: '',
    })
    

    const setInitialBlogData = async () => {
        try {
            const res = await getBlogById(blogId)
            setBlog(res.data.data)
            console.log(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setInitialBlogData()
    }, [])



    return (
        <>
            <CreateUpdateForm forCreate={false} blog={blog} setBlog={setBlog} />
        </>
    )
}
