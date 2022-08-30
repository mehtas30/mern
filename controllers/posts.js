//folder structure for scalability
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts=async (req,res)=>{
    try{
        const postMessages= await PostMessage.find();
        
        res.status(200).json(postMessages);
    }
    catch(error){
res.status(404).json({message: error.message});
    }
    }

export const createPosts= async (req,res)=>{
    const post=req.body; //access data from client side
    const newPost= new PostMessage(post); //creates new obj from schema model
    try{
        await newPost.save();//saves to mongodb
        res.status(201).json(newPost)//good creation
    }catch(error){
            res.status(409).json({message:error.message})
    }
}

export const updatePost= async(req,res)=>{
    const {id: _id}=req.params;//because of route has /:id gets id and renames to _id
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no post with that id");
    const updatedPost= await PostMessage.findByIdAndUpdate(_id,{...post,_id}, {new:true});
    res.json(updatedPost);
}

export const deletePost=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("no post with that id");
    await PostMessage.findByIdAndRemove(id);
    res.json({message:'Post deleted'});
}