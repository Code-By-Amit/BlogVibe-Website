import React, { useEffect, useState } from 'react'
import { ExploreCard } from '../components/UI/ExploreCard'
import { fetchBlogPage } from '../api/api'

export const Explore = () => {
  const [hasNextPage, setHasNextPage] = useState(true)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)

  const fetchNext = async (pageParam = 1) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetchBlogPage(pageParam)
      const newData = response.data.data
      if (newData.length !== 0) {
        setData((prev) => [...prev, newData])
      }

      if (newData.length === 0 || newData.length < 5) {
        setHasNextPage(false)
      }
      console.log('Fetching page:', page);
      console.log('New data:', newData);

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }
  useEffect(() => {
    fetchNext(page)
  }, [page])

  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
    if (bottom && hasNextPage && !loading) {
      setPage((prev) => prev + 1)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasNextPage, loading])

  return (
    <>
      <div className='m-5 text-center py-11'>
        <h1 className='font-custom mb-5 text-xl lg:text-4xl font-bold'>Our Blogs</h1>
        <p className='font-mono text-sm'>A collection of our stories, news and more</p>
      </div>

      <div className='w-[78vw] mx-auto my-3 sm:my-6 lg:mb-16 border'></div>


      <div className="cards p-3 lg:w-[85vw] lg:mx-auto flex flex-col gap-4">

        {
          data?.map((page, i) => {
            return <ul key={i}>
              {
                page.map((blog) => { return <li key={blog._id}> <ExploreCard blog={blog} /></li> })
              }
            </ul>
          })
        }
      </div>
    </>
  )
}
