import { Button, Card, SvgIcon, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import React, { useEffect } from 'react'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import SearchBar from '../../components/commons/SearchBar'
import { useLicenseCategory } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import LicenseCategoryTable from './LicenseCategoryTable'
import { LicenseData } from './interface'

const LicenseCategory = () => {
  const { page, pageSize, setPageSize, dataCount, setPage, isLoading, getLicenseCategory, getLicenseCategoryBySearch, licenseCategoryList } = useLicenseCategory()

  const rowsPerPageOptions = [10, 20, 50, 100]
  const navigate = useNavigate()

  const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, currentPage: number) => {
    setPage(currentPage + 1)
  }

  useEffect(() => {
    getLicenseCategory(page)
  }, [page])

  return (
    <Box component='main'>
      <Container maxWidth='xl'>
        <Stack spacing={4}>
          <Stack direction='row' justifyContent='space-between' spacing={4}>
            <Stack spacing={1}>
              <Typography variant='h4'>License Categories</Typography>
            </Stack>
            <Stack alignItems='center' direction='row' spacing={3}>
              <Button
                onClick={() => navigate('/license-category-create')}
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
              placeholder='Search by License Category Name'
              handleQueryChange={(e) => {
                setPage(1)
                getLicenseCategoryBySearch(e.target instanceof HTMLInputElement ? e.target.value : '', 1)
              }}
            />
            <LicenseCategoryTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value))}
              page={page}
              columns={['License Category Name']}
              items={licenseCategoryList as LicenseData[]}
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

export default LicenseCategory
