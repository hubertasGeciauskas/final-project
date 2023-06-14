
let db = []

const addUser = (id, socket, socketId) => {
    db.push({
        id,
        socket,
        socketId,
        room: "",
    });
};

const getSocket = (id) => {
    const user = db.find((x) => x.id === id);
    return user ? user.socket : null;
};

const removeSocket = (socketId) => {
    db = db.filter((x) => x.socketId !== socketId);
};

const joinRoom = (id, room) => {
    const index = db.findIndex((x) => x.id === id);
    if (index !== -1) {
        db[index].room = room;
    }
};

const getRoom = (id) => {
    const user = db.find((x) => x.id === id);
    return user ? user.room : null;

};

module.exports = {
    addUser,
    getSocket,
    removeSocket,
    joinRoom,
    getRoom,
};