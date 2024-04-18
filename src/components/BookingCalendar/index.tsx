import React, { FC, useEffect, useState } from 'react'
import { Typography, Box, Card, Collapse } from '@mui/material'
import moment from 'moment'
import { SeverityPill } from '../severity-pill'
import { statusList } from '../../constant'
import { grey } from '@mui/material/colors'
import { DailyStatus } from '../../interfaces'
import { Stack } from '@mui/system'
import { useBookingsByDate } from '../../hooks'
import { RawCollapsibleTable } from '../Table'
import { BookingStatusCode } from '../../hooks/ApiHooks/interfaces'

interface WeekDays {
  day: string
  date: string
  bookingData?: DailyStatus
}

const WeekCalendar: FC<{ bookingData?: WeekDays[]; user_group_id: number | undefined | null; license_area_id: number | undefined | null }> = ({ bookingData = [], user_group_id, license_area_id }) => {
  const [openTable, setOpenTable] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null | string>(null)
  const [selectedStatus, setSelectedStatus] = useState<BookingStatusCode>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const handleClickOnDateCard = (date: Date | string, index: number, statusCode?: BookingStatusCode) => {
    if (!openTable) {
      setOpenTable((prev) => !prev)
      setSelectedDate(date)
      setSelectedStatus(statusCode)
      setOpenIndex(index)
    } else if (openIndex === index && statusCode === selectedStatus) {
      setOpenTable(false)
      setOpenIndex(null)
      setSelectedStatus(null)
    } else {
      setOpenTable(true)
      setSelectedDate(date)
      setOpenIndex(index)
      setSelectedStatus(statusCode)
    }
  }

  return (
    <>
      <Card>
        <Stack overflow={'auto'}>
          <Stack direction='row' minWidth={'1360px'}>
            {bookingData.map((dayData, idx) => (
              <Box
                key={idx}
                sx={{
                  width: '14.8%'
                }}
              >
                <div style={{ backgroundColor: '#F8F9FA', padding: '10px' }}>
                  <Typography
                    variant='h6'
                    color={`${idx === openIndex ? '#6366f1' : 'text.secondary'}`}
                    className='pb-2'
                    style={{ borderBottom: idx === openIndex ? '2px solid #6366f1' : '2px solid black' }}
                  >
                    {dayData.day}
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}>
                    <Typography color={`${idx === openIndex ? '#6366f1' : 'text.secondary'}`} variant='h4'>
                      {moment(dayData.date).format('DD')}
                    </Typography>{' '}
                    <Typography color={`${idx === openIndex ? '#6366f1' : 'text.secondary'}`} sx={{ marginBottom: '3px' }} variant='subtitle1'>
                      {moment(dayData.date).format('MMM')}
                    </Typography>
                  </div>
                </div>
                <div style={{ padding: '10px' }}>
                  <div onClick={() => handleClickOnDateCard(dayData.date, idx, null)}>
                    <SeverityPill
                      hover={true}
                      active={null === selectedStatus && dayData.date === selectedDate}
                      sx={{ marginBottom: '10px', padding: '6px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer' }}
                      color={'pink'}
                    >
                      <Typography color={'inherit'} variant='body2'>{`ALL`}</Typography>
                      <Typography color={'inherit'} variant='subtitle2'>
                        {dayData?.bookingData?.ASSIGNED_TO_ROUTE ||
                          0 +
                            (dayData?.bookingData?.CANCELLED || 0) +
                            (dayData?.bookingData?.COMPLETED || 0) +
                            (dayData?.bookingData?.CONFIRMED || 0) +
                            (dayData?.bookingData?.DRAFT || 0) +
                            (dayData?.bookingData?.UNABLE_TO_COMPLETE || 0)}
                      </Typography>
                    </SeverityPill>
                  </div>
                  <div onClick={() => handleClickOnDateCard(dayData.date, idx, 0)}>
                    <SeverityPill
                      hover={true}
                      active={0 === selectedStatus && dayData.date === selectedDate}
                      sx={{ marginBottom: '10px', padding: '6px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer' }}
                      color={statusList[0]?.color ?? 'primary'}
                    >
                      <Typography color={'inherit'} variant='body2'>{`${statusList[0]?.label}`}</Typography>
                      <Typography color={'inherit'} variant='subtitle2'>
                        {dayData?.bookingData?.DRAFT}
                      </Typography>
                    </SeverityPill>
                  </div>
                  <div onClick={() => handleClickOnDateCard(dayData.date, idx, 1)}>
                    <SeverityPill
                      active={1 === selectedStatus && dayData.date === selectedDate}
                      hover={true}
                      sx={{ marginBottom: '10px', padding: '6px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer' }}
                      color={statusList[1]?.color ?? 'primary'}
                    >
                      <Typography color={'inherit'} variant='body2'>{`${statusList[1]?.label}`}</Typography>
                      <Typography color={'inherit'} variant='subtitle2'>
                        {dayData?.bookingData?.CONFIRMED}
                      </Typography>
                    </SeverityPill>
                  </div>
                  <div onClick={() => handleClickOnDateCard(dayData.date, idx, 2)}>
                    <SeverityPill
                      active={2 === selectedStatus && dayData.date === selectedDate}
                      hover={true}
                      color='info'
                      style={{
                        marginBottom: '10px',
                        padding: '6px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // backgroundColor: '#bdbdbd94',
                        borderRadius: '12px',
                        color: grey[800],
                        cursor: 'pointer'
                      }}
                    >
                      <Typography color={'inherit'} variant='body2'>{`${statusList[2]?.label}`}</Typography>
                      <Typography color={'inherit'} variant='subtitle2'>
                        {dayData?.bookingData?.ASSIGNED_TO_ROUTE}
                      </Typography>
                    </SeverityPill>
                  </div>
                  <div onClick={() => handleClickOnDateCard(dayData.date, idx, 3)}>
                    <SeverityPill
                      active={3 === selectedStatus && dayData.date === selectedDate}
                      hover={true}
                      sx={{ marginBottom: '10px', padding: '6px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer' }}
                      color={statusList[3]?.color ?? 'primary'}
                    >
                      <Typography color={'inherit'} variant='body2'>{`${statusList[3]?.label}`}</Typography>
                      <Typography color={'inherit'} variant='subtitle2'>
                        {dayData?.bookingData?.CANCELLED}
                      </Typography>
                    </SeverityPill>
                  </div>
                  <div onClick={() => handleClickOnDateCard(dayData.date, idx, 4)}>
                    <SeverityPill
                      active={4 === selectedStatus && dayData.date === selectedDate}
                      hover={true}
                      sx={{ marginBottom: '10px', padding: '6px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer' }}
                      color={statusList[4]?.color ?? 'primary'}
                    >
                      <Typography color={'inherit'} variant='body2'>{`${statusList[4]?.label}`}</Typography>
                      <Typography color={'inherit'} variant='subtitle2'>
                        {dayData?.bookingData?.COMPLETED}
                      </Typography>
                    </SeverityPill>
                  </div>
                  <div onClick={() => handleClickOnDateCard(dayData.date, idx, 5)}>
                    <SeverityPill
                      active={5 === selectedStatus && dayData.date === selectedDate}
                      hover={true}
                      sx={{ marginBottom: '10px', padding: '6px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', whiteSpace: 'unset', cursor: 'pointer' }}
                      color={statusList[5]?.color ?? 'primary'}
                    >
                      <Typography sx={{ wordWrap: 'break-word' }} color={'inherit'} variant='body2'>{`${statusList[5]?.label}`}</Typography>
                      <Typography color={'inherit'} variant='subtitle2'>
                        {dayData?.bookingData?.UNABLE_TO_COMPLETE}
                      </Typography>
                    </SeverityPill>
                  </div>
                </div>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Card>

      <Collapse in={openTable} timeout='auto' unmountOnExit>
        {<CollapseContainer date={selectedDate} user_group_id={user_group_id} license_area_id={license_area_id} selectedStatus={selectedStatus} />}
      </Collapse>
    </>
  )
}

export default WeekCalendar

const CollapseContainer: FC<{ date?: Date | null | string; user_group_id: number | null | undefined; license_area_id: number | null | undefined; selectedStatus: BookingStatusCode }> = ({
  date,
  user_group_id,
  license_area_id,
  selectedStatus
}) => {
  const { bookings, isLoading, dataCount, page, setPage, pageSize, setPageSize, setFilterValue } = useBookingsByDate(_, false, user_group_id, license_area_id, date)

  useEffect(() => {
    setFilterValue((prev) => ({ ...prev, start_date: date, user_group_id: user_group_id, license_area_id: license_area_id, status: selectedStatus }))
    setPage(1)
  }, [date, license_area_id, license_area_id, selectedStatus])

  return (
    <RawCollapsibleTable
      height='592px'
      headers={['Group Name', 'Service time', 'Service Area Name', 'Time window ', 'Price', 'Status']}
      entries={bookings}
      count={dataCount}
      isLoading={isLoading}
      onRowsPerPageChangeCallback={(e) => setPageSize(parseInt(e.target.value))}
      page={page}
      pageChangeCallback={(_, newPage) => setPage(newPage + 1)}
      rowsPerPage={pageSize}
    />
  )
}
