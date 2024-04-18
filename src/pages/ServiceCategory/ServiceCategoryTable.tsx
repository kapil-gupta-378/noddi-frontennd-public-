import React, { useMemo } from 'react'
import { ServiceCategoryTableProps } from './interface'
import { RawTable } from '../../components/Table/BaseTable'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'
import { Stack } from 'react-bootstrap'

const ServiceCategoryTable: React.FC<ServiceCategoryTableProps> = ({
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
  // const handleRowClick = (id: number) => navigate(`/service-category/${id}`)

  const generateTableRow = useMemo(() => {
    const row = items.map((item) => {
      return {
        id: item.value,
        Name: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {item.label}
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
        minWidth='300px'
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
        baseUrl='/service-category/'
      />
    </Stack>
  )
}

export default ServiceCategoryTable
