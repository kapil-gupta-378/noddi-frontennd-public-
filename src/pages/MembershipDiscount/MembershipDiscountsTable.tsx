import React, { useMemo } from 'react'
import { MembershipDiscountTableProps } from './interface'
import { RawTable } from '../../components/Table/BaseTable'
import { useNavigate } from 'react-router-dom'
import { Box, Stack } from '@mui/system'

const MembershipDiscountTable: React.FC<MembershipDiscountTableProps> = ({
  count = 0,
  items = [],
  onPageChange,
  onRowsPerPageChange,
  page = 0,
  rowsPerPage = 0,
  rowsPerPageOptions,
  isLoading = false,
  columns
}) => {
  const navigate = useNavigate()
  // const handleRowClick = (id: number) => navigate(`/membership/discounts/${id}`)

  const generateTableRow = useMemo(() => {
    const row = items.map((item) => {
      return {
        id: item.id,
        name: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {item.name}
          </Box>
        ),
        Description: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {item.description}
          </Box>
        ),
        Discount: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {item.discount_percentage}
          </Box>
        ),
        DiscountPrice: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {item.discount_price}
          </Box>
        )
      }
    })
    return row
  }, [items])

  return (
    <Stack>
      <RawTable
        height='300px'
        minWidth='0'
        headers={columns}
        // handleOnClickTableRow={handleRowClick}
        entries={generateTableRow}
        count={count}
        isLoading={isLoading}
        onRowsPerPageChangeCallback={onRowsPerPageChange}
        page={page}
        pageChangeCallback={onPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        baseUrl='/membership/discounts/'
      />
    </Stack>
  )
}

export default MembershipDiscountTable
