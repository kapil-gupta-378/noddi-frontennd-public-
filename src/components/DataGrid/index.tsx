import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { CustomerListTable } from './CustomerListTable'
import { CustomerListSearch } from './CustomerSearch'

const GridData = ({ columns, rows, isLoading, dataSearch, perPageSize = 10, page, setPage, onRowsPerPageChange, count }) => {
  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4}>
            <Stack direction='row' justifyContent='space-between' spacing={4}>
              <Stack spacing={1}>
                <Typography variant='h4'>Users</Typography>
              </Stack>
            </Stack>
            <Card>
              <CustomerListSearch dataSearch={dataSearch} />
              <CustomerListTable count={count} items={rows} columns={columns} isLoading={isLoading} rowsPerPage={perPageSize} onRowsPerPageChange={onRowsPerPageChange} page={page} setPage={setPage} />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default GridData
