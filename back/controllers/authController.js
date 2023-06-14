const bcrypt = require(`bcrypt`)
const userSchema = require("../schema/userSchema")
const jwt = require(`jsonwebtoken`)
require(`dotenv`).config()
const sendRes = require("../modules/sendRes")

module.exports = {
    register: async (req, res) => {
        const {password, username} = req.body
        const hash = await  bcrypt.hash(password, 10)
        const user = new userSchema({password: hash, username})
        await user.save()
        sendRes(res,true, null,  "registration successful" )
    },
    changePassword: async (req, res) => {
        const {oldPassword, password, repeatPassword, user} = req.body
        const findUser = await userSchema.findOne({_id:user.id})
        const samePassword = await bcrypt.compare(oldPassword, findUser.password)
        if (!samePassword) return sendRes(res, false, null, "Old password do not match")
        if (password !== repeatPassword) return sendRes(res, false, null, "passwords do not match")
        const hash = await bcrypt.hash(password, 10)
        const updatedUser = await userSchema({_id: user.id},
            {$set: {password: hash}},
            {new: true})
        sendRes(res, true)
    },
    changeUsername: async (req, res) => {
        const {password, username, user} = req.body
        const findUser = await userSchema.findOne({_id: user.id})
        const samePassword = await bcrypt.compare(password, findUser.password)
        if (!samePassword) return sendRes(res, false, null, "Incorrect password try again")
        const updatedUser = await userSchema({_id: user.id},
            {$set: {username}},
            {new: true})
        sendRes(res, true, updatedUser)
    },
    login: async (req, res) => {
        const {username, password} = req.body

        const user = await userSchema.findOne({username})
        if (!user) return res.send({success: false, message: "The username that you've entered doesen't match any account"})
        const samePassword = await  bcrypt.compare(password, user.password)
        if (!samePassword) return res.send({success: false, message: "Incorect password"})
        const myUser = {
            username: user.username,
            id: user._id,
            image: user.image,
        }
        const token = jwt.sign({...myUser}, process.env.TOKEN_KEY)
        sendRes(res,true, {token, myUser}, "login successful")

    },
    autoLogin: async (req, res) => {
        const {user} = req.body

        const userToLogIn = await userSchema.findOne({_id: user.id})
        if (!userToLogIn) return sendRes(res, false, null, "User does not exist")
        userToLogIn.password = null
        sendRes(res, true, userToLogIn, "auto login successful")

    }


}