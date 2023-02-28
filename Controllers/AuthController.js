import userModel from '../Models/userModel.js'



export const registerUser = async (req, res) => {
    try {
        const { username, firstname, lastname, password } = req.body;
        const newuser = new UserModel({ username, firstname, lastname, password })
        await newuser.save()
        res.status(200).json(newuser)
    } catch (error) {
        res.status(500).json(error)
        console.log("error aayi")

    }
}
