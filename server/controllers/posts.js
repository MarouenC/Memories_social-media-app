import postMessage from "../models/postMessage.js";

export const getPosts = async (req,res)=>{
   try {
        const postMessages = await postMessage.find();

        res.status(200).json(postMessages);
   } catch (error) {
        res.status(404).json({message : error.message});
   }
}

export const createPost = async(req,res)=>{
    post = req.body;
    const newPost = new postMessage(post);

    res.status(201).json(newPost);
    try {
       await newPost.save();
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}