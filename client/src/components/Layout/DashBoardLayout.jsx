import React from 'react'
import { DasHBoardLeft } from '../UI/DasHBoardLeft'
import { Outlet } from 'react-router-dom'

export const DashBoardLayout = () => {
    return (
        <>
            <div className='max-h-cover flex'>
                <DasHBoardLeft />
                <div className='w-4/5 overflow-y-auto'>
                <Outlet />
                </div>
            </div>
        </>
    )
}
