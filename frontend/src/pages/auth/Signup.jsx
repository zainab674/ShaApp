import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { apiConst } from '../../constants/api.constants';
import { OnSignUp } from '../../connection/apiFunction';
import { ToastContainer } from 'react-toastify';


const SignupForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [error, setError] = useState("");


  const handleSignUp = async () => {
    const response = await OnSignUp(name, email, password, role, setError);
    if (response) {


      navigate(apiConst.login);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='min-h-screen flex items-center justify-center bg-pink-600 p-4'>
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-4xl'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>
          <p className='text-center mb-4'>
            Do you have an account?{' '}
            <a href='#' className='text-blue-500' onClick={() => navigate(apiConst.login)}>
              Sign in
            </a>
          </p>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className='mb-4 col-span-2 sm:col-span-1'>
            <label className='block text-gray-700'>Full Name</label>
            <input
              type='text'
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 border rounded mt-1`}
            />

          </div>

          <div className='mb-4 col-span-2 sm:col-span-1'>
            <label className='block text-gray-700'>Email address</label>
            <input
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border rounded mt-1`}
            />

          </div>
          <div className='mb-4 col-span-2 sm:col-span-1'>
            <label className='block text-gray-700'>Password</label>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border rounded mt-1 `}
            />

          </div>

          <div className='mb-4 col-span-2 sm:col-span-1'>
            <label className='block text-gray-700'>Roles</label>
            <select
              onChange={(e) => setRole(e.target.value)}
              className={`w-full p-2 border rounded mt-1`}
            >
              <option disabled value='' selected >Select a role</option>
              <option value='USER'>User</option>
              <option value='VENDOR'>Vendor</option>
            </select>

          </div>
          <div className='col-span-2'>
            <button
              onClick={handleSignUp}
              className='w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700 transition duration-200'
            >
              Sign Up
            </button>
          </div>

        </div>
      </div>


    </>
  );
};

export default SignupForm;
