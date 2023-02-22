import postMessage from "../models/postMessage.js";
import mongoose from 'mongoose';
import express from 'express';


export const getPosts = async (req,res)=>{
   try {
        const postMessages = await postMessage.find();

        res.status(200).json(postMessages);
   } catch (error) {
        res.status(404).json({message : error.message});
   }
}

export const createPost = async(req,res)=>{
    const post = req.body;
    const newPost = new postMessage(post);

    res.status(201).json(newPost);
    try {
       await newPost.save();
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}
export const updatePost = async(req,res)=>{
    const {id : _id} = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return  res.status(404).send("No Post with that ID");
    const updatedPost = await postMessage.findByIdAndUpdate(_id, {...post, _id}, {new : true});

    res.json(updatedPost);
}
export const deletePost = async(req,res) =>{
    const {id : _id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return  res.status(404).send("No Post with that ID");
    await postMessage.findByIdAndRemove(_id);
    res.json({message: "Post Deleted succesfully"});
}
export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await postMessage.findById(id);

    const updatedPost = await postMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}
