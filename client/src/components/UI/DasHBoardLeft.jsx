import React from 'react'
import { DashboardLiRoute } from './DashboardLiRoute'
import useAuth from '../../Store/AuthContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AlignLeft, LogOut, NotebookPen, UserRound, UserRoundCog, Wrench } from 'lucide-react'

export const DasHBoardLeft = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const toastStyle = {
        padding: "1rem 1rem",
        width: "20rem",
    }

    const handleLogout = async () => {
        const res = await logout()
        if (res.data.success) {
            navigate('/')
            toast.info(res.data.message, { style: toastStyle })
        }
    }
    return (
        <>
            <div className="left border w-1/5 h-cover">

                <div className='flex justify-center items-center m-4 mt-9 p-4 border rounded-sm '>
                    <img className="w-6 h-6 md:w-8 md:h-8 rounded-full ring-2 ring-offset-4" src={user.profileImg} alt="user photo" />
                    <div className='px-3 flex flex-col justify-center items-center'>
                        <div className='whitespace-nowrap font-semibold text-lg'>{user.fullName}</div>
                        <div className="font-thin truncate">{user.email}</div>
                    </div>
                </div>

                <div className='w-full sm:w-[85%] mx-auto my-3 sm:mb-6 border'></div>
                <ul className='m-4 p-4 flex flex-col gap-3' >
                    <DashboardLiRoute name="Profile" to="/dashboard" icon={ <UserRound />} />
                    <DashboardLiRoute name="Your Blogs" to="/dashboard/yourblogs" icon={<AlignLeft />} />
                    <DashboardLiRoute name="Write Blog" to="/dashboard/createpost" icon={<NotebookPen />} />
                    <div className='w-full mx-auto my-3 sm:my-3 border'></div>
                    <DashboardLiRoute name="Edit Profile" to="/dashboard/editprofile" icon={<UserRoundCog />} />
                    { !user.googleId &&  <DashboardLiRoute name="Change Password" to="/dashboard/changepassword" icon={<Wrench />} /> }
                    <DashboardLiRoute handleLogout={handleLogout} name="Sign out" to="/login" icon={<LogOut color='red' />} />
                </ul>
            </div>
        </>
    )
}
