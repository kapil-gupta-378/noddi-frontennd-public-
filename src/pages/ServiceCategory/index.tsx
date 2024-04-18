import { Button, Card, SvgIcon, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import React from 'react'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import SearchBar from '../../components/commons/SearchBar'
import { useServiceCategory } from '../../hooks'
import ServiceCategoryTable from './ServiceCategoryTable'
import { useNavigate } from 'react-router-dom'

const ServiceCategory = () => {
  const { serviceCategoryListByPage, page, pageSize, setPageSize, dataCount, setPage, isLoading } = useServiceCategory()
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
              <Typography variant='h4'>Service Categories</Typography>
            </Stack>
            <Stack alignItems='center' direction='row' spacing={3}>
              <Button
                onClick={() => navigate('/service-category-create')}
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
              placeholder='Search by Service Category Name'
              handleQueryChange={(e) => {
                setPage(1)
                getServiceCategoryBySearch(e.target instanceof HTMLInputElement ? e.target.value : '', 1)
              }}
            />
            <ServiceCategoryTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value))}
              page={page}
              columns={['Service Category Name']}
              items={serviceCategoryListByPage}
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

export default ServiceCategory
