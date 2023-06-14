import React, {useRef, useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import http from "../plugins/http.jsx";
import {addMessage, setMessages, updateMessage} from "../features/dataReducer.jsx";
import moment from "moment";
import {Box, Flex, Img, Text, Input, Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";

const Chat = ({socket}) => {
    const messageRef = useRef()
    const dispatch = useDispatch()
    const { id: routeId } = useParams()
    const user = useSelector(store => store.user.user)
    const messages = useSelector(store => store.data.messages)



    useEffect(()=>{
        const id = {_id: routeId}
        http.postWithToken(id, `getConversation`).then(res => {
            if (res.success) dispatch(setMessages(res.data))
        })
    },[routeId, messages])

    useEffect(()=>{
        socket.on("newMessage", message => {dispatch(addMessage(message))})
        socket.on("messageUpdate", message => {dispatch(updateMessage(message))})
    },[])
    const sendMessage = async () => {

        const recipientId = messages[0]?.sender.username === user.username
            ? messages[0].recipient[0]._id
            : messages[0].sender.id;

        const messageContent = messageRef.current.value.trim();

        if (messageContent === "") return;

        const item = {
            message: messageContent,
            recipientId,
            isGroupChat: false,
        }

        const res = http.postWithToken(item, "sendMessage")
        if (res.success) dispatch(addMessage(res.data))

    }
    const likeMessage = async (x) => {
        const item = {
            _id: x._id
        }
        const res = await http.postWithToken(item, "likeMessage")
        if (res.success) dispatch(updateMessage(res.data))
    }

    return (
        <Box  height={"90vh"} mt={10} bg={"blackAlpha.400"} >

            {/*// Chat Header part*/}
            <Flex height={"12%"} justifyContent={"space-between"} alignItems={"center"}  p={5}>


                {messages?.length && user && messages[messages.length - 1]?.sender.username !== user.username && <Flex gap={10} ml={15}>

                    <Img boxSize={20} borderRadius={"100%"} src={messages[messages.length - 1]?.sender.image} alt=""/>
                    <Box>
                        <Text color={"white"} mb={0}>{messages[0]?.sender.username}</Text>
                        <Text color={"#FFE0DF"} mt={0}>Online</Text>
                    </Box>

                </Flex>}
                {messages && user && messages[messages.length - 1]?.sender.username === user.username && <Flex gap={10} ml={15}>

                    <Img boxSize={20} borderRadius={"100%"} src={messages[messages.length - 1]?.recipient[0].image} alt=""/>
                    <Box display={{base: "none", md: "block", lg: "block"}}>
                        <Text color={"white"} mb={0}>{messages[messages.length - 1].recipient[0]?.username}</Text>
                        <Text color={"#FFE0DF"} mt={0}>Online</Text>
                    </Box>

                </Flex>}

                <Box mr={"20px"} >
                    <svg style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 20">
                        <path fill="white" d="m9.25 22l-.4-3.2q-.325-.125-.613-.3t-.562-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2h-5.5Zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Z"/></svg>

                </Box>

            </Flex>

            {/*CHAT Box*/}
            <Box p={"10px"} borderRadius={"0 7% 0 0"} bg={"white"} height={"70.5%"}  style={{overflowY: "auto", wordWrap: "break-word"}} >
                {messages && messages.map((x, i) => (
                    <Flex gap={"2px"} justifyContent={x.sender.username === user.username ? "flex-end" : "flex-start"} alignItems={"center"} key={i}>
                        <Flex gap={"5px"} bg={"white"} maxWidth={"50%"} flexDirection={x.sender.username === user.username? "row-reverse" : "row"} >
                            <Flex flexDirection={"column"} justifyContent={"flex-end"} >
                                <Img boxSize={"30px"} borderRadius={"100%"} src={x.sender.username? x.sender.image : x.recipient[0].image}/>
                            </Flex>

                            <Box >
                                <Text m={"6px"} fontSize={"12px"} bg={x.sender.username !== user.username? "lightblue" : "#D0D0D0"}
                                      p={"2px"} textAlign={"center"} borderRadius={"5px"} h={"20px"} w={"40px"}>
                                    {moment(x.timestamp).format('HH:mm')}
                                </Text>
                                <Text position="relative" style={{wordWrap: "break-word"}} bg={x.sender.username !== user.username? "lightblue" : "#D0D0D0"} p={"8px"} m={0} whiteSpace={"pre-wrap"}
                                      borderRadius={x.sender.username === user.username? "10px 10px 0 10px" :"10px 10px 10px 0"}>

                                    <Menu  >
                                        <MenuButton>
                                            <Box >
                                                {x.message}
                                                <Box position="absolute" bottom="0" transform="translate(50%, 50%)"
                                                     left={x.sender.username !== user.username ? "" : "0"}
                                                     right={x.recipient[0].username !== user.username ? "" : "0"}>
                                                    {x.likes.length > 0  && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="red" viewBox="0 0 48 48">
                                                            <path d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12z" />
                                                        </svg>)}
                                                </Box>
                                            </Box>
                                        </MenuButton>
                                        <MenuList minWidth='30px' border={"none"} bg={"transparent"}>
                                            <MenuItem onClick={()=>likeMessage(x)} bg={"transparent"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                                                    <path fill="#F44336" d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12z"/></svg>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Text>
                            </Box>

                        </Flex>

                    </Flex>
                ))}
            </Box>

            {/*Chat Footer*/}
            <Flex p={2} justifyContent={"space-between"} alignItems={"center"} boxSizing={"border-box"} h={"5%"} bg={"whitesmoke"}>

                <Box ml={"10px"} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none">
                        <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="gray" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2Zm0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm2.8 9.857a1 1 0 1 1 1.4 1.428A5.984 5.984 0 0 1 12 17a5.984 5.984 0 0 1-4.2-1.715a1 1 0 0 1 1.4-1.428A3.984 3.984 0 0 0 12 15c1.09 0 2.077-.435 2.8-1.143ZM8.5 8a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Zm7 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Z"/></g></svg>
                </Box>
                <Box w={"80%"}  >
                    <Input style={{width: "100%", backgroundColor: "whitesmoke",}} ref={messageRef} type="text" placeholder={"Type in your message"} />
                </Box>
                <Box p={"5px"} >
                    <Button onClick={sendMessage} colorScheme={"red"} p={"10px"} borderRadius={"0 10px 0 10px"} border={"none"}>Send</Button>
                </Box>

            </Flex>

        </Box>
    );
};

export default Chat;