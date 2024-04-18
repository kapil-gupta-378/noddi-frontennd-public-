import { ChangeEvent, MouseEvent } from 'react'

export interface LicenseData {
  id: number
  name: string
  service_categories: number[]
  [key: string]: number | string | boolean | null | number[]
}
export interface LicenseCategoryTableProps {
  count?: number
  items?: LicenseData[]
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void
  page?: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
  isLoading: boolean
  columns: string[]
}

export interface LicenseCategoryEditAndUpdateProps {
  action: string
}
