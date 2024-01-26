import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate();
    const handleGo = () =>{
        navigate('/');
    }
  return (
    <div className='bg-dark d-flex flex-column align-items-center justify-content-center vh-100'>
      <h1 className='text-warning'>404</h1>
      <h2 className='text-danger'>Page Not Found</h2>
      <p className='text-white text-decoration-underline ' onClick={handleGo}>Go to Login Page</p>
    </div>
  )
}

export default NotFoundPage
