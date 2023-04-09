import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlogTest() {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({ title: '', content: '' });

    useEffect(() => {
        async function fetchBlogs() {
            const response = await axios.get('http://localhost:5000/blogs');
            setBlogs(response.data);
        }
        fetchBlogs();
    }, []);

    async function handleNewBlogSubmit(event) {
        event.preventDefault();
        const response = await axios.post('http://localhost:5000/blogs', newBlog);
        setBlogs([...blogs, response.data]);
        setNewBlog({ title: '', content: '' });
    }

    return (
        <div>
            <h2>Blogs</h2>
            <ul>
                {blogs.map(blog => (
                    <li key={blog._id}>
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleNewBlogSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={newBlog.title}
                    onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
                />
                <textarea
                    placeholder="Content"
                    value={newBlog.content}
                    onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                ></textarea>
                <button type="submit">Create Blog</button>
            </form>
        </div>
    );
}

export default BlogTest;
