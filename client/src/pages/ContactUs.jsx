import { IdCard, MailPlus, MessageSquareText, Send } from 'lucide-react'
import React from 'react'

export const ContactUs = () => {
  return (
    <div className='h-cover flex justify-center items-center'>

      <div className="form-container border shadow-2xl drop-shadow-2xl p-4 m-6 lg:w-[30rem]">
        <h1 className='text-center text-xl lg:text-3xl font-bold my-8'>Contact Us</h1>
        <form className='flex flex-col gap-4 p-4'>

          <div className='relative flex items-center justify-center'>
            <IdCard className='absolute left-4' />
            <input className='outline-none w-full pl-11 px-5 py-1 lg:py-3 border' type="text" placeholder='Your Name' />
          </div>

          <div className='relative flex items-center justify-center'>
            <MailPlus className='absolute left-4' />
            <input className='outline-none w-full pl-11 px-5 py-1 lg:py-3 border' type="email" placeholder='Email' />
          </div>

          <div className='relative flex items-start'>
            <MessageSquareText className='absolute left-[1.09rem] top-[1.09rem]' />
            <textarea className='outline-none w-full pl-11 px-5 py-3 border min-h-36' placeholder='Enter your Message....'></textarea>
          </div>

          <div className='relative flex items-center'>
            <Send className='absolute text-white left-5' />
            <button className='outline-none bg-black text-sm hover:bg-slate-900 transition-all text-white py-2 pl-9 px-5 lg:pl-9 lg:pr-3 rounded-md m-2'>Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}
