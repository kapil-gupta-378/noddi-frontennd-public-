/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react'
import { Container, Stack } from '@mui/system'
import { Button, Card, CardContent, Grid, Skeleton, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { CarDetailProps, CarInfoProps } from './interface'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { getEndpointUrl } from '../../helper'
import { constants } from '../../constant'
import { toast } from 'react-hot-toast'
import { FileDropzone } from '../../components/file-dropzone'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'

const CarInfo: React.FC<CarInfoProps> = (props) => {
  const [showError, setShowError] = useState<string>('')
  const [files, setFiles] = useState<any[]>([])
  const [carImage, setCarImage] = useState('')
  const { apiEndpoints } = constants
  const axiosPrivate = useAxiosPrivate()
  const { setValues, values, errors, handleChange, handleBlur, handleSubmit, isSubmitting, setSubmitting, setFieldValue } = useFormik<CarDetailProps>({
    initialValues: {
      car_size: 0,
      color: '',
      dimension_height: '',
      dimension_length: '',
      dimension_m3: '',
      dimension_width: '',
      image: '',
      is_active: false,
      license_plate_number: '',
      make: '',
      model: '',
      weight: '',
      alias: '',
      eu_control_next: '',
      eu_control_previous: '',
      first_registered: '',
      vin_number:''
    },
    onSubmit: async (values) => {
      const updatedValues = { ...values }

      const changedFields: any = {}
      for (const key in updatedValues) {
        if (updatedValues[key] !== props.carDetails[key]) {
          changedFields[key] = updatedValues[key]
        }
      }

      const updateCarDetails = getEndpointUrl(apiEndpoints.updateCarDetails, { carId: props.carId })

      try {
        const res = await axiosPrivate.patch(updateCarDetails, changedFields, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        setCarImage(res.data.image)
        setSubmitting(false)
        toast.success('Successfully updated!')
      } catch (error) {
        setSubmitting(false)
        toast.error('Something went wrong!')
        throw new Error('An error occurred.')
      }
    }
  })

  const handleFilesDrop = useCallback((newFiles: any[]): void => {
    setFieldValue('image', newFiles[0])
    setFiles(newFiles)
    setShowError('')
  }, [])

  const handleFilesRemoveAll = useCallback((): void => {
    setFiles([])
  }, [])

  useEffect(() => {
    if (props.carDetails) {
      setCarImage(props.carDetails.image)
      setValues(props.carDetails)
    }
  }, [props.carDetails])

  if (!props.carDetails) {
    return (
      <>
        <Container className=''>
          <Card
            style={{
              padding: '50px',
              margin: '20px 0'
            }}
          >
            <Stack gap={2}>
              <Skeleton variant='rectangular' width='100%' height={60} />
              <Skeleton variant='rectangular' width='100%' height={60} />
            </Stack>
          </Card>
        </Container>
      </>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card
        style={{
          padding: '50px',
          margin: '20px 0'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant='h6'>Basic Details</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack gap={1}>
              <Stack spacing={1} direction={{ sm: 'row', xs: 'column' }}>
                <TextField error={errors.model ? true : false} onBlur={handleBlur} onChange={handleChange} id='outlined-basic' name='model' fullWidth label='Model' value={values.model} />
                <TextField error={errors.make ? true : false} onBlur={handleBlur} onChange={handleChange} id='outlined-basic' name='make' fullWidth label='Make' value={values.make} />
              </Stack>

              <Stack direction={{ sm: 'row', xs: 'column' }} spacing={1}>
                <TextField
                  error={errors.license_plate_number ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='license_plate_number'
                  fullWidth
                  label='License Plate Number'
                  value={values.license_plate_number}
                />
                <TextField error={errors.alias ? true : false} onBlur={handleBlur} onChange={handleChange} id='outlined-basic' name='alias' fullWidth label='Alias' value={values.alias} />
                <TextField error={errors.vin_number ? true : false} onBlur={handleBlur} onChange={handleChange} id='outlined-basic' name='vin_number' fullWidth label='VIN Number' value={values.vin_number} />
              </Stack>

              <Stack direction={{ sm: 'row', xs: 'column' }} spacing={1}>
                <DatePicker
                  format='dd/MM/yyyy'
                  label='First Registered'
                  onChange={(date) => setFieldValue('first_registered', date)}
                  value={values.first_registered ? moment(values.first_registered).toDate() : undefined}
                />

                <DatePicker
                  format='dd/MM/yyyy'
                  label='EU Control Previous'
                  onChange={(date) => setFieldValue('eu_control_previous', date)}
                  value={values.eu_control_previous ? moment(values.eu_control_previous).toDate() : undefined}
                />
                <DatePicker
                  format='dd/MM/yyyy'
                  label='EU Control Next'
                  onChange={(date) => setFieldValue('eu_control_next', date)}
                  value={values.eu_control_next ? moment(values.eu_control_next).toDate() : undefined}
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>
      <Card
        style={{
          padding: '50px',
          margin: '20px 0'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant='h6'>Dimensions</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack gap={1}>
              <Stack spacing={1} direction={{ sm: 'row', xs: 'column' }}>
                <TextField error={errors.weight ? true : false} onBlur={handleBlur} onChange={handleChange} id='outlined-basic' name='weight' fullWidth label='Weight' value={values.weight} />
                <TextField
                  error={errors.dimension_length ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='dimension_length'
                  fullWidth
                  label='Length'
                  value={values.dimension_length}
                />
              </Stack>

              <Stack spacing={1} direction={{ sm: 'row', xs: 'column' }}>
                <TextField
                  error={errors.dimension_height ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='dimension_height'
                  fullWidth
                  label='Height'
                  value={values.dimension_height}
                />
                <TextField
                  error={errors.dimension_width ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='dimension_width'
                  fullWidth
                  label='Width'
                  value={values.dimension_width}
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>

      <Card
        style={{
          padding: '50px',
          margin: '20px 0'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant='h6'>Size</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack gap={1}>
              <TextField
                error={errors.car_size ? true : false}
                onBlur={handleBlur}
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                id='outlined-basic'
                name='car_size'
                fullWidth
                label='Car Size'
                value={values.car_size}
              >
                {props.carSize &&
                  props.carSize.length > 0 &&
                  props.carSize.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    )
                  })}
              </TextField>
            </Stack>
          </Grid>
        </Grid>
      </Card>

      <Card
        style={{
          padding: '50px',
          margin: '20px 0'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant='h6'>Color</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack gap={1}>
              <TextField error={errors.color ? true : false} onBlur={handleBlur} onChange={handleChange} id='outlined-basic' name='color' fullWidth label='Color' value={values.color} />
            </Stack>
          </Grid>
        </Grid>
      </Card>

      <Card
        style={{
          padding: '50px',
          margin: '20px 0'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant='h6'>Status</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField id='outlined-basic' onChange={handleChange} onBlur={handleBlur} select SelectProps={{ native: true }} name='is_active' fullWidth label='Status' value={values.is_active}>
              <option value={'true'}>Active</option>
              <option value={'false'}>In active</option>
            </TextField>
          </Grid>
        </Grid>
      </Card>
      <Card
        sx={{
          padding: '50px',
          marginBottom: '20px'
        }}
      >
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Stack spacing={1}>
                <Typography variant='h6'>Image</Typography>
                <Typography color='text.secondary' variant='body2'>
                  Image will appear in the store front of your website.
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={12} md={8}>
              {carImage && carImage && (
                <figure className='single-membership-img-wrp'>
                  <img src={carImage as string} alt='membership' />
                </figure>
              )}
              <FileDropzone
                maxFiles={1}
                accept={{ 'image/*': ['.svg', '.jpg', '.png', '.gif'] }}
                caption='(SVG, JPG, PNG, or gif maximum 900x400)'
                files={files}
                onDrop={handleFilesDrop}
                onRemoveAll={handleFilesRemoveAll}
                showRemoveUpload={false}
              />
              {showError && <span className='error'>{showError}</span>}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Stack alignItems='center' direction='row' justifyContent='flex-end' spacing={1}>
        <Button color='inherit'>Cancel</Button>
        <Button disabled={isSubmitting} type='submit' variant='contained'>
          {isSubmitting ? 'Loading...' : 'Update'}
        </Button>
      </Stack>
    </form>
  )
}

export default CarInfo
