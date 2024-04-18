/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import type { ChangeEvent, FC, MouseEvent } from 'react'
// import numeral from 'numeral'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { userProps, userTableColumn } from '../../interfaces'
import { getInitials } from '../../helper'
import { Link } from 'react-router-dom'
import Loader from '../Loader'
import NotFound from '../commons/NotFound'

interface CustomerListTableProps {
  count?: number
  items?: userProps[]
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onSelectAll?: () => void
  setPage?: (newPage: number) => void
  onSelectOne?: (customerId: string) => void
  page?: number
  rowsPerPage?: number
  selected?: string[]
  columns?: userTableColumn
  rowsPerPageOptions?: number[]
  isLoading?: boolean
}

export const CustomerListTable: FC<CustomerListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    setPage,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 10,
    selected = [],
    columns = [],
    rowsPerPageOptions = [10, 30, 60],
    isLoading
  } = props
  
  const pageChangeCallback = (e: any, newPage: number) => {
    setPage(newPage + 1)
  }
  const onRowsPerPageChangeCallback = (e: { target: { value: React.ChangeEvent<HTMLInputElement> } }) => {
    onRowsPerPageChange(e.target.value)
  }

  return (
    <Box sx={{ position: 'relative', overflowY: 'scroll' }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Table sx={{ minWidth: '767px' }}>
            <TableHead>
              <TableRow>
                {columns.length > 0 &&
                  columns.map((col: { label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }, index: React.Key | null | undefined) => {
                    return <TableCell key={index}>{col?.label}</TableCell>
                  })}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.id)
                return (
                  <TableRow
                    className='cursor-pointer'
                    hover
                    key={customer.id}
                    selected={isSelected}
                    component={Link}
                    to={`/users/${customer['id']}/profile`}
                    // onClick={() => routeNavigation(navigate, `/users/${customer['id']}/profile`, { userId: customer['id'] })}
                  >
                    <TableCell>
                      <Stack alignItems='center' direction='row' spacing={1}>
                        <Avatar
                          src={customer?.avatar}
                          sx={{
                            height: 42,
                            width: 42
                          }}
                        >
                          {getInitials(customer.first_name)}
                        </Avatar>
                        <div>{customer.first_name + ' ' + customer.last_name}</div>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      <Typography variant='subtitle2'>{customer.phone_number} </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <NotFound data={items} isLoading={isLoading} />
          <TablePagination
            hidden={items.length === 0}
            component='div'
            count={count}
            onPageChange={pageChangeCallback}
            onRowsPerPageChange={onRowsPerPageChangeCallback}
            page={page - 1}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        </>
      )}
    </Box>
  )
}
