import React from 'react'
import Box from '@mui/material/Box'
// import Breadcrumbs from '@mui/material/Breadcrumbs'
// import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { SalesItemsFrom } from './SalesItems-form'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useParams } from 'react-router-dom'
import { Container, Stack } from '@mui/system'

const SalesItemsCreate = () => {
  const params = useParams()

  return (
    <>
      {/* <Seo title="Dashboard: SalesItems Create" /> */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant='h4'>{params?.id ? 'Edit Sales Items' : 'Create a new Sales Item'}</Typography>
              <NoddiBreadcrumb
                items={[
                  {
                    title: 'Sales Items',
                    path: '/SalesItems'
                  },
                  {
                    title: `${params?.id ? 'Edit' : 'Create'}`,
                    path: `${params?.id ? '/SalesItems/create/:id' : '/SalesItems/create'}`
                  },
                ]}
              />
            </Stack>
            <SalesItemsFrom />
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default SalesItemsCreate
