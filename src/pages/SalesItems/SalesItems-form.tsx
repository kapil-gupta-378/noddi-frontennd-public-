import React, { useEffect } from 'react'
import type { FC } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Unstable_Grid2'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { statusOptions } from '../../constant'
import { useCarSizes, useProduct, useSalesItems, useServiceCategory } from '../../hooks'
import { decimalTruncate, generateRandomAlphaNumeric } from '../../utils/functions'
import { FormControl, InputLabel, OutlinedInput, Select } from '@mui/material'
import Loader from '../../components/Loader'

interface FormValues {
  name: string
  description: string
  status: string
  price: string
  currency: string
  vat_percentage: string
  service_time: string
  commission_payment: string
  freelance_payment: string
  category: string
  car_sizes: number[]
}

const validationSchema = Yup.object({
  currency: Yup.string().max(255),
  category: Yup.number(),
  description: Yup.string().max(5000).required(),
  name: Yup.string().max(255).required(),
  price: Yup.number().min(0),
  status: Yup.string(),
  car_sizes: Yup.array(),
  vat_percentage: Yup.number().min(0, 'Value should be between 0-100').max(100, 'Value should be between 0-100'),
  service_time: Yup.number(),
  commission_payment: Yup.number().min(0),
  freelance_payment: Yup.number().min(0)
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

export const SalesItemsFrom: FC = (props) => {
  const params = useParams()
  const { salesDataById, salesItemsLoading, createSalesItem, updateSalesItem } = useSalesItems(params.id as unknown as number)

  const { serviceCategoryList } = useServiceCategory()
  const { carSizesList } = useCarSizes()
  const handleFormSubmit = async (values: FormValues, helpers: any): Promise<void> => {
    try {
      const apiParams = {
        name: values.name,
        description: values.description,
        price: values.price,
        currency: values.currency,
        service_category: values.category,
        car_sizes: values.car_sizes,
        bubble_id: generateRandomAlphaNumeric(10),
        is_active: values.status === 'true' ? true : false,
        vat_percentage: values.vat_percentage,
        service_time: values.service_time,
        commission_payment: values.commission_payment,
        freelance_payment: values.freelance_payment
      }
      if (params.id) {
        toast.promise(updateSalesItem(apiParams, params.id), {
          loading: 'Loading',
          success: 'SalesItems updated successfully',
          error: 'Error when editing SalesItems'
        })
      } else {
        toast.promise(createSalesItem(apiParams), {
          loading: 'Loading',
          success: 'New SalesItems created successfully',
          error: 'Error when creating'
        })
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong!')
      helpers.setStatus({ success: false })
      helpers.setErrors({ submit: err.message })
      helpers.setSubmitting(false)
    }
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      description: '',
      price: '',
      currency: '',
      status: '',
      category: '',
      car_sizes: [],
      vat_percentage: '',
      service_time: '',
      commission_payment: '',
      freelance_payment: ''
    },
    validationSchema,
    onSubmit: handleFormSubmit
  })
  useEffect(() => {
    formik.setValues({
      name: salesDataById.name ? salesDataById.name : '',
      description: salesDataById.description ? salesDataById.description : '',
      price: salesDataById.price ? salesDataById.price : '',
      currency: salesDataById.currency ? salesDataById.currency : '',
      status: salesDataById.is_active?.toString() ?? '',
      category: salesDataById.service_category.id ? salesDataById.service_category.id : '',
      car_sizes: salesDataById.car_sizes ? salesDataById.car_sizes.map((data: { id: number, name: string }) => data.id) : [],
      commission_payment: salesDataById.commission_payment ? salesDataById.commission_payment : '',
      freelance_payment: salesDataById.freelance_payment ? salesDataById.freelance_payment : '',
      service_time: salesDataById.service_time ? salesDataById.service_time : '',
      vat_percentage: salesDataById.vat_percentage ? salesDataById.vat_percentage : ''
    })
  }, [salesDataById, params.id])
  if (salesItemsLoading) {
    return (
      <>
        <Loader />
      </>
    )
  }
  return (
    <form onSubmit={formik.handleSubmit} {...props}>
      <Stack spacing={4}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <Typography variant='h6'>Basic details</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label='SalesItems Name'
                    name='name'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <div>
                    <OutlinedInput
                      fullWidth
                      error={!!(formik.touched.description && formik.errors.description)}
                      name='description'
                      required
                      multiline
                      rows={3}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder='SalesItems description'
                      value={formik.values.description}
                    />
                    {!!(formik.touched.description && formik.errors.description) && (
                      <Box sx={{ mt: 1, ml: 2 }}>
                        <FormHelperText error>{formik.errors.description}</FormHelperText>
                      </Box>
                    )}
                  </div>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid alignSelf={'center'} xs={12} md={4}>
                <Typography variant='h6'>Pricing</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.price && formik.errors.price)}
                    fullWidth
                    label='Price'
                    name='price'
                    onBlur={formik.handleBlur}
                    onChange={(e) => formik.handleChange(decimalTruncate(e, 2))}
                    type='number'
                    value={formik.values.price}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid alignSelf={'center'} xs={12} md={4}>
                <Typography variant='h6'>Vat percentage</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.vat_percentage && formik.errors.vat_percentage)}
                    fullWidth
                    label='Vat percentage'
                    name='vat_percentage'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type='number'
                    value={parseInt(formik.values.vat_percentage)}
                    helperText={formik.errors.vat_percentage}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid alignSelf={'center'} xs={12} md={4}>
                <Typography variant='h6'>Service time(Seconds)</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.service_time && formik.errors.service_time)}
                    fullWidth
                    label='Service time(Seconds)'
                    name='service_time'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type='number'
                    value={formik.values.service_time}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid alignSelf={'center'} xs={12} md={4}>
                <Typography variant='h6'>Currency</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.currency && formik.errors.currency)}
                    fullWidth
                    label='Currency'
                    name='currency'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type='text'
                    value={formik.values.currency}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid alignSelf={'center'} xs={12} md={4}>
                <Typography variant='h6'>Commission payment</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.commission_payment && formik.errors.commission_payment)}
                    fullWidth
                    label='Commission payment'
                    name='commission_payment'
                    onBlur={formik.handleBlur}
                    onChange={(e) => formik.handleChange(decimalTruncate(e, 2))}
                    type='number'
                    value={formik.values.commission_payment}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid alignSelf={'center'} xs={12} md={4}>
                <Typography variant='h6'>Freelance payment</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.freelance_payment && formik.errors.freelance_payment)}
                    fullWidth
                    label='Freelance payments'
                    name='freelance_payment'
                    onBlur={formik.handleBlur}
                    onChange={(e) => formik.handleChange(decimalTruncate(e, 2))}
                    type='number'
                    value={formik.values.freelance_payment}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid alignSelf={'center'} xs={12} md={4}>
                <Typography variant='h6'>Category</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label='Category'
                    name='category'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={formik.values.category}
                  >
                    {serviceCategoryList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid alignSelf={'center'} xs={12} md={4}>
                <Typography variant='h6'>Status</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.status && formik.errors.status)}
                    fullWidth
                    label='Status'
                    name='status'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={formik.values.status}
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid alignSelf={'center'} xs={12} md={4}>
                <Typography variant='h6'>Car sizes</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack spacing={3}>
                  <FormControl variant='filled'>
                    <InputLabel>Car sizes</InputLabel>
                    <Select name='car_sizes' multiple value={formik.values.car_sizes} onChange={formik.handleChange}>
                      {carSizesList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Stack alignItems='center' direction='row' justifyContent='flex-end' spacing={1}>
          <Button color='inherit'>Cancel</Button>
          <Button type='submit' variant='contained'>
            {params.id ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}
