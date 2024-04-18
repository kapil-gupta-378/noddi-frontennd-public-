import React, { useMemo } from 'react'
import { BundleDiscountTableProps } from './interface'
import { RawTable } from '../../components/Table/BaseTable'
// import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'
import { Stack } from 'react-bootstrap'

const BundleDiscountTable: React.FC<BundleDiscountTableProps> = ({
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
  //   const navigate = useNavigate()
  // const handleRowClick = (id: number) => navigate(`/service-organization/${id}`)

  const generateTableRow = useMemo(() => {
    const row = items.map((item) => {
      return {
        id: item.id,
        Name: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {item.name}
          </Box>
        ),
        Price: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {item.price}
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
        baseUrl='/bundle-discounts/'
      />
    </Stack>
  )
}

export default BundleDiscountTable
