import userModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'
import Jwt  from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
      
       const username = req.body.username;
        const userExist = await userModel.findOne({username:username});
        if(userExist){
            return res.status(400).json({message:"User Already Registered"})
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body)
       const user =  await newUser.save()
       const token = Jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
       console.log("signup successfull");
  res.status(200).send({message:"User created successfully",data:token,success:true})

    } catch (error) {
        res.status(500).send({message:"Error creating user",error,success:false})

    }
}

export const loginUser = async (req,res) => {
    try {
        const user = await userModel.findOne({username:req.body.username})
        if(!user){
            res.status(400).send({message:"User does not exist"})
        } 
        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(200).send({message:"Password is incorrect",success:false})
        }else{
            const token = Jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
            console.log("Login successfull")
            res.status(200).send({message:"Login successfull",success:true ,data:token,user})
        }
       
    } catch (error) {
        res.status(500).send({message:"User login rejected",error,success:false})
    }
}