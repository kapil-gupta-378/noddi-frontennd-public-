import React, { useEffect, useState } from 'react'
import { ServiceOrganizationCreateAndUpdateProps } from './interface'
import { Container, Stack } from '@mui/system'
import { Button, Card, Grid, Skeleton, SvgIcon, TextField, Typography, Autocomplete } from '@mui/material'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useServiceOrganization } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { getEndpointUrl } from '../../helper'
import { constants } from '../../constant'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { toast } from 'react-hot-toast'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import { generateRandomAlphaNumeric } from '../../utils/functions'

const ServiceOrganizationEditAndUpdate: React.FC<ServiceOrganizationCreateAndUpdateProps> = ({ action }) => {
  const { id } = useParams()
  const [isDeleted, setIsDeleted] = useState<boolean>(false)
  const navigate = useNavigate()
  const { getServiceOrganizationById, userGroupList, getUserGroupsForOrganization, isLoading } = useServiceOrganization()
  const { apiEndpoints } = constants
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    getServiceOrganizationData()
  }, [id])

  const getServiceOrganizationData = async () => {
    if (!id) return
    const data = await getServiceOrganizationById(id as string)
    setValues(data)
  }

  const handleDelete = async () => {
    const updateSeviceOrganizationUrl = getEndpointUrl(apiEndpoints.getServiceOrganizationById, { id: id })

    try {
      setIsDeleted(true)
      const res = await axiosPrivate.delete(updateSeviceOrganizationUrl)
      setIsDeleted(false)
      if (res?.status === 204) {
        navigate('/service-organization')
        toast.success('Successfully deleted!')
      }
    } catch (error) {
      setSubmitting(false)
      toast.error('Something went wrong!')
      throw new Error('An error occurred.')
    }
  }

  const { values, setValues, setFieldValue, handleSubmit, isSubmitting, setSubmitting } = useFormik({
    initialValues: {
      user_group: '',
      group_name: ''
    },
    onSubmit: async (values) => {
      if (action === 'edit') {
        const updateSeviceOrganizationUrl = getEndpointUrl(apiEndpoints.getServiceOrganizationById, { id: id })

        try {
          const res = await axiosPrivate.patch(updateSeviceOrganizationUrl, values, {})

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
          const createSeviceOrganizationUrl = getEndpointUrl(apiEndpoints.createServiceOrganization)
          const bubbleId = generateRandomAlphaNumeric(30)
          const res = await axiosPrivate.post(createSeviceOrganizationUrl, { ...values, bubble_id: bubbleId })
          if (res?.status === 201) {
            toast.success('Successfully created!')
            navigate('/service-organization')
          }
        } catch (error) {
          setSubmitting(false)
          toast.error('Something went wrong!')
          throw new Error('An error occurred.')
        }
      }
    }
  })

  if (isLoading) {
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
        {action === 'edit' ? 'Update Service organization' : 'Create Service organization'}
      </Typography>
      {action === 'edit' ? (
        <NoddiBreadcrumb
          items={[
            {
              title: 'Service Organizations',
              path: '/service-organization'
            },
            {
              title: values.user_group
            }
          ]}
        />
      ) : (
        <NoddiBreadcrumb
          items={[
            {
              title: 'Service Organization',
              path: '/service-organization'
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
                  User Groups
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack gap={1}>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    disableClearable
                    onInputChange={(_e, value) => {
                      getUserGroupsForOrganization(value)
                      setFieldValue('group_name', value)
                    }}
                    value={{ label: values.group_name, id: values.user_group }}
                    onChange={(_, value) => {
                      setFieldValue('user_group', value?.id)
                      setFieldValue('group_name', value?.label)
                    }}
                    options={userGroupList.map((item: { name: string; id: string }) => ({ label: item.name, id: item.id }))}
                    fullWidth
                    renderInput={(params) => <TextField {...params} label='User Groups' />}
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

export default ServiceOrganizationEditAndUpdate
