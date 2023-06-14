import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./features/userReducer.jsx";
import dataReducer from "./features/dataReducer.jsx";
import { ChakraProvider } from '@chakra-ui/react'
import './App.css'

const store = configureStore({
    reducer: {
        user: userReducer,
        data: dataReducer

    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </Provider>
    </BrowserRouter>


)