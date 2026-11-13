import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useTheme } from '../Components/ThemeContext';
import axios from 'axios';

// export const posts = [
//     {
//         id: 1,
//         title: 'React Post 1',
//         author: 'Sean Topps',
//         date: new Date(2026, 10, 12),
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat metus et molestie elementum. Nam purus eros, rhoncus sit amet sodales nec, ullamcorper at tellus. Nam mi ligula, gravida et mauris a, tristique pretium quam. Maecenas ut magna maximus, gravida mi et, ultrices arcu. Nulla tellus libero, ornare quis aliquet at, gravida pretium tortor.'
//     },
//     {
//         id: 2,
//         title: 'React Post 2',
//         author: 'Carl Arhen',
//         date: new Date(2026, 10, 25),
//         content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit minim proident, irure veniam. Ipsum dolor sed aliqua magna nulla eiusmod et. Culpa amet culpa, enim id velit velit at nostrud ipsum.'
//     },
//     {
//         id: 3,
//         title: 'React Post 3',
//         author: 'Sindra Harris',
//         date: new Date(2026, 10, 3),
//         content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit voluptate, est eu laborum. Magna deserunt odio velit, dignissimos odio ex ipsum aute commodo.'
//     }
// ];

function BlogPosts() {
    const { theme } = useTheme();
    
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {
        Promise.all([
            axios.get('https://jsonplaceholder.typicode.com/posts'),
            axios.get('https://jsonplaceholder.typicode.com/users')
        ])
        .then(([postsRes, usersRes]) => {
            setPosts(postsRes.data);
            setUsers(usersRes.data);
            setLoading(false);
        })
        .catch((e) => {
            console.error(e);
            alert('ERROR: There was an error processing your request!');
            setLoading(false);
        });
    }, []);

    const getAuthorName = (userId) => {
        const author = users.find((user) => user.id === userId);
        return author ? author.name : 'Anonymous';
    };

    if (loading) {
        return <div className={theme}><p>Posts Loading...</p></div>;
    }

    return (
        <div className={theme}>
            {posts.slice(0, visibleCount).map((post) => (
                <article key={post.id}>
                    <h2 className='title'>
                        <Link to={`/post/${post.id}`}>
                            {post.title}
                        </Link>
                    </h2>

                    <p className='post'>By {getAuthorName(post.userId)}</p>
                    <p>{post.body}</p>
                </article>
            ))}

            {visibleCount < posts.length && (
                <button className='more' onClick={() => setVisibleCount(visibleCount + 3)}>
                    More...
                </button>
            )}
        </div>
    );
}

export default BlogPosts;