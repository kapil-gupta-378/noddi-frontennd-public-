import React from 'react'

const Heading = ({ text, button }) => {
  return (
    // <!-- Page Heading -->
    <div className={'d-sm-flex align-items-center justify-content-between mb-3'}>
      <h4 className={'mb-0'}>{text}</h4>
      {button && button}
    </div>
  )
}

export default Heading
