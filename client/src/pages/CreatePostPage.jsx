import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { createBlog } from '../api/api';
import { CreateUpdateForm } from '../components/UI/CreateUpdateForm';


export const CreatePostPage = () => {

  const [blog, setBlog] = useState({
    blogImg: '',
    title: '',
    content: '',
    tags: '',
  })
  

return (
  <>
    <CreateUpdateForm forCreate={true} blog={blog} setBlog={setBlog} />
  </>
)
}

