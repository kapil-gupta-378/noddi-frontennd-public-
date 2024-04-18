/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tab, Tabs, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useNavigate, useParams } from 'react-router-dom'
import { constants } from '../../constant'
import { getEndpointUrl } from '../../helper'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { GroupInfo } from '../../interfaces'
import { BookingDetails, TabsItem } from './interface'
import BookingInfo from './BookingInfo'
import BookingMessageTab from './BookingMessageTab'
import { toast } from 'react-hot-toast'
import Order from './Order'

const BookingDetail = () => {
  const { id, bookingId, tab } = useParams()
  const [userGroupInfo, setUserGroupInfo] = useState<GroupInfo>({} as GroupInfo)
  const [bookingInfo, setBookingInfo] = useState<BookingDetails>({} as BookingDetails)
  const [activeTab, setActiveTab] = useState<string>('booking-tab')
  const [page] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const rowsPerPageOptions = [10, 20, 50, 100]
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [dataCount] = useState(10)

  const axiosPrivate = useAxiosPrivate()
  const { apiEndpoints } = constants

  const getGroupProfileById = async (page: number) => {
    const groupMembersById: string = getEndpointUrl(apiEndpoints.getGroupMembersById, { groupId: id })
    const bookingDetailUrl: string = getEndpointUrl(apiEndpoints.getBookingDetail, { bookingId: bookingId })
    try {
      setIsLoading(true)
      if (id) {
        const response = await axiosPrivate.get(groupMembersById)
        setUserGroupInfo(response.data)
      }
      const res = await axiosPrivate.get(bookingDetailUrl)
      setBookingInfo(res.data)
      setIsLoading(false)
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error('Item not found!')
      }
      console.error('An error occurred')
    }
  }

  const handlePageChange = () => {
    return
  }

  useEffect(() => {
    getGroupProfileById()
  }, [])
  useEffect(() => {
    getGroupProfileById(page)
  }, [page])
  useEffect(() => {
    getGroupProfileById(1)
  }, [pageSize])

  useEffect(() => {
    setActiveTab(tab as string)
  }, [tab])

  const TabsItem: TabsItem = {
    details: <BookingInfo isLoading={isLoading} bookingId={bookingId as string} bookingInfo={bookingInfo} />,
    messages: (
      <BookingMessageTab
        onPageChange={handlePageChange}
        onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value))}
        page={page}
        columns={['Receiver', 'Title', 'Message', 'Time']}
        items={bookingInfo.booking_messages}
        count={dataCount}
        rowsPerPage={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        isLoading={isLoading}
      />
    ),

    order: <Order />
  }

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        Bookings Details
      </Typography>
      <NoddiBreadcrumb
        items={
          userGroupInfo.name
            ? [
                {
                  title: 'User Groups',
                  path: '/user-groups'
                },
                {
                  title: userGroupInfo.name,
                  path: `/user-groups/${id}/members/`
                },
                {
                  title: 'Bookings',
                  path: `/user-groups/${id}/bookings/`
                },
                {
                  title: bookingInfo.slug,
                  path: ``
                }
              ]
            : [
                {
                  title: 'Bookings',
                  path: ``
                },
                {
                  title: bookingInfo.slug,
                  path: ``
                }
              ]
        }
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
          <Tabs value={activeTab} onChange={(_e, value) => navigate(`/user-groups/${id}/bookings/${bookingId}/${value}`)} aria-label='Booking detail tabs'>
            <Tab label='Details' value={'details'} />
            <Tab label='Messages' value={'messages'} />
            <Tab label='Order' value={'order'} />
          </Tabs>
        </Stack>
      </Box>

      {TabsItem[activeTab]}
    </Container>
  )
}

export default BookingDetail
