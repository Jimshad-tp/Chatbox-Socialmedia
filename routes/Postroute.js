import  Express  from "express";
import { createPost, deletePost, getPost, UpdatePost,  } from "../Controllers/PostController.js";


const router = Express.Router()

router.post('/',createPost)
router.get('/:id',getPost)
router.put('/:id',UpdatePost)
router.delete('/:id',deletePost)



export default router;