import { Service_Category } from '../../interfaces'
export interface ServiceParams {
  bubble_id: string
  name: string
  description: string
  is_active?: boolean
  price?: string
  currency?: string
  vat_percentage?: string
  service_time?: string
  commission_payment?: string
  freelance_payment?: string
  service_category?: Service_Category
  car_sizes: number[]
}

export interface FilterValue {
  category: string[]
  inStock?: boolean
  name?: string
  status: string[]
}

export interface CreateSalesItemstParam {
  name: string
  description: string
  is_active: boolean
  price: string
  currency: string
  vat_percentage: string
  service_time: string
  commission_payment: string
  freelance_payment: string
  service_category: null | any
  car_sizes: number[]
}

export interface CreateServiceParam {
  name: string
  description: string
  is_active: boolean
  price: string
  currency: string
  vat_percentage: string
  service_time: string
  commission_payment: string
  freelance_payment: string
  service_category: null | any
  car_sizes: number[]
}

export type BookingStatusCode = 0 | 1 | 2 | 3 | 4 | 5 | 7 | null | undefined

export interface CalendarBookingsFilter {
  start_date?: Date | string | null
  end_date?: Date | string | null
  user_group_id?: number | null
  license_area_id?: number | null
  status?: BookingStatusCode
}

export interface BookingListFilter extends CalendarBookingsFilter {
  search?: string
  page?: number
  rating?: number[] | string
}
export interface CapacityContributionAddress {
  city: string
  country: string
  created_at: string
  id: number
  instructions: string
  latitude: string | null
  longitude: string | null
  name: string
  street_name: string
  street_number: string
  zip_code: string
}

export interface CapacityContributions {
  bubble_id?: string
  created_at?: string
  date: string
  end_address: CapacityContributionAddress
  id?: number
  license_area?: { id: number; name: string }
  service_worker?: {
    addresses: CapacityContributionAddress
    user: {
      id: number
      first_name: string
      last_name: string
    }
  }
  service_worker_attributes: {
    id: number
    created_at: string
    priority: number
    performance_factor: string
    start_time: string
    end_time: string
    max_duration: number
    cost_fixed: string
    cost_per_km: string
    cost_per_minute: string
    cost_per_minute_overtime: string
  }
  start_address: CapacityContributionAddress
  status: number
  uid?: string
  updated_at?: string
  updated_by?: string

  [key: string]: any
}
