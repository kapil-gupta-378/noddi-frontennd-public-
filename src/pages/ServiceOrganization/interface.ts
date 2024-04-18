import { ChangeEvent, MouseEvent } from 'react'

export interface ServiceOrganizationDataProps {
  id?: number
  user_group: string
  group_name?: string
}

export interface ServiceOrganizationCreateAndUpdateProps {
  action: string
}

export interface ServiceOrganizationTableProps {
  count?: number
  items?: ServiceOrganizationDataProps[]
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void
  page?: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
  isLoading: boolean
  columns: string[]
}
