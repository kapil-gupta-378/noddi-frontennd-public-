/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from 'react'
import { Autocomplete as AutocompleteMUI, TextField } from '@mui/material'
import { UserGroupInterface } from '../../../interfaces'

interface AutocompleteProps {
  value: UserGroupInterface | null
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  onChange: (event: any, newValue: UserGroupInterface) => void
  filterOptions: (options: UserGroupInterface[], params: any) => UserGroupInterface[]
  autoCompleteOptions: UserGroupInterface[] | { label: string; value: any }[]
  getOptionLabel: (option: UserGroupInterface) => string
  renderOption: (props: any, option: UserGroupInterface) => JSX.Element
  placeholder: string
}

const Autocomplete: React.FC<AutocompleteProps> = ({ value, onInputChange, onChange, filterOptions, autoCompleteOptions, getOptionLabel, renderOption, placeholder, ...rest }) => {
  return (
    <AutocompleteMUI
      value={value}
      onInputChange={onInputChange}
      onChange={onChange}
      filterOptions={filterOptions}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id='free-solo-with-text-demo'
      options={autoCompleteOptions}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      sx={{ width: '100%' }}
      freeSolo={false}
      renderInput={(params: any) => <TextField {...params} label={placeholder} name='text' type='text' />}
      {...rest}
    />
  )
}

export default Autocomplete
