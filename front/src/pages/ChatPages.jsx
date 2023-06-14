import React from 'react';
import Chat from "../components/Chat.jsx";

const ChatPages = ({socket}) => {
    return (
        <Chat socket={socket}/>
    );
};

export default ChatPages;