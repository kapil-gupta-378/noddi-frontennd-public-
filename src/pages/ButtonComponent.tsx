import React from 'react'
import { Button } from 'react-bootstrap'
import Loader from '../components/Loader'

export default function ButtonComponent({ type, variant='primary',size = '', color = 'primary', isLoading, callback, loaderColor = "" }) {
  return (
    <div className='button-container'>
      <Button variant={variant} type={type} disabled={isLoading} onClick={callback}>
        <div className='d-flex align-items-center justify-content-center'>
          {isLoading && (
            <span className={`me-2 loader-Container ${loaderColor}`}>
              <Loader size={size} color={color}/>
            </span>
          )}
          Save
        </div>
      </Button>
    </div>
  )
}
