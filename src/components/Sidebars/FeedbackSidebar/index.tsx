import React, { useMemo, useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import { useCallback, useRef } from 'react'
import XIcon from '@untitled-ui/icons-react/build/esm/X'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles/createTheme'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FeedbackSidebarProps, Filters, Rating } from './interface'
import { Scrollbar } from '../../Scrollbar'
import { Autocomplete, Button, ListItemIcon, Radio, RadioGroup, TextField } from '@mui/material'
import { StarRating } from '../../commons/StarRating'
import useAxiosPrivate from '../../../adapters/xhr/axiosPrivate'
import { constants } from '../../../constant'
import { getEndpointUrl } from '../../../helper'
import { userProps } from '../../../interfaces'
  

const ratingmap: Rating[] = [
  {
    label: '1 Star',
    value: 1,
    element: (
      <span>
        <ListItemIcon>
          <StarRating rating={1} />
        </ListItemIcon>
      </span>
    )
  },
  {
    label: '2 Stars',
    value: 2,
    element: (
      <span>
        <ListItemIcon>
          <StarRating rating={2} />
          <StarRating rating={2} />
        </ListItemIcon>
      </span>
    )
  },
  {
    label: '3 Stars',
    value: 3,
    element: (
      <span>
        <ListItemIcon>
          <StarRating rating={3} />
          <StarRating rating={3} />
          <StarRating rating={3} />
        </ListItemIcon>
      </span>
    )
  },
  {
    label: '4 Stars',
    value: 4,
    element: (
      <span>
        <ListItemIcon>
          <StarRating rating={4} />
          <StarRating rating={4} />
          <StarRating rating={4} />
          <StarRating rating={4} />
        </ListItemIcon>
      </span>
    )
  },
  {
    label: '5 Stars',
    value: 5,
    element: (
      <span>
        <ListItemIcon>
          <StarRating rating={5} />
          <StarRating rating={5} />
          <StarRating rating={5} />
          <StarRating rating={5} />
          <StarRating rating={5} />
        </ListItemIcon>
      </span>
    )
  }
]

interface DriverName {
  name: string
  id : number
  // Other properties of the user object if available
}
export const FeedbackSidebar: FC<FeedbackSidebarProps> = (props) => {
  const { container, filters = {}, onClose, onFiltersChange, open, ...other } = props
  const queryRef = useRef<HTMLInputElement | null>(null)
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const [searchKeyword, setSearchKeyword] = useState({ search: '', start_date: null, end_date: null, status: '', ...filters })
  const [perPageSize, onRowsPerPageChange] = useState(10)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<DriverName[]>([])
  const [, setRawUsers] = useState<userProps[]>([])
  const [usersCount, setUsersCount] = useState(0)
  const axiosPrivate = useAxiosPrivate()

  const fetchData = async (pageNumber: number, searchKeyWord = '') => {
    setIsLoading(true)
    const { apiEndpoints } = constants
    const usersUrl: string = getEndpointUrl(apiEndpoints.getDrivername, { page_size: perPageSize, page: pageNumber, search: searchKeyWord })
    await Promise.all([axiosPrivate.get(usersUrl)])
      .then((values) => {
        setUsersCount(values[0]?.data.count)
        setUsers(values[0]?.data?.results)
        setRawUsers(values[0]?.data?.results)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }


  type Option = {
    label: string;
    value: string;
  };
  
  // Assuming 'users' is an array of User objects
  const workerNameOptions: Option[] = useMemo(() => {
    const newArray: Option[] = users.map((value: DriverName) => ({
      value: `${value.id}`,
      label: `${value.name}`
      
    }));
    return newArray;
  }, [users]);
  
  

  const handleQueryChange = useCallback(
    (value: { label: string; value: string } | null): void => {
      
      onFiltersChange?.({
        ...filters,
        query: value?.value || ''
      })
    },
    [filters, onFiltersChange]
  )

  

  const handleStartDateChange = useCallback(
    (date: Date | null): void => {
      const newFilters: Filters = {
        ...filters,
        startDate: date || undefined
      }

      // Prevent end date to be before start date
      if (newFilters.endDate && date && date > newFilters.endDate) {
        newFilters.endDate = date
      }

      onFiltersChange?.(newFilters)
    },
    [filters, onFiltersChange]
  )

  const handleEndDateChange = useCallback(
    (date: Date | null): void => {
      const newFilters: Filters = {
        ...filters,
        endDate: date || undefined
      }

      // Prevent start date to be after end date
      if (newFilters.startDate && date && date < newFilters.startDate) {
        newFilters.startDate = date
      }

      onFiltersChange?.(newFilters)
    },
    [filters, onFiltersChange]
  )

  const handleCustomerToggle = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      onFiltersChange?.({
        ...filters,
        customers: [event.target.value]
      })
    },
    [filters, onFiltersChange]
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
          <Autocomplete
            loading={isLoading}
            onChange={(e, value) => {
              handleQueryChange(value)
              setSearchKeyword((prev) => ({ ...prev, search: value }))
            }}
            onInputChange={(e, value) => fetchData(1, value)}
            placeholder='Search User Groups by Name'
            value={searchKeyword.search}
            options={workerNameOptions}
            fullWidth
            renderInput={(params) => {
              return <TextField {...params} placeholder='Type Driver Name' label='Search by Driver Name' />
            }}
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
              <DatePicker maxDate={filters?.endDate || undefined} format='dd/MM/yyyy' label='From' onChange={handleStartDateChange} value={filters.startDate || null} />
              <DatePicker minDate={filters?.startDate || undefined} format='dd/MM/yyyy' label='To' onChange={handleEndDateChange} value={filters.endDate || null} />
            </Stack>
          </div>
          <div>
            <FormLabel
              sx={{
                display: 'block',
                mb: 2
              }}
            >
              Contains
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
              <Scrollbar sx={{ maxHeight: 250 }}>
                <RadioGroup
                  sx={{
                    py: 1,
                    px: 1.5
                  }}
                >
                  {ratingmap.map((customer: Rating) => {
                    const isChecked = filters.customers?.includes(customer.value.toString())
                    return <FormControlLabel control={<Radio checked={isChecked} onChange={handleCustomerToggle} />} key={customer.label} label={customer.element} value={customer.value} />
                  })}
                </RadioGroup>
              </Scrollbar>
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
