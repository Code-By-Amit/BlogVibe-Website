import React from 'react'


export const InputBox = ({ type, placeholder,icon,name,value,onChange,error }) => {

  return (
    <>
    <div className={`flex justify-center items-center bg-slate-200 w-96 h-11 rounded-md relative ${error && "ring-1 ring-red-600"}`}>
       {icon && <span className='p-3'>{icon}</span>}

      <input 
        className='bg-slate-200  outline-none text-xl w-full box-border p-1 sm:px-3  '
        type={type.toLowerCase()}
        placeholder={placeholder} 
        name={name}
        value={value}
        onChange={onChange}
        spellCheck="false"
        />
   </div>
        </>
  )
}