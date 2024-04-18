import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  return (
    <>
      {/* <!-- 404 Error Text --> */}
      <div className='text-center'>
        <div className='error mx-auto' data-text='404'>
          404
        </div>
        <p className='lead text-gray-800 mb-5'>Page Not Found</p>
        <p className='text-gray-500 mb-0'>It looks like you found a glitch in the matrix...</p>
        <Link to='/'>
          <p onClick={goBack}>&larr; Go Back</p>
        </Link>
      </div>
    </>
  )
}

export default ErrorPage
