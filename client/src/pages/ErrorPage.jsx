import { NavLink, useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <section className="flex justify-center items-center flex-col gap-3 w-full h-screen">
        <div id="error-text">
          <h1 className="text-[10rem] m-1 font-extrabold text-center">Oops!</h1>
          <div className="text-center ">
            <p className="mb-2 text-xl font-bold"> 404 - PAGE NOT FOUND </p>
            {
              error.data ?
                <p className="text-slate-500 w-4/5 m-auto">{error.data}</p>
                : <p className="text-slate-500 w-4/5 m-auto">The page You Are Looking for might have been removed had its name Changed or is temporarily unavailable.</p>
            }
          </div>
        </div>
        <div className="flex flex-col gap-4 my-5">
          <NavLink to="/" className='outline-none border bg-black text-white font-bold py-3 px-4 gap-3 flex justify-center items-center rounded-md'> Go Back To HomePage </NavLink>
        </div>
      </section >
    );
  }
  console.log(error);

  return <h1> The page you are looking does not exist</h1>;
};