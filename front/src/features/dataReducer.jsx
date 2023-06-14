import {createSlice} from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: "data",
    initialState: {
        movies: [],
        movie: [],
        conversations: [],
        messages: [],

    },
    reducers: {
        setConversations: (state, {payload}) => {
            state.conversations = payload
        },
        setMessages: (state, {payload}) => {
            state.messages = payload
        },
        addMessage: (state, {payload}) => {
            state.messages.push(payload)
        },
        updateMessage: (state, {payload}) => {
            const index = state.messages.findIndex(x => x._id === payload._id)
            state.messages[index] = payload
        }


    }
})

export const { addMessage, setConversations, setMessages, updateMessage} = dataSlice.actions
export default dataSlice.reducer