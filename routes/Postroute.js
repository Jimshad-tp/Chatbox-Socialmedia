import  Express  from "express";
import { createPost } from "../Controllers/PostController.js";

const router = Express.Router()

router.post('/',createPost)






export default router;