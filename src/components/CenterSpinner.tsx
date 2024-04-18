import React from 'react'
import { Spinner } from 'react-bootstrap'

const CenterSpinner = ({ text }) => {
  return (
    <div className={'h-100 d-flex flex-column align-items-center justify-content-center'}>
      <Spinner animation={'border'} role={'status'}>
        <span className={'visually-hidden'} />
      </Spinner>
      <h5 className={'mt-3'}>{text}</h5>
    </div>
  )
}

export default CenterSpinner
