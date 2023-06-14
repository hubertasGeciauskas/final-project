const userSchema = require("../schema/userSchema")
const messageSchema = require("../schema/messageSchema")
const notificationSchema = require("../schema/notificationSchema")
const sendRes = require("../modules/sendRes")
const io = require("../router/socketRouter")
const socketDb = require("../database/socketDb")

const socketJoin = (userId, roomName) => {
    const socket = socketDb.getSocket(userId);
    if (socket) {
        const oldRoom = socketDb.getRoom(userId);
        if (oldRoom) {
            socket.leave(oldRoom);
        }
        socket.join(roomName);
        socketDb.joinRoom(userId, roomName);
    }
}


module.exports = {

    updateImage: async (req, res) => {
        const {user, image} = req.body
        const updatedUser = await userSchema.findOneAndUpdate(
            {_id: user.id},
            {$set: {image}},
            {new: true}
        )
        if (!updatedUser) return sendRes(res, false, null, "User not Found")

        updatedUser.password = null

        io.to("all").emit("userUpdate", updatedUser)
        io.to(user.id).emit("userUpdate", updatedUser)
        sendRes(res, true, updatedUser)
    },
    sendMessage: async (req, res) => {
        const {user, message, recipientId, isGroupChat} = req.body

        const recipient = await userSchema.find({_id: recipientId})
        recipient.forEach(doc => {
            doc.password = null;
            delete doc.password;
        });
        if (!recipient) return
        const newMessage = new messageSchema({sender: user, senderId: user.id, message, recipientId, recipient: recipient, isGroupChat})
        await newMessage.save()

        const existingNotification = await notificationSchema.findOne({ recipientId: recipient[0]._id, senderId: user.id });
        if (!existingNotification) {
            const notification = new notificationSchema({recipientId: recipient[0]._id, senderId: user.id, message: `You have new message from ${user.username}`},)
            await notification.save()
        }


        io.to("all").emit("newMessage", newMessage);
        io.to(user.username).emit("newMessage", newMessage);
        io.to(recipient[0].username).emit("newMessage", newMessage);

        sendRes(res, true, newMessage)

    },
    likeMessage: async (req, res) => {
        try {
            const {user, _id} = req.body

            const message = await messageSchema.findById(_id)

            if (!message) return sendRes(res, false, null, "Message not found")


            if (message.senderId.toString() === user.id.toString()) return sendRes(res, false, null, "Can't like your own message")


            const likedIndex = message.likes.indexOf(user.username)

            if (likedIndex === -1) message.likes.push(user.username)
            else {message.likes.splice(likedIndex, 1)}

            await message.save()

            io.to("all").emit('messageUpdate', message)
            io.to(message.recipient[0].username).emit('messageUpdate', message)
            io.to(message.sender.username).emit('messageUpdate', message)

            sendRes(res, true)
        }
        catch (error) {
            console.error(error)
            sendRes(res, false, null, error)
        }
    },
    getNotifications: async (req, res) => {
        const {user} = req.body
        try {
            const notifications = await notificationSchema.find({ recipientId: user.id });

            const filteredNotifications = [];
            const senderIds = new Set();

            for (const notification of notifications) {
                const senderId = notification.senderId;

                if (!senderIds.has(senderId)) {
                    filteredNotifications.push(notification);
                    senderIds.add(senderId);
                }
            }

            sendRes(res, true, filteredNotifications)
        } catch (error) {
            console.error(error);
            sendRes(res, false)
        }

    },
    getUsers: async (req, res) => {
        const { user } = req.body
        socketJoin(user.id, "all")
        const users = await userSchema.find()
        sendRes(res, true, users)
    },
    getSelectedUser: async (req, res) => {
        const {id} = req.params
        try {
            const user = await userSchema.find({_id: id});
            if (!user) {
                return sendRes(res, false)
            }

            sendRes(res, true, user)
        } catch (error) {
            console.error(error);
            sendRes(res, false)
        }
    },
    getConversation: async (req, res) => {
        const {user, _id} = req.body
        try {
            const user1 = await userSchema.findOne({ _id: user.id });
            const user2 = await userSchema.findOne({ _id });

            const messages = await messageSchema.find({
                $or: [{ senderId: user1._id, recipientId: user2._id },
                    { senderId: user2._id, recipientId: user1._id }],

            }).sort({timestamp: 1})
            sendRes(res, true, messages)
        } catch (error) {
            console.error(error)

        }
    },
    getConversations: async (req, res) => {
        try {
            const { user } = req.body;
            const allMessages = await messageSchema.find();
            if (!allMessages) return;

            const lastMessages = await messageSchema.aggregate([
                { $sort: { timestamp: -1 } },
                {
                    $project: {
                        senderId: { $toString: "$senderId" },
                        recipientId: { $toString: "$recipientId" },
                        message: "$$ROOT",
                    },
                },
                {
                    $match: {
                        $or: [
                            { senderId: user.id },
                            { recipientId: user.id },
                        ],
                    },
                },
                {
                    $group: {
                        _id: {
                            $concat: [
                                { $min: ["$senderId", "$recipientId"] },
                                "-",
                                { $max: ["$senderId", "$recipientId"] },
                            ],
                        },
                        lastMessage: { $first: "$message" },
                    },
                },
                { $replaceRoot: { newRoot: "$lastMessage" } },
            ]);

            sendRes(res, true, lastMessages);
        } catch (error) {
            console.error(error);
        }
    },
    deleteConversation: async (req, res) => {
        const { _id, id } = req.body
        try {


            const user1 = await userSchema.findOne({ _id })
            const user2 = await userSchema.findOne({ _id: id })

            await messageSchema.deleteMany({
                $or: [
                    { senderId: user1._id, recipientId: user2._id },
                    { senderId: user2._id, recipientId: user1._id },
                ],
            });
            const messages = await messageSchema.find()
            io.to("all").emit(`messageUpdate`, messages)
            io.to(user1.username).emit('messageUpdate', messages)
            io.to(user2.username).emit('messageUpdate', messages)

            sendRes(res, true, messages)

        } catch (error) {
            console.error(error);

        }
    },
    deleteNotifications: async (req, res) => {
        const {xId} = req.body
        try {
            const notification = await notificationSchema.findById(xId);

            if (!notification) {
                sendRes(res, false, null, "Notification not found")
            }
            await notificationSchema.deleteOne({ _id: xId });

            sendRes(res, true, [], )
        } catch (error) {
            console.error(error)
        }

    }

}