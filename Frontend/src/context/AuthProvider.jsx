import { useState } from "react";
import AuthContext from "./AuthContext";
import { getMe } from "../services/userService";

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
});
    const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
});

    const login = (data) => {
        setUser(data.user);
        setToken(data.token);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
    };

    const updateUser = (updatedUser) => {
        
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;