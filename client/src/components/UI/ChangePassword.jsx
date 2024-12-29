import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import { updateUserPassword } from '../../api/api';
import { Slide, toast } from 'react-toastify';

export const ChangePassword = () => {
    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: ""
    })
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);

    const toastStyle = {
        padding: "1rem 1rem",
        width: "25rem",
    }

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setPassword((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const response = updateUserPassword(password)
        const toastId = toast.loading('Updating Password...⚙️', {
            style: toastStyle,
            transition: Slide // Instant transition 
        });

        response.then((response) => {
            const data = response?.data;
            if (data.success) {
                toast.update(toastId, {
                    render: data.message,
                    type: 'success',
                    isLoading: false,
                    autoClose: 2000, // Close instantly after showing success
                    transition: Slide, // Instant change
                    style: toastStyle,
                });

                setPassword({
                    currentPassword: "",
                    newPassword: ""
                })

            } else {
                toast.update(toastId, {
                    render: data?.message,
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000, // Close instantly after showing error
                    transition: Slide, // Instant change
                    style: toastStyle,
                });
            }
        })
            .catch((err) => {
                console.error(err);
                toast.update(toastId, {
                    render: err?.message || 'An unexpected error occurred.',
                    type: 'error',
                    isLoading: false,
                    autoClose: 500, // Close instantly after showing error
                    transition: Slide, // Instant change
                    style: toastStyle,
                });
            });
    }

    const toggleVisiblity = (e, field) => {
        e.preventDefault();
        if (field == 'current') {
            setCurrentPasswordVisible(!currentPasswordVisible)
        } else {
            setNewPasswordVisible(!newPasswordVisible)
        }
    };


    // const currentPasswordIcon = currentPasswordVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>
    // const newPasswordIcon = newPasswordVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>
    const currentPasswordIcon = currentPasswordVisible ? <Eye strokeWidth={2.2} /> : <EyeOff strokeWidth={2.2} />
    const newPasswordIcon = newPasswordVisible ? <Eye strokeWidth={2.2} /> : <EyeOff strokeWidth={2.2} />
    return (
        <>
            <div className='p-4 '>
                <h1 className='text-2xl font-bold my-4 mx-7'>Change Password</h1>
                <div className='flex justify-center items-center p-4' >
                    <form method='POST' onSubmit={handleSubmit} className='w-2/5 p-3'>
                        <div className='flex flex-col gap-2 mb-4'>
                            <label htmlFor="password" className='font-semibold'>Current Password</label>
                            <div className='flex items-center relative'>
                                <input className='border outline-none box-border p-2 sm:px-3 text-base w-full bg-slate-100' type={currentPasswordVisible ? 'text' : 'password'} name="currentPassword" value={password.currentPassword} onChange={handleInputChange} placeholder='Current Password' />
                                <button onClick={(e) => { toggleVisiblity(e, 'current') }} className=' right-3 cursor-pointer absolute'>{currentPasswordIcon}</button>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 mb-3'>
                            <label htmlFor="password" className='font-semibold'>New Password</label>
                            <div className='flex items-center relative'>
                                <input className='border outline-none box-border p-2 sm:px-3 text-base w-full bg-slate-100' type={newPasswordVisible ? "text" : "password"} name="newPassword" value={password.newPassword} onChange={handleInputChange} placeholder='New Password' />
                                <button onClick={(e) => toggleVisiblity(e)} className='right-3 cursor-pointer absolute'>{newPasswordIcon}</button>
                            </div>
                        </div>
                        <button type='submit' className='outline-none bg-black text-white rounded font-semibold my-5 py-2 px-4'>Update</button>
                    </form>
                </div>
            </div>
        </>
    )
}
