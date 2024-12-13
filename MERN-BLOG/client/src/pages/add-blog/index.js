import { useContext, useEffect } from 'react';
import classes from './styles.module.css';
import { GlobalContext } from '../../context';
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';


export default function AddABlog(){

    const {isEdit, setIsEdit, formData, setFormData} = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();

    async function handleSaveBlogToDatabase(){

        const response = isEdit ? await axios.put(`http://localhost:4000/api/blogs/update/${location.state.currentBlogItem._id}`, {
            title: formData.title,
            description: formData.description
        }) :
        await axios.post('http://localhost:4000/api/blogs/add', {
            title: formData.title,
            description: formData.description
        })

        const result = await response.data;
        
        if(result){
            setIsEdit(false);
            setFormData({
                title: '',
                description: ''
            })
            navigate('/')
        }
    }

    useEffect(()=>{
        if(location.state){
            const {currentBlogItem} = location.state;
            setIsEdit(true);
            setFormData({title: currentBlogItem.title, description: currentBlogItem.description})
        }
    }, [location])

    return(
        <div className={classes.wrapper}>
            <h1>{isEdit ? 'Edit' : 'Add'} a Blog</h1>
            <div className={classes.formWrapper}>
                <input onChange={(e)=> setFormData({ ...formData, title: e.target.value})} value={formData.title} name='title' placeholder='Enter Blog Title' id='title' type="text" />
                <textarea onChange={(e)=> setFormData({ ...formData, description: e.target.value})} value={formData.description} name="description" id="description" placeholder='Enter Blog Description'></textarea>
                <button onClick={handleSaveBlogToDatabase}>{isEdit ? 'Edit the Blog' : 'Add New Blog'}</button>
            </div>
        </div>
    )
}