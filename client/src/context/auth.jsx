import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ''
    })

    // axios config, allow us to not config it
    axios.defaults.baseURL = process.env.REACT_APP_API
    axios.defaults.headers.common['Authorization'] = auth?.token

    // useEffect used when componentMount
    useEffect(() => {
        const data = localStorage.getItem("auth")
        if (data) {
            // parse data from localStorage
            const parsed = JSON.parse(data)
            setAuth({ ...auth, user: parsed.user, token: parsed.token })
        }
    }, [])

    return <AuthContext.Provider value={[auth, setAuth]}>
        {children}
    </AuthContext.Provider>
}

//customized hook that return authContext
const useAuth = () => useContext(AuthContext)

// const[auth, setAuth] = useAuth

export { useAuth, AuthProvider }