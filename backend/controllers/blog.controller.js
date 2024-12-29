import { ECDH } from "crypto";
import BLOG from "../model/blog.model.js"
import COMMENT from "../model/comment.model.js";
import USER from "../model/user.model.js"
import { uploadOnCloudinary } from "../services/cloudService.js";

export const handleGetBlog = async (req, res) => {
    try {
        const { search, limit = 10, page = 1, recent } = req.query
        const query = search ? { title: RegExp(search, 'i') } : {};

        if (recent == "true") {
            const blogs = await BLOG.find({}).sort({ createdAt: -1 }).limit(6)
            return res.status(200).json({ success: true, message: "Recent Blogs Data", data: blogs })
        }
        const blogs = await BLOG.find(query).skip((page - 1) * limit).limit(Number(limit))

        if (!blogs) {
            return res.status(200).json({ success: false, message: "Failed to Get blogs" })
        }

        res.status(200).json({ success: true, message: "All Blogs", data: blogs })

    } catch (error) {
        console.log("Error in handleGetAllBlog Conroller: ", error)
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
}

export const handleGetBlogById = async (req, res) => {
    try {

        const id = req.params.blogId

        const blog = await BLOG.findById(id).populate({ path: 'author', select: '-password' }).populate('comments')
        if (!blog) {
            return res.status(404).json({ success: false, message: `Can't find blog with BlogId ${_id}` })
        }
        blog.reads = blog.reads + 1;
        await blog.save();
        res.status(200).json({ success: true, message: `Blog With _id :${id}`, data: blog })
    } catch (error) {
        console.log("Error in handleGetBlogById Conroller: ", error)
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
}


export const handleDeleteeBlog = async (req, res) => {
    try {
        const _id = req.params.blogId
        const deletedBlog = await BLOG.findByIdAndDelete(_id)
        if (!deletedBlog) {
            return res.status(200).json({ success: false, message: `Can't Delete Blog With BlogId ${_id}` })
        }
        res.status(200).json({ success: true, message: "Blog Deleted Sucessfully", data: deletedBlog })
    } catch (error) {
        console.log("Error in handleDeleteeBlog Conroller: ", error)
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
}

export const handleCreateBlog = async (req, res) => {
    try {
        const { title, content, likes, comments, tags } = req.body;

        const userId = req.user.userId;
        const user = await USER.findById(userId)

        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required." });
        }

        let blogImg;

        if (req.file) {
            const response = await uploadOnCloudinary(req.file.path)
            blogImg = response.secure_url
        }

        const newBlog = new BLOG({
            title,
            content,
            author: userId,
            likes: likes || [],
            blogImg: blogImg,
            comments: comments || [],
            tags: tags ? tags.split(',').map((tag) => tag.trim()) : []
        });

        const savedBlog = await newBlog.save();

        user.blogs.push(savedBlog._id);
        await user.save()

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: savedBlog
        });

    } catch (error) {
        console.log("Error in handleCreateBlog Conroller: ", error)
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
}

export const handleUpdateeBlog = async (req, res) => {
    try {
        const { title, content, author, likes, comments, tags } = req.body;
        const { blogId } = req.params
        let blogImg;
        if (req.file) {
            const response = await uploadOnCloudinary(req.file.path)
            blogImg = response.secure_url
        }

        let updatedTags = [];
        if (tags.constructor !== Array) {
            updatedTags = tags.split(',').map(tag => tag.trim());
        }

        // Prepare the update object
        const updateData = {};

        if (title) updateData.title = title;
        if (content) updateData.content = content;
        if (likes) updateData.likes = likes;
        if (blogImg) updateData.blogImg = blogImg;
        if (comments) updateData.comments = comments;
        if (updatedTags.length > 0) updateData.tags = updatedTags;

        const updatedBlog = await BLOG.findByIdAndUpdate(blogId, { $set: updateData }, { new: true });

        if (!updatedBlog) {
            res.status(404).json({ success: false, message: "Blog not found" })
        }

        res.status(200).json({ success: true, message: "Blog Updated Sucessfully", data: updatedBlog })
    } catch (error) {
        console.log("Error in handleUpdateeBlog Conroller: ", error.message)
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
}

export const handleGetUserAllBlog = async (req, res) => {
    try {
        const userBlog = await USER.findById(req.user.userId).populate('blogs')
        res.status(200).json({ success: true, message: "User Blogs", data: userBlog })
    } catch (error) {
        console.log("Error in handleGetUserBlog Conroller: ", error.message)
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
}


export const handleCreateComment = async (req, res) => {
    try {
        const { blogId, authorId, content } = req.body;
        console.log(req.body)
        const comment = await COMMENT.create({
            blog: blogId,
            author: authorId,
            content: content
        })
        const author = await USER.findById(authorId)
        author.comments.push(comment._id)
        await author.save()

        const blog = await BLOG.findById(blogId)
        blog.comments.push(comment._id)
        await blog.save()

        res.status(200).json({ success: true, message: "comment Created Sucessfully", comment })
    } catch (error) {
        console.log("Error in handleGetUserBlog Conroller: ", error.message)
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
}

export const handleBlogLikes = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await BLOG.findById(blogId)
        if (!blog) {
            res.status(404).json({ success: false, message: "Blog not found" })
        }

        const isAlreadyLiked = blog.likes.includes(req.user.userId)

        if (isAlreadyLiked) {
            blog.likes = blog.likes.filter((userLikes) => userLikes.toString() !== req.user.userId)
        } else {
            blog.likes.push(req.user.userId)
        }
        await blog.save()

        return res.status(200).json({
            success: true,
            message: isAlreadyLiked ? "Blog Unliked" : "Blog Liked",
            likes: blog.likes, // Updated likes array
        });

    } catch (error) {
        console.log("Error in handleBlogLikes Conroller: ", error.message)
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
}

export const handleGetComment = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await COMMENT.find({ blog: blogId }).sort({ createdAt: -1 });
        if (!comments) {
            res.status(404).json({ success: false, message: "Comment not found" })
        }
        res.status(200).json({ success: true, message: "Comments found", comments })
    } catch (error) {
        console.log("Error in handleGetComment Conroller: ", error.message)
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
}