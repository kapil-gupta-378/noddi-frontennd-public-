import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { DropdownOption, DropdownProps } from './interfaces'

const ITEM_HEIGHT = 48

const Dropdown = ({ options, id, disabled = false }: DropdownProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const handleOnClickOption = (option: DropdownOption, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    handleClose()
    if (id) option.handleOnClick(id)
  }
  return (
    <div>
      <IconButton
        disabled={disabled}
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch'
          }
        }}
        // onChange={(e) => console.log(e)}
      >
        {options.map((option: DropdownOption) => (
          <MenuItem key={option.label} onClick={(e) => handleOnClickOption(option, e)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default Dropdown
