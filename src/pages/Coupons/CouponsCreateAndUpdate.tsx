import React, { useEffect, useState } from 'react'
import { CouponsCreateAndUpdateProps, CouponsData } from './interface'
import { Container, Stack } from '@mui/system'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { Autocomplete, Button, Card, FormControlLabel, FormGroup, Grid, IconButton, Radio, RadioGroup, Skeleton, SvgIcon, Switch, TextField, Tooltip, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useCoupons, useSalesItems } from '../../hooks'
import { useParams } from 'react-router-dom'
import { generateRandomAlphaNumeric } from '../../utils/functions'
import * as Yup from 'yup'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import { DatePicker } from '@mui/x-date-pickers'
import ClearIcon from '@mui/icons-material/Clear'
import moment from 'moment'

const CouponsCreateAndUpdate: React.FC<CouponsCreateAndUpdateProps> = ({ action }) => {
  const { getCouponsById, couponsData, deleteCoupons, isDeleted, updateAndCreateCoupons, getAllServiceAreas, allServiceAreas, isLoadedItem, loading } = useCoupons()
  const { id } = useParams()
  const [productListQuery, setProductListQuery] = useState('')
  const [servicesListQuery, setServicesListQuery] = useState('')
  // const [userGroupQuery, setUserGroupQuery] = useState('')
  const [serviceAreaListQuery, setServiceAreaListQuery] = useState('')
  const { salesItems, salesItemsLoading, setQuery, query } = useSalesItems()

  const [amount, setAmount] = useState('amount')

  const { values, errors, handleBlur, handleChange, handleSubmit, setValues, isSubmitting, setSubmitting, setFieldValue, touched, setTouched } = useFormik<CouponsData>({
    initialValues: {
      code: '',
      amount: '',
      bubble_id: generateRandomAlphaNumeric(30),
      amount_percentage: '',
      valid_for_sales_items: [],
      valid_for_service_areas: [],
      valid_for_services: [],
      restrict_to_first_booking: false,
      restrict_to_single_use_coupon: false,
      restrict_to_single_use_user_group: false
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Required!'),
      amount: Yup.number().nullable(),
      amount_percentage: Yup.number().nullable().max(100, 'Percentage should be 100 or less than 100').min(0, 'Percentage should be 100 or less than 100'),
      valid_for_sales_items: Yup.array(),
      valid_for_service_areas: Yup.array(),
      valid_for_services: Yup.array()
    }).test('amountOrPercentageRequired', 'Either amount or amount percentage should be filled', function (values) {
      const { amount, amount_percentage } = values
      // Check if at least one of the fields has a value
      if (!amount && !amount_percentage) {
        return this.createError({
          path: 'amount',
          message: 'Either amount or amount percentage should be filled'
        })
      }

      return true // Return true if validation passes
    }),
    onSubmit: async (values) => {
      updateAndCreateCoupons(action, values, id as string, setSubmitting)
    }
  })

  console.log('couponsData', couponsData)

  useEffect(() => {
    if (couponsData && action === 'edit') {
      setValues({ ...couponsData, valid_for_sales_items_data: couponsData.valid_for_sales_items })

      couponsData.amount ? setAmount('amount') : setAmount('percentage')
    }
  }, [couponsData])

  useEffect(() => {
    if (action === 'edit') {
      getCouponsById(id as string)
    }
  }, [])

  useEffect(() => {
    getAllServiceAreas(serviceAreaListQuery)
  }, [serviceAreaListQuery])

  if (isLoadedItem && action === 'edit') {
    return (
      <Container>
        <Typography mb={1} variant='h4'>
          {action === 'edit' ? 'Update Coupon' : 'Create New Coupon'}
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

        <Stack marginTop={5} gap={4}>
          <Skeleton variant='rectangular' width='100%' height={50} />
          <Skeleton variant='rectangular' width='100%' height={50} />
        </Stack>
      </Container>
    )
  }

  console.log('>>>', salesItems, values.valid_for_sales_items)

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        {action === 'edit' ? 'Update Coupon' : 'Create New Coupon'}
      </Typography>
      {action === 'edit' ? (
        <NoddiBreadcrumb
          items={[
            {
              title: 'Coupons',
              path: '/coupons'
            },
            {
              title: couponsData.code || 'Coupon'
            }
          ]}
        />
      ) : (
        <NoddiBreadcrumb
          items={[
            {
              title: 'Coupons',
              path: '/coupons'
            },
            {
              title: 'Create'
            }
          ]}
        />
      )}
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
                Coupon Code
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  required
                  error={errors.code && touched.code ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='code'
                  fullWidth
                  label='Coupon Code'
                  value={values.code}
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
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start' }}>
                Amount
              </Typography>
              <Typography variant='subtitle2' color={'text.secondary'} style={{ display: 'flex', alignItems: 'flex-start' }}>
                You can select either Amount or Amount Percentage.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <RadioGroup
                  row
                  aria-labelledby='demo-controlled-radio-buttons-group'
                  name='controlled-radio-buttons-group'
                  value={amount}
                  onChange={(e) => {
                    if (e.target.value === 'amount') {
                      setFieldValue('amount_percentage', '')
                      setFieldValue('amount', values.amount_percentage)
                    } else {
                      setFieldValue('amount', '')
                      setFieldValue('amount_percentage', values.amount)
                    }
                    setAmount(e.target.value)
                  }}
                >
                  <FormControlLabel value='amount' control={<Radio />} label='Amount' />
                  <FormControlLabel value='percentage' control={<Radio />} label='Percentage' />
                </RadioGroup>

                {amount === 'amount' ? (
                  <TextField
                    type='number'
                    error={errors.amount && touched.amount ? true : false}
                    onBlur={(e) => {
                      handleBlur(e)
                    }}
                    onChange={handleChange}
                    id='outlined-basic'
                    name='amount'
                    fullWidth
                    label='Coupon Amount'
                    value={values.amount}
                  />
                ) : (
                  <TextField
                    type='number'
                    error={errors.amount || (errors.amount_percentage && touched.amount_percentage) ? true : false}
                    onBlur={(e) => {
                      handleBlur(e)
                    }}
                    onChange={handleChange}
                    id='outlined-basic'
                    name='amount_percentage'
                    fullWidth
                    label='Coupon Percentage'
                    helperText={errors.amount_percentage}
                    value={parseInt(values.amount_percentage)}
                  />
                )}
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
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                Restrictions
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack gap={1}>
                <Autocomplete
                  disablePortal
                  disableClearable
                  multiple
                  loadingText='Loading...'
                  loading={salesItemsLoading}
                  getOptionLabel={(option) => {
                    return option.name || ''
                  }}
                  onInputChange={(_e, value) => {
                    setQuery(value)
                  }}
                  isOptionEqualToValue={(option, value) => {
                    return option.id === value.id
                  }}
                  onChange={(_, value) => {
                    const ids = value.map((item) => item.id)

                    if (ids.find((item) => item === -1)) {
                      setFieldValue('valid_for_sales_items', [-1])
                      setFieldValue('valid_for_sales_items_data', [{ id: -1, name: 'All selected' }])
                    } else {
                      setFieldValue('valid_for_sales_items', ids)
                      setFieldValue('valid_for_sales_items_data', value)
                    }
                  }}
                  value={values.valid_for_sales_items_data || []}
                  renderOption={(props, option) => {
                    return (
                      <li
                        style={{
                          backgroundColor: values?.valid_for_sales_items && values?.valid_for_sales_items?.includes(option?.id) ? '#dbdbdb40' : ''
                        }}
                        {...props}
                      >
                        <Grid container gap={1} alignItems='center'>
                          <Typography variant='h6'>{option?.name}</Typography>
                        </Grid>
                      </li>
                    )
                  }}
                  options={[{ id: -1, name: 'Select All' }, ...salesItems.map((value) => ({ id: value.id, name: value.name }))]}
                  fullWidth
                  renderInput={(params) => {
                    return (
                      <TextField
                        helperText='Select Service areas on which coupon should apply.'
                        onBlur={() => setTouched({ ...touched, valid_for_sales_items_data: true })}
                        error={errors.valid_for_sales_items_data && touched.valid_for_sales_items_data ? true : false}
                        {...params}
                        placeholder='Sales items'
                        label='Select Sales items'
                      />
                    )
                  }}
                />

                <Autocomplete
                  disablePortal
                  disableClearable
                  multiple
                  loadingText='Loading...'
                  loading={loading.serviceAreas}
                  getOptionLabel={(option) => {
                    return option.name_internal || ''
                  }}
                  limitTags={5}
                  onInputChange={(_e, value) => {
                    setServiceAreaListQuery(value)
                  }}
                  isOptionEqualToValue={(option, value) => {
                    return option.id === value.id
                  }}
                  filterOptions={(x) => x}
                  onChange={(_, value) => {
                    const ids = value.map((item) => item.id)

                    if (ids.find((item) => item === -1)) {
                      setFieldValue('valid_for_service_areas', [-1])
                      setFieldValue('valid_for_service_areas_data', [{ id: -1, name_internal: 'All selected' }])
                    } else {
                      setFieldValue('valid_for_service_areas', ids)
                      setFieldValue('valid_for_service_areas_data', value)
                    }
                  }}
                  value={values.valid_for_service_areas_data || []}
                  renderOption={(props, option) => {
                    if (loading.serviceAreas) {
                      return (
                        <li
                          {...props}
                          onClick={() => {
                            return
                          }}
                        >
                          <Grid container gap={1} alignItems='center'>
                            <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} variant='h6'>
                              Loading...
                            </Typography>
                          </Grid>
                        </li>
                      )
                    }

                    return (
                      <li
                        style={{
                          backgroundColor: values.valid_for_service_areas.includes(option.id) ? '#dbdbdb40' : ''
                        }}
                        {...props}
                      >
                        <Grid container gap={1} alignItems='center'>
                          <Typography variant='h6'>{option.name_internal}</Typography>
                        </Grid>
                      </li>
                    )
                  }}
                  options={[{ id: -1, name_internal: 'Select All' }, ...allServiceAreas]}
                  fullWidth
                  renderInput={(params) => {
                    return (
                      <TextField
                        helperText='Select Service areas on which coupon should apply.'
                        onBlur={() => setTouched({ ...touched, valid_for_service_areas_data: true })}
                        error={errors.valid_for_service_areas && touched.valid_for_service_areas ? true : false}
                        {...params}
                        placeholder='Service Areas'
                        label='Select Service Areas'
                      />
                    )
                  }}
                />

                <FormGroup>
                  <FormControlLabel
                    control={<Switch onChange={(e) => setFieldValue('restrict_to_first_booking', e.target.checked)} checked={values.restrict_to_first_booking} />}
                    label='Restrict to first booking'
                  />
                  <FormControlLabel
                    control={<Switch onChange={(e) => setFieldValue('restrict_to_single_use_coupon', e.target.checked)} checked={values.restrict_to_single_use_coupon} />}
                    label='Restrict to single use coupon'
                  />
                  <FormControlLabel
                    control={<Switch onChange={(e) => setFieldValue('restrict_to_single_use_user_group', e.target.checked)} checked={values.restrict_to_single_use_user_group} />}
                    label='Restrict to single use user group'
                  />
                </FormGroup>
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
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                Expire At
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack gap={1} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                <DatePicker
                  format='dd/MM/yyyy'
                  value={values.expires_at ? moment(values.expires_at).toDate() : null}
                  // defaultValue={moment(values.expires_at).toDate()}
                  label='Expire At'
                  onChange={(date) => {
                    setFieldValue('expires_at', date)
                  }}
                  sx={{
                    width: '100%'
                  }}
                />
                <Tooltip title='Clear'>
                  <IconButton onClick={() => setFieldValue('expires_at', null)}>
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
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
            <Button disabled={isDeleted} onClick={() => deleteCoupons(id as string)} color='error' variant='contained'>
              {isDeleted ? 'Loading...' : 'Delete'}
            </Button>
          )}
        </Stack>
      </form>
    </Container>
  )
}

export default CouponsCreateAndUpdate
