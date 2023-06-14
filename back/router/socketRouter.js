const {Server} = require("socket.io");
const socketDb = require("../database/socketDb")
const io = new Server({
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {

    console.log("CONNECTED")
    socket.on("addUser", id => {
        socketDb.addUser(id, socket, socket.id)
        console.log(id, socket.id)
    })


    socket.on("disconnect", () => {
        console.log(`DISCONNECTED`)
        socketDb.removeSocket(socket.id)
    })
});

io.listen(8088);

module.exports = io