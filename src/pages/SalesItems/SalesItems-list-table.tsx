import React, { useMemo } from 'react'
import type { ChangeEvent, FC, MouseEvent } from 'react'
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { SeverityPill } from '../../components/severity-pill'
import { useNavigate } from 'react-router-dom'
import { RawTable } from '../../components/Table/BaseTable'
import { SalesItemsInfo } from '../../interfaces'

interface CategoryOption {
  label: string
  value: string
}

const categoryOptions: CategoryOption[] = [
  {
    label: 'Healthcare',
    value: 'healthcare'
  },
  {
    label: 'Makeup',
    value: 'makeup'
  },
  {
    label: 'Dress',
    value: 'dress'
  },
  {
    label: 'Skincare',
    value: 'skincare'
  },
  {
    label: 'Jewelry',
    value: 'jewelry'
  },
  {
    label: 'Blouse',
    value: 'blouse'
  }
]

interface SalesItemsListTableProps {
  count: number
  items: SalesItemsInfo[]
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void
  page: number
  rowsPerPage: number
  rowsPerPageOptions?: number[]
  // handleRowClick: () => void
  isLoading: boolean
}

export const SalesItemsListTable: FC<SalesItemsListTableProps> = (props) => {
  const navigate = useNavigate()
  const { count = 0, items = [], onPageChange, onRowsPerPageChange, page = 0, rowsPerPage = 0, rowsPerPageOptions = [10, 20, 30, 60], isLoading } = props
  const generateTableRow = useMemo(() => {
    const row = items?.map((SalesItems: SalesItemsInfo) => {
      return {
        id: SalesItems.id,
        Name: () => (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {SalesItems?.image ? (
              <Box
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'neutral.50',
                  backgroundImage: `url(${SalesItems?.image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  borderRadius: 1,
                  display: 'flex',
                  height: 80,
                  justifyContent: 'center',
                  overflow: 'hidden',
                  width: 80
                }}
              />
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
              <Typography variant='subtitle2'>{SalesItems.name}</Typography>
            </Box>
          </Box>
        ),
        Description: () => <>{SalesItems.description}</>,
        Price: () => <>{SalesItems.price}</>,
        Size: () => (
          <>
            {SalesItems.car_sizes.map((car: { name: string }, idx: React.Key | null | undefined) => (
              <SeverityPill className={'me-1'} key={idx}>
                {car.name}
              </SeverityPill>
            ))}
          </>
        ),
        category: () => <>{SalesItems?.service_category?.name}</>,
        Status: () => (
          <>
            <SeverityPill color={SalesItems.is_active ? 'success' : 'error'}>{SalesItems.is_active ? 'Active' : 'InActive'}</SeverityPill>
          </>
        )
      }
    })
    return row
  }, [items])
  return (
    <div>
      <RawTable
        height='300px'
        headers={['Name', 'Description', 'Price', 'Car size', 'Category', 'Status']}
        // handleOnClickTableRow={handleRowClick}
        entries={generateTableRow}
        count={count}
        isLoading={isLoading}
        onRowsPerPageChangeCallback={onRowsPerPageChange}
        page={page}
        pageChangeCallback={onPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        baseUrl='/SalesItems/edit/'
      />
    </div>
  )
}
