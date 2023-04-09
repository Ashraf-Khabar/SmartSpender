import React, {useState, useEffect} from 'react';
import axios from 'axios';


function BlogTest({darkModeValue}) {
    const [blogs, setBlogs] = useState([]);

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
        setNewBlog({title: '', content: ''});
    }

    async function handleLikeClick(blog) {
        const response = await axios.post(`http://localhost:5000/blogs/${blog._id}/like`);
        setBlogs(blogs.map(b => (b._id === blog._id ? {...blog, likes: response.data.likes} : b)));
    }

    async function handleCommentSubmit(event, blog) {
        event.preventDefault();
        const response = await axios.post(`http://localhost:5000/blogs/${blog._id}/comments`, {content: newComment});
        setBlogs(blogs.map(b => b._id === blog._id ? {...blog, comments: [...blog.comments, response.data]} : b));
        setNewComment('');
    }

    const [newBlog, setNewBlog] = useState({title: '', content: ''});
    const [newComment, setNewComment] = useState('');

    return (<div data-theme={darkModeValue} className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <center>
            <h2 className="text-2xl font-bold mb-6">Blogs</h2>
            <form onSubmit={handleNewBlogSubmit}>
                <input
                    className="input input-bordered input-success w-full max-w-xs"
                    type="text"
                    placeholder="Title"
                    value={newBlog.title}
                    onChange={e => setNewBlog({...newBlog, title: e.target.value})}
                />
                <br/><br/>
                <textarea
                    className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                    placeholder="Content"
                    value={newBlog.content}
                    onChange={e => setNewBlog({...newBlog, content: e.target.value})}
                ></textarea>
                <br/><br/>
                <button className="btn btn-outline btn-success" type="submit">Create Blog</button>
            </form>
        </center>
        <ul>
            {blogs.map(blog => (<li key={blog._id} className="border-b-2 py-4">
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-gray-500 mb-4">{blog.content}</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <button
                            className="flex items-center text-gray-500 hover:text-red-500"
                            onClick={() => handleLikeClick(blog)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 21c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9-9-4.03-9-9z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 8v8m-4-4h8"/>
                            </svg>
                            {blog.likes.length}
                        </button>

                        <button className="flex items-center text-gray-500 hover:text-blue-500 ml-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M19 9l-6-6-6 6m12 6l-6 6v-6H6a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2v8z"/>
                            </svg>
                            {blog.comments.length}
                        </button>

                    </div>
                    <span className="text-gray-500">{new Date(blog.createdAt).toLocaleString()}</span>
                </div>
                <form className="mt-4" onSubmit={e => handleCommentSubmit(e, blog)}>
                    <input
                        type="text"
                        className="input input-bordered input-success w-full max-w-xs"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                    />
                </form>
                <ul className="mt-4">
                    {blog.comments.map(comment => (<li key={comment._id} className="text-gray-500 mb-2">
                        <span className="font-bold">{comment.author.username}:</span> {comment.content}
                    </li>))}
                </ul>
            </li>))}
        </ul>
    </div>)
}

export default BlogTest;
