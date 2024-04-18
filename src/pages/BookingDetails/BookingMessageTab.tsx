import { Box } from '@mui/system'
import React, { useMemo } from 'react'
import { RawTable } from '../../components/Table/BaseTable'
import { useParams } from 'react-router-dom'
import { BookingMessageTableProps } from './interface'
import { Card } from '@mui/material'
import moment from 'moment'
import { SeverityPill, SeverityPillColor } from '../../components/severity-pill'
import { getLatestDate } from '../../utils/functions'

const BookingMessageTab: React.FC<BookingMessageTableProps> = ({
  count = 0,
  items = [],
  onPageChange,
  onRowsPerPageChange,
  page = 0,
  rowsPerPage = 0,
  rowsPerPageOptions,
  isLoading = false,
  columns
}) => {
  const { id: userGroupId, bookingId } = useParams()

  const generateTableRow = useMemo(() => {
    return items.map((item) => {
      return {
        id: item.id,
        Receiver: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {item?.receiver.name}
          </Box>
        ),
        Title: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              width: '150px'
            }}
          >
            {item.header}
          </Box>
        ),
        Body: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              width: '400px'
            }}
          >
            {item.body}
          </Box>
        ),
        Created_At: () => {
          const dateObj = getLatestDate(item.booking_message_handlers?.sent_at, item.booking_message_handlers?.cancelled_at, item.booking_message_handlers?.scheduled_at)
          return (
            <Box
              sx={{
                alignItems: 'flex-start',
                display: 'flex',
                flexDirection: 'column-reverse'
              }}
            >
              {moment(Object.values(dateObj)[0]).format('DD-MM-YYYY HH:mm')}
              <SeverityPill color={dateObj.color as SeverityPillColor}>{dateObj.type}</SeverityPill>
            </Box>
          )
        }
      }
    })
  }, [items])
  return (
    <>
      <Card
        style={{
          margin: '20px 0'
        }}
      >
        <RawTable
          height='300px'
          minWidth='0'
          headers={columns}
          // handleOnClickTableRow={handleRowClick}
          entries={generateTableRow}
          count={count}
          isLoading={isLoading}
          onRowsPerPageChangeCallback={onRowsPerPageChange}
          page={page}
          pageChangeCallback={onPageChange}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          baseUrl={`/user-groups/${userGroupId}/bookings/${bookingId}/message/`}
        />
      </Card>
    </>
  )
}

export default BookingMessageTab
