import React, { useMemo } from 'react'
import { CouponsTableProps } from './interface'
import { Box, Stack } from '@mui/system'
import { RawTable } from '../../components/Table/BaseTable'

const CouponsTable: React.FC<CouponsTableProps> = ({ count = 0, items = [], onPageChange, onRowsPerPageChange, page = 0, rowsPerPage = 0, rowsPerPageOptions, isLoading = false, columns }) => {
  const generateTableRow = useMemo(() => {
    return items.map((item) => {
      return {
        id: item.id,
        Code: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {item.code}
          </Box>
        ),
        Amount: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {item.amount}
          </Box>
        ),
        AmountPercentage: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {item.amount_percentage}
          </Box>
        ),
        Expiry: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {item.expires_at ? new Date(item.expires_at).toISOString().slice(0, 10) : ''}
          </Box>
        )
      }
    })
  }, [items])

  return (
    <Stack>
      <RawTable
        height='300px'
        minWidth='0'
        headers={columns}
        entries={generateTableRow}
        count={count}
        isLoading={isLoading}
        onRowsPerPageChangeCallback={onRowsPerPageChange}
        page={page}
        pageChangeCallback={onPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        baseUrl='/coupons/'
      />
    </Stack>
  )
}

export default CouponsTable
