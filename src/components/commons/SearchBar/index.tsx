import React, { ChangeEvent, FormEvent } from 'react'
import { Input, Stack, SvgIcon } from '@mui/material'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'

interface SearchBarProps {
  handleQueryChange: (e: ChangeEvent<HTMLInputElement> | FormEvent<HTMLFormElement>) => void
  placeholder: string
}

const SearchBar: React.FC<SearchBarProps> = ({ handleQueryChange, placeholder }) => {
  return (
    <Stack alignItems='center' component='div' direction='row' onSubmit={(e: FormEvent<HTMLFormElement>) => handleQueryChange(e)} spacing={2} sx={{ p: 2 }}>
      <SvgIcon>
        <SearchMdIcon />
      </SvgIcon>
      <Input
        defaultValue=''
        disableUnderline
        fullWidth
        placeholder={placeholder || 'Search by Membership Program by Name, ID'}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleQueryChange(e)}
        sx={{ flexGrow: 1 }}
      />
    </Stack>
  )
}

export default SearchBar
