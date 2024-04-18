import { Button, Card, Chip, FormControl, Grid, InputLabel, MenuItem, Select, Skeleton, SvgIcon, TextField, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { LicenseCategoryEditAndUpdateProps, LicenseData } from './interface'
import { useLicenseCategory, useServiceCategory } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { getEndpointUrl } from '../../helper'
import { toast } from 'react-hot-toast'
import { constants } from '../../constant'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'

const LicenseCategoryEditAndUpdate: React.FC<LicenseCategoryEditAndUpdateProps> = ({ action }) => {
  const { id } = useParams()
  const axiosPrivate = useAxiosPrivate()
  const [isLoaded, setIsLoaded] = useState(false)
  const { getLicenseCategoryById } = useLicenseCategory()
  const { serviceCategoryList } = useServiceCategory()
  const { apiEndpoints } = constants
  const navigate = useNavigate()
  const [isDeleted, setIsDeleted] = useState<boolean>(false)

  const { values, errors, handleChange, handleBlur, handleSubmit, isSubmitting, setSubmitting, setValues } = useFormik<LicenseData>({
    initialValues: {
      id: 0,
      name: '',
      service_categories: []
    },
    onSubmit: async (values) => {
      if (action === 'edit') {
        const updateLicenseCategoryUrl = getEndpointUrl(apiEndpoints.getLicenseCategoryById, { id: id })

        try {
          const res = await axiosPrivate.patch(updateLicenseCategoryUrl, values)

          if (res?.status === 200) {
            toast.success('Successfully updated!')
          }
        } catch (error) {
          setSubmitting(false)
          toast.error('Something went wrong!')
          throw new Error('An error occurred.')
        }
      } else {
        try {
          const createLicenseCategoryUrl = getEndpointUrl(apiEndpoints.createLicenseCategory)
          const res = await axiosPrivate.post(createLicenseCategoryUrl, values)
          if (res?.status === 201) {
            toast.success('Successfully created!')
            navigate('/license-category')
          }
        } catch (error) {
          setSubmitting(false)
          toast.error('Something went wrong!')
          throw new Error('An error occurred.')
        }
      }
    }
  })

  const handleDelete = async () => {
    const deleteLicenseCategory = getEndpointUrl(apiEndpoints.getLicenseCategoryById, { id: id })

    try {
      setIsDeleted(true)
      const res = await axiosPrivate.delete(deleteLicenseCategory)
      setIsDeleted(false)
      if (res?.status === 204) {
        navigate('/license-category')
        toast.success('Successfully deleted!')
      }
    } catch (error) {
      setIsDeleted(false)
      toast.error('Something went wrong!')
      throw new Error('An error occurred.')
    }
  }

  useEffect(() => {
    if (!id) return
    (async () => {
      setIsLoaded(true)
      const res = await getLicenseCategoryById(id as string)
      setIsLoaded(false)
      setValues(res)
    })()
  }, [id])


  if (isLoaded) {
    return (
      <Container>
        <Typography mb={1} variant='h4'>
          {action === 'edit' ? 'Update Service organization' : 'Create Service organization'}
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
      </Container>
    )
  }



  return (
    <Container>
      <Typography mb={1} variant='h4'>
        {action === 'edit' ? 'Update License category' : 'Create License category'}
      </Typography>
      {action === 'edit' ? (
        <NoddiBreadcrumb
          items={[
            {
              title: 'License Categories',
              path: '/license-category'
            },
            {
              title: values.name || 'Category'
            }
          ]}
        />
      ) : (
        <NoddiBreadcrumb
          items={[
            {
              title: 'License Category',
              path: '/license-category'
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
                  Category Name
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack gap={1}>
                  <TextField error={errors.name ? true : false} onBlur={handleBlur} onChange={handleChange} id='outlined-basic' name='name' fullWidth label='Category Name' value={values.name} />
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
                  Service Categories
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack gap={1}>
                  <FormControl variant='filled'>
                    <InputLabel>Select Categories</InputLabel>
                    <Select
                      multiple
                      value={values.service_categories}
                      name='service_categories'
                      onChange={handleChange}
                      renderValue={(selected) => {
                        return selected.map((value) => <Chip sx={{ marginX: '2px' }} key={value} label={serviceCategoryList.find((option) => option.value === value)?.label} />)
                      }}
                    >
                      {serviceCategoryList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
export default LicenseCategoryEditAndUpdate
