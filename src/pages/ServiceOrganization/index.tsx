/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, SvgIcon, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import React from 'react'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import SearchBar from '../../components/commons/SearchBar'
import { useServiceOrganization } from '../../hooks'
// import ServiceCategoryTable from './ServiceCategoryTable'
import { useNavigate } from 'react-router-dom'
import ServiceOrganizationTable from './ServiceOrganizationTable'

const ServiceOrganization = () => {
  const { page, pageSize, setPageSize, dataCount, setPage, isLoading, serviceOrganizationList, getServiceOrganizationBySearch } = useServiceOrganization()

  const rowsPerPageOptions = [10, 20, 50, 100]
  const navigate = useNavigate()

  const handlePageChange = (_: any, currentPage: number) => {
    setPage(currentPage + 1)
  }

  return (
    <Box component='main'>
      <Container maxWidth='xl'>
        <Stack spacing={4}>
          <Stack direction='row' justifyContent='space-between' spacing={4}>
            <Stack spacing={1}>
              <Typography variant='h4'>Service Organizations</Typography>
            </Stack>
            <Stack alignItems='center' direction='row' spacing={3}>
              <Button
                onClick={() => navigate('/service-organization-create')}
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
              placeholder='Search by Service Organization Name'
              handleQueryChange={(e) => {
                setPage(1)
                getServiceOrganizationBySearch(e.target instanceof HTMLInputElement ? e.target.value : '', 1)
              }}
            />
            <ServiceOrganizationTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value))}
              page={page as number}
              columns={['User Group Name']}
              items={serviceOrganizationList}
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

export default ServiceOrganization
