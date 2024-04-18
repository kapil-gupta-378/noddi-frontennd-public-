import { ChangeEvent, MouseEvent } from 'react'

export interface BundleDiscountDataProps {
  id?: number
  name: string
  price: string
  products: number[]
  products_data: { id: number; name: string }[]
  services: number[]
  services_data: { id: number; name: string }[]
  [key: string]: any
}

export interface BundleDiscountCreateAndUpdateProps {
  action: 'edit' | 'create'
}

export interface BundleDiscountTableProps {
  count?: number
  items?: BundleDiscountDataProps[]
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void
  page?: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
  isLoading: boolean
  columns: string[]
}
