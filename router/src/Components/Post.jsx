import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useTheme } from '../Components/ThemeContext';
import axios from 'axios';

function Post() {
    const { theme } = useTheme();
    const { id } = useParams(); 

    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        setLoading(true);

        Promise.all([
            axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`),
            axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        ])
        .then(([postRes, commentsRes]) => {
            setPost(postRes.data);
            setComments(commentsRes.data);

            return axios.get(`https://jsonplaceholder.typicode.com/users/${postRes.data.userId}`);
        })
        .then((userRes) => {
            setAuthor(userRes.data);
            setLoading(false);
        })
        .catch((e) => {
            console.error(e);
            alert('ERROR: Post failed to load.');
            setLoading(false);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        const newComment = {
            postId: Number(id),
            id: Date.now(), 
            name: name,
            body: message
        };

        axios.post(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, newComment)
            .then(() => {
                setComments([...comments, newComment]);
                setName('');
                setMessage('');
            })
            .catch(() => alert('Sorry, comment could not load! Please try again later.'));
    };

    if (loading) {
        return <div className={theme}><p>Post loading...</p></div>;
    }

    if (!post) {
        return <div className={theme}><p>Post not found.</p></div>;
    }

    return (
        <article className={theme}>
            <Link to='/' className='link'>&#x21A9; Go Back</Link>

            <h2>{post.title}</h2>
            <p className='post'>By {author ? author.name : 'Anonymous'}</p>
            <p>{post.body}</p>

            <section>
                <h2 className='comment'>Comments ({comments.length})</h2>

                {comments.length === 0 ? (
                    <p>No comments yet! Be the first to comment here!</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className='mess'>
                            <h3>{comment.name}</h3>
                            <p>{comment.body}</p>
                        </div>
                    ))
                )}
            </section>

            <section>
                <h2 className='comment'>Leave a comment</h2>

                <form className='text' onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name:</label>
                    <input
                        id='name'
                        placeholder='Ex. John Smith'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <textarea
                        className='comment-message'
                        placeholder='Add a comment...'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />

                    <button type='submit'>Submit</button>
                </form>
            </section>
        </article>
    );
}

export default Post;