import React from 'react'
import type { FC } from 'react'
import { useRef } from 'react'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'

interface CustomerListSearchProps {
  searchPlaceholder?: string
  dataSearch?: (name: string) => void
}

export const UserGroupsSearch: FC<CustomerListSearchProps> = (props) => {
  const { dataSearch, searchPlaceholder } = props
  const queryRef = useRef<HTMLInputElement | null>(null)

  return (
    <>
      <Stack alignItems='center' direction='row' flexWrap='wrap' spacing={3} sx={{ p: 3 }}>
        <Box component='div' sx={{ flexGrow: 1 }}>
          <OutlinedInput
            defaultValue=''
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder={searchPlaceholder ? searchPlaceholder : 'Search User Groups'}
            onChange={(e) => dataSearch(e.target.value)}
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
