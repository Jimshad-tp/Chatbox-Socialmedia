import  Express  from "express";
import { createPost, deletePost, getPost, getTimelinePosts, likePost, UpdatePost,  } from "../Controllers/PostController.js";


const router = Express.Router()

router.post('/',createPost)
router.get('/:id',getPost)
router.put('/:id',UpdatePost)
router.delete('/:id',deletePost)
router.put('/:id/like',likePost)
router.get('/:id/timeline',getTimelinePosts)



export default router;