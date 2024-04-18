import { ChangeEvent, MouseEvent } from 'react'

interface Data {
  id: number
  name: string
}
export interface CouponsData {
  amount: string
  amount_percentage: string
  code: string
  bubble_id: string
  id?: number
  expires_at?: string
  valid_for_products: number[]
  valid_for_service_areas: number[]
  valid_for_services: number[]
  valid_for_sales_items?: Data[]
  valid_for_service_areas_data?: { id: number; name_internal: string }[]
  valid_for_services_data?: Data[]
  restrict_to_first_booking: boolean
  restrict_to_single_use_coupon: boolean
  restrict_to_single_use_user_group: boolean
  [key: string]: number | string | boolean | null | number[] | Data[] | undefined | { id: number; name_internal: string }[]
}
export interface CouponsTableProps {
  count?: number
  items?: CouponsData[]
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void
  page?: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
  isLoading: boolean
  columns: string[]
}

export interface CouponsCreateAndUpdateProps {
  action: string
}
