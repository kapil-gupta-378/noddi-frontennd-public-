import React, { useMemo } from 'react'
import { ServiceNotificationAreaTableProps } from './interface'
import { RawTable } from '../../components/Table/BaseTable'
import { useNavigate } from 'react-router-dom'
import { Box, Stack } from '@mui/system'

const ServiceAreaNotificationsTable: React.FC<ServiceNotificationAreaTableProps> = ({
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
  // const handleRowClick = (id: number) => navigate(`/service-area-notifications/${id}`)

  const generateTableRow = useMemo(() => {
    const row = items.map((item) => {
      return {
        id: item.id,
        PhoneNumber: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {item.phone_number}
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
        minWidth='unset'
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
        baseUrl='/service-area-notifications/'
      />
    </Stack>
  )
}

export default ServiceAreaNotificationsTable
