import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../Store/AuthContext';
import { toast } from 'react-toastify';

export const ProfileMenu = ({ fullName, email, username, profileImg }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuth()
    const navigate = useNavigate()

    const toastStyle = {
        padding: "1rem 1rem",
        width: "20rem",
    }


    // Toggle the dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        const res = await logout()
        navigate('/')
        toggleDropdown()
        if (res.data.success) {
            toast.info(res.data.message, { style: toastStyle })
        }
    }

    return (
        <>
            <div className='relative'>
                <button
                    className="flex text-sm items-center p-1 rounded-full ring-4 hover:scale-105"
                    type="button"
                    onClick={toggleDropdown} >
                    <img className="w-7 h-7 md:w-8 md:h-8 rounded-full" src={profileImg} alt="user photo" crossOrigin="anonymous" />
                    <div className='whitespace-nowrap mx-1'>{fullName}</div>
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div className="z-10 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow lg:w-44 min-w-max right-0 lg:left-auto">
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div>{fullName}</div>
                            <div className="font-medium truncate">{email}</div>
                        </div>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li> <Link to="/dashboard" onClick={toggleDropdown} className="block px-4 py-2 hover:bg-gray-100"> Dashboard </Link> </li>
                        </ul>
                        <div className="py-2">
                            <button onClick={handleLogout} className="w-full text-start px-4 py-2 text-md font-semibold text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >
                                Sign out
                                <p className='text-sm font-mono font-light text-gray-600'>{username}</p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
