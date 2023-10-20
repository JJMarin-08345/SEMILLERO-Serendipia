import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    UserId: "",
    setUserId: () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("User")
    );
    
    if (!isAuthenticated) {
        localStorage.clear();
    }

    const obtenerId = () => { 
        if(isAuthenticated){
            const userId = JSON.parse(localStorage.getItem("User"));
            if(userId){
                return userId.id;
            }
        }
        return "";
    };

    const [UserId, setUserId] = useState(obtenerId);

    return (
        <AuthContext.Provider value = { {isAuthenticated, setIsAuthenticated, UserId, setUserId} }>
            {children}
        </AuthContext.Provider>
    );
}
