import { LicenseArea, ServiceOrigination } from '../../interfaces'
import { BookingDetails } from '../BookingDetails/interface'

export interface CalendarEvent {
  id: string
  allDay: boolean
  color?: string
  description: string
  end: string
  start: string
  title: string
  status: number
}

export type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek'

export interface BookingDetailProps {
  bookingDetails: BookingDetails
  bookingId: string
  isLoading: boolean
  setView: React.Dispatch<React.SetStateAction<'detail' | 'summary'>>
}

export interface SelectedServiceOrganization {
  label: string
  value: ServiceOrigination
}

export interface SelectedLicenseArea {
  label: string
  value: LicenseArea
}
