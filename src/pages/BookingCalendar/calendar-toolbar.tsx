import React, { useEffect, useMemo } from 'react'
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { CalendarView, SelectedLicenseArea, SelectedServiceOrganization } from './interface'
import { DatePicker } from '@mui/x-date-pickers'
import { CalendarBookingsFilter } from '../../hooks/ApiHooks/interfaces'
import moment from 'moment'
import Autocomplete from '../../components/commons/AutoComplete/intex'
import { Grid } from '@mui/material'
import { useQuery, useServiceOrganization } from '../../hooks'
import { useNavigate } from 'react-router-dom'

interface CalendarToolbarProps {
  children?: ReactNode
  onViewChange?: (view: CalendarView) => void
  handleDateChange?: Dispatch<SetStateAction<CalendarBookingsFilter>>
  values: CalendarBookingsFilter
  setSelectedLicenseArea: React.Dispatch<React.SetStateAction<SelectedLicenseArea | null>>
  setSelectedServiceOrganization: React.Dispatch<React.SetStateAction<SelectedServiceOrganization | null>>
  selectedServiceOrganization: SelectedServiceOrganization | null
  selectedLicenseArea: SelectedLicenseArea | null
}

export const CalendarToolbar: FC<CalendarToolbarProps> = (props) => {
  const { handleDateChange, values, setSelectedLicenseArea, setSelectedServiceOrganization, selectedServiceOrganization, selectedLicenseArea, ...other } = props
  const { isLoading, serviceOrganizationList } = useServiceOrganization()
  const dateMonth = format(values.start_date, 'MMMM')
  const dateDay = format(values.start_date, 'y')
  const query = useQuery()
  const navigate = useNavigate()

  const licenseAreaOption: SelectedLicenseArea[] = useMemo(() => {
    const list = selectedServiceOrganization?.value?.license_areas.map((licenseArea) => ({ label: licenseArea?.name, value: licenseArea })) || []
    setSelectedLicenseArea(list[0] || null)
    return list
  }, [selectedServiceOrganization])

  const serviceOrganizationOption: SelectedServiceOrganization[] = useMemo(() => {
    const list = serviceOrganizationList.map((value) => ({ label: value?.group_name, value: value })) || []
    setSelectedServiceOrganization(list[0] || null)
    return list
  }, [serviceOrganizationList])

  useEffect(() => {
    if (query.get('date') && query.get('serviceOrganization') && query.get('licenseArea')) {
      handleDateChange?.({ end_date: moment(query.get('date')).add(6, 'days').toDate(), start_date: moment(query.get('date')).toDate() })
      setSelectedServiceOrganization(serviceOrganizationOption.find((value) => value.value.id.toString() === query.get('serviceOrganization')) || null)
      setSelectedLicenseArea(licenseAreaOption.find((value) => value.value.id.toString() === query.get('licenseArea')) || null)
    } else {
      if (serviceOrganizationOption.length !== 0 && licenseAreaOption.length !== 0) {
        const queryString = new URLSearchParams({
          date: moment().format('YYYY-MM-DD').toString(),
          serviceOrganization: serviceOrganizationOption[0]?.value?.id.toString() ?? '',
          licenseArea: licenseAreaOption[0]?.value?.id.toString() ?? ''
        }).toString()

        navigate(`/calendar-overview?${queryString}`)
      }
    }
  }, [query, licenseAreaOption, serviceOrganizationOption])

  const handleLicenseAreaChange = (newLicenseArea: SelectedLicenseArea) => {
    const queryString = new URLSearchParams({
      date: moment(values.start_date).format('YYYY-MM-DD').toString(),
      serviceOrganization: selectedServiceOrganization?.value?.id.toString() ?? '',
      licenseArea: newLicenseArea.value.id.toString()
    }).toString()

    navigate(`/calendar-overview?${queryString}`)
  }

  const handleServiceOrganizationChange = (newServiceOrganization: SelectedServiceOrganization) => {
    const queryString = new URLSearchParams({
      date: moment(values.start_date).format('YYYY-MM-DD').toString(),
      serviceOrganization: newServiceOrganization?.value?.id.toString() ?? '',
      licenseArea: newServiceOrganization?.value?.license_areas[0]?.id?.toString() ?? ''
    }).toString()
    navigate(`/calendar-overview?${queryString}`)
  }

  const handleDateChangeLocal = (newDate: Date) => {
    const queryString = new URLSearchParams({
      date: moment(newDate).format('YYYY-MM-DD').toString(),
      serviceOrganization: selectedServiceOrganization?.value?.id.toString() ?? '',
      licenseArea: selectedLicenseArea?.value.id.toString() ?? ''
    }).toString()
    navigate(`/calendar-overview?${queryString}`)
  }
  return (
    <Stack
      alignItems='center'
      flexWrap='wrap'
      justifyContent='space-between'
      flexDirection={{
        xs: 'column',
        md: 'row'
      }}
      spacing={3}
      sx={{ px: 3 }}
      {...other}
    >
      <Grid container>
        <Grid md={6} container item>
          <Typography variant='h5'>{dateMonth}</Typography>
          <Typography sx={{ fontWeight: 400 }} variant='h5'>
            {dateDay}
          </Typography>
        </Grid>
        <Grid md={6} direction={'row'} container item>
          <Stack width={'100%'} gap={'32px'} direction={'row'}>
            <DatePicker
              sx={{ width: '100%' }}
              format='dd/MM/yyyy'
              label='From'
              onChange={(date: Date | null) => {
                if (date) handleDateChangeLocal?.(date)
              }}
              value={values.start_date || null}
            />

            <Autocomplete
              loading={isLoading}
              value={selectedServiceOrganization}
              onChange={(e, newValue) => handleServiceOrganizationChange(newValue)}
              autoCompleteOptions={serviceOrganizationOption || []}
              placeholder='Service Organizations'
            />
            <Autocomplete
              loading={isLoading}
              value={selectedLicenseArea}
              onChange={(e, newValue) => handleLicenseAreaChange(newValue)}
              autoCompleteOptions={licenseAreaOption || []}
              placeholder='License Area'
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

CalendarToolbar.propTypes = {
  children: PropTypes.node,
  onViewChange: PropTypes.func
}
