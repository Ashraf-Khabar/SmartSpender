import Blog from '../models/BlogModel'; 
import User from '../models/UserModel';

export const GetAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const GetBlogById = async (req, res) => {
    res.json(res.blog);
};

export const CreateNewBlog = async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });
    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


export const UpdateBlogById = async (req, res) => {
    if (req.body.title != null) {
        res.blog.title = req.body.title;
    }
    if (req.body.content != null) {
        res.blog.content = req.body.content;
    }
    try {
        const updatedBlog = await res.blog.save();
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export const DeleteBlogById = async (req, res) => {
    try {
        await res.blog.remove();
        res.json({ message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const LikeBlog = async (req, res) => {
    const { user_id } = req.body;
    if (user_id != null && !res.blog.likes.includes(user_id)) {
        res.blog.likes.push(user_id);
        try {
            const updatedBlog = await res.blog.save();
            res.json(updatedBlog);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else {
        res.status(400).json({ message: 'Invalid user ID or user has already liked the blog' });
    }
};


export const CommentBog = async (req, res) => {
    const { content, author } = req.body;
    if (content != null && author != null) {
        res.blog.comments.push({ content, author });
        try {
            const updatedBlog = await res.blog.save();
            res.json(updatedBlog);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else {
        res.status(400).json({ message: 'Missing required fields' });
    }
};



