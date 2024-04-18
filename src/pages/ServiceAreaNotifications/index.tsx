import { Button, Card, SvgIcon, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import React from 'react'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import { useServiceAreaNotifications } from '../../hooks'
import SearchBar from '../../components/commons/SearchBar'
import ServiceAreaNotificationsTable from './ServiceAreaNotificationsTable'
import { useNavigate } from 'react-router-dom'

const ServiceAreaNotification = () => {
  const { serviceAreaNotificationList, page, pageSize, setPageSize, dataCount, setPage, isLoading, setSearhQuery } = useServiceAreaNotifications()
  const rowsPerPageOptions = [10, 20, 50, 100]
  const navigate = useNavigate()
  const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, currentPage: number) => {
    setPage(currentPage + 1)
  }

  return (
    <Box component='main'>
      <Container maxWidth='xl'>
        <Stack spacing={4}>
          <Stack direction='row' justifyContent='space-between' spacing={4}>
            <Stack spacing={1}>
              <Typography variant='h4'>Service Area Notifications</Typography>
            </Stack>
            <Stack alignItems='center' direction='row' spacing={3}>
              <Button
                onClick={() => navigate('/service-area-notifications-create')}
                startIcon={
                  <SvgIcon>
                    <PlusIcon />
                  </SvgIcon>
                }
                variant='contained'
              >
                Add
              </Button>
            </Stack>
          </Stack>

          <Card>
            <SearchBar
              placeholder='Search by Number'
              handleQueryChange={(e) => {
                setPage(1)
                setSearhQuery(e.target instanceof HTMLInputElement ? e.target.value : '')
              }}
            />
            <ServiceAreaNotificationsTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value))}
              page={page}
              columns={['Phone Number']}
              items={serviceAreaNotificationList}
              count={dataCount}
              rowsPerPage={pageSize}
              rowsPerPageOptions={rowsPerPageOptions}
              isLoading={isLoading}
            />
          </Card>
        </Stack>
      </Container>
    </Box>
  )
}

export default ServiceAreaNotification
