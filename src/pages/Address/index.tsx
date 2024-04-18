import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useFormik } from 'formik'
import useApiRequest from '../../hooks/ApiHooks/useApiRequest'
import { useParams } from 'react-router-dom'
import { constants } from '../../constant'
import { AddressProps } from './interface'
import { toast } from 'react-hot-toast'
import Loader from '../../components/Loader'

const AddressDetail = () => {
  const { getRequest, patchRequest, isLoading } = useApiRequest()
  const { apiEndpoints } = constants
  const { id } = useParams()

  const getAddressById = async (id: string) => {
    const res = await getRequest(apiEndpoints.getAddress, { id })
    if (res?.status === 200) {
      setValues(res.data)
    }
  }

  const updateAddressById = async (id: string, data: any) => {
    setSubmitting(true)
    const res = await patchRequest(apiEndpoints.getAddress, data, id)
    setSubmitting(false)
    toast.success('Updated successfully!')

    if (res?.status === 200) {
      setValues(res.data)
    }
  }

  const { values, errors, touched, handleSubmit, handleChange, handleBlur, setValues, isSubmitting, setSubmitting } = useFormik<AddressProps>({
    initialValues: {} as AddressProps,
    onSubmit: (values) => {
      updateAddressById(id as string, values)
    }
  })

  useEffect(() => {
    getAddressById(id as string)
  }, [id])

  if (isLoading.getLoading) {
    return (
      <>
        <Loader />
      </>
    )
  }

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        Update Address
      </Typography>

      <NoddiBreadcrumb
        items={[
          {
            title: 'Address'
          },

          {
            title: values.city
          }
        ]}
      />

      <form onSubmit={handleSubmit}>
        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  required
                  error={errors.name && touched.name ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='name'
                  fullWidth
                  label='Name'
                  value={values.name || ''}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Street Name
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  required
                  error={errors.street_name && touched.street_name ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='street_name'
                  fullWidth
                  label='Name'
                  value={values.street_name || ''}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Street Number
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  required
                  error={errors.street_number && touched.street_number ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='street_number'
                  fullWidth
                  label='Street Number'
                  value={values.street_number || ''}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                City
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  required
                  error={errors.city && touched.city ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='city'
                  fullWidth
                  label='City'
                  value={values.city || ''}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Country
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  required
                  error={errors.country && touched.country ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='country'
                  fullWidth
                  label='Country'
                  value={values.country || ''}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Zip Code
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  required
                  error={errors.zip_code && touched.zip_code ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='name'
                  fullWidth
                  label='Zip Code'
                  value={values.zip_code || ''}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Instruction
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  required
                  error={errors.instructions && touched.instructions ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='instructions'
                  fullWidth
                  label='Instructions'
                  value={values.instructions || ''}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Coordinates
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  required
                  error={errors.latitude && touched.latitude ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='latitude'
                  fullWidth
                  label='Latitude'
                  value={values.latitude || ''}
                />
                <TextField
                  required
                  error={errors.longitude && touched.longitude ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='longitude'
                  fullWidth
                  label='Longitude'
                  value={values.longitude || ''}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Stack alignItems='center' direction='row' justifyContent='flex-end' spacing={1}>
          <Button color='inherit'>Cancel</Button>
          <Button disabled={isSubmitting} type='submit' variant='contained'>
            {isSubmitting ? 'Loading...' : 'Update'}
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default AddressDetail
