/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, SvgIcon, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import React from 'react'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import SearchBar from '../../components/commons/SearchBar'
import { useBundleDiscount } from '../../hooks'
import { Link } from 'react-router-dom'
import BundleDiscountTable from './BundleDiscountTable'

const BundleDiscount = () => {
  const { page, pageSize, setPageSize, dataCount, setPage, isLoading, bundleDiscountList, getBundleDiscountList } = useBundleDiscount()

  const rowsPerPageOptions = [10, 20, 50, 100]

  const handlePageChange = (_: any, currentPage: number) => {
    setPage(currentPage + 1)
  }

  return (
    <Box component='main'>
      <Container maxWidth='xl'>
        <Stack spacing={4}>
          <Stack direction='row' justifyContent='space-between' spacing={4}>
            <Stack spacing={1}>
              <Typography variant='h4'>Bundle Discounts</Typography>
            </Stack>
            <Stack alignItems='center' direction='row' spacing={3}>
              <Link to='/bundle-discount-create'>
                <Button
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant='contained'
                >
                  Add
                </Button>
              </Link>
            </Stack>
          </Stack>

          <Card>
            <SearchBar
              placeholder='Search by Bundle Discount Name'
              handleQueryChange={(e) => {
                setPage(1)
                getBundleDiscountList(e.target instanceof HTMLInputElement ? e.target.value : '', 1)
              }}
            />
            <BundleDiscountTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value))}
              page={page as number}
              columns={['Name', 'Price']}
              items={bundleDiscountList}
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

export default BundleDiscount
