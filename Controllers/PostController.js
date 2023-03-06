import postModel from "../Models/postModel.js";


// creat new post

export const createPost = async (req,res) => {
    const newPost = new postModel(req.body);

    try {
        
        await newPost.save()
        res.status(200).send({message:"Post created"})
    } catch (error) {
        res.status(500).send({message:error})
        
    }

}