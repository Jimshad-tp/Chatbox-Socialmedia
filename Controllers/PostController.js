import postModel from "../Models/postModel.js";


// creat new post
export const createPost = async (req, res) => {
    const newPost = new postModel(req.body);
    try {
        await newPost.save()
        res.status(200).send({ message: "Post created" })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

//Get a post
export const getPost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await postModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

//update a post

export const UpdatePost = async (req,res) => {
    const postId = req.params.id
    const userId = req.body.userId;
    
    try {
        const post = await postModel.findById(postId) 
        if(post.userId === userId){
            await post.updateOne({ $set:req.body})
            res.status(200).json("Post Updated")
        }else{
            res.status(403).json("Action Forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


//delete a post 

export const deletePost = async (req,res) => {

    const postId = req.params.id
    const userId = req.body.userId

    try {
        
        const post = await postModel.findById(postId)
        if(post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted")
        }else{
            res.status(403).json("You cannot delete post")
        }

    } catch (error) {
        res.status(500).json(error)
        
    }
}