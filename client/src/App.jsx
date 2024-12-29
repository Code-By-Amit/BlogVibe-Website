import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { MainLayout } from './components/Layout/MainLayout'
import { ErrorPage } from './pages/ErrorPage'
import { ContactUs } from './pages/ContactUs'
import { Explore } from './pages/Explore'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { DashBoardLayout } from './components/Layout/DashBoardLayout'
import { ProfilePage } from './pages/ProfilePage'
import { CreatePostPage } from './pages/CreatePostPage'
import { EditProfile } from './pages/EditProfile'
import { YourBlogs } from './pages/YourBlogs'
import { ChangePassword } from './components/UI/ChangePassword'
import ProtectedRoute from '../utils/ProtectedRoute'
import { getFormData } from '../utils/helperFunction'
import { BlogPage } from './pages/BlogPage'
import { EditBlogPage } from './pages/EditBlogPage'
import { SearchPage } from './pages/SearchPage'

function App() {

  const route = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/explore',
          element: <Explore />
        },
        {
          path: '/contactus',
          element: <ContactUs />
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
        {
          path:'/blog/:id',
          element:<BlogPage />
        },
        {
          path:'/blog/search/:search',
          element:<SearchPage />
        },
        {
          path: "/dashboard",
          element: <ProtectedRoute ><DashBoardLayout /></ProtectedRoute>,
          children: [
            {
              path: "/dashboard",
              element: <ProfilePage />
            },
            {
              path: "/dashboard/createpost",
              element: <CreatePostPage />,
            },
            {
              path: "/dashboard/editprofile",
              element: <EditProfile />,
            },
            {
              path: "/dashboard/yourblogs",
              element: <YourBlogs />
            },
            {
              path:"/dashboard/editblog/:blogId",
              element: <EditBlogPage />
            },
            {
              path: "/dashboard/changepassword",
              element: <ChangePassword />
            }
          ]
        }
      ]
    }
  ])
  
  console.log('i am rendered ')
  return (
    <RouterProvider router={route} />
  )
}

export default App

