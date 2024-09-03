const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

async function getUsers(req, res){
    try {
        const users = await User.find()
        if(!users){
            return res.status(404).send({
                message: "Cannot find users"
            })
        }
        res.status(200).send({
            message: "Users found correctly",
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Failed to obtain users"
        })
    }
}

async function getUserByID(req, res){
    try {
        const id = req.params.id
    
        const user = await User.findById(id)
        if(!user){
            return res.status(404).send({
                message: "Cannot find user"
            })
        }
        res.status(200).send({
            message: "User found correctly",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Failed to obtain user"
        })
    }
}

async function postUser(req, res){
    try {
        const user = new User(req.body)
        user.password = await bcrypt.hash(user.password, saltRounds)
        const newUser = await user.save()
        if(!newUser){
            return res.status(500).send({
                message: "Failed to create the user"
            })
        }
        res.status(202).send({
            message: "User created correctly",
            newUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Failed to create the user"
        })
    }
}

async function editUser(req, res){
    try {
        const id = req.params.id
        const updtUser = req.body
        delete updtUser.role
        delete updtUser.password
        const updatedUser = await User.findByIdAndUpdate(id, updtUser, { new: true})
        if(!updatedUser){
            return res.status(404).send({
                message: "Failed to update. User not found"
            })
        }
        res.status(200).send({
            message: "User updated correctly",
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Failed to edit the user"
        })
    }
}

async function deleteUser(req, res){
    try {
        const id = req.params.id
        const deletedUser = await User.findByIdAndDelete(id)
        if(!deletedUser){
            return res.status(404).send({
                message: "Failed to delete. User not found"
            })
        }
        res.status(200).send({
            message: "User deleted successfully",
            deletedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Failed to delete the user"
        })
    }
}

async function logIn(req, res){
    try {
        const email = req.body.email
        const password = req.body.password

        if(!email || !password){
            return res.status(404).send({
                message: "Failed to logIn, email and password are required"
            })
        }
        const user = await User.findOne({ email: { $regex: email, $options: "i" } })
        if(!user){
            return res.status(404).send({
                message: "Mismatching data"
            })
        }
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(404).send({
                message: "Mismatching data"
            })
        }
        delete user.password
        const token = jwt.sing(user.toJSON(), secret, { expiresIn: '24H' })
        res.status(200).send({
            message: `Welcome ${user.name}`,
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Failed to logIn"
        })
    }
}

module.exports = { 
    getUsers, getUserByID, postUser, editUser, deleteUser, logIn
}