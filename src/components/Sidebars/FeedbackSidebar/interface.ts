import { ChangeEvent, ReactNode } from 'react'

export interface FeedbackSidebarProps {
  container?: HTMLDivElement | null
  filters?: Filters
  group?: boolean
  onFiltersChange?: (filters: Filters) => void
  onClose?: () => void
  onGroupChange?: (event: ChangeEvent<HTMLInputElement>) => void
  open?: boolean
}

export interface Filters {
  query?: string
  startDate?: Date
  endDate?: Date
  customers?: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  status?: any
}

export interface FeedbackSidebarProps {
  container?: HTMLDivElement | null
  filters?: Filters
  group?: boolean
  onFiltersChange?: (filters: Filters) => void
  onClose?: () => void
  onGroupChange?: (event: ChangeEvent<HTMLInputElement>) => void
  open?: boolean
}

export interface Rating {
  label: string
  value: number
  element: ReactNode
}
export interface driverOption{
  label:string
  value:number
}

