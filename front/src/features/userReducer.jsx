import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        setUser: (state, {payload}) => {
            state.user = payload
        },
        setUsers: (state, {payload}) => {
            state.users = payload
        },
        setSelectedUser: (state, {payload}) => {
            state.selectedUser = payload
        },
        updateUser: (state, {payload}) => {
            const index = state.users.findIndex(x => x._id === payload._id)
            state.users[index] = payload
        },
        setNotifications: (state, {payload}) => {
            state.notifications = payload
        }

    }
})

export const {setUser, setUsers, updateUser, setSelectedUser, setNotifications} = userSlice.actions
export default userSlice.reducer