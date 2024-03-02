import { useState, useContext } from 'react'
import DataContext from './context/DataContext';
import { format } from 'date-fns';
import api from './api/posts';
const NewPost = () => {
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostBody, setNewPostBody] = useState('');
    const { posts, setPosts } = useContext(DataContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const Newpost = { id, title: newPostTitle, datetime: datetime, body: newPostBody };
        try {
            const response = await api.post('/posts', Newpost);
            const allPosts = [...posts, response.data];
            setPosts(allPosts)
            setNewPostTitle('');
            setNewPostBody('');
            // history.push('/');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    id="postBody"
                    required
                    value={newPostBody}
                    onChange={(e) => setNewPostBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )

}
export default NewPost;