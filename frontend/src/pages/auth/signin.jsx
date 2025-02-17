import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiConst } from '../../constants/api.constants';
import { Onlogin } from '../../connection/apiFunction';
import { useAuth } from '../../authContext';
import { ToastContainer } from 'react-toastify';



const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const { setToken } = useAuth();


  const handleLogin = async () => {

    await Onlogin(email, password, setError, setToken, navigate);
  };



  return (
    <>
      <ToastContainer />
      <div className='min-h-screen w-full flex items-center justify-center bg-pink-600'>
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Sign in</h2>
          <p className='text-center mb-4'>

            <a href='#' className='text-blue-500' onClick={() => navigate(apiConst.signUp)}>
              Sign up for free
            </a>
          </p>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div>
            <label className='block text-gray-700'>Email address</label>
            <input
              type='email'
              required
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border rounded mt-1 border-gray-300
              `}
            />

          </div>
          <div>
            <label className='block text-gray-700'>Password</label>
            <input
              type='password'
              required
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border rounded mt-1 'border-gray-300
              `}
            />

          </div>

          <div>
            <button
              onClick={handleLogin}
              className='w-full bg-pink-600 text-white p-2 mt-5 rounded hover:bg-pink-700 transition duration-200'
            >
              Sign in
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default SignInPage;
