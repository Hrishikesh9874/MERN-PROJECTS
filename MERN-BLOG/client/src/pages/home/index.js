import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from 'axios';
import classes from './styles.module.css';
import {FaTrash, FaEdit} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';



export default function Home(){

    const {blogList, setBlogList, pending, setPending} = useContext(GlobalContext);
    const navigate = useNavigate();

    async function fetchListOfBlogs(){
        setPending(true);
        const response = await axios.get('http://localhost:4000/api/blogs');
        const result = await response.data;
        
        if(result && result.blogList && result.blogList.length){
            setBlogList(result.blogList);
            setPending(false);
        }else{
            setPending(false);
            setBlogList([]);
        }
    }

    async function handleDeleteBlog(getCurrentId){
        const response = await axios.delete(`http://localhost:4000/api/blogs/delete/${getCurrentId}`);
        const result = await response.data;
        if(result?.message){
            fetchListOfBlogs();
        }
    }

    function handleEditBlog(currentBlogItem){
        navigate('/add-blog', {state: {currentBlogItem}});
    }

    useEffect(()=>{
        fetchListOfBlogs();
    }, [])

    return(
        <div className={classes.wrapper}>
            <h1>Blog Lists</h1>
            {
                pending ?
                <h1>Loading Blogs, Please Wait!</h1> :
                <div className={classes.blogList}>
                    {
                        blogList && blogList.length ? blogList.map(blogItem=> <div key={blogItem._id}>
                            <p>{blogItem.title}</p>
                            <p>{blogItem.description}</p>
                            <FaEdit onClick={()=> handleEditBlog(blogItem)} size={30}></FaEdit>
                            <FaTrash onClick={()=> handleDeleteBlog(blogItem._id)} size={30}></FaTrash>
                        </div> ) :
                        <h3>No Blogs Added</h3>
                    }
                </div>
            }
        </div>
    )
}