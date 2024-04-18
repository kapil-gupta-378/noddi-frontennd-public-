import React, { useEffect } from 'react'
import { BundleDiscountCreateAndUpdateProps, BundleDiscountDataProps } from './interface'
import { Container, Stack } from '@mui/system'
import { Autocomplete, Button, Card, Grid, Skeleton, SvgIcon, TextField, Typography } from '@mui/material'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useBundleDiscount, useSalesItems,  } from '../../hooks'
import { useFormik } from 'formik'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { decimalTruncate } from '../../utils/functions'

const BundleDiscountCreateAndUpdate: React.FC<BundleDiscountCreateAndUpdateProps> = ({ action }) => {
  const { bundleDiscount, isDeleted, deleteBundleDiscount, isLoadedItem, getBundleDiscountById, updateAndCreateBundleDiscount } = useBundleDiscount()
  const { salesItems, salesItemsLoading, setQuery } = useSalesItems()

  const { id } = useParams()
  const { values, errors, handleChange, handleBlur, setValues, setFieldValue, handleSubmit, setTouched, touched, isSubmitting, setSubmitting } = useFormik<BundleDiscountDataProps>({
    initialValues: {
      name: '',
      price: '',
      sales_items: [],
      services: [],
      sales_items_data: []
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      sales_items_data: Yup.array().min(1)
    }),
    onSubmit: (values) => {
      updateAndCreateBundleDiscount(action, values, id as string, setSubmitting)
    }
  })

  useEffect(() => {
    if (action === 'edit' && bundleDiscount) {
      setValues(bundleDiscount)
      setFieldValue('sales_items_data', bundleDiscount.sales_items)
    }
  }, [bundleDiscount])

  useEffect(() => {
    if (action === 'edit') {
      getBundleDiscountById(id as string)
    }
  }, [])

  if (isLoadedItem && action === 'edit') {
    return (
      <Container>
        <Typography mb={1} variant='h4'>
          {action === 'edit' ? 'Update Bundle Discount' : 'Create New Bundle Discount'}
        </Typography>

        <Stack direction='row' gap={2} width='30%'>
          <SvgIcon sx={{ mr: 1 }}>
            <ArrowLeftIcon />
          </SvgIcon>
          <Skeleton variant='rectangular' width='100%' height={20} />
          <Skeleton variant='rectangular' width='100%' height={20} />
        </Stack>

        <Stack marginTop={5} gap={4}>
          <Skeleton variant='rectangular' width='100%' height={50} />
          <Skeleton variant='rectangular' width='100%' height={50} />
        </Stack>

        <Stack marginTop={5} gap={4}>
          <Skeleton variant='rectangular' width='100%' height={50} />
          <Skeleton variant='rectangular' width='100%' height={50} />
        </Stack>
      </Container>
    )
  }

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        {action === 'edit' ? 'Update Bundle Discount' : 'Create Bundle Discount'}
      </Typography>
      {action === 'edit' ? (
        <NoddiBreadcrumb
          items={[
            {
              title: 'Bundle Discounts',
              path: '/bundle-discounts'
            },
            {
              title: bundleDiscount.name
            }
          ]}
        />
      ) : (
        <NoddiBreadcrumb
          items={[
            {
              title: 'Bundle Discounts',
              path: '/bundle-discounts'
            },
            {
              title: 'Create'
            }
          ]}
        />
      )}

      <form onSubmit={handleSubmit} method='post'>
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
                  Name
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <TextField
                    error={errors.name && touched.name ? true : false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id='outlined-basic'
                    name='name'
                    required
                    fullWidth
                    label='Name'
                    value={values.name}
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
                  Price
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <TextField
                    error={errors.price && touched.price ? true : false}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(decimalTruncate(e, 2))}
                    id='outlined-basic'
                    type='number'
                    name='price'
                    fullWidth
                    label='Price'
                    value={values.price}
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
                  SalesItems
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack gap={1}>
                  <Autocomplete
                    loading={salesItemsLoading}
                    disablePortal
                    disableClearable
                    multiple
                    loadingText='Loading...'
                    getOptionLabel={(option) => {
                      return option.name || ''
                    }}
                    limitTags={5}
                    onInputChange={(_e, value) => {
                      setQuery(value)
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return option.id === value.id
                    }}
                    filterOptions={(x) => x}
                    onChange={(_, value) => {
                      const ids = value.map((item) => item.id)
                      setFieldValue('sales_items', ids)
                      setFieldValue('sales_items_data', value)
                    }}
                    value={values.sales_items_data || []}
                    renderOption={(props, option) => {
                      return (
                        <li {...props}>
                          <Grid container gap={1} alignItems='center'>
                            <Typography variant='h6'>{option.name}</Typography>
                          </Grid>
                        </li>
                      )
                    }}
                    options={[...salesItems.map((value) => ({ id: value.id, name: value.name }))]}
                    fullWidth
                    renderInput={(params) => {
                      return (
                        <TextField
                          //   helperText='Select SalesItems on which coupon should apply.'
                          onBlur={() => setTouched({ ...touched, sales_items_data: true })}
                          error={errors.sales_items_data && touched.sales_items_data ? true : false}
                          {...params}
                          placeholder='Sales Items'
                          label='Select Sales Items'
                        />
                      )
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Container>

        <Stack alignItems='center' direction='row' justifyContent='flex-end' spacing={1}>
          <Button color='inherit'>Cancel</Button>
          <Button disabled={isSubmitting} type='submit' variant='contained'>
            {isSubmitting ? 'Loading...' : action === 'edit' ? 'Update' : 'Create'}
          </Button>
          {action === 'edit' && (
            <Button disabled={isDeleted} onClick={() => deleteBundleDiscount(id as string)} color='error' variant='contained'>
              {isDeleted ? 'Loading...' : 'Delete'}
            </Button>
          )}
        </Stack>
      </form>
    </Container>
  )
}

export default BundleDiscountCreateAndUpdate
