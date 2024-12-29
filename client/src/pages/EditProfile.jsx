import React, { useEffect, useRef, useState } from 'react'
import useAuth from '../Store/AuthContext'
import { toast, Slide } from 'react-toastify';
import { updateUserData } from '../api/api';

export const EditProfile = () => {
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState(null)

  const [profile, setProfile] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    password: '',
    bio: user?.bio || '',
    profileImg: user?.profileImg || '',
    username: user?.username || '',
    googleId: user?.googleId || ''
  });

  useEffect(() => {
    setProfile({
      fullName: user?.fullName || '',
      email: user?.email || '',
      password: '',
      bio: user?.bio || '',
      profileImg: user?.profileImg || '',
      username: user?.username || '',
      googleId: user?.googleId || ''
    })
  }, [user])
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const UrlObj = URL.createObjectURL(file)
      if (previewImg) {
        URL.revokeObjectURL(previewImg)
        setPreviewImg(null)
      }
      setPreviewImg(UrlObj)
      setProfile((prev) => ({
        ...prev,
        profileImg: file
      }))
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const toastStyle = {
    padding: "1rem 1rem",
    width: "20rem",
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {


      const toastId = toast.loading('Updating profile...', {
        style: toastStyle,
        transition: Slide // Instant transition 
      });

      updateUserData(profile)
        .then((response) => {
          const data = response?.data;
          console.log(data)
          if (data.success) {
            const updatedUser = data.data
            const date = new Date(updatedUser.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            setUser({
              googleId: updatedUser?.googleId || '',
              fullName: updatedUser?.fullName || '',
              email: updatedUser?.email || '',
              bio: updatedUser?.bio || '',
              profileImg: updatedUser?.profileImg || '',
              username: updatedUser?.username || '',
              lastUpdatedAt: date || ''
            });

            toast.update(toastId, {
              render: data.message || 'Profile updated successfully!',
              type: 'success',
              isLoading: false,
              autoClose: 2000, // Close instantly after showing success
              transition: Slide, // Instant change
              style: toastStyle,
            });
            setPreviewImg(null)
          } else {
            console.log(data.message)
            toast.update(toastId, {
              render: data?.message || 'Failed to update profile.',
              type: 'error',
              isLoading: false,
              autoClose: 2000, // Close instantly after showing error
              transition: Slide, // Instant change
              style: toastStyle,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          toast.update(toastId, {
            render: err?.message || 'An unexpected error occurred.',
            type: 'error',
            isLoading: false,
            autoClose: 500, // Close instantly after showing error
            transition: Slide, // Instant change
            style: toastStyle,
          });
        });

    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCanceleUpload = () => {
    if (previewImg) {
      URL.revokeObjectURL(previewImg)
      setPreviewImg(null)
      setProfile((prev) => ({
        ...prev,
        profileImg: user.profileImg
      }))
    }
  }

  return (
    <>
      <div className='m-4 p-4'>

        <h1 className='text-center text-3xl font-bold my-5 '>Edit Profile</h1>

        <div className='w-full mx-auto my-3 sm:my-6 border'></div>

        <div className='m-2 p-2'>
          <form method='POST' className='w-full h-full flex gap-7' onSubmit={handleFormSubmit} encType='multipart/form-data'>
            <div className='m-4 w-48 flex justify-start items-center flex-col'>
              <img className='h-28 w-28 rounded-full mb-2 shadow-2xl' src={previewImg ? previewImg : profile.profileImg} alt="Profile" />
              {previewImg ? <button onClick={handleCanceleUpload} className="cursor-pointer bg-slate-200 font-semibold px-4 py-2 my-4 rounded-lg w-full text-center" > Cancel </button>
                : <label htmlFor="file-upload" className="cursor-pointer bg-slate-200 font-semibold px-4 py-2 my-4 rounded-lg w-full text-center" > Upload </label>}
              <input id='file-upload' type="file" className="hidden" name="profileImg" onChange={handleFileChange} />
            </div>

            <div className='w-full flex flex-col gap-4 '>
              <div className='flex gap-5'>
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor="name" className='font-semibold'>Full Name</label>
                  <input className='w-full border bg-slate-100 outline-none box-border p-2 sm:px-3 text-base' value={profile.fullName} onChange={handleInputChange} type="text" name="fullName" id='name' placeholder='Your Name' />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor="email" className='font-semibold'>Email</label>
                  <input className='w-full border outline-none box-border bg-slate-100 p-2 sm:px-3 text-base' value={profile.email} onChange={handleInputChange} type="text" name="email" id='email' placeholder='Email' />
                </div>
              </div>
              {
                !user?.googleId &&
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor="password" className='font-semibold'>Password</label>
                  <input className='w-full border outline-none box-border bg-slate-100 p-2 sm:px-3 text-base' value={profile.password} onChange={handleInputChange} type="text" name="password" id='password' placeholder='Password' />
                </div>
              }

              <div className='flex flex-col gap-2'>
                <label htmlFor="bio" className='font-semibold'>Bio</label>
                <textarea className='outline-none w-full p-4 border bg-slate-100 min-h-56 text-base' value={profile.bio} onChange={handleInputChange} name="bio" id="bio" placeholder='Start Writing From Here....'></textarea>
              </div>
              {!user?.googleId && <p className='font-mono text-slate-500'>Note: Profile Can only Be Updated if Password is Correct!</p>}
              {user.lastUpdatedAt && <p className='font-mono text-slate-500 text-sm text-right' >Last Updated: {user.lastUpdatedAt}</p>}
              <button type='submit' className='outline-none bg-black text-white rounded font-semibold my-7 py-2 px-4'>Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}


//   const responsePromise = updateUserData(profile);

//   toast.promise(
//     responsePromise
//       .then((data) => {
//         if (data?.data?.success) {
//           setUser({
//             fullName: data?.data?.fullName || '',
//             email: data?.data?.email || '',
//             bio: data?.data?.bio || '',
//             profileImg: data?.data?.profileImg || '',
//             username: data?.data?.username || '',
//           });

//           toast.success(data?.data?.message || 'Profile updated successfully!', {
//             style: toastStyle,
//           });

//           return 'Profile updated successfully!';
//         } else {
//           const errorMessage = data?.data?.message || 'An error occurred.';
//           toast.error(errorMessage, { style: toastStyle });
//           // throw new Error(errorMessage);
//         }
//       })
//       .catch((err) => {
//         console.error("Catch Error",err);
//         const errorMessage = err.message || 'Error while updating profile.';
//         toast.error(errorMessage, { style: toastStyle });
//         throw err;
//       }),
//     {
//       pending: 'Updating profile...',
//       // error: 'Error while updating profile.',
//     },
//     { style: toastStyle }
//   );


// const response = await responsePromise; // Await the promise

// if (response.data.success) {
//   toast.success(response.data.message, { style: toastStyle })
//   URL.revokeObjectURL(previewImg);
//   setPreviewImg(null);
// } else if (response.data.success === false) {
//   toast.error(response.data.message, { style: toastStyle })
// }