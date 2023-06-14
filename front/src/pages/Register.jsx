import React from 'react';
import SignUp from "../components/SignUp.jsx";

const Register = ({socket}) => {
    return (
        <SignUp socket={socket}/>
    );
};

export default Register;