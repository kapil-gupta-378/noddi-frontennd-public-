import { Stack, StackProps } from '@mui/system'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import React, { FC } from 'react'
type Values = {
  start_date: Date
  end_date: Date
}
interface DateFilterProps extends StackProps {
  values?: Values
  handleDateChange?: (values: Values) => void
  fromDatePickerProps?: typeof DatePicker
  toDatePickerProps?: typeof DatePicker
}
const DateFilter: FC<DateFilterProps> = ({ values, handleDateChange, fromDatePickerProps, toDatePickerProps, ...props }) => {
  return (
    <Stack {...props} width={'342px'} gap={'32px'} direction={'row'}>
      <DatePicker
        {...fromDatePickerProps}
        format='dd/MM/yyyy'
        label='From'
        onChange={(date: Date | null) => {
          if (date) handleDateChange?.({ end_date: date, start_date: date })
        }}
        value={values?.start_date || null}
      />
      <DatePicker
        {...toDatePickerProps}
        minDate={values?.start_date}
        maxDate={moment(values?.start_date).add(6, 'days').toDate()}
        format='dd/MM/yyyy'
        label='To'
        onChange={(date: Date | null) => {
          if (date) handleDateChange?.((prev: Values) => ({ ...prev, end_date: date }))
        }}
        value={values?.end_date || null}
      />
    </Stack>
  )
}

export default DateFilter
