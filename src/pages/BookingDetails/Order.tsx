import React, { useState } from 'react'
import { Card, Table, TableBody, TableCell, TableHead, TableRow, Typography, Stack, Grid, TextField } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
// import { orderConstant, paymentMethodConstant, transactionStatusConstant } from '../../constant'
import { useOrder } from '../../hooks'

const Order = () => {
  const [isReadOnly] = useState(false)
  const { id, bookingId } = useParams()
  const { order, orderLines, orderTransaction, orderReceipt } = useOrder()
  return (
    <>
      <Card
        style={{
          padding: '30px',
          margin: '20px 0'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
              Status
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <TextField
                disabled={isReadOnly}
                // error={errors.worker_comments_internal ? true : false}
                // onBlur={handleBlur}
                // onChange={handleChange}
                id='outlined-basic'
                // name='worker_comments_internal'
                fullWidth
                label='Status'
                value={order ? order?.status : ''}
              />
              {/* {orderConstant.map((item, index) => {
                  return (
                    <MenuItem key={item} value={index}>
                      {item}
                    </MenuItem>
                  )
                })}
              </TextField> */}
            </Stack>
          </Grid>
        </Grid>
      </Card>

      <Card
        style={{
          margin: '20px 0'
        }}
      >
        <Stack padding={3}>
          <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
            Order Lines
          </Typography>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderLines.withOutDiscount.length > 0 ? (
              orderLines.withOutDiscount.map((item) => {
                return (
                  <TableRow component={Link} to={`/user-groups/${id}/bookings/${bookingId}/order/${item.id}/non_discount`} key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price_per_unit}</TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }} colSpan={3}>
                  {false ? 'Loading...' : 'Data Not Found!'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Card
        style={{
          margin: '20px 0'
        }}
      >
        <Stack padding={3}>
          <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
            Discount Lines
          </Typography>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderLines.withDiscount.length > 0 ? (
              orderLines.withDiscount.map((item) => {
                return (
                  <TableRow component={Link} to={`/user-groups/${id}/bookings/${bookingId}/order/${item.id}/discount`} key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price_per_unit}</TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }} colSpan={3}>
                  {false ? 'Loading...' : 'Data Not Found!'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Card
        style={{
          margin: '20px 0'
        }}
      >
        <Stack padding={3}>
          <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
            Transaction
          </Typography>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment Method</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderTransaction && orderTransaction.length > 0 ? (
              orderTransaction.map((item) => {
                return (
                  <TableRow component={Link} to={`/user-groups/${id}/bookings/${bookingId}/transaction/${item.id}`} key={item.id}>
                    <TableCell>{item.payment_method}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }} colSpan={3}>
                  {false ? 'Loading...' : 'Data Not Found!'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Card
        style={{
          margin: '20px 0'
        }}
      >
        <Stack padding={3}>
          <Typography variant='h6' style={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
            Order Receipt
          </Typography>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Receipt Number</TableCell>
              <TableCell>Paid Amount</TableCell>
              <TableCell>VAT Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(orderReceipt).length > 0 ? (
              <TableRow component={Link} to={`/user-groups/${id}/bookings/${bookingId}/order-receipt/${orderReceipt.id}`}>
                <TableCell># {orderReceipt.receipt_number}</TableCell>
                <TableCell>{orderReceipt.paid_amount}</TableCell>
                <TableCell>{orderReceipt.vat_amount}</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }} colSpan={3}>
                  {false ? 'Loading...' : 'Data Not Found!'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </>
  )
}

export default Order
