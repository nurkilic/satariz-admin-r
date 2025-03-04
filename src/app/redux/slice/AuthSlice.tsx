import {createSlice} from '@reduxjs/toolkit'

import {getCredentialsStorage,setAuthStateStorage,removeCredentialsStorage} from '../../helpers/AuthHelpers.js'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {User, AuthState} from '../../models/index.js'
import type {RootState} from '../index'

const slice = createSlice({
    name: 'auth',
    initialState: getCredentialsStorage() as AuthState,
    reducers: {
        setAuthState: (
            state,
            {payload: {user, token}}: PayloadAction<{user: User|null; token: string}>
        ) => {
            state.user = user
            state.token = token
            setAuthStateStorage({token,user})
        },
        logout: (state) => {
            // Update the state to log out the user
            // For example, reset the authentication state
            removeCredentialsStorage()
            state.token = '';
            state.user = null;
        },

    },
})

export const {setAuthState,logout} = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
