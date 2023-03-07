import mongoose from "mongoose";
import postModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";


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

export const UpdatePost = async (req, res) => {
    const postId = req.params.id
    const userId = req.body.userId;

    try {
        const post = await postModel.findById(postId)
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("Post Updated")
        } else {
            res.status(403).json("Action Forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


//delete a post 

export const deletePost = async (req, res) => {

    const postId = req.params.id
    const userId = req.body.userId

    try {

        const post = await postModel.findById(postId)
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted")
        } else {
            res.status(403).json("You cannot delete post")
        }

    } catch (error) {
        res.status(500).json(error)

    }
}

//like and dislike post

export const likePost = async (req, res) => {
    const postId = req.params.id
    const userId = req.body.userId

    try {
        const post = await postModel.findById(postId)
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json("Post liked")
        } else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json("Post Unliked")
        }


    } catch (error) {
        res.status(500).json(error)
    }
}
export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const currentUserPosts = await postModel.find({ userId: userId });
      const followingPosts = await UserModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "following",
            foreignField: "userId",
            as: "followingPosts",
          },
        },
        {
          $project: {
            followingPosts: 1,
            _id: 0,
          },
        },
      ]);
  
      res
        .status(200)
        .json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a,b) => {
            return a.createdAt - b.createdAt
        })
        )
    } catch (error) {
      res.status(500).json(error);
    }
  };