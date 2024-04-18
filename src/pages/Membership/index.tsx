import React from 'react'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/commons/SearchBar'
import { MembershipTable } from '../../components/Table'
import { useMemberships } from '../../hooks'

const Memberships = () => {
  const { Memberships, isLoading, dataCount, page, setPage, pageSize, setPageSize, getMembershipBySearch } = useMemberships()
  const rowsPerPageOptions = [10, 20, 50, 100]
  const navigate = useNavigate()

  const createMembership = () => navigate(`/membership/programs/create/`)

  return (
    <>
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
                <Typography variant='h4'>Membership Programs</Typography>
              </Stack>
              <Stack alignItems='center' direction='row' spacing={3}>
                <Button
                  onClick={createMembership}
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
                placeholder='Search by Membership Name'
                handleQueryChange={(e) => {
                  setPage(1)
                  getMembershipBySearch(e.target instanceof HTMLInputElement ? e.target.value : '', 1)
                }}
              />
              <MembershipTable
                onPageChange={(_, newPage) => setPage(newPage + 1)}
                onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value))}
                page={page}
                items={Memberships}
                count={dataCount}
                rowsPerPage={pageSize}
                rowsPerPageOptions={rowsPerPageOptions}
                isLoading={isLoading}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Memberships
