import { Card, Checkbox, FormControlLabel, Link, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { ChangeEvent, MouseEvent } from 'react'
import { Feedback } from '../../../interfaces'
import { StarRating } from '../../commons/StarRating'
import NotFound from '../../commons/NotFound'
import Loader from '../../Loader'
import moment from 'moment'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'

interface FeedbackRowProps {
  feedback: Feedback
}

const FeedbackRow = React.memo(({ feedback, ...other }: FeedbackRowProps) => {
  const navigate = useNavigate()
  return (
    <TableRow
      // sx={{ '&:last-child td, &:last-child th': { border: 0 } ,}}
      {...other}
    >
      <TableCell
        sx={{
          textAlign: 'left',
          verticalAlign: 'middle'
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '25%' }}>
            <div onClick={() => navigate(`/users/${feedback.booking.user_id}/profile`)}>
              <Link className='cursor-pointer' variant='subtitle1' underline='always'>{`${feedback?.booking?.user_first_name} ${feedback?.booking?.user_last_name}`}</Link>
            </div>
            <div onClick={() => navigate(`/user-groups/${feedback?.booking.user_group_id}/bookings/${feedback?.booking?.booking_id}/details`)}>
              <Link underline='always' className='cursor-pointer' color='text.secondary' variant='subtitle2'>
                Booking: {feedback.booking.booking_slug}
              </Link>
            </div>
            <Typography color='text.secondary' variant='subtitle2'>
              {moment(feedback?.created_at).format('DD/MM/YYYY HH:mm:ss')}
            </Typography>
          </Box>

          <Box sx={{ width: '80%', display: 'flex', justifyContent: 'space-between', gap: '30px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              <div>
                <StarRating rating={feedback.customer_rating_car_result} /> {feedback.customer_rating_car_result}
              </div>

              <Typography variant='subtitle2'>Car service</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              <div>
                <StarRating rating={feedback.customer_rating_ease_of_use} /> {feedback.customer_rating_ease_of_use}
              </div>
              <Typography variant='subtitle2'>Ease of use</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              <div>
                <StarRating rating={feedback.customer_rating_politeness} /> {feedback.customer_rating_politeness}
              </div>
              <Typography variant='subtitle2'>Politeness</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              <div>
                <StarRating rating={feedback.customer_rating_communication} /> {feedback.customer_rating_communication}
              </div>
              <Typography variant='subtitle2'>Communication</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              <div>
                <StarRating rating={feedback.customer_rating_overall} />
                {feedback.customer_rating_overall}
              </div>
              <Typography variant='subtitle2'>NPS Rating</Typography>
            </div>
            <Stack width={'155px'} pt={1}>
              <Typography align='left' color='text.secondary' variant='subtitle2'>
                {'Driver Name'}
              </Typography>
              <Typography variant='subtitle2'>{feedback?.booking?.driver_name}</Typography>
            </Stack>
          </Box>
        </Box>

        <FormControlLabel control={<Checkbox name='isTaxable' checked={feedback.add_to_service_worker_stats} />} label='Count to work statics?' />
      </TableCell>
    </TableRow>
  )
})

interface FeedbacksTableProps {
  data: Feedback[]
  count: number
  onPageChange?: (event: MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => void
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void
  page: number
  rowsPerPage: number
  isLoading: boolean
}

export const FeedbacksTable = ({ data, count, onPageChange, onRowsPerPageChange, page, rowsPerPage, isLoading }: FeedbacksTableProps) => {
  return (
    <Stack spacing={5}>
      <Card sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '900px' }}>
          <TableHead>
            <TableRow>
              {['', ''].map((col, index) => {
                return (
                  <TableCell align='center' key={index}>
                    {col}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((feedback: Feedback) => (
              <FeedbackRow key={feedback.id} feedback={feedback} />
            ))}
          </TableBody>
        </Table>
        {isLoading && (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Loader />
          </div>
        )}
        <NotFound data={data} isLoading={isLoading} />
        <TablePagination
          component='div'
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page - 1}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10, 20, 40]}
        />
      </Card>
    </Stack>
  )
}
