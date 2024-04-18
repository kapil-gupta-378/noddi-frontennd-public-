import React, { useEffect, useMemo } from 'react'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams } from 'react-router-dom'
import { FileDropzone } from '../../components/file-dropzone'
import { useMemberships } from '../../hooks'
import DeleteIcon from '@mui/icons-material/Delete'
import { generateRandomAlphaNumeric } from '../../utils/functions'
// import UserGroupsDataGrid from '../../components/UserGroupDataGrid'
// import { useUserGroup } from '../../hooks/UserGroup'
// import { userGroupMembershipTableColumns, userGroupTableColumns } from '../../utils/dataColumns'
// import { MembershipUserGroupsListTable } from '../../components/MembershipTable'
// import { MembershipDiscountTable } from './MembershipDiscountTable'
// import MultipleSelect from '../../components/commons/MultiSelect'
import { Autocomplete, IconButton } from '@mui/material'
import { FileWithPath } from 'react-dropzone'
import { Box } from '@mui/system';
import Loader from '../../components/Loader'
const validationSchema = Yup.object({
  groups: Yup.array(),
  images: Yup.array(),
  name: Yup.string().max(255).required(),
  auth_code: Yup.string().max(255).required(),
  membership_discounts: Yup.array().required().min(1)
})

export const MembershipProgramCreateForm: FC = (props) => {
  const params = useParams()
  const [files, setFiles] = useState<any[]>([])
  const [isNewGroup, setIsNewGroup] = useState<any>([])
  const [isImageChanged, setIsImageChanged] = useState(false)
  const [showError, setShowError] = useState<string>('')
  // const navigate = useNavigate()
  // const [discount, setDiscount] = useState({ label: '', id: '' })

  const {
    isLoading: isLoad,
    isDeleted,
    createMembershipProgramAsync,
    fetchMembershipProgramById,
    oneMembership,
    updateMembershipProgramAsync,
    deleteMemberShip,
    // getMemberShipDiscount,
    // membershipDiscount,
    allDiscountList,
    getDiscountList
    // addMembershipDiscountInMembershipProgram
  } = useMemberships()
  // const { page, setPage, userGroups, isLoading, dataSearch, onRowsPerPageChange, perPageSize, dataCount, searchKey } = useUserGroup()
  // const { memberShipDiscountList, updateAndCreateMembershipDiscount } = useMembershipDiscount()

  // const discountOption = useMemo(
  //   () =>
  //     memberShipDiscountList.map((value) => ({
  //       label: value.name,
  //       value: value.id
  //     })),

  //   [memberShipDiscountList]
  // )

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params && params.id) {
          await fetchMembershipProgramById(params.id)
        }
      } catch (err) {}
    }
    fetchData()
  }, [])

  const handleDeleteMemberShip = async () => {
    await deleteMemberShip(params?.id as string)
    toast.success('Successfully deleted!')
  }

  const handleSubmit = async (values: any, helpers: any): Promise<void> => {
    try {
      // if (files.length === 0 && !params?.id) {
      //   setShowError('Image is required.')
      // }

      const formData = new FormData()
      formData.append('image', values.image)
      formData.append('name', values.name)
      formData.append('auth_code', values.auth_code)
      if (!params.id) {
        formData.append('bubble_id', generateRandomAlphaNumeric(10))
      }
      formData.append('membership_discounts', JSON.stringify(values.membership_discounts))

      if (params && params.id) {
        Object.keys(values).forEach((item) => {
          if (values[item] === oneMembership[item] && typeof values[item] !== 'object') {
            formData.delete(item)
          }
        })
        updateMembershipProgramAsync(formData, params.id)
      } else {
        createMembershipProgramAsync(formData)
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong!')
      helpers.setStatus({ success: false })
      helpers.setSubmitting(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      // bubble_id: generateRandomAlphaNumeric(30),
      name: oneMembership?.name,
      groups: isNewGroup,
      auth_code: oneMembership?.auth_code,
      image: oneMembership?.image,
      membership_discounts: oneMembership?.membership_discounts || [],
      membership_discounts_name: oneMembership?.membership_discounts_name
    },
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true // Enable reinitialization when initialValues change
  })

  const handleFilesDrop = useCallback((newFiles: any[]): void => {
    setIsImageChanged(true)
    formik.setFieldValue('image', newFiles[0])
    setFiles(newFiles)
    setShowError('')
  }, [])

  const handleFilesRemoveAll = useCallback((): void => {
    setFiles([])
  }, [])

  const handleRemoveFile = useCallback((removedFile: FileWithPath) => {
    formik.setFieldValue('image', '')
    setFiles((files) =>
      files.filter((file) => {
        return removedFile.name !== file.name
      })
    )
  }, [])

  const handleAddUserGroup = (group: any) => {
    setIsNewGroup((prevGroup: any[]) => {
      const isDuplicate = prevGroup.some((item) => item.id === group.id)

      if (!isDuplicate) {
        return [...prevGroup, { id: group.id, name: group.name }]
      }

      return prevGroup
    })
  }

  useEffect(() => {
    if (oneMembership && oneMembership?.user_groups) {
      setIsNewGroup(oneMembership.user_groups)
    }
  }, [oneMembership])

  const getUpdatedUserGroup = () => {
    if (params?.id) {
      fetchMembershipProgramById(params?.id)
    }
  }

  // const getUpdateMembershipDiscount = () => {
  //   getMemberShipDiscount(params?.id as string)
  // }

  // useEffect(() => {
  //   getMemberShipDiscount(params?.id as string)
  // }, [params?.id])
  if (isLoad) {
    return (
      <>
        <Loader />
      </>
    )
  }  return (
    <form onSubmit={formik.handleSubmit} {...props} encType='multipart/form-data' className='membership-form'>
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
                    label='Program Name'
                    name='name'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className={`${oneMembership?.name && 'default-field'}`}
                  />
                  <TextField
                    error={!!(formik.touched.auth_code && formik.errors.auth_code)}
                    fullWidth
                    label='Auth Code'
                    name='auth_code'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type='text'
                    value={formik.values.auth_code}
                    className={`${oneMembership?.auth_code && 'default-field'}`}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
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
                {formik.values?.image && typeof formik.values?.image === 'string' ? (
                  <Stack>
                    <figure style={{ position: 'relative' }} className='single-membership-img-wrp'>
                      <img src={oneMembership?.image as string} alt='membership' />
                      <Box position='absolute' top={0} right={0}>
                        <IconButton sx={{ color: '#000' }} onClick={() => formik.setFieldValue('image', '')} aria-label='delete'>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </figure>
                  </Stack>
                ) : (
                  <FileDropzone
                    maxFiles={1}
                    accept={{ 'image/*': ['.svg', '.jpg', '.png', '.gif'] }}
                    caption='(SVG, JPG, PNG, or gif maximum 900x400)'
                    files={files}
                    onDrop={handleFilesDrop}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleFilesRemoveAll}
                    showRemoveUpload={false}
                  />
                )}

                {showError && <span className='error'>{showError}</span>}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container justifyContent='space-between' spacing={3}>
              <Grid xs={12} md={4}>
                <Typography style={{ display: 'flex', alignItems: 'center', height: '100%' }} variant='h6'>
                  Membership Discounts
                </Typography>
              </Grid>
              <Grid xs={12} md={6}>
                <Stack>
                  {/* <MultipleSelect name='associatedDiscount' label='Discounts' value={formik.values.associatedDiscount} onChange={formik.handleChange} options={discountOption} /> */}
                  <Autocomplete
                    disablePortal
                    disableClearable
                    multiple
                    loadingText='Loading...'
                    getOptionLabel={(option) => {
                      return option.name || ''
                    }}
                    onInputChange={(_e, value) => {
                      // setServicesListQuery(value)
                      getDiscountList(value as string)
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return option.id === value.id
                    }}
                    filterOptions={(x) => x}
                    onChange={(_, value) => {
                      const ids = value.map((item) => item.id)
                      formik.setFieldValue('membership_discounts', ids)
                      formik.setFieldValue('membership_discounts_name', value)
                    }}
                    value={formik.values.membership_discounts_name || []}
                    renderOption={(props, option) => {
                      return (
                        <li key={option.id} {...props}>
                          <Grid container gap={1} alignItems='center'>
                            <Typography variant='h6'>{option.name}</Typography>
                          </Grid>
                        </li>
                      )
                    }}
                    limitTags={3}
                    options={allDiscountList}
                    fullWidth
                    renderInput={(params) => {
                      return (
                        <TextField
                          // helperText='Select Membership discounts for apply on this membership program.'
                          onBlur={() => formik.setTouched({ ...formik.touched, membership_discounts: true })}
                          error={formik.errors.membership_discounts && formik.touched.membership_discounts ? true : false}
                          {...params}
                          placeholder='Membership Discounts'
                          label='Select Membership Discounts'
                        />
                      )
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Stack alignItems='center' direction='row' justifyContent='flex-end' spacing={1}>
          <Button color='inherit'>Cancel</Button>
          <Button disabled={isLoad} type='submit' variant='contained'>
            {isLoad ? 'Wait...' : params?.id ? 'Update' : 'Create'}
          </Button>

          {params?.id && (
            <Button disabled={isDeleted} color='error' onClick={handleDeleteMemberShip} variant='contained'>
              {isDeleted ? 'Wait...' : 'Delete'}
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  )
}
