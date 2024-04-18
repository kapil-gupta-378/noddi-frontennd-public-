/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import type { FC, MouseEvent } from 'react'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { getEndpointUrl } from '../../helper'
import { useNavigate } from 'react-router-dom'
import { Card } from '@mui/material'
import { axiosPrivate } from '../../adapters/xhr/axios'
import { constants } from '../../constant'
import { toast } from 'react-hot-toast'
import { MembershipDiscount } from '../../hooks'
import Loader from '../../components/Loader'
import Dropdown from '../../components/commons/dropdown'
import NotFound from '../../components/commons/NotFound'

interface MembershipListTableProps {
  count?: number
  items?: MembershipDiscount[]
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
  getUpdatedMembership?: any
}

export const MembershipDiscountTable: FC<MembershipListTableProps> = (props) => {
  const { items = [], onRowsPerPageChange, selected = [], columns = [], rowsPerPageOptions = [10, 30, 60], isLoading, setIsNewGroup, getUpdatedMembership } = props
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

  const handleDeleteMembershipDiscount = async (groupId: number) => {
    const removeUserGroupFromMembership: string = getEndpointUrl(apiEndpoints.getMembershipDiscountById, { id: groupId })
    try {
      await axiosPrivate.delete(removeUserGroupFromMembership)
      const newGroup: any = items.filter((item: any) => item.id !== groupId)
      getUpdatedMembership()
      setIsNewGroup(newGroup)
      toast.success('Membership Discount deleted successfully.')
    } catch (error: any) {
      toast.error('Something went wrong.')
    }
  }

  const tableMenuOption = [
    {
      label: 'Remove',
      handleOnClick: handleDeleteMembershipDiscount
    }
  ]

  const handlePageChange = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
              {currentPageItems.map((userGroup: MembershipDiscount) => {
                const isSelected = selected.includes(userGroup.id.toString())
                return (
                  // onClick={() => routeNavigation(navigate, `/user-groups/${userGroup['id']}`, { userId: userGroup['id'] })} forbelow onclick
                  <TableRow className='cursor-pointer' onClick={() => navigate(`/membership-discount/${userGroup.id}`)} hover key={userGroup.id} selected={isSelected}>
                    <TableCell>
                      <Stack alignItems='center' direction='row' spacing={1}>
                        <div>{userGroup.id}</div>
                      </Stack>
                    </TableCell>
                    <TableCell>{userGroup.name}</TableCell>
                    <TableCell align='right'>
                      <Dropdown id={parseInt(userGroup.id)} options={tableMenuOption} />
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
