import React, { useEffect, useState, useRef, useCallback, ChangeEvent, RefObject } from 'react'
import { useParams } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import SEO from '../../components/SEO'
import { Card, Button, Container, Box, Divider, Stack, Tab, Tabs, Typography, CardContent, Grid, Switch, TextField, Avatar, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { SvgIcon } from '@mui/material'
import User01Icon from '@untitled-ui/icons-react/build/esm/User01'
import Camera01Icon from '@untitled-ui/icons-react/build/esm/Camera01'
import { SeverityPill } from '../../components/severity-pill'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import ReferralsTab from './ReferralsTab'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { constants } from '../../constant'
import { emailRegex, getEndpointUrl, getTabContent, phoneRegex, updateTabContent } from '../../helper'
import { userProfileTabs, userTabs } from '../../utils/tabsColumns'
import { routeNavigation } from '../../helper'
import { useNavigate } from 'react-router-dom'
import type { GroupInfo, GroupMember, tabs, InputRefType } from '../../interfaces'
import useApiRequest from '../../hooks/ApiHooks/useApiRequest'
import Loader from '../../components/Loader'
import { toast } from 'react-hot-toast'

const Profile = () => {
  const [isLoading, setLoading] = useState(true)
  const [, setIsApiCall] = useState(false)
  const [currentInputElement] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const params = useParams()
  const { id, tab } = params
  const [profile, setProfile] = useState(userProfileTabs)
  const [currentTab, setCurrentTab] = useState<string>(tab || profile?.firstActiveTab)
  const [userGroups, setUserGroups] = useState<GroupInfo[]>([] as GroupInfo[])
  const { getRequest } = useApiRequest()

  const axiosPrivate = useAxiosPrivate()

  const inputRef: RefObject<InputRefType> = useRef({ last_name: null })

  const navigate = useNavigate()

  const { apiEndpoints } = constants
  const userInfoScheme = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    phone_number: Yup.string().matches(phoneRegex(), 'Phone number is not valid'),
    email: Yup.string().matches(emailRegex(), 'Email is not valid').required('Email is required')
  })

  const getProfileById = async () => {
    try {
      setLoading(true)
      const groupOfUser = getGroupOfUser()
      const userProfileById = getUserProfileById()
      const language = getLanguage()

      const [groupUserData, userProfileByIDData, languageData] = await Promise.all([groupOfUser, userProfileById, language])

      setUserGroups(groupUserData)
      userProfileByIDData['languages'] = languageData?.languages
      setUserInfo({ ...userProfileByIDData })
      const updateProfile = updateTabContent(userProfileTabs, userProfileByIDData)
      setProfile({ ...profile, ...updateProfile })
      setLoading(false)
    } catch (err) {
      toast.error('Something went wrong')
      navigate(-1)
      setLoading(false)
      console.error('An error occurred')
    }
  }

  const getUserProfileById = () =>
    getRequest(apiEndpoints.getUserById, { userId: id })
      .then((res) => res?.data)
      .catch(() => console.error('An error occurred'))

  const getLanguage = () =>
    getRequest(apiEndpoints.getLanguages)
      .then((res) => res?.data)
      .catch(() => console.error('An error occurred'))

  const getGroupOfUser = () =>
    getRequest(apiEndpoints.getGroupsOfUser, { userId: id })
      .then((res) => res?.data)
      .catch(() => console.error('An error occurred'))

  useEffect(() => {
    getProfileById()
  }, [])
  useEffect(() => {
    if (tab) setCurrentTab(tab)
  }, [tab])

  const ProfileContent = () => {
    return (
      <Stack spacing={4}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid xs={12} md={4}>
                <Typography variant='h6'>Basic details</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Formik
                  enableReinitialize={true}
                  validationSchema={userInfoScheme}
                  onSubmit={(values) => {
                    updateUserProfile(values)
                  }}
                  initialValues={{ ...userInfo }}
                >
                  {({ handleSubmit, handleChange, values, errors }) => {
                    return (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                          <Stack alignItems='center' direction='row' spacing={2}>
                            <Box
                              sx={{
                                borderColor: 'neutral.300',
                                borderRadius: '50%',
                                borderStyle: 'dashed',
                                borderWidth: 1,
                                p: '4px'
                              }}
                            >
                              <Box
                                sx={{
                                  borderRadius: '50%',
                                  height: '100%',
                                  width: '100%',
                                  position: 'relative'
                                }}
                              >
                                <Box
                                  sx={{
                                    alignItems: 'center',
                                    // backgroundColor: (theme) => alpha(theme.palette.neutral[700], 0.5),
                                    borderRadius: '50%',
                                    color: 'common.white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    height: '100%',
                                    justifyContent: 'center',
                                    left: 0,
                                    opacity: 0,
                                    position: 'absolute',
                                    top: 0,
                                    width: '100%',
                                    zIndex: 1,
                                    '&:hover': {
                                      opacity: 1
                                    }
                                  }}
                                >
                                  <Stack alignItems='center' direction='row' spacing={1}>
                                    <SvgIcon variant='contained'>
                                      <Camera01Icon />
                                    </SvgIcon>
                                    <Typography variant='contained' variant='subtitle2' sx={{ fontWeight: 700 }}>
                                      Select
                                    </Typography>
                                  </Stack>
                                </Box>
                                <Avatar
                                  src={tab?.tab?.content.image}
                                  sx={{
                                    height: 100,
                                    width: 100
                                  }}
                                >
                                  <SvgIcon>
                                    <User01Icon />
                                  </SvgIcon>
                                </Avatar>
                              </Box>
                            </Box>
                            <Button variant='contained' size='small'>
                              Change
                            </Button>
                          </Stack>
                          <Stack alignItems='center' direction='row' spacing={2}>
                            <TextField
                              label='Full Name'
                              sx={{ flexGrow: 1 }}
                              ref={(el) => (inputRef.current['first_name'] = el)}
                              value={values?.first_name}
                              sx={{ flexGrow: 1 }}
                              name={'first_name'}
                              error={!!errors.first_name}
                              helperText={errors.first_name}
                              onChange={handleChange}
                            />
                          </Stack>
                          <Stack alignItems='center' direction='row' spacing={2}>
                            <TextField
                              ref={(el) => (inputRef.current['last_name'] = el)}
                              defaultValue={values?.last_name}
                              label='Last Name'
                              sx={{ flexGrow: 1 }}
                              name={'last_name'}
                              error={!!errors.last_name}
                              helperText={errors.last_name}
                              onChange={handleChange}
                            />
                          </Stack>
                          <Stack alignItems='center' direction='row' spacing={2}>
                            <TextField
                              ref={(el) => (inputRef.current['email'] = el)}
                              defaultValue={values?.email}
                              label='Email'
                              sx={{ flexGrow: 1 }}
                              name={'email'}
                              error={!!errors.email}
                              helperText={errors.email}
                              onChange={handleChange}
                            />
                          </Stack>
                          <Stack alignItems='center' direction='row' spacing={2}>
                            <TextField
                              ref={(el) => (inputRef.current['phone_number'] = el)}
                              defaultValue={values?.phone_number}
                              label='Phone Number'
                              sx={{ flexGrow: 1 }}
                              name={'phone_number'}
                              error={!!errors.phone_number}
                              helperText={errors.phone_number}
                              onChange={handleChange}
                            />
                          </Stack>
                          <Stack alignItems='center' direction='row' spacing={2}>
                            <TextField
                              label='Language'
                              name='language'
                              error={!!errors.language}
                              helperText={errors.language}
                              sx={{ flexGrow: 1 }}
                              onChange={handleChange}
                              select
                              SelectProps={{ native: true }}
                              value={values?.language}
                            >
                              {tab?.tab?.content?.languages &&
                                tab?.tab?.content?.languages.length > 0 &&
                                tab?.tab?.content?.languages.map((option, index) => (
                                  <option key={option} value={index + 1}>
                                    {option}
                                  </option>
                                ))}
                            </TextField>
                          </Stack>
                          <Stack alignItems='center' direction='row' spacing={2}>
                            <TextField
                              sx={{ flexGrow: 1 }}
                              name={'about'}
                              error={!!errors.about}
                              helperText={errors.about}
                              label='About'
                              ref={(el) => (inputRef.current['about'] = el)}
                              defaultValue={values?.about}
                              isInvalid={!!errors.about}
                              onChange={handleChange}
                              minRows={3}
                            />
                          </Stack>
                          <Stack alignItems='center' justifyContent='end' direction='row' spacing={2}>
                            <Button variant='contained' size='small' type='submit'>
                              Update
                            </Button>
                          </Stack>
                        </Stack>
                      </Form>
                    )
                  }}
                </Formik>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Stack>
    )
  }

  const TeamContent = () => {
    return (
      <>
        {userGroups.map((group) => {
          return (
            <>
              <Card sx={{ marginBottom: '25px' }}>
                <Typography
                  className='cursor-pointer'
                  sx={{ textDecoration: 'underline' }}
                  onClick={() => routeNavigation(navigate, `/user-groups/${group.id}/members`, { groupId: group.id })}
                  variant='h6'
                  mx={3}
                  my={2}
                >
                  {group.name}{' '}
                </Typography>
                <Table sx={{ minWidth: 400 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Members</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {group?.members?.map((member: GroupMember, index: number) => (
                      <TableRow key={index}>
                        <TableCell style={{ width: '70%' }}>
                          <Stack alignItems='center' direction='row' spacing={1}>
                            <Avatar
                              // src={member.avatar}
                              sx={{
                                height: 40,
                                width: 40
                              }}
                            >
                              <SvgIcon>
                                <User01Icon />
                              </SvgIcon>
                            </Avatar>
                            <div>
                              <Typography variant='subtitle2'>{`${member.first_name} ${member.last_name}`}</Typography>
                              <Typography color='text.secondary' variant='body2'>
                                {member.email}
                              </Typography>
                            </div>
                          </Stack>
                        </TableCell>
                        <TableCell style={{ width: '30%' }}>{member.is_admin ? <SeverityPill>OWNER</SeverityPill> : 'Standard'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </>
          )
        })}
      </>
    )
  }
  const TabContent = (tab: { tab: tabs }) => {
    const [switchState, setSwitchState] = useState({
      is_active: false,
      is_worker: false,
      is_manager: false,
      is_staff: false,
      is_superuser: false,
      ...userInfo
    })
    console.log(userInfo)

    const onSubmit = () => {
      updateUserProfile(switchState)
    }
    return (
      <Card>
        <CardContent>
          <h4>Permission</h4>
          <Grid mt={2} container>
            <Grid xs={12} md={6} item>
              <Stack alignItems='center' direction='row'>
                <Switch
                  checked={switchState.is_active}
                  onChange={(e) =>
                    setSwitchState((prev: any) => ({
                      ...prev,
                      is_active: !prev.is_active
                    }))
                  }
                  id={'default-is_active'}
                  name={'is_active'}
                />
                <Stack spacing={1}>
                  <Typography>Is Active</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} md={6} item>
              <Stack alignItems='center' direction='row'>
                {switchState.is_active}
                <Switch
                  checked={switchState.is_worker}
                  onChange={(e) =>
                    setSwitchState((prev: any) => ({
                      ...prev,
                      is_worker: !prev.is_worker
                    }))
                  }
                  id={'default-is_worker'}
                  name={'is_worker'}
                />
                <Stack spacing={1}>
                  <Typography>Is Worker</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} md={6} item>
              <Stack alignItems='center' direction='row'>
                <Switch
                  checked={switchState.is_manager}
                  onChange={(e) =>
                    setSwitchState((prev: any) => ({
                      ...prev,
                      is_manager: !prev.is_manager
                    }))
                  }
                  id={'default-is_manager'}
                  name={'is_manager'}
                />
                <Stack spacing={1}>
                  <Typography>Is Manager</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} md={6} item>
              <Stack alignItems='center' direction='row'>
                <Switch
                  checked={switchState.is_staff}
                  onChange={(e) =>
                    setSwitchState((prev: any) => ({
                      ...prev,
                      is_staff: !prev.is_staff
                    }))
                  }
                  id={'default-is_staff'}
                  name={'is_staff'}
                />
                <Stack spacing={1}>
                  <Typography>Is Staff</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} md={6} item>
              <Stack alignItems='center' direction='row'>
                <Switch
                  checked={switchState.is_superuser}
                  onChange={(e) =>
                    setSwitchState((prev: any) => ({
                      ...prev,
                      is_superuser: !prev.is_superuser
                    }))
                  }
                  id={'default-is_superuser'}
                  name={'is_superuser'}
                />
                <Stack spacing={1}>
                  <Typography>Is Superuser</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          <Stack alignItems='center' justifyContent='end' direction='row' spacing={2}>
            <Button onClick={onSubmit} variant='contained' size='small'>
              Save
            </Button>
          </Stack>
        </CardContent>
      </Card>
    )
  }
  const NotificationContent = () => {
    return (
      <Card>
        <CardContent>
          <Formik
            enableReinitialize={true}
            onSubmit={(values) => {
              updateUserProfile(values, 'notifications')
            }}
            initialValues={{ ...userInfo?.communication_preferences }}
          >
            {({ handleSubmit, handleChange, setFieldValue, values }) => {
              return (
                <Form noValidate onSubmit={handleSubmit}>
                  <Grid container>
                    <Grid xs={12} md={4}>
                      <Typography variant='h6'>Email</Typography>
                    </Grid>
                    <Grid xs={12} sm={12} md={8}>
                      {Object.keys(values)
                        .filter((item) => item !== 'id')
                        .map((item) => {
                          return (
                            <Stack divider={<Divider />} spacing={3}>
                              <Stack alignItems='flex-start' direction='row' justifyContent='space-between' spacing={3}>
                                <Stack spacing={1}>
                                  <Typography sx={{ textTransform: 'capitalize' }} variant='subtitle1'>
                                    {item
                                      .split('_')
                                      .filter((_, index) => index !== 0)
                                      .join(' ')}
                                  </Typography>
                                  <Typography variant='body2' color='text.secondary'>
                                    Important notifications about your account security.
                                  </Typography>
                                </Stack>
                                <Switch onChange={(e) => setFieldValue(item, e.target.checked)} checked={values[item]} />
                              </Stack>
                              <Divider sx={{ my: 3 }} />
                            </Stack>
                          )
                        })}
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 3 }} />

                  <Stack alignItems='center' justifyContent='end' direction='row' spacing={2}>
                    <Button variant='contained' size='small' type='submit'>
                      Save
                    </Button>
                  </Stack>
                </Form>
              )
            }}
          </Formik>
        </CardContent>
      </Card>
    )
  }

  const updateUserProfile = async (values, componentName?: string) => {
    setIsApiCall(true)
    const updatedValues = { ...userInfo }

    // Check if componentName is 'notifications' and update communication_preferences
    if (componentName === 'notifications') {
      updatedValues.communication_preferences = { ...values }
    } else {
      // Update all values
      Object.assign(updatedValues, values)
    }

    setUserInfo(updatedValues)

    // Compare updatedValues with userInfo to get the changed fields
    const changedFields = {}
    for (const key in updatedValues) {
      if (updatedValues[key] !== userInfo[key]) {
        changedFields[key] = updatedValues[key]
      }
    }

    const userProfileById = getEndpointUrl(apiEndpoints.updateUser, { userId: id })

    try {
      const response = await toast.promise(axiosPrivate.patch(userProfileById, changedFields), {
        loading: 'Saving...',
        success: <b>Profile details updated successfully.</b>,
        error: <b>Could not updated.</b>
      })
      setUserInfo({ ...response.data })
      setIsApiCall(false)
    } catch (error) {
      setIsApiCall(false)
      throw new Error('An error occurred.')
    }
  }

  const handleTabsChange = useCallback((event: ChangeEvent<any>, value: string): void => {
    navigate(`/users/${id}/${value}`)
  }, [])

  return (
    <>
      <SEO title={'Profile'} />
      <Container>
        <NoddiBreadcrumb
          items={[
            {
              title: 'Users',
              path: '/users'
            },
            {
              title: !isLoading ? `${(userInfo?.first_name || '') + ' ' + (userInfo?.last_name || '')}` : 'Loading...',
              path: `/Users/${id}}/profile`
            }
          ]}
        />
        {/* <Heading text='Profile' /> */}
        <Box
          component='main'
          sx={{
            flexGrow: 1
          }}
        >
          <Stack spacing={3} sx={{ mb: 3 }}>
            <div>
              <Tabs indicatorColor='primary' onChange={handleTabsChange} scrollButtons='auto' textColor='primary' value={currentTab} variant='scrollable'>
                {userTabs.map((tab) => (
                  <Tab key={tab.name} label={tab.label} value={tab.name} />
                ))}
              </Tabs>
              <Divider />
            </div>
          </Stack>
          {!isLoading ? (
            <Stack>
              {currentTab === 'profile' ? (
                <ProfileContent />
              ) : currentTab === 'notifications' ? (
                <NotificationContent />
              ) : currentTab === 'user-groups' ? (
                <TeamContent tab={getTabContent(userProfileTabs, currentTab)} />
              ) : currentTab === 'referrals' ? (
                <ReferralsTab isLoading={isLoading} userId={id} userInfo={userInfo} tab={getTabContent(userProfileTabs, currentTab)} />
              ) : (
                <TabContent tab={getTabContent(userProfileTabs, currentTab)} />
              )}
            </Stack>
          ) : (
            <Loader />
          )}
        </Box>
      </Container>
    </>
  )
}

export default Profile
