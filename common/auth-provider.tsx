import { createContext, useContext, useState } from "react"

interface AuthState {
    userInfo: any;
    setUserInfo: (val) => void;
}

const initState: AuthState = {
    userInfo: null,
    setUserInfo: (val) => { }
}


const AuthContext = createContext<AuthState>(initState);

export const AuthProvider = ({ children, initUser }) => {

    const [userInfo, setUserInfo] = useState(initUser);

    const value = {
        userInfo,
        setUserInfo
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}