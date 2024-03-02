import { createContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from '../api/posts';
import useAxiosFetch from '../hooks/useAxiosFetch';
const DataContext = createContext({});
export const DataProvider = ({ children }) => {
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // const history = useNavigate();
    useEffect(() => {
        const filteredResults = posts.filter((post) =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [posts, search])

    // useEffect(() => {
    //   const fetchPosts = async () => {
    //     try {
    //       const response = await api.get('/posts')
    //       setPosts(response.data);
    //     } catch (err) {
    //       console.log(err.response.data);
    //       console.log(err.response.status);
    //       console.log(err.response.header);
    //     }
    //   }
    //   fetchPosts();
    // }, [])
    useEffect(() => {
        setPosts(data);
    }, [data])
    return (
        <DataContext.Provider value={{
            search, setSearch, searchResults, fetchError, isLoading,
            posts, setPosts

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;