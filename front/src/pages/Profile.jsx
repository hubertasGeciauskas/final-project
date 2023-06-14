import React, {useState, useRef} from 'react';
import {Box, Button, Flex, Text, Img, Input} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import http from "../plugins/http.jsx";
import {setUser, updateUser} from "../features/userReducer.jsx";

const Profile = ({socket}) => {
    const user = useSelector(store => store.user.user)
    const [edit,setEdit] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const passwordRef = useRef()
    const oldPasswordRef = useRef()
    const newPasswordRef = useRef()
    const repeatNewPasswordRef = useRef()
    const imageRef = useRef()
    const usernameRef = useRef()
    const dispatch = useDispatch()
    const [selectedComp, setSelectedComp] = useState("My Profile")
    const [error,setError] = useState(null)

    const changeImage = async () => {
        const photo = {
            image: imageRef.current.value
        }
        const res = await http.postWithToken(photo, "updateImage")
        if (res.success) {
            dispatch(updateUser(res.data))
            dispatch(setUser(res.data))
        }
        socket.on("userUpdate", user => {
            console.log(user)
            dispatch(updateUser(user))})
    }
    const changeUsername = async () => {
        const username = usernameRef.current.value
        const password = passwordRef.current.value

        const validateUsername = username.length >= 4 && username.length <= 20;

        if (!validateUsername) return setError("Your username must be between 4 and 20 characters long.");

        setError(null)

        const updatingUser = {username, password}

        const res = await http.postWithToken(updatingUser, "changeUsername")
        if (res.success) {
            alert("Username successfully changed")
            dispatch(setUser(res.data))
        }
        else {
            if (res.message) setError(res.message)
        }
    }
    const changePassword = async () => {
        const oldPassword = oldPasswordRef.current.value
        const password = newPasswordRef.current.value
        const repeatPassword = repeatNewPasswordRef.current.value

        const validatePassword =
            password.length >= 4 &&
            password.length <= 20 &&
            /[A-Z]/.test(password) &&
            /[!@#$%^&*_+]/.test(password);

        if (!validatePassword) return  setError("Your password must be between 4 and 20 characters long," +
            " include at least one uppercase letter, and include at least one special symbol (!@#$%^&*_+).")

        setError(null);

        const passwords = {
            oldPassword,
            password,
            repeatPassword
        }

        const res = await http.postWithToken(passwords, "changePassword")
        if (res.success) alert("Password successfully changed")
        else {
            if (res.message) setError(res.message)
        }
    }

    return (

        <Flex p={10} mt={10}   flexDirection={{base: "column", md: "row", lg: "row"}}  gap={10} >
            {/*Left Side*/}
            <Flex flex={3} flexDirection={"column"} mt={{base: "", md: "20px", lg: "20px"}}   alignItems={"center"} gap={5}>
                {/*User Image + Edit button*/}

                <Box pos={"relative"}>
                    <Img borderRadius={"100%"}  boxSize={"150px"} src={user?.image} alt=""/>
                    <Box onClick={() => setEdit(!edit)}  cursor={"pointer"} p={1} borderRadius={"100%"} bg={"red.700"} pos={"absolute"} right={0} bottom={5} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"/></svg></Box>
                </Box>
                {user && <Text color={"white"} fontSize={"5xl"} >{user?.username}</Text>}
                <Text onClick={()=>setSelectedComp("My Profile")} cursor={"pointer"} color={"white"}>Profile</Text>
                <Text onClick={()=>setSelectedComp("Change Username")} cursor={"pointer"} color={"white"}>Change username</Text>
                <Text onClick={()=>setSelectedComp("Change Image")} cursor={"pointer"} color={"white"} >Change image</Text>
                <Text onClick={()=>setSelectedComp("Change Password")} cursor={"pointer"} color={"white"}>Change password</Text>

            </Flex>


            {/*Right Side*/}
            <Flex flex={4} flexDirection={"column"}   mt={{base: "", md: "210px", lg: "210px"}} alignItems={"center"} gap={5}>

                {/*My Profile Edit and Done*/}
                {selectedComp === "My Profile" && <Flex alignItems={"center"}  gap={3}>
                    <Text fontSize={"4xl"} color={"white"}>{selectedComp}</Text>
                    {disabled && <Button onClick={() => setDisabled(!disabled)} size={"xs"}>Edit</Button>}
                    {!disabled &&
                        <Button onClick={() => setDisabled(!disabled)} colorScheme={"red"} size={"xs"}>Done</Button>}
                </Flex>}
                {/*My Profile*/}
                {selectedComp === "My Profile" && <Flex flexDirection={"column"} gap={2}>
                    <Flex gap={15}>
                        <Box>
                            <Text color={"white"}>First Name</Text>
                            <Input isDisabled={disabled} color={"white"} type={"text"}
                                   placeholder={user.firstName ? user.firstName : "First Name"}/>
                        </Box>
                        <Box>
                            <Text color={"white"}>Last Name</Text>
                            <Input isDisabled={disabled} color={"white"} type={"text"}
                                   placeholder={user.lastName ? user.lastName : "Last Name"}/>
                        </Box>


                    </Flex>
                    <Box display={"flex"} gap={15}>
                        <Box>
                            <Text color={"white"}>Email Adress</Text>
                            <Input isDisabled={disabled} color={"white"} type={"email"}
                                   placeholder={user.email ? user.firstName : "Email Adress"}/>

                        </Box>
                        <Box>
                            <Text color={"white"}>Phone Number</Text>
                            <Input isDisabled={disabled} color={"white"} type={"number"} placeholder={"Phone Number"}/>
                        </Box>
                    </Box>
                    <Box display={"flex"} gap={15}>
                        <Box>
                            <Text color={"white"}>Location</Text>
                            <Input isDisabled={disabled} color={"white"} type={"text"} placeholder={"Location"}/>
                        </Box>
                        <Box>
                            <Text color={"white"}>Post Code</Text>
                            <Input isDisabled={disabled} color={"white"} type={"text"} placeholder={"Post Code"}/>
                        </Box>


                    </Box>



                </Flex>}


                {/*Change Username    */}
                {selectedComp === "Change Username" && <Box display={"flex"}  flexDirection={"column"} gap={2}>
                    <Text fontSize={"4xl"} color={"white"}>{selectedComp}</Text>
                    <Input ref={usernameRef} color={"white"} type={"text"} placeholder={"Type in new username"}/>
                    <Input ref={passwordRef} color={"white"} type={"password"} placeholder={"Confirm with password"}/>
                    <Flex justifyContent={"space-around"} >
                        <Button onClick={changeUsername} colorScheme={"red"}>Change</Button>
                        <Button onClick={() => setSelectedComp("My Profile")} >Return</Button>
                    </Flex>

                </Box>}

                {/*Change Image    */}
                {selectedComp === "Change Image" && <Box display={"flex"}  flexDirection={"column"} gap={2}>
                    <Text fontSize={"4xl"} color={"white"}>{selectedComp}</Text>
                    <Input ref={imageRef} color={"white"} type={"text"} placeholder={"Insert new image URL"}/>
                    <Flex justifyContent={"space-around"} >
                        <Button onClick={changeImage} colorScheme={"red"}>Change</Button>
                        <Button onClick={() => setSelectedComp("My Profile")} >Return</Button>
                    </Flex>

                </Box>}

                {/*Change Password*/}
                {selectedComp === "Change Password" && <Box display={"flex"}  flexDirection={"column"} gap={2}>
                    <Text fontSize={"4xl"} color={"white"}>{selectedComp}</Text>
                    <Input ref={oldPasswordRef} type={"password"} color={"white"} placeholder={"Old password"}/>
                    <Input ref={newPasswordRef} type={"password"} color={"white"} placeholder={"New password"}/>
                    <Input ref={repeatNewPasswordRef} type={"password"} color={"white"} placeholder={"Repeat new password"}/>
                    {error && <Text color={"red"} >{error}</Text>}
                    <Flex justifyContent={"space-around"}>
                        <Button onClick={changePassword} mt={1} colorScheme={"red"} >Update</Button>
                        <Button onClick={()=>setSelectedComp("My Profile")} mt={1} >Return</Button>
                    </Flex>

                </Box>}


            </Flex>

        </Flex>



    );
};

export default Profile;