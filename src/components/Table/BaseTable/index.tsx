/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FC, MouseEvent } from 'react'
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material'
import NotFound from '../../commons/NotFound'
import Loader from '../../Loader'
import { Link } from 'react-router-dom'

interface RawTableProps {
  headers: string[]
  entries: any[]
  handleOnClickTableRow?: (id: number) => void
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

export const RawTable: FC<RawTableProps> = ({
  headers,
  entries,
  handleOnClickTableRow,
  height,
  isLoading,
  rowsPerPage,
  rowsPerPageOptions,
  page,
  count,
  pageChangeCallback,
  onRowsPerPageChangeCallback,
  minWidth,
  isLink = true,
  baseUrl = ''
}) => {
  return (
    <>
      <div style={{ minHeight: height ? height : 'auto', overflowX: 'auto' }}>
        {!isLoading && (
          <Table sx={{ minWidth: minWidth || 1200 }}>
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
                return (
                  <TableRow
                    key={index}
                    component={isLink ? Link : 'tr'}
                    onClick={isLink ? undefined : handleOnClickTableRow ? () => handleOnClickTableRow(rowData.id) : undefined}
                    to={`${baseUrl.includes('|') ? baseUrl.split('|').join(rowData.id) : `${baseUrl}${rowData.id}`}`}
                    className={isLink ? 'cursor-pointer' : undefined}
                    hover
                  >
                    {Object.values(rowData).map((Children, idx) => {
                      return typeof Children !== 'number' && Children !== 'string' ? (
                        <TableCell key={idx} width={`${100 / headers.length}%`}>
                          <Children />
                        </TableCell>
                      ) : null
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
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
    </>
  )
}
