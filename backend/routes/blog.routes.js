import { Router } from 'express'
import upload from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { handleCreateBlog, handleDeleteeBlog, handleGetBlog, handleGetBlogById, handleUpdateeBlog , handleGetUserAllBlog, handleCreateComment, handleBlogLikes, handleGetComment} from '../controllers/blog.controller.js'

const router = Router()

router.get('/', handleGetBlog)
router.get('/userblog',isAuthenticated,handleGetUserAllBlog)
router.post('/:blogId/likes',isAuthenticated,handleBlogLikes)
router.get('/:blogId', handleGetBlogById)

router.post('/create', upload.single('blogImg'), isAuthenticated, handleCreateBlog)
router.delete('/delete/:blogId', isAuthenticated, handleDeleteeBlog)
router.patch('/update/:blogId', upload.single('blogImg'), isAuthenticated, handleUpdateeBlog)

router.get('/comments/:blogId',handleGetComment)
router.post('/comment',handleCreateComment)

export default router 