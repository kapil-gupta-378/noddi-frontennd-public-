import React, { useEffect } from 'react'
import { ServiceAreaNotificationCreateAndUpdateProps, ServiceNotificationAreaProps } from './interface'
import { Container, Stack } from '@mui/system'
import { Button, Card, Grid, Skeleton, SvgIcon, TextField, Typography } from '@mui/material'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useServiceAreaNotifications } from '../../hooks'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'

const ServiceAreaNotificationCreateAndUpdate: React.FC<ServiceAreaNotificationCreateAndUpdateProps> = ({ action }) => {
  const { isLoadedItem, serviceAreaNotificationData, getServiceAreaNotificationById, updateAndCreateServiceAreaNotification, deleteServiceAreaNotification, isDeleted } = useServiceAreaNotifications()

  const { id } = useParams()

  const { values, errors, handleBlur, handleChange, handleSubmit, isSubmitting, setValues, setSubmitting, setFieldValue } = useFormik<ServiceNotificationAreaProps>({
    initialValues: {
      is_notified: false,
      lat: '',
      long: '',
      phone_number: ''
    },
    onSubmit: (values) => {
      updateAndCreateServiceAreaNotification(action, values, id as string, setSubmitting)
    }
  })

  useEffect(() => {
    if (action === 'create') return
    getServiceAreaNotificationById(id as string)
  }, [id])

  useEffect(() => {
    setValues(serviceAreaNotificationData as ServiceNotificationAreaProps)
  }, [serviceAreaNotificationData])

  const handleDelete = () => {
    deleteServiceAreaNotification(id as string)
  }

  if (isLoadedItem) {
    return (
      <Container>
        <Typography mb={1} variant='h4'>
          {action === 'edit' ? 'Update Service Area Notification' : 'Create Service Area Notification'}
        </Typography>

        <Stack direction='row' gap={2} width='30%'>
          <SvgIcon sx={{ mr: 1 }}>
            <ArrowLeftIcon />
          </SvgIcon>
          <Skeleton variant='rectangular' width='100%' height={20} />
          <Skeleton variant='rectangular' width='100%' height={20} />
        </Stack>

        <Stack marginTop={5}>
          <Skeleton variant='rectangular' width='100%' height={50} />
        </Stack>
      </Container>
    )
  }

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        {action === 'edit' ? 'Update Service Area Notification' : 'Create Service Area Notification'}
      </Typography>
      {action === 'edit' ? (
        <NoddiBreadcrumb
          items={[
            {
              title: 'Service Area Notifications',
              path: '/service-area-notifications'
            },
            {
              title: serviceAreaNotificationData?.id
            }
          ]}
        />
      ) : (
        <NoddiBreadcrumb
          items={[
            {
              title: 'Service Area Notifications',
              path: '/service-area-notifications'
            },
            {
              title: 'Create'
            }
          ]}
        />
      )}

      <form onSubmit={handleSubmit}>
        <Container className=''>
          <Card
            style={{
              padding: '30px',
              margin: '20px 0'
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  Phone Number
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack gap={1}>
                  <TextField
                    error={errors?.phone_number ? true : false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id='outlined-basic'
                    name='phone_number'
                    fullWidth
                    label='Phone Number'
                    value={values?.phone_number}
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
                <Typography variant='h6' style={{ display: 'flex', alignItems: 'start', height: '100%' }}>
                  Location
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack gap={1}>
                  <TextField error={errors?.lat ? true : false} onBlur={handleBlur} onChange={handleChange} id='outlined-basic' name='lat' fullWidth label='Latitude' value={values?.lat} />
                  <TextField error={errors?.long ? true : false} onBlur={handleBlur} onChange={handleChange} id='outlined-basic' name='long' fullWidth label='Longitude' value={values?.long} />
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
                  Is Notified
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack gap={1}>
                  <TextField
                    error={errors?.is_notified ? true : false}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue('is_notified', e.target.value === '1' ? true : false)
                    }}
                    id='outlined-basic'
                    name='is_notified'
                    fullWidth
                    select
                    SelectProps={{ native: true }}
                    label='Is Notified'
                    value={values?.is_notified ? '1' : '2'}
                  >
                    <option value={1}>Notified</option>
                    <option value={2}>Not Notified</option>
                  </TextField>
                </Stack>
              </Grid>
            </Grid>
          </Card>
          <Stack alignItems='center' direction='row' justifyContent='flex-end' spacing={1}>
            <Button color='inherit'>Cancel</Button>
            <Button disabled={isSubmitting} type='submit' variant='contained'>
              {isSubmitting ? 'Loading...' : action === 'edit' ? 'Update' : 'Create'}
            </Button>
            {action === 'edit' && (
              <Button disabled={isDeleted} onClick={handleDelete} color='error' variant='contained'>
                {!isDeleted ? 'Loading...' : 'Delete'}
              </Button>
            )}
          </Stack>
        </Container>
      </form>
    </Container>
  )
}

export default ServiceAreaNotificationCreateAndUpdate
