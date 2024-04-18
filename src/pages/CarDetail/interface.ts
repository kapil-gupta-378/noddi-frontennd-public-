import { ReactNode } from 'react'

export interface CarDetailProps {
  car_size: number
  color: string
  dimension_height: string | null
  dimension_length: string | null
  dimension_m3: string | null
  dimension_width: string | null
  image: string
  is_active: boolean
  license_plate_number: string | null
  make: string | null
  model: string | null
  weight: string | null
  alias: string
  eu_control_next: string
  eu_control_previous: string
  first_registered: string
  vin_number: string
  [key: string]: number | string | boolean | null
}

export interface CarSizeProps {
  id: number
  name: string
}

export interface CarInfoProps {
  carDetails: CarDetailProps
  carId: string
  carSize: CarSizeProps[]
}

export interface TabsItem {
  [key: string]: ReactNode
}

export interface CarWheelSetListItem {
  type: number
  is_staggered: boolean
  id: number
}

export interface CarWheelSetListProps {
  next: null | string
  previous: null | string
  count: number
  page: number
  page_size: number
  results: CarWheelSetListItem[]
}

export const Position = [
  { id: 0, label: 'Front Right' },
  { id: 1, label: 'Front Left' },
  { id: 2, label: 'Rear Right' },
  { id: 3, label: 'Rear Left' }
]

export interface Measurements {
  id: number
  value: string
  car_wheel: number
  measured_at: string
}

export interface CarWheelProps {
  id: number
  measurements: Measurements[]
  created_at: string
  updated_at: string
  bubble_id: string
  dimension_profile: number
  dimension_radial: number
  dimension_width: number
  position: number
  is_spiked: boolean
  car_wheel_set: number
}
export interface WheelSetDetailProps {
  id: number
  wheels: CarWheelProps[]
  created_at: string
  updated_at: string
  bubble_id: string
  wheel_bubble_ids: string[]
  is_staggered: boolean
  type: number
  car: number
}
