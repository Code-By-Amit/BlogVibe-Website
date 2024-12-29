import { UserRound } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const DashboardLiRoute = ({ to, name, handleLogout ,icon}) => {
    return (
        <Link to={to} onClick={handleLogout ? handleLogout : undefined} className='relative'> 
       
        <li className='border px-4 py-2 rounded-lg hover:bg-slate-100 cursor-pointer flex justify-start items-center gap-2'>{icon}{name}</li>
        </Link>
    )
}
