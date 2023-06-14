import React, {useRef, useState} from 'react';
import {Box, Button, Input, InputGroup, InputRightElement, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import http from "../plugins/http.jsx";
import {setUser} from "../features/userReducer.jsx";

const SignIn = ({socket}) => {
    const [show, setShow] = useState(false)
    const usernameRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState(null)

    const handleLogin = async () => {

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        const validateUsername = username.length >= 4 && username.length <= 20;
        const validatePassword =
            password.length >= 4 &&
            password.length <= 20 &&
            /[A-Z]/.test(password) &&
            /[!@#$%^&*_+]/.test(password);

        if (!validateUsername) return setError("Your username must be between 4 and 20 characters long.");

        if (!validatePassword) return  setError("Your password must be between 4 and 20 characters long," +
            " include at least one uppercase letter, and include at least one special symbol (!@#$%^&*_+).")

        setError(null);

        const user = {
            username,
            password
        }
        const res = await http.post(user, "login")
        if (res.success) {
            localStorage.setItem("tokenSecret", res.data.token)
            dispatch(setUser(res.data.myUser))
            socket.emit("addUser", res.data.myUser.id)
            navigate("/user")
        }
        else {
            if (res.message) setError(res.message)
        }
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={{base: "35vh", md: "50vh", lg: "55vh"}} mt={20} height={"80vh"}  gap={"2"} >
            <Text as={"b"} fontSize={{base: "3xl", md: "4xl", lg: "5xl"}} color={"white"} >Login</Text>
            <Box as="a" href="/register" color="grey" _hover={{textDecoration: "underline"}} >
                Don't have account?{" "}
                <Text as="span" color="lightblue">
                    Sign In
                </Text>
            </Box>
            <Input color={"white"} ref={usernameRef} type="text" placeholder="Type your username"/>
            <InputGroup size='md'>
                <Input
                    ref={passwordRef}
                    color={"white"}
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={()=> setShow(!show)}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Box maxW={"420px"} >
                <Text color={"red"} >{error}</Text>
            </Box>
            <Button colorScheme={"red"} onClick={handleLogin} >Login</Button>
        </Box>
    );
};

export default SignIn;