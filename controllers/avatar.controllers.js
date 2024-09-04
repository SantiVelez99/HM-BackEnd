const Avatar = require('../models/avatar.model')
const User = require('../models/user.model')
const fs = require('fs')

async function getAvatars(req, res) {
    try {
        const avatars = await Avatar.find()
        if (!avatars) {
            return res.status(404).send({
                message: "Avatars not found"
            })
        }
        res.status(200).send({
            message: "Avatars found successfully",
            avatars
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Failed to get the avatars"
        })
    }
}

async function deleteAvatar(req, res) {
    try {
        const id = req.params.id
        const avatar = await Avatar.findById(id)
        const filter = { avatar: { $regex: avatar.image, $options: 'i' } }
        const users = await User.find(filter)
        users?.forEach(user => {
            user.avatar = "default.png"
        })
        for(let i = 0; i < users.length; i++){
            await User.findByIdAndUpdate(users[i]._id, users[i])
        }
        fs.unlinkSync(`./public/assets/profile-icon/icons/${avatar.image}`)
        const deletedAvatar = await Avatar.findByIdAndDelete(id)
        if (!deletedAvatar) {
            return res.status(404).send({
                message: "Failed to delete. Avatar not found"
            })
        }
        res.status(200).send({
            message: "Avatar deleted successfully",
            deletedAvatar
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Failed to delete avatar"
        })
    }
}

async function postAvatar(req, res) {
    try {
        const avatar = new Avatar(req.body)
        if (req.file) {
            avatar.image = req.file.filename
        }
        const newAvatar = await avatar.save()
        if (!newAvatar) {
            return res.status(500).send({
                message: "Failed to post avatar"
            })
        }
        res.status(202).send({
            message: "Avatar posted successfully",
            newAvatar
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Failed to post avatar"
        })
    }
}

module.exports = {
    getAvatars, deleteAvatar, postAvatar
}