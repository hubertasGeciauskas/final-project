import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Flex, Text, Img, Button} from "@chakra-ui/react";
import {setConversations, setMessages, updateMessage} from "../features/dataReducer.jsx";
import moment from "moment"
import {useNavigate} from "react-router-dom";
import {updateUser} from "../features/userReducer.jsx";
import http from "../plugins/http.jsx";

const ConversationsPage = ({socket}) => {
    const dispatch = useDispatch()
    const conversations = useSelector(store => store.data.conversations)
    const navigate = useNavigate()
    const user = useSelector(store => store.user.user)
    const messages = useSelector(store => store.data.messages)


    useEffect(()=>{
        http.postWithToken({},"getConversations").then(res => {
            if (res.success) dispatch(setConversations(res.data))
        })
    },[dispatch, messages])

    const deleteConversation = async (id) => {
        const ids = {_id: user._id, id}
        http.postWithToken(ids, "deleteConversation").then(res => {
            if (res.success) dispatch(setMessages(res.data))
        })
    }
    const openChat = (x) => {
        navigate(`/chat/${x.sender.username !== user.username? x.senderId : x.recipientId}`)
    }


    return (
        <Flex  flexDirection={"column"} mt={10}  gap={2}>

            <Text fontSize={"4xl"} as={"b"} color={"white"} >Conversations</Text>

            {conversations.map((x,i) => <Flex key={i}   border={"1px"} p={2} gap={5} >
                <Flex
                    flex={1}
                    p={6}
                    as={Button}
                    bg={"blue.900"}
                    justifyContent={{base: "space-around", md: "space-evenly", lg: "space-evenly"}}
                    gap={10}
                    onClick={()=>openChat(x)}
                    _hover={{bg: "blue.700"}}
                >
                    {x.recipient && <Flex justifyContent={"flex-start"} alignItems={"center"} gap={5} flex={2}>
                        <Img borderRadius={"100%"} boxSize={10} src={x.sender.username !== user.username ? x.sender.image : x.recipient[0]?.image}/>
                        <Text display={{base: "none", md: "flex", lg: "flex"}} color={"white"}>{x.sender.username !== user.username ? x.sender.username : x.recipient[0]?.username}</Text>
                    </Flex>}

                    <Flex  justifyContent={"center"} p={2} flex={2} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} >
                        <Text color={"white"} >{x.message}</Text>
                    </Flex>

                    <Flex display={{base: "none", md: "none", lg: "flex"}}  justifyContent={"center"} p={2} flex={2}>
                        <Text color={"white"} >{moment(x.timestamp).format('MMMM Do, YYYY [at] h:mm:ss A')}</Text>
                    </Flex>

                </Flex>

                <Flex mt={"auto"} mb={"auto"} as={Button} onClick={() => deleteConversation(x.sender.username !== user.username? x.senderId : x.recipientId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 15 15">
                        <path fill="#7393B3" d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27Z"/></svg>
                </Flex>


            </Flex>)}
        </Flex>
    );
};

export default ConversationsPage;