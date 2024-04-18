/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FC, MouseEvent, useMemo, useState } from 'react'
import { Card, Collapse, Grid, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import NotFound from '../../commons/NotFound'
import Loader from '../../Loader'
import { Box } from '@mui/system'
import { orderStatusList, statusList } from '../../../constant'
import { generateAddressString } from '../../../utils/functions'
import { SeverityPill } from '../../severity-pill'
import moment from 'moment'

interface RawTableProps {
  headers: string[]
  entries: any[]
  // handleOnClickTableRow: (id: number) => void
  height?: string
  count: number
  minWidth?: string
  pageChangeCallback: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChangeCallback: (event: ChangeEvent<HTMLInputElement>) => void
  page: number
  rowsPerPage: number
  rowsPerPageOptions?: number[]
  isLoading: boolean
  baseUrl?: string
  isLink?: boolean
}

interface DynamicObject {
  [key: string]: any
}

export const RawCollapsibleTable: FC<RawTableProps> = ({
  headers,
  entries,
  height,
  isLoading,
  rowsPerPage,
  rowsPerPageOptions,
  page,
  count,
  pageChangeCallback,
  onRowsPerPageChangeCallback,
  minWidth
}) => {
  return (
    <Card>
      <div style={{ minHeight: height ? height : 'auto', overflowX: 'auto' }}>
        <Table aria-label='collapsible table' size='medium' sx={{ minWidth: minWidth || 1200 }}>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} width={`${100 / headers.length}%`}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {entries.map((rowData: DynamicObject, index) => {
              return <CollapsibleDataRow key={index} rowData={rowData} headers={headers} />
            })}
          </TableBody>
        </Table>
        <NotFound data={entries} isLoading={isLoading} />
        {isLoading && (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Loader />
          </div>
        )}
      </div>
      <TablePagination
        component='div'
        count={count}
        onPageChange={pageChangeCallback}
        onRowsPerPageChange={onRowsPerPageChangeCallback}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Card>
  )
}

const CollapsibleDataRow: FC<{ rowData: DynamicObject; headers: string[] }> = ({ rowData, headers }) => {
  const [open, setOpen] = useState(false)

  const generateTableRow = useMemo(() => {
    return {
      id: rowData?.id,
      GroupName: () => (rowData?.user_group.name ? rowData?.user_group.name : 'NA'),
      ServiceTime: () => (rowData?.booking_items?.booking_items[0]?.service_time ? `${moment.duration(rowData?.booking_items?.booking_items[0]?.service_time, 'seconds').asMinutes()} Min` : 'NA'),
      ServiceAreaName: () => (rowData?.service_area?.name_public.toString() ? rowData?.service_area?.name_public : 'NA'),
      TimeWindow: () =>
        rowData?.booking_time_window?.start_public
          ? `${moment(rowData?.booking_time_window?.start_public).format('HH:mm')} - ${moment(rowData?.booking_time_window?.end_public).format('HH:mm')}`
          : 'NA',
      Price: () => (rowData?.booking_items?.booking_items[0]?.price.toString() ? rowData?.booking_items?.booking_items[0]?.price : 'NA'),
      Status: () => (rowData.status ? <SeverityPill color={statusList[rowData.status]?.color ?? 'primary'}>{statusList[rowData.status]?.label}</SeverityPill> : 'NA')
    }
  }, [rowData])

  const collapsibleTableRow = useMemo(() => {
    const newArray = []
    for (let i = 0; i <= rowData.booking_items?.sales_items?.length; i++) {
      newArray.push({
        car: i === 0 ? rowData?.booking_items?.car : null,
        salesItems: rowData?.booking_items?.sales_items[i] || null
      })
    }
    return newArray
  }, [rowData])

  if (!rowData) return null
  return (
    <>
      <TableRow
        onClick={() => {
          setOpen(!open)
        }}
        className='cursor-pointer'
        hover
        sx={{ '& > *': { borderBottom: 'unset' } }}
      >
        {Object.values(generateTableRow).map((Children, idx) => {
          return typeof Children !== 'number' && Children !== 'string' ? (
            <TableCell sx={{ borderBottom: 'unset' }} key={idx} width={`${100 / headers.length}%`}>
              <Children />
            </TableCell>
          ) : null
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            {rowData && (
              <Box sx={{ backgroundColor: '#F4EFFD' }} gap={3}>
                <Grid container display={'flex'} flexDirection={'row'}>
                  <Grid xs={12} md={6} item p={3}>
                    <Typography variant='subtitle2'>Worker Name</Typography>
                    <Typography color='text.secondary' variant='body2'>
                      {rowData?.user?.name}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6} item p={3}>
                    <Typography variant='subtitle2'>Booking Slug</Typography>
                    <Typography color='text.secondary' variant='body2'>
                      {rowData.slug}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6} item p={3}>
                    <Typography variant='subtitle2'>Booking Address</Typography>
                    <Typography color='text.secondary' variant='body2'>
                      {generateAddressString(rowData.address)}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6} item p={3}>
                    <Typography variant='subtitle2'>Phone Number</Typography>
                    <Typography color='text.secondary' variant='body2'>
                      {rowData?.user?.phone_number}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6} item p={3}>
                    <Typography variant='subtitle2'>Payment Status</Typography>
                    <Typography color='text.secondary' variant='body2'>
                      {rowData.status ? (
                        <SeverityPill color={orderStatusList[rowData?.payment?.order_transaction[0]?.status]?.color ?? 'primary'}>
                          {orderStatusList[rowData?.payment?.order_transaction[0]?.status]?.label}
                        </SeverityPill>
                      ) : (
                        ''
                      )}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography ml={2} mb={2} variant='h6' gutterBottom>
                  Cars
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead sx={{ backgroundColor: '#D5C0FC !important' }}>
                    <TableRow sx={{ backgroundColor: '#D5C0FC !important' }}>
                      <TableCell sx={{ backgroundColor: '#D5C0FC !important' }}>Name</TableCell>
                      <TableCell sx={{ backgroundColor: '#D5C0FC !important' }}>Sales Items</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {collapsibleTableRow.map((bookingItem) => {
                      return (
                        <TableRow>
                          <TableCell component='th' scope='row'>{`${bookingItem?.car?.make || ''} ${bookingItem?.car?.model || ''}`}</TableCell>
                          <TableCell>{bookingItem?.salesItems?.name}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
