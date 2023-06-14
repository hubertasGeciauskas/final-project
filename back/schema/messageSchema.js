const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: {
        type: Object,
        ref: 'User',
        required: true,
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    groupChat: {
        type: Schema.Types.ObjectId,
        ref: 'GroupChat',
    },
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    recipient: {
        type: Object,
        ref: `User`,
        required: true
    },
    recipientId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: [],
    }
});

const Message = mongoose.model('conversations', messageSchema);
module.exports = Message;