import React from 'react'
import { Nav } from 'react-bootstrap'
import { tabs } from '../../interfaces'
import IconComponent from '../icons'

const TabsHeader = ({ pills, variant }: tabs) => {
  return (
    <Nav variant={variant} className='flex-column'>
      {pills.length > 0 &&
        pills.map((pill, index) => {
          return (
            <Nav.Item key={index}>
              <Nav.Link eventKey={`${pill?.name}`} className=''>
                {pill?.icon && (
                  <span className='me-2 vertical-bottom'>
                    <IconComponent name={pill?.icon}  />
                  </span>
                )}
                {pill?.label}
              </Nav.Link>
            </Nav.Item>
          )
        })}
    </Nav>
  )
}

export default TabsHeader
