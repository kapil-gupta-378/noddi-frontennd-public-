import React, { useMemo } from 'react'
import { LicenseCategoryTableProps } from './interface'
import { Box, Stack } from '@mui/system'
import { RawTable } from '../../components/Table/BaseTable'
import { useNavigate } from 'react-router-dom'

const LicenseCategoryTable: React.FC<LicenseCategoryTableProps> = ({
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
  // const handleRowClick = (id: number) => navigate(`/license-category/${id}`)

  const generateTableRow = useMemo(() => {
    return items.map((item) => {
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
        // handleOnClickTableRow={handleRowClick}
        entries={generateTableRow}
        count={count}
        isLoading={isLoading}
        onRowsPerPageChangeCallback={onRowsPerPageChange}
        page={page}
        pageChangeCallback={onPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        baseUrl='/license-category/'
      />
    </Stack>
  )
}

export default LicenseCategoryTable
