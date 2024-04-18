import React, { useMemo } from 'react'
import type { ChangeEvent, FC, MouseEvent } from 'react'
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { RawTable } from '../BaseTable'
import { MembershipInfo } from '../../../interfaces'

interface MembershipsTableProps {
  count?: number
  items?: MembershipInfo[]
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void
  page?: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
  isLoading: boolean
}

export const MembershipTable: FC<MembershipsTableProps> = ({ count = 0, items = [], onPageChange, onRowsPerPageChange, page = 0, rowsPerPage = 0, rowsPerPageOptions, isLoading }) => {

  // const handleRowClick = (id: number) => navigate(`/membership/programs/${id}`)

  const generateTableRow = useMemo(() => {
    const row = items.map((item: MembershipInfo) => {
      return {
        id: item.id,
        Name: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {item.image ? (
              <Box
                className='membership-img-wrp'
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'neutral.50',
                  // backgroundImage: `url(${product.image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  borderRadius: 1,
                  display: 'flex',
                  height: 80,
                  justifyContent: 'center',
                  overflow: 'hidden',
                  width: 80
                }}
              >
                <img src={item.image} alt='membership' />
              </Box>
            ) : (
              <Box
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'neutral.50',
                  borderRadius: 1,
                  display: 'flex',
                  height: 80,
                  justifyContent: 'center',
                  width: 80
                }}
              >
                <SvgIcon>
                  <Image01Icon />
                </SvgIcon>
              </Box>
            )}
            <Box
              sx={{
                cursor: 'pointer',
                ml: 2
              }}
            >
              <Typography variant='subtitle2'>{item.name}</Typography>
            </Box>
          </Box>
        ),
        code: () => <>{item.auth_code}</>
      }
    })
    return row
  }, [items])

  return (
    <div>
      <RawTable
        height='300px'
        headers={['Name', 'Code']}
        // handleOnClickTableRow={handleRowClick}
        entries={generateTableRow}
        count={count}
        isLoading={isLoading}
        onRowsPerPageChangeCallback={onRowsPerPageChange}
        page={page}
        pageChangeCallback={onPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        baseUrl='/membership/programs/'
      />
    </div>
  )
}
