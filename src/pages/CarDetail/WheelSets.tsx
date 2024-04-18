import React, { useEffect, useMemo, useState } from 'react'
import { useCarDetail } from '../../hooks'
import { Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { RawTable } from '../../components/Table/BaseTable'
import { Box } from '@mui/system'
import { SeverityPill } from '../../components/severity-pill'

const WheelSets = () => {
  const { carWheelSetList, carId, isLoading, getCarWheelSetList } = useCarDetail()
  const [page, setPage] = useState<number>(carWheelSetList.page | 1)
  const [pageSize, setPageSize] = useState<number>(carWheelSetList.page_size || 10)

  useEffect(() => {
    getCarWheelSetList(carId as string)
  }, [])

  const generateTableRow = useMemo(() => {
    return carWheelSetList.results
      ? carWheelSetList.results.map((item) => {
          return {
            id: item.id,
            Type: () => (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                {item.type === 0 ? 'Summer' : 'Winter'}
              </Box>
            ),
            Staggered: () => (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                {item.is_staggered ? <SeverityPill color='success'>Yes</SeverityPill> : <SeverityPill color='error'>No</SeverityPill>}
              </Box>
            )
          }
        })
      : []
  }, [carWheelSetList])

  return (
    <>
      <Card
        style={{
          margin: '20px 0'
        }}
      >
        {/* <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Is Staggered</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carWheelSetList.length > 0 ? (
              carWheelSetList.map((item) => {
                return (
                  <TableRow
                    className='cursor-pointer'
                    component={Link}
                    to={`${item.id}`}
                    key={item.id}
                  >
                    <TableCell>{item.type === 0 ? 'Summer' : 'Winter'}</TableCell>
                    <TableCell>{item.is_staggered ? 'Staggered' : 'Not Staggered'}</TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }} colSpan={2}>
                  {isLoading ? 'Loading...' : 'Data Not Found!'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table> */}

        <RawTable
          height='300px'
          minWidth='0'
          headers={['Type', 'Staggered']}
          entries={generateTableRow}
          count={carWheelSetList.count || 0}
          isLoading={isLoading}
          onRowsPerPageChangeCallback={(e) => {
            setPageSize(parseInt(e.target.value))
          }}
          page={page}
          pageChangeCallback={(_, newPage) => {
            setPage(newPage + 1)
          }}
          isLink
          rowsPerPage={pageSize}
        />
      </Card>
    </>
  )
}

export default WheelSets
