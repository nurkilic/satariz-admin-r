import {AuthState} from '../models/index.js'

const REACT_APP_AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v2'

const getCredentialsStorage = (): AuthState => {
    if (!localStorage) {
        return {token: '', user: null}
    }

    const lsValue: string | null = localStorage.getItem(REACT_APP_AUTH_LOCAL_STORAGE_KEY)
    if (!lsValue) {
        return {token: '', user: null}
    }

    try {
        const auth: AuthState = JSON.parse(lsValue) as AuthState
        if (auth) {
            // You can easily check auth_token expiration also
            return auth
        } else {
            return {token: '', user: null}
        }
    } catch (error) {
        console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
        return {token: '', user: null}
    }
}

const setAuthStateStorage = (auth: AuthState) => {
    if (!localStorage) {
        return {token: '', user: null}
    }

    try {
        const lsValue = JSON.stringify(auth)
        localStorage.setItem(REACT_APP_AUTH_LOCAL_STORAGE_KEY, lsValue)
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
    }
}

const removeCredentialsStorage = () => {
    if (!localStorage) {
        return {token: '', user: null}
    }

    try {
        localStorage.removeItem(REACT_APP_AUTH_LOCAL_STORAGE_KEY)
        return {token: '', user: null}
    } catch (error) {
        console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
        return {token: '', user: null}
    }
}

export function setupAxios(axios: any) {
    axios.defaults.headers.Accept = 'application/json'
    axios.interceptors.request.use(
        (config: { headers: { Authorization: string } }) => {
            return config
        },
        (err: any) => Promise.reject(err)
    )
}

export {getCredentialsStorage, setAuthStateStorage, removeCredentialsStorage, REACT_APP_AUTH_LOCAL_STORAGE_KEY}