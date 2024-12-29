import React from 'react'

export const HeroSection = ({ postImg, tag, title, discription }) => {
    return (
        <>
            <div className="flex relative justify-center items-center m-3 h-[35rem]">
                <img className=' w-full h-full object-cover rounded-md shadow-sm' src={postImg} alt="blog image" />
                <div className='absolute backdrop-blur-3xl rounded-sm overflow-hidden bottom-12 left-9 text-white p-4 w-2/4'>
                    <p className='bg-white/50 font-semibold backdrop-blur-md inline-block px-4 py-1 mb-2 rounded-full shadow-xl'>{tag}</p>
                    <h1 className='text-2xl font-bold backdrop-blur-md mb-1'>{title}</h1>
                    <p>{discription}</p>
                </div>
            </div>
        </>
    )
}
