import mongoose from "mongoose";

const postShema = mongoose.Schema({

    userId : {
        type:String,
        required:true
    },
    desc:String,
    likes:[],
    image:String
},{timestamps:true})

const postModel = mongoose.model("Posts",postShema
)

export default postModel;