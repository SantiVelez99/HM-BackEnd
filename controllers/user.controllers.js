const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const saltRounds = 10
// const jwt = require('jsonwebtoken')
// const secret = process.env.SECRET

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

module.exports = { 
    getUsers, getUserByID, postUser, editUser
}