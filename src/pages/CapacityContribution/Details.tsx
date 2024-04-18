import { Typography, Stack, Card, Button, CardContent, Grid, TextField, Container, MenuItem, Skeleton } from '@mui/material'
import React, { useEffect } from 'react'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { Link, useLocation, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { contributionStatusOptions } from '../../constant/index'
import moment from 'moment'
import { CapacityContributions } from '../../hooks/ApiHooks/interfaces'
import { toast } from 'react-hot-toast'
import { useCapacityContribution } from '../../hooks'
import Loader from '../../components/Loader'
const validationSchema = Yup.object({})
const CapacityContributionDetails = ({ ...props }) => {
  const params = useParams()
  const { updateCapacityContribution, isLoading, singleCapacityContribution, capacitySingleLoading, getSingleCapacityContribution } = useCapacityContribution()
  const handleFormSubmit = (values: CapacityContributions) => {
    const data = { ...values }
    const deletedFields = ['license_area', 'service_worker', 'bubble_id', 'created_at', 'id', 'uid', 'updated_at', 'updated_by', 'deleted', 'deleted_by_cascade']

    deletedFields.forEach((item) => {
      delete data[item]
    })

    data.end_address.instructions = data.end_address.instructions || 'NA'
    data.start_address.instructions = data.start_address.instructions || 'NA'

    updateCapacityContribution(data, params.id as string)
  }

  const formik = useFormik<CapacityContributions>({
    initialValues: {
      date: '',
      end_address: {
        city: '',
        country: '',
        created_at: '',
        id: 0,
        instructions: 'NA',
        latitude: null,
        longitude: null,
        name: '',
        street_name: '',
        street_number: '',
        zip_code: ''
      },
      id: 0,
      license_area: { id: 0, name: '' },
      service_worker: {
        addresses: {
          city: '',
          country: '',
          created_at: '',
          id: 0,
          instructions: 'NA',
          latitude: null,
          longitude: null,
          name: '',
          street_name: '',
          street_number: '',
          zip_code: ''
        },
        user: {
          id: 0,
          first_name: '',
          last_name: ''
        }
      },
      service_worker_attributes: {
        end_time: '',
        start_time: '',
        cost_fixed: '',
        cost_per_km: '',
        cost_per_minute: '',
        cost_per_minute_overtime: '',
        created_at: '',
        id: 0,
        max_duration: 0,
        performance_factor: '',
        priority: 1
      },
      start_address: {
        city: '',
        country: '',
        created_at: '',
        id: 0,
        instructions: '',
        latitude: null,
        longitude: null,
        name: '',
        street_name: '',
        street_number: '',
        zip_code: ''
      },
      status: 0
    },
    validationSchema,
    onSubmit: handleFormSubmit
  })

  useEffect(() => {
    formik.setValues(singleCapacityContribution)
  }, [singleCapacityContribution])

  useEffect(() => {
    if (params.id) getSingleCapacityContribution(params.id as string)
  }, [])

  if (capacitySingleLoading) {
    return (
      <>
        <Loader />
      </>
    )
  }

  return (
    <Container maxWidth='xl'>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant='h4'>{'Capacity Contribution Details'}</Typography>
          <NoddiBreadcrumb
            items={[
              {
                title: 'Capacity Contribution',
                path: '/capacity-contribution'
              },
              {
                title: `${params?.id ? 'Edit' : 'Create'}`,
                path: `${'/capacity-contribution'}`
              }
            ]}
          />
        </Stack>
        <form onSubmit={formik.handleSubmit} {...props}>
          <Stack spacing={4}>
            <Stack spacing={4}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} md={4}>
                      <Typography variant='h6'>Details</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Stack spacing={3}>
                        <Stack spacing={3} direction={'row'}>
                          <TimePicker
                            ampm={false}
                            label='Start time'
                            onChange={(time) => formik.setFieldValue('service_worker_attributes.start_time', moment(time).format('HH:mm:ss'))}
                            value={formik.values.service_worker_attributes?.start_time ? moment(formik.values.service_worker_attributes.start_time, 'HH:mm:ss').toDate() : undefined}
                          />
                          <TimePicker
                            ampm={false}
                            label='End time'
                            onChange={(time) => formik.setFieldValue('service_worker_attributes.end_time', moment(time).format('HH:mm:ss'))}
                            value={formik.values.service_worker_attributes?.end_time ? moment(formik.values.service_worker_attributes.end_time, 'HH:mm:ss').toDate() : undefined}
                          />
                          <DatePicker
                            format='dd/MM/yyyy'
                            label='Date'
                            onChange={(date) => formik.setFieldValue('date', date)}
                            value={formik.values.date ? moment(formik.values.date).toDate() : undefined}
                          />
                        </Stack>
                        <Stack spacing={3} direction={'row'}>
                          <TextField
                            error={!!(formik.touched.status && formik.errors.status)}
                            fullWidth
                            label='Status'
                            name='status'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            select
                            value={formik.values.status || ""}
                          >
                            {contributionStatusOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Stack>
            <Stack spacing={4}>
              <Card>
                <CardContent>
                  <Stack spacing={4}>
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <Typography variant='h6'>Service Worker</Typography>
                      </Grid>
                      <Grid xs={12} md={8}>
                        <Link to={`/users/${formik?.values?.service_worker?.user?.id}/profile`} className='cursor-pointer'>
                          {`${formik?.values?.service_worker?.user?.first_name} ${formik?.values?.service_worker?.user?.last_name}`}
                        </Link>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                          Start Address
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Stack direction={'column'} spacing={3}>
                          <Stack direction={'row'} spacing={3}>
                            <TextField
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              id='outlined-basic'
                              name='start_address.name'
                              fullWidth
                              label='Name'
                              value={formik.values.start_address?.name || ""}
                            />
                            <TextField
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              id='outlined-basic'
                              name='start_address.street_name'
                              fullWidth
                              label='Street name'
                              value={formik.values.start_address?.street_name || ""}
                            />
                            <TextField
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              id='outlined-basic'
                              name='start_address.street_number'
                              fullWidth
                              label='Street Number'
                              value={formik.values.start_address?.street_number || ""}
                            />
                          </Stack>
                          <Stack direction={'row'} spacing={3}>
                            <TextField
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              id='outlined-basic'
                              name='start_address.zip_code'
                              fullWidth
                              label='Zip Code'
                              value={formik.values?.start_address?.zip_code || ""}
                            />
                            <TextField
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              id='outlined-basic'
                              name='start_address.city'
                              fullWidth
                              label='City'
                              value={formik.values?.start_address?.city || ""}
                            />
                            <TextField
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              id='outlined-basic'
                              name='start_address.latitude'
                              fullWidth
                              label='Latitude'
                              value={formik.values?.start_address?.latitude || ""}
                            />
                            <TextField
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              id='outlined-basic'
                              name='start_address.longitude'
                              fullWidth
                              label='Longitude'
                              value={formik.values?.start_address?.longitude || ""}
                            />
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                          End Address
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Stack direction={'column'} spacing={3}>
                          <Stack direction={'row'} spacing={3}>
                            <TextField
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              id='outlined-basic'
                              name='end_address.name'
                              fullWidth
                              label='Name'
                              value={formik.values.end_address?.name || ""}
                            />
                            <TextField
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              id='outlined-basic'
                              name='end_address.street_name'
                              fullWidth
                              label='Street name'
                              value={formik.values.end_address?.street_name || ""}
                            />
                            <TextField
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              id='outlined-basic'
                              name='end_address.street_number'
                              fullWidth
                              label='Street Number'
                              value={formik.values?.end_address?.street_number || ""}
                            />
                          </Stack>
                          <Stack direction={'row'} spacing={3}>
                            <TextField
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              id='outlined-basic'
                              name='end_address.zip_code'
                              fullWidth
                              label='Zip Code'
                              value={formik.values?.end_address?.zip_code || ""}
                            />
                            <TextField
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              id='outlined-basic'
                              name='end_address.city'
                              fullWidth
                              label='City'
                              value={formik.values?.end_address?.city || ""}
                            />
                            <TextField
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              id='outlined-basic'
                              name='end_address.latitude'
                              fullWidth
                              label='Latitude'
                              value={formik.values?.end_address?.latitude || ""}
                            />
                            <TextField
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              id='outlined-basic'
                              name='end_address.longitude'
                              fullWidth
                              label='Longitude'
                              value={formik.values?.end_address?.longitude || ""}
                            />
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                          Priority
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Stack direction={'column'} spacing={3}>
                          <TextField
                            error={!!(formik.touched?.service_worker_attributes?.priority && formik.errors?.service_worker_attributes?.priority)}
                            fullWidth
                            helperText={
                              formik.touched?.service_worker_attributes?.priority && formik.errors?.service_worker_attributes?.priority ? formik.errors.service_worker_attributes?.priority : ''
                            }
                            label='Priority'
                            name='service_worker_attributes.priority'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values?.service_worker_attributes?.priority || ""}
                          />
                        </Stack>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                          Performance Factor
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Stack direction={'column'} spacing={3}>
                          <TextField
                            error={!!(formik?.touched?.service_worker_attributes?.performance_factor && formik?.errors?.service_worker_attributes?.performance_factor)}
                            fullWidth
                            helperText={
                              formik?.touched?.service_worker_attributes?.performance_factor && formik?.errors?.service_worker_attributes?.performance_factor
                                ? formik.errors.service_worker_attributes.performance_factor
                                : ''
                            }
                            label=' Performance Factor'
                            name='service_worker_attributes.performance_factor'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values?.service_worker_attributes?.performance_factor || ""}
                          />
                        </Stack>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                          Max duration (seconds)
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Stack direction={'column'} spacing={3}>
                          <TextField
                            error={!!(formik.touched?.service_worker_attributes?.max_duration && formik.errors?.service_worker_attributes?.max_duration)}
                            fullWidth
                            helperText={
                              formik.touched?.service_worker_attributes?.max_duration && formik.errors?.service_worker_attributes?.max_duration
                                ? formik.errors?.service_worker_attributes?.max_duration
                                : ''
                            }
                            label='Max duration (seconds)'
                            name='service_worker_attributes.max_duration'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values?.service_worker_attributes?.max_duration || ""}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                          Cost Fixed
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Stack direction={'column'} spacing={3}>
                          <TextField
                            error={!!(formik.touched?.service_worker_attributes?.cost_fixed && formik.errors?.service_worker_attributes?.cost_fixed)}
                            fullWidth
                            helperText={
                              formik.touched?.service_worker_attributes?.cost_fixed && formik.errors?.service_worker_attributes?.cost_fixed ? formik.errors?.service_worker_attributes?.cost_fixed : ''
                            }
                            label='Cost Fixed'
                            name='service_worker_attributes.cost_fixed'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values?.service_worker_attributes?.cost_fixed || ""}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                          Cost Per Kilometer
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Stack direction={'column'} spacing={3}>
                          <TextField
                            error={!!(formik.touched?.service_worker_attributes?.cost_per_km && formik.errors?.service_worker_attributes?.cost_per_km)}
                            fullWidth
                            helperText={
                              formik.touched?.service_worker_attributes?.cost_per_km && formik.errors?.service_worker_attributes?.cost_per_km
                                ? formik.errors?.service_worker_attributes?.cost_per_km
                                : ''
                            }
                            label='Cost Per Kilometer'
                            name='service_worker_attributes.cost_per_km'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values?.service_worker_attributes?.cost_per_km || ""}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                          License area
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Stack direction={'column'} spacing={3}>
                          <Link to={`/license-areas/${formik.values?.license_area?.id}`} className='cursor-pointer'>
                            {formik.values?.license_area?.name}
                          </Link>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Stack>

          <Stack alignItems='center' direction='row' marginTop={1} justifyContent='flex-end' spacing={1}>
            <Button color='inherit'>Cancel</Button>
            <Button disabled={isLoading.patchLoading} type='submit' variant='contained'>
              {isLoading.patchLoading ? 'Loading...' : params.id ? 'Update' : 'Create'}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  )
}

export default CapacityContributionDetails
