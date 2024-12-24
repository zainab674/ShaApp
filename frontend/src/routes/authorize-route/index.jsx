import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthorizeWrapper = () => {
  const auth = localStorage.getItem('accessToken');
  return auth ? <Outlet /> : <Navigate to='/login' />;
};
export default AuthorizeWrapper;
