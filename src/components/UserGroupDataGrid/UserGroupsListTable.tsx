/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import type { ChangeEvent, FC, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { GroupInfo, userTableColumn } from '../../interfaces'
// import { routeNavigation } from '../../helper'
import { Link } from 'react-router-dom'
import Loader from '../Loader'
import NotFound from '../commons/NotFound'

interface CustomerListTableProps {
  count?: number
  items?: GroupInfo[]
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSelectAll?: () => void
  setPage: (newPage: number) => void
  onSelectOne?: (customerId: string) => void
  page?: number
  rowsPerPage?: number
  selected?: string[]
  columns?: userTableColumn[]
  rowsPerPageOptions?: number[]
  isLoading?: boolean
  pageName?: string
  handleAddUserGroup?: (group: GroupInfo) => void
  searchKey?: string
}

export const UserGroupsListTable: FC<CustomerListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    setPage,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    columns = [],
    rowsPerPageOptions = [10, 30, 60],
    isLoading,
    pageName,
    // handleAddUserGroup,
    searchKey
  } = props
  // const navigate = useNavigate()
  const pageChangeCallback = (e: any, newPage: number) => {
    setPage(newPage + 1)
  }
  const onRowsPerPageChangeCallback = (e:any) => {
    onRowsPerPageChange(e.target.value)
  }

  // const handleUserGroupSelection = (userGroup: GroupInfo) => {
    
  //   if (pageName === 'userMembership') {
  //     handleAddUserGroup && handleAddUserGroup(userGroup)
  //   } else {
  //     routeNavigation(navigate, `/user-groups/${userGroup['id']}/members`, { userId: userGroup['id'] })
  //   }
  // }

  return (
    <Box sx={{ position: 'relative', minHeight: 623, overflowX: 'auto' }} className={`${pageName === 'userMembership' && 'user-membership-list'}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {(pageName !== 'userMembership' || (pageName === 'userMembership' && searchKey)) && (
            <Table sx={{ minWidth: ' 623px' }}>
              <TableHead>
                <TableRow>
                  {columns.length > 0 &&
                    columns.map((col, index) => {
                      return <TableCell key={index}>{col?.label}</TableCell>
                    })}
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((userGroup: GroupInfo) => {
                  const isSelected = selected.includes(userGroup.id.toString())

                  return (
                    <TableRow component={Link} to={`/user-groups/${userGroup.id}/members`} className='cursor-pointer' hover key={userGroup.id} selected={isSelected}>
                      {/* <TableCell>
                        <Stack alignItems='center' direction='row' spacing={1}>
                          <div>{userGroup.id}</div>
                        </Stack>
                      </TableCell> */}
                      <TableCell>{userGroup.name}</TableCell>
                      {/* <TableCell>
                        <Typography variant='subtitle2'>{userGroup.currency} </Typography>
                      </TableCell> */}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
          <NotFound data={items} isLoading={isLoading} />
          {(pageName !== 'userMembership' || (pageName === 'userMembership' && searchKey)) && (
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
          )}
        </>
      )}
    </Box>
  )
}
