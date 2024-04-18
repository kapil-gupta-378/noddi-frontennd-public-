import { addHoursToDate, ceilToHour, dateToHhMM, floorToHour } from '../../utils'
import { Col, Row } from 'react-bootstrap'
import NoddiPieChart from '../../components/NoddiPieChart'
import NoddiBarChart from '../../components/NoddiBarChart'
import React, { useEffect, useState } from 'react'
import { Booking } from '../../types/booking'

interface Props {
  bookings: Booking[]
}

const BookingStats: React.FC<Props> = ({ bookings }) => {
  const [slotsData, setSlotsData] = useState({ x: [], y: [] })
  const productDataList = bookings.flatMap((b) => b.products)

  const getSlotsData = () => {
    if (bookings && bookings.length > 0) {
      // Remove all start and end values which are not valid dates.
      const slots = bookings
        .filter((b) => new Date(b.start).toString() !== 'Invalid Date' && new Date(b.end).toString() !== 'Invalid Date')
        .map((b) => {
          return {
            start: b.start,
            end: b.end
          }
        })

      // Date of the minimum start slot of the bookings
      const minDate = floorToHour(new Date(slots.reduce((prev, curr) => (prev.start < curr.start ? prev : curr)).start))
      // Date of the maximum end slot of the bookings
      const maxDate = ceilToHour(new Date(slots.reduce((prev, curr) => (prev.end > curr.end ? prev : curr)).end))

      // Create a list with dates in between start and end, and transform the dates into HH:MM format.
      // Example: [07:00, 08:00, 09:00, ...., 21:00]
      const dates = [minDate]
      let date = minDate
      while (date.getTime() < maxDate.getTime()) {
        date = addHoursToDate(new Date(date.getTime()), 1)
        dates.push(date)
      }
      const datesStr = dates.map((d) => dateToHhMM(d))

      // Count the values for each element in the dates list.
      const dateValues = new Array(datesStr.length).fill(0)
      for (let x = 0; x < slots.length; x++) {
        const bookingHhMmStart = dateToHhMM(new Date(slots[x].start))
        const bookingHhMmEnd = dateToHhMM(new Date(slots[x].end))
        for (let y = 0; y < datesStr.length; y++) {
          if (datesStr[y] <= bookingHhMmEnd && datesStr[y] >= bookingHhMmStart) {
            dateValues[y] += 1
          }
        }
      }

      return {
        x: datesStr,
        y: dateValues
      }
    }
    return { x: [], y: [] }
  }

  useEffect(() => {
    setSlotsData(getSlotsData())
  }, [])

  return (
    <>
      {productDataList.length > 0 && slotsData.x.length > 0 && (
        <Row className={'stats-row'}>
          <Col xs={12} xl={6}>
            <NoddiPieChart dataList={productDataList} seriesName={'Product'} legendHeader={'Product distribution'} legendSubHeader={'What products have the customers booked'} />
          </Col>

          <Col xs={12} xl={6}>
            <NoddiBarChart data={slotsData} legendHeader={'Slot distribution'} legendSubHeader={'When have the customers booked'} />
          </Col>
        </Row>
      )}
    </>
  )
}

export default BookingStats
