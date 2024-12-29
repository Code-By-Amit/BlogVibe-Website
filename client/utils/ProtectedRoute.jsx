import { Navigate } from "react-router-dom";
import api from "../src/api/api";
import { useEffect, useState } from "react";
import useAuth from "../src/Store/AuthContext";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {user,setUser} = useAuth()
    useEffect   (() => {
        const checkAuth = async () => {
            try {
                if(user){
                    setIsAuthenticated(true);
                }else{
                    const res = await api.get('/auth/verifytoken')
                    setUser(res.data.user)
                    setIsAuthenticated(true)
                }
            } catch (error) {
                console.log('Error :',error)
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === false) {
        return <h1>Loading...</h1>;
    }

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;