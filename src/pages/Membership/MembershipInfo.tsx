'use client'
import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useParams } from 'react-router-dom'
import { MembershipProgramCreateForm } from './MembershipProgramForm'
interface MembershipInfoProps {
  action: 'read' | 'create' | 'edit'
}
const MembershipInfo = ({ action }: MembershipInfoProps) => {
  const params = useParams()
  return (
    <>
      {/* <Seo title="Dashboard: Product Create" /> */}
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
              <Typography variant='h4'>{params?.id && action === 'edit' ? 'Edit Membership Program' : 'Create a new membership program'}</Typography>
              <NoddiBreadcrumb
                items={[
                  {
                    title: 'Membership Programs',
                    path: '/membership/programs'
                  },
                  {
                    title: `${params?.id ? 'Edit' : 'Create'}`,
                    path: `${params?.id ? '/products/create/:id' : '/products/create'}`
                  }
                ]}
              />
            </Stack>
            <MembershipProgramCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default MembershipInfo
