/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC, useEffect} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage, useAuth} from '../modules/auth'
import {App} from '../App.jsx'
import {useSelector} from "react-redux";
import {logout, selectCurrentUser, selectToken, setAuthState} from "../redux/slice/AuthSlice.tsx";
import {useQuery} from "@tanstack/react-query";
import {USER_DATA} from "../api/endpoints/index.jsx";

import {useDispatch} from "react-redux";
import {SETTINGS_DATA} from "../api/endpoints/settings";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {BASE_URL} = import.meta.env

const AppRoutes: FC = () => {
    const dispatch = useDispatch()
    const token = useSelector(selectToken);
    const user = useSelector(selectCurrentUser);
    const { data, isLoading, error } =  useQuery({
        queryKey: ["user"],
        queryFn: USER_DATA
    });

    useEffect(() => {
        if(error) {
            dispatch(logout())
        }
        if(!isLoading && !error && data !== undefined){
            dispatch(setAuthState({token,user:data}))
        }else if(error && !isLoading && data?.status === 'error'){
            dispatch(setAuthState({token: '', user: null}))
        }

    }, [data,isLoading,error]);

    return (
        <BrowserRouter basename={BASE_URL}>
            <Routes>
                <Route element={<App/>}>
                    <Route path='error/*' element={<ErrorsPage/>}/>
                    <Route path='logout' element={<Logout/>}/>
                    {user ? (
                        <>
                            <Route path='/*' element={<PrivateRoutes/>}/>
                            <Route index element={<Navigate to='/dashboard'/>}/>
                        </>
                    ) : (
                        <>
                            <Route path='auth/*' element={<AuthPage/>}/>
                            <Route path='*' element={<Navigate to='/auth'/>}/>
                        </>
                    )}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export {AppRoutes}
