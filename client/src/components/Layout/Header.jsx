import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ProfileMenu } from '../UI/ProfileMenu'
import useAuth from '../../Store/AuthContext'

export const Header = () => {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  useEffect(()=>{
    if(search !== ''){
      navigate(`/blog/search/${search}`)
    }
  },[search])
  
  return (
    <>
      <header className='w-full h-16 border  flex items-center px-4 shadow-sm'>
        <nav className='flex items-center justify-between sm:justify-around w-full px-4 '>
          <div className='flex gap-4 justify-center items-center mr-4'>
            <h1 className='font-extrabold md:text-2xl text-sm italic md:mx-3'>BlogVibe</h1>
            <input className='bg-slate-200 text-[0.5rem] h-8 hidden sm:block rounded-md outline-none text-sm box-border w-44 md:w-56  py-1 px-2' type="text" name='search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
          </div>
          <ul className=' gap-4 justify-center text-md lg:text-[1.2rem] text-slate-700 hidden 2xl:flex whitespace-nowrap'>
            <li ><NavLink className={({ isActive }) => `${isActive ? 'underline text-black font-bold' : 'hover:text-gray-800 hover:font-semibold hover:transition-all'} `} to='/'>Home</NavLink></li>
            <li><NavLink className={({ isActive }) => `${isActive ? 'underline text-black font-bold' : 'hover:text-gray-800 hover:font-semibold hover:transition-all'} `} to='/explore'>Explore</NavLink></li>
            {/* <li><NavLink className={({ isActive }) => `${isActive ? 'underline text-black font-bold' : ''}`} to='/aboutus'>About us</NavLink></li> */}
            <li><NavLink className={({ isActive }) => `${isActive ? 'underline text-black font-bold' : 'hover:text-gray-800 hover:font-semibold hover:transition-all'} `} to='/contactus'>Contact us</NavLink></li>
          </ul>

          {
            user
              ? (<ProfileMenu fullName={user.fullName} email={user.email} username={user.username} profileImg={user.profileImg} />)
              : (<div className="buttons flex gap-2 md:gap-5">
                <NavLink to='/login'>
                  <button className='border px-2 py-1 md:px-3 md:py-[0.35rem] rounded text-[0.50rem] lg:text-[0.9rem] font-bold'>Login</button>
                </NavLink>
                <NavLink to='/signup'>
                  <button className='border px-2 py-1 md:px-3 md:py-[0.35rem] rounded text-[0.50rem] lg:text-[0.9rem] bg-black text-white font-bold'>SignUp</button>
                </NavLink>
              </div>)
          }
          {/* */}


        </nav>
      </header>
    </>
  )
}
