import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Flex, Menu, Img, Box, Button, MenuButton, MenuList, MenuItem, MenuGroup, Stack, Link} from "@chakra-ui/react";
import {setNotifications, setUser} from "../features/userReducer.jsx";
import http from "../plugins/http.jsx";



const NavBar = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const notifications = useSelector(store => store.user.notifications)
    const user = useSelector(store => store.user.user)

    const handleLogOut = async () => {
        dispatch(setUser(null))
        localStorage.clear("tokenSecret")
        navigate("/")
    }
    const openNotification = async (senderId, xId) => {
        navigate(`/chat/${senderId}`)
        const res = await http.postWithToken({xId}, "deleteNotifications")
        if (res.success) dispatch(setNotifications(res.data))
    }

    return (
        <Flex p={2} justifyContent={{base: "flex-end", md: "space-between", lg: "space-between"}}>

            {/*Left side toolbar*/}
            <Box display={{base: "none", md: "flex", lg: "flex"}} gap={10} >
                <Link _hover={{color: "lightblue"}} color={"red"} href={"/"} >Home</Link>
                <Link _hover={{color: "lightblue"}} color={"white"} href={"/users"} >All Users</Link>
            </Box>

            {/*Right side*/}
            <Box display={"flex"}  gap={2} >

                {user &&
                    // User
                    <Menu >
                        <MenuButton _hover={{opacity: "0.9"}} >
                            <Img  display={{base: "none", md: "block", lg: "block"}} boxSize={12} borderRadius={"100%"}  src={user.image}/>
                            <Box display={{base: "block", md: "none", lg: "none"}} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><g fill="none">
                                    <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="white" d="M20 17.5a1.5 1.5 0 0 1 .144 2.993L20 20.5H4a1.5 1.5 0 0 1-.144-2.993L4 17.5h16Zm0-7a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3h16Zm0-7a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 1 1 0-3h16Z"/></g></svg>
                            </Box>
                        </MenuButton>
                        <MenuList>
                            <MenuGroup
                                title={`${user.username.charAt(0).toUpperCase()}${user.username.substring(1)} Profile`}>
                                <MenuItem display={{base: "block", md: "none", lg: "none"}} onClick={() => navigate('/')}>Home</MenuItem>
                                <MenuItem onClick={() => navigate('/user')}>My Account</MenuItem>
                                <MenuItem onClick={() => navigate('/conversations')}>Conversations</MenuItem>
                                <MenuItem display={{base: "block", md: "none", lg: "none"}} onClick={() => navigate('/users')}>All Users</MenuItem>
                                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>}
                {user &&
                    // Notifications
                    <Menu>
                        <MenuButton _hover={{opacity: "0.9"}} style={{position: "relative"}} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><g fill="none">
                                <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="white" d="M15 19a2 2 0 0 1-1.85 1.995L13 21h-2a2 2 0 0 1-1.995-1.85L9 19h6ZM12 2a7 7 0 0 1 6.996 6.76L19 9v3.764l1.822 3.644a1.1 1.1 0 0 1-.869 1.586l-.115.006H4.162a1.1 1.1 0 0 1-1.03-1.487l.046-.105L5 12.764V9a7 7 0 0 1 7-7Z"/></g></svg>
                            {notifications && notifications.length > 0 && (
                                <span className="notification-count">{notifications.length}</span>
                            )}
                        </MenuButton>
                        <MenuList  border={"none"}>
                            <MenuGroup
                                title={notifications?.length === 0 ? "No Notifications": ""}>
                                {notifications && notifications.map((x, i) => <MenuItem  bg={"rgba(255, 255, 255, 0.9)"}  onClick={()=>openNotification(x.senderId, x._id)} key={i}>
                                    <li style={{color: "red"}}></li>
                                    {x.message}
                                </MenuItem>)}

                            </MenuGroup>
                        </MenuList>
                    </Menu>}

                {/*If no user logged in */}
                {!user && <Stack direction={"row"} >
                    <Button onClick={()=>navigate("/register")} >Sign Up</Button>
                    <Button onClick={()=>navigate("/login")} colorScheme={"red"} >Sign In</Button>
                </Stack>}
            </Box>




        </Flex>


    );
};

export default NavBar;