/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import type { FC, MouseEvent } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { GroupInfo } from '../../interfaces'
import { getEndpointUrl, routeNavigation } from '../../helper'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'
import NotFound from '../commons/NotFound'
import Dropdown from '../commons/dropdown'
import { Card } from '@mui/material'
import { axiosPrivate } from '../../adapters/xhr/axios'
import { constants } from '../../constant'
import { toast } from 'react-hot-toast'

interface MembershipListTableProps {
  count?: number
  items?: GroupInfo[]
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange?: any
  onSelectAll?: () => void
  setPage?: (newPage: number) => void
  onSelectOne?: (customerId: string) => void
  page?: number
  rowsPerPage?: number
  selected?: string[]
  columns?: any
  rowsPerPageOptions?: number[]
  isLoading?: boolean
  setIsNewGroup?: any
  membershipId?: any
  getUpdatedUserGroup?: any
}

export const MembershipUserGroupsListTable: FC<MembershipListTableProps> = (props) => {
  const { items = [], onRowsPerPageChange, selected = [], columns = [], rowsPerPageOptions = [10, 30, 60], isLoading, setIsNewGroup, membershipId, getUpdatedUserGroup } = props
  const navigate = useNavigate()
  const { apiEndpoints } = constants

  const [currentPage, setCurrentPage] = useState(0)
  const rowsPerPage = 10
  const startIndex = currentPage * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentPageItems = items.slice(startIndex, endIndex)
  const totalCount = items.length

  const onRowsPerPageChangeCallback = (e: any) => {
    onRowsPerPageChange(e.target.value)
  }

  const handleDeleteGroup = async (groupId: number) => {
    const removeUserGroupFromMembership: string = getEndpointUrl(apiEndpoints.removeUserGroupFromMembership)
    try {
      await axiosPrivate.post(removeUserGroupFromMembership, { mebership_program_id: membershipId, user_group_id: groupId })
      const newGroup: any = items.filter((item: any) => item.id !== groupId)
      getUpdatedUserGroup()
      setIsNewGroup(newGroup)
      toast.success('User Group removed successfully.')
    } catch (error: any) {
      toast.error('Something went wrong. Please try again later.')
    }
  }

  const tableMenuOption = [
    {
      label: 'Remove',
      handleOnClick: handleDeleteGroup
    }
  ]

  const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <Card sx={{ marginBottom: '25px' }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Table>
            <TableHead className='membership-table-head'>
              <TableRow>
                {columns.length > 0 &&
                  columns.map((col: any, index: number) => {
                    return <TableCell key={index}>{col?.label}</TableCell>
                  })}
              </TableRow>
            </TableHead>

            <TableBody>
              {currentPageItems.map((userGroup: GroupInfo) => {
                const isSelected = selected.includes(userGroup.id.toString())
                return (
                  <TableRow
                    className='cursor-pointer'
                    hover
                    key={userGroup.id}
                    selected={isSelected}
                    onClick={() => routeNavigation(navigate, `/user-groups/${userGroup['id']}/members`, { userId: userGroup['id'] })}
                  >
                    <TableCell>{userGroup.name}</TableCell>
                    <TableCell align='right'>
                      <Dropdown id={userGroup.id} options={tableMenuOption} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <NotFound data={items} isLoading={isLoading} />
          <TablePagination
            hidden={currentPageItems.length === 0}
            component='div'
            count={totalCount}
            onPageChange={handlePageChange}
            onRowsPerPageChange={onRowsPerPageChangeCallback}
            page={currentPage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        </>
      )}
    </Card>
  )
}
