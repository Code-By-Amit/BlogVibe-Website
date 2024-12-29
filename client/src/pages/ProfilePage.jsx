import React from 'react'
import useAuth from '../Store/AuthContext'

export const ProfilePage = () => {
  const { user } = useAuth()
  return (
    <>
      <div className="flex justify-center items-center h-cover bg-slate-100">
        <div className="bg-white shadow-lg w-3/5 rounded-lg p-6 relative">
          {/* Profile Image */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <img className="h-32 w-32 rounded-full border-4 border-white shadow-2xl ring-4" src={user.profileImg} alt="Profile" />
          </div>

          {/* Content */}
          <div className="mt-16 text-center">
            <h1 className="text-xl font-semibold text-gray-800">{user.fullName}</h1>
            <p className="text-gray-600">{user.username}</p>
            <p className="text-gray-600 mt-2">{user.email}</p>
            <p className="text-gray-700 mt-5">{user.bio} </p>
          </div>
        </div>
      </div>

    </>
  )
}
