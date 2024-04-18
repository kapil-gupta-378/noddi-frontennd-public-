import { ChangeEvent, MouseEvent } from 'react'

export interface ServiceNotificationAreaProps {
  id?: string
  is_notified: boolean
  lat: string
  long: string
  phone_number: string
  [key: string]: number | string | boolean | null | undefined
}

export interface ServiceAreaNotificationCreateAndUpdateProps {
  action: string
}

export interface ServiceNotificationAreaTableProps {
  count?: number
  items?: ServiceNotificationAreaProps[]
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void
  page?: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
  isLoading: boolean
  columns: string[]
}