import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loader({ size = 30, color = 'primary' }) {
  return (
    <div className='d-flex align-items-center justify-content-center mt-2 mb-2'>
      <CircularProgress color={color} size={size} />
    </div>
  )
}
