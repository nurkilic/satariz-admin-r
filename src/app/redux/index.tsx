//redux/index.js

//@reduxjs/toolkit
import {configureStore} from '@reduxjs/toolkit'

//Slice
//import initialDataReducer from './slice/initialDataSlice'
import authReducer from './slice/authSlice'
import loadingReducer from './slice/LoadingSlice.tsx'

export const store = configureStore({
    reducer: {
        authReducer,
        loadingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch