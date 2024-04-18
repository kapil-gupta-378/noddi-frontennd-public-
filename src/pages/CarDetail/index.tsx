import React, { useEffect, useState } from 'react'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useNavigate, useParams } from 'react-router-dom'
import { getEndpointUrl } from '../../helper'
import { constants } from '../../constant'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { GroupInfo } from '../../interfaces'
import { Box, Container, Stack } from '@mui/system'
import { Tab, Tabs, Typography } from '@mui/material'
import CarInfo from './CarInfo'
import { CarDetailProps, CarSizeProps, TabsItem } from './interface'
import WheelSets from './WheelSets'

const CarDetail = () => {
  const axiosPrivate = useAxiosPrivate()
  const { apiEndpoints } = constants
  const { id, carId, tab } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [groupCars, setGroupCars] = useState<CarDetailProps>()
  const [userGroupInfo, setUserGroupInfo] = useState<GroupInfo>({} as GroupInfo)
  const [carSize, setCarSize] = useState<CarSizeProps[]>([])
  // const [bookings, setBookings] = useState<[]>([])
  const [activeTab, setActiveTab] = useState<string>('details')
  const navigate = useNavigate()

  const getGroupProfileById = async () => {
    setIsLoading(true)
    const groupMembersById: string = getEndpointUrl(apiEndpoints.getGroupMembersById, { groupId: id })
    // const getGroupBookingsUrl: string = getEndpointUrl(apiEndpoints.getGroupBookings, { groupId: id, page_size: '10', page: '1' })
    const getGroupCarsUrl: string = getEndpointUrl(apiEndpoints.getCarDetail, { carId: carId })
    const getCarSizeUrl: string = getEndpointUrl(apiEndpoints.getCarSizesOption)
    try {
      const groupMembersResponse = axiosPrivate.get(groupMembersById)
      // const groupBookingsResponse = axiosPrivate.get(getGroupBookingsUrl)
      const groupCarsResponse = axiosPrivate.get(getGroupCarsUrl)
      const CarSize = axiosPrivate.get(getCarSizeUrl)
      const res = await Promise.all([groupMembersResponse, groupCarsResponse, CarSize])

      setUserGroupInfo(res[0].data)
      // setBookings(res[1].data)
      setGroupCars(res[1].data)
      setCarSize(res[2].data.results)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getGroupProfileById()
  }, [])

  useEffect(() => {
    setActiveTab(tab as string)
  }, [tab])

  const TabsItem: TabsItem = {
    details: <CarInfo carSize={carSize} carId={carId as string} carDetails={groupCars as CarDetailProps} />,
    'wheel-sets': <WheelSets />
  }

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        Car Details
      </Typography>
      <NoddiBreadcrumb
        items={[
          {
            title: 'User Groups',
            path: '/user-groups'
          },
          {
            title: userGroupInfo.name || 'group name',
            path: `/user-groups/${id}/members`
          },
          {
            title: 'Cars',
            path: `/user-groups/${id}/cars`
          },
          {
            title: groupCars?.model || 'model',
            path: ``
          }
        ]}
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
          <Tabs value={activeTab} onChange={(_e, value) => navigate(`/user-groups/${id}/cars/${carId}/${value}`)} aria-label='Car detail tabs'>
            <Tab label='Details' value={'details'} />
            <Tab label='Wheel Sets' value={'wheel-sets'} />
          </Tabs>
        </Stack>
      </Box>

      {TabsItem[activeTab]}
    </Container>
  )
}

export default CarDetail
