import React, { useEffect, useState } from 'react'
import { HeroSection } from '../components/UI/HeroSection'
import { Card } from '../components/UI/Card'
import { getAllBlog } from '../api/api'
import { Search, Telescope } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Home = () => {
  const [allBlog, setAllBlog] = useState(null)
  const [loading, setLoading] = useState(true);

  const fetchAllBlog = async () => {
    try {
      const res = await getAllBlog()
      if (res.data.success) {
        setAllBlog(res.data.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchAllBlog()
  }, [])

  if (loading) {
    return (
      <div className='w-full h-cover flex justify-center items-center'>
        <div className="loader"></div>
      </div>
    )
  }
  let RandomHeroPage = allBlog[Math.floor(Math.random() * allBlog.length)]
  console.log(allBlog)
  return (
    <>
      {
        RandomHeroPage &&
        <HeroSection postImg={RandomHeroPage.blogImg}
          tag={RandomHeroPage.tags[0]}
          title={RandomHeroPage.title}
          discription={RandomHeroPage.content.substring(0, RandomHeroPage.content.indexOf('.') + 1)} />
      }

      <div className=" m-4 px-10 py-4 ">
        <h1 className='text-3xl font-semibold my-3 mb-8'> Recent Blog's</h1>
        <div className='w-full mx-auto my-3 sm:my-6 border'></div>
        <div className="p-4 flex flex-wrap gap-5 justify-center items-center">
          {allBlog &&
            allBlog.map(post => {
              return <Card key={post._id} post={post} />
            })
          }
        </div>
        <div className='mx-auto my-10 border'></div>
        <div className='text-center p-4 m-4 flex justify-center items-center' >
          <Link to='/explore'>
            <button className='outline-none border bg-black text-white font-bold py-3 px-4 gap-3 flex justify-center items-center rounded-md'> <Telescope color='white' size={30} /> Explore More.....</button>
          </Link>
        </div>
      </div>

    </>
  )
}
