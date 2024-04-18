import type { FC } from 'react'
import { useRef } from 'react'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'
import { InputAdornment, SvgIcon, Stack, OutlinedInput, Box } from '@mui/material'
import React from 'react'

interface CustomerListSearchProps {
  dataSearch: (name: string) => void
}

export const CustomerListSearch: FC<CustomerListSearchProps> = (props) => {
  const { dataSearch } = props
  const queryRef = useRef<HTMLInputElement | null>(null)

  return (
    <>
      <Stack alignItems='center' direction='row' flexWrap='wrap' spacing={3} sx={{ p: 3 }}>
        <Box component='div' sx={{ flexGrow: 1 }}>
          <OutlinedInput
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder='Search User by Name, Phone Number'
            onChange={(e) => {
              dataSearch(e.target.value)
            }}
            startAdornment={
              <InputAdornment position='start'>
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>
      </Stack>
    </>
  )
}
