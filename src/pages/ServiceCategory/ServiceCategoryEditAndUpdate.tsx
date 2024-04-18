import React, { useEffect, useState } from 'react'
import { ServiceCategoryEditAndUpdateProps, ServiceData } from './interface'
import { Container, Stack } from '@mui/system'
import { Button, Card, Grid, Skeleton, SvgIcon, TextField, Typography } from '@mui/material'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useServiceCategory } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { getEndpointUrl } from '../../helper'
import { constants } from '../../constant'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { toast } from 'react-hot-toast'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'

const ServiceCategoryEditAndUpdate: React.FC<ServiceCategoryEditAndUpdateProps> = ({ action }) => {
  const [serviceCategory, setserviceCategory] = useState<ServiceData>({} as ServiceData)
  const [isLoaded, setIsLoaded] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const { getServiceCategoryById } = useServiceCategory()
  const { apiEndpoints } = constants
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    (async () => {
      if (!id) return
      setIsLoaded(true)
      const data = await getServiceCategoryById(id as string)
      setIsLoaded(false)
      setserviceCategory(data)
      setValues(data)
    })()
  }, [id])

  const handleDelete = async () => {
    const updateSeviceCategoryUrl = getEndpointUrl(apiEndpoints.getServiceCategoryById, { id: id })

    try {
      const res = await axiosPrivate.delete(updateSeviceCategoryUrl)

      if (res?.status === 204) {
        navigate('/service-category')
        toast.success('Successfully deleted!')
      }
    } catch (error) {
      setSubmitting(false)
      toast.error('Something went wrong!')
      throw new Error('An error occurred.')
    }
  }

  const { values, errors, setValues, handleChange, handleBlur, handleSubmit, isSubmitting, setSubmitting } = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: async (values) => {
      if (action === 'edit') {
        const updateSeviceCategoryUrl = getEndpointUrl(apiEndpoints.getServiceCategoryById, { id: id })

        try {
          const res = await axiosPrivate.patch(updateSeviceCategoryUrl, values, {})

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
          const createSeviceCategoryUrl = getEndpointUrl(apiEndpoints.getServiceCategoryList)
          const res = await axiosPrivate.post(createSeviceCategoryUrl, values)
          if (res?.status === 201) {
            toast.success('Successfully created!')
            navigate('/service-category')
          }
        } catch (error) {
          setSubmitting(false)
          toast.error('Something went wrong!')
          throw new Error('An error occurred.')
        }
      }
    }
  })

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

        <Stack marginTop={5}>
          <Skeleton variant='rectangular' width='100%' height={50} />
        </Stack>
      </Container>
    )
  }

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        {action === 'edit' ? 'Update Service category' : 'Create Service category'}
      </Typography>
      {action === 'edit' ? (
        <NoddiBreadcrumb
          items={[
            {
              title: 'Service Categories',
              path: '/service-category'
            },
            {
              title: serviceCategory.name,
              path: `/service-category/${serviceCategory.id}`
            }
          ]}
        />
      ) : (
        <NoddiBreadcrumb
          items={[
            {
              title: 'Service Categories',
              path: '/service-category'
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
          <Stack alignItems='center' direction='row' justifyContent='flex-end' spacing={1}>
            <Button color='inherit'>Cancel</Button>
            <Button disabled={isSubmitting} type='submit' variant='contained'>
              {isSubmitting ? 'Loading...' : action === 'edit' ? 'Update' : 'Create'}
            </Button>
            {action === 'edit' && (
              <Button disabled={isSubmitting} onClick={handleDelete} color='error' variant='contained'>
                {isSubmitting ? 'Loading...' : 'Delete'}
              </Button>
            )}
          </Stack>
        </Container>
      </form>
    </Container>
  )
}

export default ServiceCategoryEditAndUpdate
