import userModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'

//get a User

export const getUser = async (req,res) => {

    const id = req.params.id
    try {
        
        const user = await userModel.findById(id);
        if(user){
            const {password ,...otherDetails} = user._doc;
            res.status(200).json(otherDetails)
        }else{
            res.status(400).json("No such user exist")
        }
    } catch (error) {
        
    }
}

//update a user

export const updateUser = async (req,res) => {
    const id = req.params.id
    try {
        const {currentUserId,currentUserAdminStatus,password} = req.body;

        if(id===currentUserId || currentUserAdminStatus) {
            if(password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password,salt)
            }
            const user = await userModel.findByIdAndUpdate(id,req.body,{new:true})
            res.status(200).json(user)
        }else {
            res.status(403).json("Access Denied! you can only update your own profile")
        }
   
    } catch (error) {
        res.status(500).json(error)
    }
}
export const deleteUser = async (req, res) => {
  const id = req.params.id
  const {currentUserId,currentUserAdminStatus} = req.body;
      try {
        if(currentUserId === id || currentUserAdminStatus){
            await userModel.findByIdAndDelete(id);
            res.status(200).json("User deleted successfully");
        }
        
      } catch (error) {
        res.status(500).json(error);
      }

  };
  
  //follow a user

  export const followUser = async (req,res) =>{
        
        const id = req.params.id
        const {currentUserId} = req.body;

        if(currentUserId === id) {
            res.status(403).send({message:"Action forbidden"})
            
        }else {
            try {
                const followUser = await userModel.findById(id)
                const followingUser = await userModel.findById(currentUserId);

                if(!followUser.followers.includes(currentUserId)){
                    await followUser.updateOne({$push : {followers:currentUserId}})
                    await followingUser.updateOne({$push : {following :id }})
                    res.status(200).json("User followed")
                }else{
                    res.status(403).json("User is Already followed by you")
                }
            } catch (error) {
                res.status(500).json(error)
                
            }
        }
 
  }