import React from 'react';
import SignIn from "../components/SignIn.jsx";

const Login = ({socket}) => {
    return (
        <SignIn socket={socket}/>
    );
};

export default Login;