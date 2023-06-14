import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import http from "../plugins/http.jsx";
import {updateUser, setSelectedUser} from "../features/userReducer.jsx";
import {Text, Img, Flex, Box, Button, Input} from "@chakra-ui/react";
import {addMessage} from "../features/dataReducer.jsx";


const User = ({socket}) => {
    const [writeMessage, setWriteMessage] = useState(false)
    const [message, setMessage] = useState()
    const [goodMessage, setGoodMessage] = useState()
    const dispatch = useDispatch()
    const {id} = useParams()
    const messageRef = useRef()
    const selectedUser = useSelector(store => store.user.selectedUser)

    useEffect(()=>{
        http.get(`getSelectedUser/${id}`).then(res=> {
            if (res.success) dispatch(setSelectedUser(res.data))
        })
        socket.on("userUpdate", user => {
            console.log(user)
            dispatch(updateUser(user))})
    },[])
    const sendMessage = async () => {
        const message = {
            message: messageRef.current.value,
            recipientId: selectedUser[0]._id,
            isGroupChat: false
        }
        console.log(message)
        if (message.message.length <= 0 ) return setMessage("You can't send empty message")
        const res = await  http.postWithToken(message, `sendMessage`)
        if (res.success) {
            dispatch(addMessage(res.data))
            setWriteMessage(!writeMessage)
            setGoodMessage("Message was successsfully send")
        }
    }

    return (
        <Flex  justifyContent={"center"}  >

            {/*User Box*/}
            <Flex mt={20} boxSize={700} bg={"blue.800"} flexDirection={"column"} borderRadius={"5px"} justifyContent={"space-evenly"} alignItems={"center"} >

                {/*User Info Box*/}
                {selectedUser && <Flex flex={6} flexDirection={"column"} justifyContent={"space-evenly"} textAlign={"center"}>
                    <Img mt={19} borderRadius={"100%"} boxSize={220} src={selectedUser[0]?.image}/>
                    <Text color={"white"}><b>Username: </b>{selectedUser[0]?.username} </Text>
                    <Box textAlign={"center"}>
                        <Button onClick={() => setWriteMessage(!writeMessage)} colorScheme={"red"}>Write Quick
                            Message</Button>
                        <Text mt={2} color={"white"}>{goodMessage}</Text>
                    </Box>
                </Flex>}

                {/*Pop up Inputs for message sending*/}
                {writeMessage && <Flex flex={3} bg={"blue.800"} justifyContent={"center"} alignItems={"center"}  flex={3}>
                    <Flex textAlign={"center"} flexDirection={"column"} boxSizing={"300px"} >
                        <Input ref={messageRef} bg={"white"}  placeholder='Type in your message' size='md' />
                        <Flex justifyContent={"space-around"} >
                            <Button w={"80px"}  mt={5} colorScheme={"red"} onClick={sendMessage} >Send</Button>
                            <Button w={"80px"}  onClick={()=>setWriteMessage(!writeMessage)} mt={5}>Return</Button>
                        </Flex>
                        <Text mt={2} color={"red"}>{message}</Text>
                    </Flex>
                </Flex>}

                {/*For View*/}
                {!writeMessage && <Flex flex={3} ></Flex>}

            </Flex>

        </Flex>
    );
};

export default User;