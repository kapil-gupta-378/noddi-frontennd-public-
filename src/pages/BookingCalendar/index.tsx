import React, { useEffect, useMemo, useState } from 'react'
import { Box, Container, Stack } from '@mui/material'
import { CalendarToolbar } from './calendar-toolbar'
import WeekCalendar from '../../components/BookingCalendar'
import { useCalendarBookings } from '../../hooks/ApiHooks/useCalendarBookings'
import moment from 'moment'
import { DailyStatus } from '../../interfaces'
import { useBookings } from '../../hooks'
import { CalendarBookingsFilter } from '../../hooks/ApiHooks/interfaces'
import { SelectedLicenseArea, SelectedServiceOrganization } from './interface'

const BookingCalendar = () => {
  const { calendarBookings, setDateFilter, dateFilter } = useCalendarBookings()
  const { setFilterValue } = useBookings()
  const [selectedServiceOrganization, setSelectedServiceOrganization] = useState<SelectedServiceOrganization | null>(null)
  const [selectedLicenseArea, setSelectedLicenseArea] = useState<SelectedLicenseArea | null>(null)

  const currentWeekdaysData = useMemo(() => {
    // Generate an array of dates within the date interval
    const dateRange = []
    for (let date = moment(dateFilter.start_date).clone(); date.isSameOrBefore(moment(dateFilter.end_date)); date.add(1, 'day')) {
      dateRange.push(date.format('YYYY-MM-DD'))
    }
    // Generate the currentWeekdaysData array based on the date range
    const result = dateRange.map((date) => {
      const dayName = moment(date).format('dddd')
      return { day: dayName, date: date, bookingData: calendarBookings?.[date] || ({} as DailyStatus) }
    })

    return result
  }, [dateFilter, calendarBookings])

  const handleDateChange = (date: CalendarBookingsFilter) => {
    setDateFilter((prev) => ({ ...prev, ...date }))
    setFilterValue((prev) => ({ ...prev, ...date }))
  }

  useEffect(() => {
    setDateFilter((prev) => ({ ...prev, license_area_id: selectedLicenseArea?.value.id || null, user_group_id: selectedServiceOrganization?.value.user_group || null }))
  }, [selectedServiceOrganization, selectedLicenseArea])

  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1
          // py: 8
        }}
      >
        <Container maxWidth='xxl'>
          <Stack spacing={5}>
            <CalendarToolbar
              values={dateFilter}
              handleDateChange={handleDateChange}
              setSelectedLicenseArea={setSelectedLicenseArea}
              setSelectedServiceOrganization={setSelectedServiceOrganization}
              selectedServiceOrganization={selectedServiceOrganization}
              selectedLicenseArea={selectedLicenseArea}
            />

            <WeekCalendar bookingData={currentWeekdaysData} license_area_id={selectedLicenseArea?.value.id} user_group_id={selectedServiceOrganization?.value.user_group} />
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default BookingCalendar
