import React, { useState } from 'react'
import { Form, Link, NavLink, useActionData, useNavigate } from 'react-router-dom'
import { InputBox } from '../components/UI/InputBox'
import { UserRound, KeyRound, MailPlus, NotebookPen, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import useAuth from '../Store/AuthContext';
import { toast } from 'react-toastify';

export const Signup = () => {
  const { loginWithGoogle, signup } = useAuth()
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({
    fullName:false,
    username: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const toastStyle = {
    padding: "1rem 1rem",
    width: "20rem",
  }

  const toggleVisiblity = (e, field) => {
    e.preventDefault();
    if (field == 'password') {
      setPasswordVisible(!passwordVisible)
    } else {
      setconfirmPasswordVisible(!confirmPasswordVisible)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await signup(formData);
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
    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: true }))
      }else{
        setErrors((prev) => ({ ...prev, email: false }))
      }
    }
    else if (name == 'username') {
      const usernameRegex = /^[a-z0-9_-]+$/;
      if (!usernameRegex.test(value)) {
        setErrors((prev) => ({ ...prev, username: true }))
      }else{
        setErrors((prev) => ({ ...prev, username: false }))
      }
    }
    else if (name === 'password') {
      if (value.length < 3) {
        setErrors((prev) => ({ ...prev, password: true }))
      }else{
        setErrors((prev) => ({ ...prev, password: false }))
      }
    }
    else if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors((prev) => ({ ...prev, confirmPassword: true }))
      }else{
        setErrors((prev) => ({ ...prev,confirmPassword: false }))
      }
    }
    else if(name === 'fullName'){
      if (value === '') {
        setErrors((prev) => ({ ...prev, fullName: true }))
      }else{
        setErrors((prev) => ({ ...prev,fullName: false }))
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

  const passwordIcon = passwordVisible ? <Eye strokeWidth={2.2} /> : <EyeOff strokeWidth={2.2} />
  const confirmPasswordIcon = confirmPasswordVisible ? <Eye strokeWidth={2.2} /> : <EyeOff strokeWidth={2.2} />
  const isDisabled = errors.fullName || errors.username || errors.email || errors.password || errors.confirmPassword

  return (
    <>
      <div className='w-full flex h-cover flex-col justify-center items-center '>

        <form className="p-4 py-6 w-[80%]" method='POST' onSubmit={handleSubmit} >
          <h1 className='text-center font-serif mb-14 sm:text-xl md:text-3xl'>Join Us Today</h1>

          <div className="input flex flex-col items-center justify-center gap-2 sm:w-full sm:gap-3 sm:px-5">
            <InputBox type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} error={errors.fullName} icon={<NotebookPen />} />
            <InputBox type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} error={errors.username} icon={<UserRound />} />
            <InputBox type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} error={errors.email} icon={<MailPlus />} />

            <div className={`flex justify-center items-center bg-slate-200 w-96 h-11 rounded-md relative ${errors.password && "ring-1 ring-red-600"}`}>
              <span className='p-3'><KeyRound /></span>
              <input className='bg-slate-200  outline-none text-xl w-full box-border p-1 sm:px-3 ' type={passwordVisible ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} spellCheck="false" placeholder='Password' />
              <button onClick={(e) => { toggleVisiblity(e, 'password') }} className='top-[0.9rem] right-3 cursor-pointer absolute'>{passwordIcon}</button>
            </div>

            <div className={`flex justify-center items-center bg-slate-200 w-96 h-11 rounded-md relative ${errors.confirmPassword && "ring-1 ring-red-600"}`}>
              <span className='p-3'><ShieldCheck /></span>
              <input className='bg-slate-200 outline-none text-xl w-full box-border p-1 sm:px-3 ' type={confirmPasswordVisible ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} spellCheck="false" placeholder='Confirm Password' />
              <button onClick={(e) => toggleVisiblity(e)} className='right-3 top-[0.9rem] cursor-pointer absolute'>{confirmPasswordIcon}</button>
            </div>
            {errors.fullName &&  <p className='text-red-600 text-sm'>*Please Enter Full Name.</p>}
            {errors.username && <p className='text-red-600 text-sm'>*username can only include a-z, 0-9, _,-</p>}
            {errors.email && <p className='text-red-600 text-sm'>*Please Enter Valid Email.</p>}
            {errors.password && <p className='text-red-600 text-sm'>*Password must be at least 3 character long.</p>}
            {errors.confirmPassword && <p className='text-red-600 text-sm'>*Password and Confirm Password Must be Same.</p>}
          </div>

          <div className='m-auto w-fit mt-16'>
            <button type='submit' disabled={isDisabled} className='bg-black font-bold hover:bg-slate-900 transition-all text-white text-base rounded-full mx-auto py-[0.2rem] px-10'>Sign up</button>
          </div>
        </form>

        <div className='w-full sm:w-[50%] mx-auto my-3 sm:my-3 border'></div>

        <div className='m-auto w-fit my-5 relative'>

          <button onClick={loginWithGoogle} className='bg-black text-white hover:bg-slate-900 transition-all text-base font-bold rounded-full flex justify-center items-center gap-3 mx-auto py-1 px-6 sm:px-12'>
            <img className='w-2  sm:w-3' src="\googleIco.png" alt="googel Icon" />
            Continue With Google
          </button>

        </div>
        <p className='font-mono'>Already Have an Account? Login <Link to="/login" className="underline">Here</Link></p>

      </div>
    </>
  )
}
