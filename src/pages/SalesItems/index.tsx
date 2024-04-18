'use client'
import React from 'react'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { SalesItemsSearch } from './SalesItems-list-search'
import { SalesItemsListTable } from './SalesItems-list-table'
import { useNavigate } from 'react-router-dom'
import { useSalesItems } from '../../hooks'
const SalesItems = () => {
  // const { SalesItems, isLoading, dataCount, page, setPage, pageSize, setPageSize, setFilterValue } = useSalesItems()
  const { salesItems, salesItemsLoading, pageSize, page, setPageSize, setPage, setQuery, dataCount, filters, setFilters } = useSalesItems()

  const navigate = useNavigate()
  const handleFiltersChange = (filter: { status: boolean[]; category: number[], name: string }) => {
    setQuery(filter.name)
    setFilters({
      is_active: filter?.status as unknown as string,
      service_category: filter?.category as unknown as string
    })
  }
  const navigateToCreate = () => navigate('/SalesItems/create')
  const navigateToEdit = (id: number) => {
    navigate(`/SalesItems/edit/${id}`)
  }
  return (
    <>
      {/* <SEO title="Dashboard: SalesItems List" /> */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4}>
            <Stack direction='row' justifyContent='space-between' spacing={4}>
              <Stack spacing={1}>
                <Typography variant='h4'>Sales Items</Typography>
              </Stack>
              <Stack alignItems='center' direction='row' spacing={3}>
                <Button
                  // component={RouterLink}
                  // href={paths.dashboard.SalesItems.create}
                  onClick={navigateToCreate}
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
              <SalesItemsSearch onFiltersChange={handleFiltersChange} />
              <SalesItemsListTable
                onPageChange={(_, newPage) => setPage(newPage + 1)}
                onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value))}
                page={page}
                items={salesItems}
                count={dataCount}
                rowsPerPage={pageSize}
                handleRowClick={navigateToEdit}
                isLoading={salesItemsLoading}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default SalesItems
