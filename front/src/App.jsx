import {Container} from "@chakra-ui/react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import NavBar from "./components/NavBar.jsx";
import {useEffect} from "react";
import http from "./plugins/http.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setUsers, setUser, updateUser, setNotifications} from "./features/userReducer.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Users from "./pages/Users.jsx";
import { io } from 'socket.io-client';
import User from "./pages/User.jsx";
import ChatPages from "./pages/ChatPages.jsx";
import ConversationsPage from "./pages/ConversationsPage.jsx";
const socket = io("http://localhost:8088")




function App() {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user.user)
    const users = useSelector(store => store.user.users)
    const notifications = useSelector(store => store.user.notifications)

    useEffect(()=>{
        http.postWithToken({}, "autologin").then( res => {
            if (res.success) {
                dispatch(setUser(res.data))
                socket.emit("addUser", res.data._id)
            }
        })

        http.postWithToken({}, "getUsers").then( res => {
            if (res.success) {
                dispatch(setUsers(res.data))
            }

        })



        socket.on("userUpdate", user => {
            console.log(user)
            dispatch(updateUser(user))})
    },[])
    useEffect(()=>{
        http.postWithToken({}, "getNotifications").then( res => {
            if (res.success) dispatch(setNotifications(res.data))
        })
    },[notifications])



    return (
        <div className="bg"  >
            <Container  maxW={"80%"}>
                <NavBar/>
                <Routes >
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/login" element={<Login socket={socket} />}></Route>
                    <Route path="/user" element={<Profile socket={socket} />}></Route>
                    <Route path="/users" element={<Users socket={socket} />}></Route>
                    <Route path="/user/:id" element={<User socket={socket} />}></Route>
                    <Route path="/chat/:id" element={<ChatPages socket={socket} />}></Route>
                    <Route path="/conversations" element={<ConversationsPage socket={socket}/>}></Route>
                </Routes>
            </Container>
        </div>

    )
}

export default App
