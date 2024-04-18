import React, { useEffect, useState } from 'react'
import { MembershipDiscountCreateAndUpdateProps, MembershipDiscountProps } from './interface'
import { Container, Stack } from '@mui/system'
import { Autocomplete, Button, Card, Grid, Skeleton, SvgIcon, TextField, Typography } from '@mui/material'
import { useMembershipDiscount, useSalesItems } from '../../hooks'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import { useParams, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import { generateRandomAlphaNumeric } from '../../utils/functions'
import * as Yup from 'yup'
import NoddiBreadcrumb from '../../components/Breadcrumb'

const MembershipDiscountCreateAndUpdate: React.FC<MembershipDiscountCreateAndUpdateProps> = ({ action }) => {
  const {
    isLoadedItem,
    memberShipDiscountData,
    getMemberShipDiscountById,
    updateAndCreateMembershipDiscount: updateAndCreateMembershipDiscount,
    deleteMembershipDiscount,
    isDeleted,
    getAllMemberships,
    getAllService
  } = useMembershipDiscount()
  const [memberListQuery] = useState('')
  const [productListQuery, setProductListQuery] = useState('')
  const [servicesListQuery, setServicesListQuery] = useState('')
  const { id } = useParams()
  const location = useLocation()
  const { salesItemsLoading, salesItems } = useSalesItems()
  const searchParams = new URLSearchParams(location.search)
  const searchId = searchParams.get('id')

  const { values, errors, handleBlur, handleChange, handleSubmit, isSubmitting, setValues, setSubmitting, setFieldValue, touched, setTouched } = useFormik<MembershipDiscountProps>({
    initialValues: {
      description: '',
      discount_percentage: '',
      discount_price: '',
      included_sales_items: [],
      included_sales_items_data: [],
      membership_programs: [],
      id: '',
      bubble_id: generateRandomAlphaNumeric(30),
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      included_products: Yup.array(),
      included_services: Yup.array()
    }),
    onSubmit: (values) => {
      updateAndCreateMembershipDiscount(action, values, id as string, setSubmitting)
    }
  })

  useEffect(() => {
    if (action === 'create') return
    getMemberShipDiscountById(id as string)
  }, [id])

  useEffect(() => {
    getAllMemberships(memberListQuery)
  }, [memberListQuery])

  useEffect(() => {
    getAllService(servicesListQuery)
  }, [servicesListQuery])

  useEffect(() => {
    if (action !== 'edit') return
    setValues(memberShipDiscountData as MembershipDiscountProps)
    setFieldValue('included_sales_items_data', memberShipDiscountData.included_sales_items)
  }, [memberShipDiscountData])

  const handleDelete = () => {
    deleteMembershipDiscount(id as string)
  }

  if (isLoadedItem) {
    return (
      <Container>
        <Typography mb={1} variant='h4'>
          {action === 'edit' ? 'Update Membership Discount' : 'Create Membership Discount'}
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
      <Stack spacing={1}>
        <Typography mb={5} variant='h4'>
          {action === 'edit' ? 'Update Membership Discount' : 'Create Membership Discount'}
        </Typography>
        <NoddiBreadcrumb
          items={[
            {
              title: 'Discounts',
              path: '/membership/discounts'
            },
            {
              title: `${id ? 'Edit' : 'Create'}`,
              path: `${id ? '/membership/discounts/:id' : '/membership/discount/create'}`
            }
          ]}
        />
      </Stack>
      <form onSubmit={handleSubmit}>
        <Container sx={{ pl: '0px !important', pr: '0px !important' }} className=''>
          <Card
            style={{
              padding: '30px',
              margin: '20px 0'
            }}
          >
            <Grid container>
              <Grid alignSelf={'baseline'} item xs={12} md={6}>
                <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  Basic info
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} gap={1}>
                  <TextField
                    error={errors?.name && touched?.name ? true : false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id='outlined-basic'
                    name='name'
                    required
                    fullWidth
                    label='Name'
                    value={values?.name || ''}
                  />
                  <TextField
                    error={errors?.description && touched?.description ? true : false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id='outlined-basic'
                    name='description'
                    fullWidth
                    required
                    label='Description'
                    value={values?.description || ''}
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
                <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '25%' }}>
                  Discount
                </Typography>
                <Typography variant='subtitle2' color={'text.secondary'} style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                  You can select either price or percentage.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack gap={1}>
                  <TextField
                    error={errors?.discount_price ? true : false}
                    disabled={Boolean(values?.discount_percentage)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id='outlined-basic'
                    name='discount_price'
                    fullWidth
                    type='number'
                    label='Discount Price'
                    value={values?.discount_price || ''}
                  />
                  <TextField
                    disabled={Boolean(values?.discount_price)}
                    error={errors?.discount_percentage ? true : false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id='outlined-basic'
                    name='discount_percentage'
                    fullWidth
                    type='number'
                    label='Discount Percentage'
                    value={values?.discount_percentage || ''}
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
                <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                  Included for sale items
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} gap={1}>
                  <Autocomplete
                    loading={salesItemsLoading}
                    disablePortal
                    disableClearable
                    multiple
                    limitTags={3}
                    getOptionLabel={(option) => {
                      return option.name || ''
                    }}
                    onInputChange={(_e, value) => {
                      setServicesListQuery(value)
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return option.id === value.id
                    }}
                    filterOptions={(x) => x}
                    onChange={(_, value) => {
                      const ids = value.map((item) => item.id)
                      setFieldValue('included_sales_items', ids)
                      setFieldValue('included_sales_items_data', value)
                    }}
                    value={values.included_sales_items_data || []}
                    renderOption={(props, option) => {
                      return (
                        <li
                          style={{
                            backgroundColor: values?.included_services && values?.included_services?.includes(option?.id) ? '#dbdbdb40' : ''
                          }}
                          {...props}
                        >
                          <Grid container gap={1} alignItems='center'>
                            <Typography variant='h6'>{option?.name}</Typography>
                          </Grid>
                        </li>
                      )
                    }}
                    options={salesItems}
                    fullWidth
                    renderInput={(params) => {
                      return <TextField {...params} placeholder='Sales Items' label='Select Sales Items' />
                    }}
                  />
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
                {isDeleted ? 'Loading...' : 'Delete'}
              </Button>
            )}
          </Stack>
        </Container>
      </form>
    </Container>
  )
}

export default MembershipDiscountCreateAndUpdate
