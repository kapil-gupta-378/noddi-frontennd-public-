import React, { useState } from 'react'
import type { FC, FormEvent } from 'react'
import { useCallback } from 'react'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'
import XIcon from '@untitled-ui/icons-react/build/esm/X'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import FormLabel from '@mui/material/FormLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles/createTheme'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { ContributionSidebarProps } from './interface'
import { Button, MenuItem, TextField } from '@mui/material'
import { contributionStatusOptions } from '../../../constant'

export const ContributionSidebar: FC<ContributionSidebarProps> = (props) => {
  const { container, filters = {}, onClose, onFiltersChange, open, ...other } = props
  const [searchKeyword, setSearchKeyword] = useState({ search: '', start_date: null, end_date: null, status: '', ...filters })
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const handleQueryChange = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      // debugger
      event.preventDefault()
      onFiltersChange?.({
        ...filters,
        search: searchKeyword || ''
      })
    },
    [filters, onFiltersChange, searchKeyword]
  )

  const content = (
    <form onSubmit={handleQueryChange}>
      <div>
        <Stack alignItems='center' justifyContent='space-between' direction='row' sx={{ p: 3 }}>
          <Typography variant='h5'>Filters</Typography>
          {!lgUp && (
            <IconButton onClick={onClose}>
              <SvgIcon>
                <XIcon />
              </SvgIcon>
            </IconButton>
          )}
        </Stack>
        <Stack spacing={3} sx={{ p: 3 }}>
          <OutlinedInput
            value={searchKeyword.search}
            fullWidth
            name='search'
            onChange={(e) => {
              setSearchKeyword((prev) => ({ ...prev, search: e.target.value }))
            }}
            placeholder='Search By Service Worker, LicenseArea'
            startAdornment={
              <InputAdornment position='start'>
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />

          <div>
            <FormLabel
              sx={{
                display: 'block',
                mb: 2
              }}
            >
              Filter by date
            </FormLabel>
            <Stack spacing={2}>
              <DatePicker
                format='dd/MM/yyyy'
                label='From'
                onChange={(e) => {
                  setSearchKeyword((prev) => ({ ...prev, start_date: e, end_date: e }))
                }}
                value={searchKeyword.start_date || null}
              />
              <DatePicker
                minDate={searchKeyword.start_date || null}
                format='dd/MM/yyyy'
                onChange={(e) => {
                  setSearchKeyword((prev) => ({ ...prev, end_date: e }))
                }}
                label='To'
                value={searchKeyword.end_date || null}
              />
            </Stack>
          </div>
          <div>
            <FormLabel
              sx={{
                display: 'block',
                mb: 2
              }}
            >
              From customer
            </FormLabel>
            <Box
              sx={{
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50'),
                borderColor: 'divider',
                borderRadius: 1,
                borderStyle: 'solid',
                borderWidth: 1
              }}
            >
              <TextField
                fullWidth
                label='Status'
                name='status'
                onChange={(e) => {
                  setSearchKeyword((prev) => ({ ...prev, status: e.target.value }))
                }}
                select
                value={searchKeyword.status}
              >
                {contributionStatusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </div>

          <Button variant='contained' type='submit'>
            Apply
          </Button>
        </Stack>
      </div>
    </form>
  )

  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open={open}
        PaperProps={{
          elevation: 16,
          sx: {
            border: 'none',
            borderRadius: 2.5,
            overflow: 'hidden',
            position: 'relative',
            width: 380
          }
        }}
        SlideProps={{ container }}
        variant='persistent'
        sx={{ p: 3 }}
        {...other}
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Drawer
      anchor='left'
      hideBackdrop
      ModalProps={{
        container,
        sx: {
          pointerEvents: 'none',
          position: 'absolute'
        }
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 380,
          pointerEvents: 'auto',
          position: 'absolute'
        }
      }}
      SlideProps={{ container }}
      variant='temporary'
      {...other}
    >
      {content}
    </Drawer>
  )
}
