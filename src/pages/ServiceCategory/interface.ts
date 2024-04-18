import { ChangeEvent, MouseEvent } from 'react'
import { FilterOption } from '../../interfaces'

export interface ServiceCategoryTableProps {
  count?: number
  items?: FilterOption[]
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void
  page?: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
  isLoading: boolean
  columns: string[]
}

export interface ServiceData {
  created_at: string
  created_by: string
  id: number
  name: string
  [key: string]: number | string | boolean | null
}

export interface ServiceCategoryEditAndUpdateProps{
  action:string
}