import { InputLabel, Select, OutlinedInput, MenuItem, FormControl } from '@mui/material'
import * as React from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

interface MultipleSelectProps {
  name: string
  label: string
  options: { label: string; value: string }[]
  value: number[]
  onChange: () => void
}

export default function MultipleSelect({ name, label, options, onChange, value = [] }: MultipleSelectProps) {
  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id='demo-multiple-name-label'>{label}</InputLabel>
      <Select labelId='demo-multiple-name-label' id='demo-multiple-name' name={name} multiple value={value} onChange={onChange} input={<OutlinedInput label='Car sizes' />} MenuProps={MenuProps}>
        {options.map((option: { label: string; value: string }) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
