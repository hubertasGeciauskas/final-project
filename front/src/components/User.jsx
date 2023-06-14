import React, {useEffect} from 'react';
import {Box, Button, Img, Text} from "@chakra-ui/react";
import {updateUser} from "../features/userReducer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const User = ({item, socket}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(store => store.user.user)

    useEffect(()=>{
        socket.on("userUpdate", user => {
            console.log(user)
            dispatch(updateUser(user))})
    },[dispatch])


    return (
        <Box as={Button} onClick={()=> navigate(`/user/${item._id}`)} boxSize="260px" display={ item.username === user.username? "none" :  "flex"}
             bg={"blue.900"} flexDirection={"column"} justifyContent={"space-evenly"} alignItems={"center"} _hover={{ backgroundColor: "blue.700" }}>
            <Img boxSize={150} borderRadius={"100%"} src={item?.image} alt=""/>
            <Text color={"white"}>{item?.username}</Text>
        </Box>
    );
};

export default User;