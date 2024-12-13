const mongoose = require('mongoose');
const Blog = require('../modal/Blog');

const fetchListOfBlogs = async(req, res) => {

    let blogList;

    try {
        blogList = await Blog.find();
    } catch (error) {
        console.log(error);
    }

    if(!blogList){
        return res.status(404).json({message: 'No Blogs Found'});
    }

    return res.status(200).json({blogList});
}

const addNewBlog = async (req, res) => {
    const {title, description} = req.body;
    const currentDate = new Date();

    const newlyCreatedBlog = new Blog({
        title, description, date: currentDate
    })

    try {
        await newlyCreatedBlog.save();
    } catch (error) {
        console.log(error);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newlyCreatedBlog.save(session);
        session.commitTransaction();
    } catch (error) {
        return res.send(500).json({message: error})
    }
    
    return res.status(200).json({newlyCreatedBlog});
}

const deleteABlog = async(req, res) => {
    const id = req.params.id;

    try {
        const findCurrentBlog = await Blog.findByIdAndDelete(id);
        if(!findCurrentBlog){
            return res.status(404).json*{message: 'Blog not Found!'}
        }
        return res.status(200).json({message: 'Successfully Deleted'})
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Unable to delete! Please try again'});
    }
}

const updateABlog = async(req, res) => {
    const id = req.params.id;

    const {title, description} = req.body;
    let currentBlogToUpdate;

    try {
        currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {title, description});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Something went wrong white updating! Please try again'});
    }

    if(!currentBlogToUpdate){
        return res.status(500).json({message: "Unable to Update!"});
    }
    return res.status(200).json({currentBlogToUpdate});
}

module.exports = {fetchListOfBlogs, deleteABlog, updateABlog, addNewBlog};