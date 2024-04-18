import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import { useFormik } from 'formik'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { useParams } from 'react-router-dom'
import { useBookingItems, useOrder } from '../../hooks'
import { OrderReceipt } from './interface'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFTemplate from '../../components/PdfTemplate'

const OrderReceiptDetails = () => {
  const [isReadOnly] = useState(true)
  const { userGroupDetail, userGroupId, bookingId } = useBookingItems()
  const { orderReceiptId } = useParams()
  const { orderReceipt } = useOrder()
  const { values, setValues, handleChange, handleBlur, handleSubmit } = useFormik<OrderReceipt>({
    initialValues: {} as OrderReceipt,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  useEffect(() => {
    setValues(orderReceipt)
  }, [orderReceipt])

  return (
    <Container>
      <Typography mb={1} variant='h4'>
        Order Receipt Details
      </Typography>
      <NoddiBreadcrumb
        items={[
          {
            title: 'User Groups',
            path: '/user-groups'
          },
          {
            title: userGroupDetail?.name,
            path: `/user-groups/${userGroupId}/members`
          },
          {
            title: 'Bookings',
            path: `/user-groups/${userGroupId}/bookings/`
          },
          {
            title: 'Booking Order',
            path: `/user-groups/${userGroupId}/bookings/${bookingId}/order`
          },
          {
            title: orderReceiptId
          }
        ]}
      />

      <form action='' onSubmit={handleSubmit}>
        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Receipt Number
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  //   error={errors.car ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='receipt_number'
                  fullWidth
                  label='Receipt Number'
                  value={values.receipt_number || ''}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                Paid Number
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  //   error={errors.car ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='paid_amount'
                  fullWidth
                  label='Paid Amount'
                  value={values.paid_amount || ''}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Card
          style={{
            padding: '30px',
            margin: '20px 0'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                VAT Amount
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <TextField
                  disabled={isReadOnly}
                  //   error={errors.car ? true : false}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id='outlined-basic'
                  name='vat_amount'
                  fullWidth
                  label='VAT Amount'
                  value={values.vat_amount || ''}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Stack alignItems='center' direction='row' justifyContent='flex-end' spacing={1}>
          {/* <Button
            
            startIcon={<FileDownloadIcon />}
            variant='contained'
          >
            Download as PDF
          </Button> */}

          <PDFDownloadLink document={<PDFTemplate receiptNumber={values.receipt_number} paidNumber={values.paid_amount} vatAmount={values.vat_amount} />} fileName='receipt.pdf'>
            {({ blob, url, loading, error }: { blob: any; url: any; loading: any; error: any }) =>
              loading ? (
                <Button startIcon={<FileDownloadIcon />} variant='contained'>
                  Generating...
                </Button>
              ) : (
                <Button startIcon={<FileDownloadIcon />} variant='contained'>
                  Download as PDF
                </Button>
              )
            }
          </PDFDownloadLink>
        </Stack>
      </form>
    </Container>
  )
}

export default OrderReceiptDetails
