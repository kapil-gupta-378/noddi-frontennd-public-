import { ChangeEvent, MouseEvent, ReactNode } from 'react'

export interface Address {
  id: number
  name: string
  street_name: string
  street_number: string
  zip_code: string
  city: string
  country: string
}

export interface BookingDetails {
  id?: number
  slug: string
  comments_admin: string
  comments_user: string
  user: { id: number; name: string }
  status: number
  created_by: string
  created_at?: string
  updated_by: string
  address: Address
  booking_time_window: {
    end_internal: string
    end_public: string
    start_public: string
    start_internal: string
    bubble_id?: string
    id: string
  }
  booking_messages: BookingMessageProps[]
  [key: string]: any
}

export interface BookingMessageProps {
  sender: { id: number; name: string; phone_number: string }
  receiver: { id: number; name: string; phone_number: string }
  header: string
  created_at: string
  id: number
  body: string
  bubble_id?: string
  booking_message_handlers: { subject_type: number; api_type: number; id: number; sent_at: string; cancelled_at: string; scheduled_at: string }
}

export interface BookingMessageHandlerProps {
  api_response: string
  body: string
  booking: number
  bubble_id: string
  header: string
  id?: number
  receiver: { id: number; name: string }
  sender: { id: number; name: string }
  booking_message_handler: { subject_type: number; api_type: number; id: number; sent_at: string; cancelled_at: string; scheduled_at: string }
}

export interface BookingMessageTableProps {
  count?: number
  items?: BookingMessageProps[]
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void
  page?: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
  isLoading: boolean
  columns: string[]
}

export interface BookingInfoProps {
  bookingInfo: BookingDetails
  bookingId: string
  isLoading: boolean
  [key: string]: number | string | boolean | null | BookingDetails
}

export interface TabsItem {
  [key: string]: ReactNode
}

interface Car {
  id: number
  make: string
  model: string
}

interface Booking {
  id: number
  comments_user: string
  comments_admin: string
}

interface Service {
  id: number
  is_added_by_worker: boolean
  unable_to_complete__comments: string | null
  unable_to_complete__reason__name: string | null
  service__id: number
  service__name: string
}
interface SalesItems {
  id: number
  is_added_by_worker: false
  SalesItems__id: number
  SalesItems__name: string
  unable_to_complete__comments: string | null
  unable_to_complete__reason__name: string | null
}

export interface BookingItemsProps {
  id: number
  images: { is_pre_job: boolean; image: string }[]
  unable_to_complete: null
  car: Car
  booking: Booking
  services: Service[]
  SalesItems: SalesItem[]
  deleted: null
  deleted_by_cascade: boolean
  uid: string
  created_at: string
  updated_at: string
  bubble_id: string
  service_time: null
  status: number
  price: string
  currency: string
  worker_comments_internal: string
  worker_comments_public: string
  created_by: string | null
  updated_by: string | null
}

export interface OrderProps {
  id: number
  status: string
}

interface OrderLinesProps {
  id: number
  order: number
  SalesItems: null
  quantity: number
  price_per_unit: string
  description: string
  is_discount: boolean
}

export interface OrderLines {
  withDiscount: OrderLinesProps[]
  withOutDiscount: OrderLinesProps[]
}

export interface OrderTransaction {
  id: number
  order: number
  payment_method: string
  amount: string
  status: string
}

export interface OrderReceipt {
  id: number
  receipt_number: number
  paid_amount: string
  vat_amount: string
}

export interface OrderDetailDiscount {
  id: number
  booking_item: {
    id: number
    service_time: number
    status: number
    price: number
    worker_comments_internal: string
    worker_comments_public: string
  }
  quantity: number
  price_per_unit: string
  currency: string
  vat_percentage: string
  description: string
  bundle_discount: { id: number; name: string }
  coupon: {
    id: number
    code: string
    expires_at: null
    amount: number
  }
  membership_program: {
    id: number
    name: string
    auth_code: string
  }
  membership_discount: {
    id: number
    name: string
    description: string
    discount_price: null
    discount_percentage: number
  }
  reward_withdrawal: {
    id: number
    points: number
  }
  is_discount: true
  discount_amount: null
  bundle_discount_value: null
  coupon_discount_value: null
  membership_discount_value: null
}

export interface OrderDetailNonDiscount {
  id: number
  order: number
  booking_item: {
    id: number
    service_time: number
    status: number
    price: number
    worker_comments_internal: string
    worker_comments_public: string
  }
  SalesItems: null | { id: number; name: string }
  service: null | { id: number; name: string }
  quantity: number
  price_per_unit: string
  currency: string
  vat_percentage: string
  description: string
  is_discount: false
}

export interface OrderTransactionProps {
  id: number
  order: {
    id: number
    status: number
  }
  payment_method: number
  amount: string
  status: number
  user: {
    id: number
    name: number
    phone_number: string
  }
  order_transaction_dintero: {
    transaction_id: string
    session_id: string
  }
  order_transaction_vipps: {
    id: number
    vipps_body: string
    vipps_id: string
    vipps_status: string
  }
  order_transaction_stripe: {
    id: number
    stripe_id: string
  }
}
