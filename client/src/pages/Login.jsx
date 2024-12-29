import React, { useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { InputBox } from '../components/UI/InputBox'
import { UserRound, KeyRound } from 'lucide-react';
import useAuth from '../Store/AuthContext'
import { toast } from 'react-toastify';

export const Login = () => {
    const { loginWithGoogle } = useAuth()
    const [usernameError, setUserameError] = useState(false)
    const [passwordError, setPsswordError] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const toastStyle = {
        padding: "1rem 1rem",
        width: "25rem",
    }

    const { login } = useAuth()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await login(formData);
            console.log(res)
            if (res.data.success) {
                toast.success(res.data.message, { style: toastStyle })
                navigate('/')
            } else {
                toast.error(res.data.message, { style: toastStyle })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const validateInput = (name, value) => {
        if (name == 'username') {
            const usernameRegex = /^[a-z0-9_-]*$/
            if (usernameRegex.test(value)) {
                setUserameError(false)
            }
            else {
                setUserameError(true)
            }
        }
        else if(name == 'password'){
            if(value == ''){
                setPsswordError(true)
            }
            else{
                setPsswordError(false)
            }
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateInput(name,value)
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
  
    return (
        <>
            <div className='w-full flex h-cover flex-col justify-center items-center'>
                <form className="p-4" method='POST' onSubmit={handleSubmit}>
                    <h1 className='text-center font-serif mb-14 sm:text-xl md:text-3xl'>Welcome Back</h1>
                    <div className="input flex flex-col items-center justify-center gap-2 w-auto sm:w-full sm:gap-3 sm:px-5">
                        <InputBox type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} error={usernameError} icon={<UserRound />} />
                        {usernameError && <p className='text-sm text-red-500'>*Please Enter Valid Username.</p>}
                        <InputBox type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} error={passwordError} icon={<KeyRound />} />
                        {passwordError && <p className='text-sm text-red-500'>*Please Enter Password.</p>}
                    </div>

                    <div className='m-auto w-fit mt-16'>
                        <button type='submit' disabled={usernameError || passwordError} className='bg-black font-bold text-white text-base hover:bg-slate-900 transition-all rounded-full mx-auto py-[0.2rem] px-10'>Login</button>
                    </div>
                </form>

                <div className='w-full sm:w-[50%] mx-auto my-3 sm:my-3 border'></div>

                <div className='m-auto w-fit my-5 relative'>
                    <button onClick={loginWithGoogle} className='bg-black font-bold text-white text-base hover:bg-slate-900 transition-all rounded-full flex justify-center items-center gap-3 mx-auto py-1 px-6 sm:px-12'>
                        <img className='w-2  sm:w-3' src="\googleIco.png" alt="googel Icon" />
                        Continue With Google
                    </button>
                </div>
                <p className='font-mono'>Don't have an Account? Signup <Link to="/signup" className="underline">Here</Link></p>
            </div>
        </>
    )
}
