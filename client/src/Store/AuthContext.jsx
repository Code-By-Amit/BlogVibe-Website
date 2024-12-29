import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/api';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const getLoggedInUser = async () => {
        try {
            const res = await api.get('/auth/verifytoken')
            setUser(res.data.user)
        } catch (error) {
            console.log('Error in getting Logged in User :', error)
        }
    }
    useEffect(() => {
        getLoggedInUser()
    }, [])

    const login = async (credentials) => {
        setLoading(true)
        try {
            const res = await api.post('/auth/login', credentials)
            if (res.status === 200) {
                setUser(res.data.user)
            }
            return res
        } catch (error) {
            console.log('Error While Log in :', error)
            throw error;
        }
        finally {
            setLoading(false)
        }
    }

    const signup = async (credentials) => {
        setLoading(true)
        try {
            const res = await api.post('/auth/signup', credentials)
            if (res.status === 201) {
                setUser(res.data.user)
            }
            return res
        } catch (error) {
            console.log('Error While signup in :', error)
            throw error;
        }
        finally {
            setLoading(false)
        }
    }

    const loginWithGoogle = async () => {
        try {
            window.location.href = 'http://localhost:8000/auth/google'
            // const res = await api.get('/auth/google/callback');
            // if (res.status === 200) {
            //     setUser(res.data.user)
            // }
        } catch (error) {
            console.log('Error While Fetching User', error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        setLoading(true);
        try {
            const res = await api.post("/auth/logout");
            if (res.status === 200) {
                setUser(null);
            }
            return res
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user,setUser, loading, login, signup, logout, loginWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () => useContext(AuthContext);
export default useAuth;