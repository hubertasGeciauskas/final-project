const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: false,
    },
    block: {
        type: Date,
        required: false,
    },
    image: {
        type: String,
        required: false,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
})

const User = mongoose.model("movieUser", userSchema)
module.exports = User