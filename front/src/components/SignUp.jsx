import React, {useRef, useState} from 'react';
import {Box, Button, Input, Text, Stack, InputGroup, InputRightElement} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import http from "../plugins/http.jsx";


const SignUp = () => {

    const usernameRef = useRef()
    const passwordRef = useRef()
    const repeatPasswordRef = useRef()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [match, setMatch] = useState(false)
    const [error, setError] = useState(null)

    const handleRegistration = async () => {

        const username = usernameRef.current.value
        const password = passwordRef.current.value
        const repeatPassword = repeatPasswordRef.current.value

        const validateUsername = username.length >= 4 && username.length <= 20
        const validatePassword =
            password.length >= 4 &&
            password.length <= 20 &&
            /[A-Z]/.test(password) &&
            /[!@#$%^&*_+]/.test(password)

        if (!validateUsername) return setError("Your username must be between 4 and 20 characters long.");

        if (!validatePassword) return  setError("Your password must be between 4 and 20 characters long," +
            " include at least one uppercase letter, and include at least one special symbol (!@#$%^&*_+).")

        setError(null)

        const user = {
            username,
            password,
            repeatPassword
        };

        const res = await http.post(user, "register")
        if (res.success) navigate("/login")
        else {
            if (res.message) setError(res.message)
        }


    }
    const checkPassword = async () => {
        if (passwordRef.current.value === repeatPasswordRef.current.value && passwordRef.current.value.length > 3) setMatch(true)
        else {
            setMatch(false)
        }
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={{base: "35vh", md: "50vh", lg: "55vh"}} height={"80vh"} mt={20}  gap={"2"} >

            <Text as={"b"} fontSize={{base: "3xl", md: "4xl", lg: "5xl"}} color={"white"} >Create new account</Text>

            <Box as="a" href="/login" color="grey" _hover={{textDecoration: "underline"}} >
                Already have an account?{" "}
                <Text as="span" color="lightblue">
                    Log In
                </Text>
            </Box>

            <Stack>
                <Input
                    ref={usernameRef} color={"white"} type="text" placeholder="username"/>
                <InputGroup>
                    <Input
                        onChange={checkPassword}
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
                <InputGroup>
                    <Input

                        onChange={checkPassword}
                        ref={repeatPasswordRef}
                        color={"white"}
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Repeat password' />
                    {match && <InputRightElement>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 12 12">
                            <path fill="green"
                                  d="M9.765 3.205a.75.75 0 0 1 .03 1.06l-4.25 4.5a.75.75 0 0 1-1.075.015L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.705 1.704l3.72-3.939a.75.75 0 0 1 1.06-.03Z"/>
                        </svg>
                    </InputRightElement>}
                </InputGroup>
            </Stack>
            <Box maxW={"420px"} >
                <Text color={"red"} >{error}</Text>
            </Box>



            <Button colorScheme={"red"} onClick={handleRegistration} >Sign Up</Button>

        </Box>
    );
};

export default SignUp;