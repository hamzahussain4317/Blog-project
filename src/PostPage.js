import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react'
import DataContext from './context/DataContext';
import api from './api/posts';
const PostPage = () => {
    const { posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`)
            const PostList = posts.filter(post => post.id !== id)
            setPosts(PostList);
        }
        catch (err) {
            console.log(err);
        }

        // history.push('/');
    }
    return (
        <main className='PostPage'>
            <article className='post'>
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className='postDate'>{post.datetime}</p>
                        <p className='postbody'>{post.body}</p>
                        <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                        <button onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post not found</h2>
                        <p> <Link to="/">Visit Our Homepage</Link></p>
                    </>
                }
            </article>
        </main>
    )
}
export default PostPage;