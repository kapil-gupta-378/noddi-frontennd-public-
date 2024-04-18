import { ChangeEvent, MouseEvent } from 'react'

export interface MembershipDiscountProps {
  description: string
  discount_percentage: string
  discount_price: string
  id?: string
  included_products: number[]
  included_products_name?: { id: number; name: string }[]
  included_services: number[]
  included_services_name?: { id: number; name: string }[]
  membership_programs: []
  name: string
  bubble_id: string
  [key: string]: number | string | boolean | null | undefined | number[] | string[] | { id: number; name: string }[]
}

export interface MembershipDiscountCreateAndUpdateProps {
  action: string
}

export interface MembershipDiscountTableProps {
  count?: number
  items?: MembershipDiscountProps[]
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void
  page?: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
  isLoading: boolean
  columns: string[]
}
