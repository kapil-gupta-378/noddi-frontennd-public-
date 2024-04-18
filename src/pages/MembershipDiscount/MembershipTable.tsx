/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import type { FC, MouseEvent } from 'react'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'
import { Card } from '@mui/material'
import Loader from '../../components/Loader'
import NotFound from '../../components/commons/NotFound'

interface MembershipListTableProps {
  count?: number
  items?: { id: number; name: string }[]
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange?: any
  onSelectAll?: () => void
  setPage?: (newPage: number) => void
  onSelectOne?: (customerId: string) => void
  page?: number
  rowsPerPage?: number
  selected?: string[]
  columns?: string[]
  rowsPerPageOptions?: number[]
  isLoading?: boolean
  setIsNewGroup?: any
  id?: number
  getUpdatedTable?: any
  navigateUrl?: string
}

export const MembershipTable: FC<MembershipListTableProps> = (props) => {
  const { items = [], columns = [], isLoading, navigateUrl } = props
  const navigate = useNavigate()

  return (
    <Card sx={{ marginBottom: '25px' }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                {columns.length > 0 &&
                  columns.map((col) => {
                    return (
                      <TableCell key={col}>
                        <Stack alignItems='center' direction='row' spacing={1}>
                          {col}
                        </Stack>
                      </TableCell>
                    )
                  })}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((userGroup) => {
                return (
                  <TableRow className='cursor-pointer' onClick={() => navigate(`${navigateUrl}${userGroup.id}`)} hover key={userGroup.id}>
                    <TableCell>
                      <Stack alignItems='center' direction='row' spacing={1}>
                        {userGroup.name}
                      </Stack>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <NotFound data={items} isLoading={isLoading} />
        </>
      )}
    </Card>
  )
}
