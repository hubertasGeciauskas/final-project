import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Flex, Text, Box} from "@chakra-ui/react";

import User from "../components/User"
import {updateUser} from "../features/userReducer.jsx";


const Users = ({socket}) => {
    const dispatch = useDispatch()
    const users = useSelector(store => store.user.users)

    useEffect(()=>{
        socket.on("userUpdate", user => {
            console.log(user)
            dispatch(updateUser(user))})
    },[dispatch])

    return (
        <Box  mt={10}   >

            <Text ml={"auto"} mt={5} color={"white"} as={"b"} fontSize={"3xl"} >Existing Users:</Text>

            <Flex  wrap={"wrap"} justifyContent={"center"} mt={20} mb={20} gap={10}>
                {users && users.map((x,i) => <User key={i} socket={socket} item={x}/>)}
            </Flex>

        </Box>
    );
};

export default Users;