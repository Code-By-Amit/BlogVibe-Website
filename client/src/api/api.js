import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true,
    validateStatus: (status) => status < 500,
})

export const createBlog = (blogData) => {
    return api.post('/blog/create', blogData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const getAllBlog = () => {
    return api.get('/blog?recent=true')
}

export const getBlogById = (id) => {
    return api.get(`/blog/${id}`)
}

export const editBlog = (updatedBlog, id) => {
    console.log(updatedBlog)
    return api.patch(`/blog/update/${id}`, updatedBlog)
}

export const userBlog = () => {
    return api.get('/blog/userblog')
}

export const deleteBlog = (id) => {
    return api.delete(`/blog/delete/${id}`)
}

export const updateUserData = (data) => {
    return api.patch('/user/update', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const updateUserPassword = (data) => {
    return api.patch('/user/updatepassword', data)
}

export const fetchBlogPage = (pageParam = 1) => {
    return api.get(`/blog?page=${pageParam}&limit=5`)
}

export const fetchCommentAuthor = (id) => {
    return api.get(`/user/${id}`)
}

export const postComment = (data) => {
    return api.post('/blog/comment', data)
}

export const likeUnlike = (blogId) => {
    return api.post(`/blog/${blogId}/likes`)
}

export const getBlogComments=(blogId)=>{
    return api.get(`/blog/comments/${blogId}`)
}

export const getBlogBySearch=(search)=>{
    return api.get(`/blog/?search=${search}`)
}

export default api