import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../src/Store/AuthContext.jsx';

const GoogleCallback = () => {
    const { setUser, setLoading, setError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleGoogleCallback = async () => {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:8000/auth/google/callback', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                if (res.ok) {
                    setUser(data.user);  // Store user data
                    navigate('/dashboard');  // Redirect to a protected page after login
                } else {
                    setError('Google login failed');
                    navigate('/login');  // Redirect back to login on error
                }
            } catch (error) {
                console.error('Error in Google callback:', error);
                setError('Error in Google login');
            } finally {
                setLoading(false);
            }
        };

        handleGoogleCallback();
    }, [setUser, setLoading, setError, navigate]);

    return <div>Loading...</div>;
};

export default GoogleCallback;
