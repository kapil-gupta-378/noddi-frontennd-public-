import { FileWithPath } from 'react-dropzone'
import { DiscountProps } from '../hooks'

export interface userTableColumn {
  name: string
  label: string
  sortable?: boolean
  type?: string
  width?: string | number
}
export interface dataRow {
  id?: number
  email?: string
  first_name?: string
  last_name?: string
  phone_number?: number | string
}
export interface DataGridProps {
  isLoading?: boolean
  columns: userTableColumn
  rows: dataRow
  perPageSize: number
  dataSearch(name: string): dataRow[] | []
}
export interface userProps {
  id?: number
  email?: string
  first_name?: string
  last_name?: string
  is_staff?: boolean
  is_active?: boolean
  is_superuser?: boolean
}
export interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

export interface apiUrls {
  name: string
  path: string
}

export interface tabContent {
  header?: ''
  name?: ''
  image?: ''
  first_name?: ''
  last_name?: ''
  email?: ''
  description?: ''
}

export interface tabs {
  name?: string
  label?: string
  icon?: string
  content?: {
    header: string
    name: string
    id?: string
    image?: string
    first_name?: string
    last_name?: string
    last_login?: string
    phone_number?: string
    email?: string
    about?: string
    language?: string
    languages?: string[]
    data?: {
      heading: string
      list: {
        name: string
        label: string
        placeHolder?: string
        value: string | number
        type: string
        options?: string[]
        checked?: boolean
      }[]
    }[]
  }
}

export interface profileTabs {
  heading: string
  firstActiveTab: string
  tabs: tabs
}

export interface billingTabs {
  heading: string
  firstActiveTab: string
  tabs: tabs
}

export interface GroupMember {
  email: string
  first_name: string
  last_name: string
  phone_number: string
  is_admin: boolean
  id: number
}
export interface GroupInfo {
  currency: string
  id: number
  name: string
  users: GroupMember[]
  members?: GroupMember[]
}

export interface GroupProfileTab {
  name: string
  label: string
  icon?: string
}

export interface car {
  alias: string
  booking_item_bubble_ids: string[]
  bubble_id: string
  car_size: number
  color: string
  created_at: string
  created_by: null
  deleted: null
  deleted_by_cascade: boolean
  dimension_height: string
  dimension_length: null
  dimension_m3: string
  dimension_width: string
  eu_control_next: string
  eu_control_previous: null
  first_registered: string
  fuel_type: number
  id: number
  image: null
  is_active: boolean
  license_plate_number: string
  make: string
  model: string
  uid: string
  updated_at: string
  updated_by: null
  user_group: number
  user_group_bubble_id: string
  vin_number: string
  weight: string
}

export interface CommunicationPreferences {
  id: number
  email_booking_info: boolean
  email_calendar_invites: boolean
  email_newsletter: boolean
  sms_marketing: boolean
  sms_service_notification: boolean
}

export interface UserInterface {
  about: string
  communication_preferences: CommunicationPreferences
  email_booking_info: boolean
  email_calendar_invites: boolean
  email_newsletter: boolean
  id: number
  sms_marketing: boolean
  sms_service_notification: boolean
  email: string
  first_name: string
  is_active: boolean
  is_manager: boolean
  is_staff: boolean
  is_superuser: boolean
  is_worker: boolean
  last_login: string
  last_name: string
  phone_number: string
}

export interface UserGroupProps {
  id: number
  name: number
  num_members: number
  is_selected: boolean
}

export interface UserDataProps {
  user: {
    id: number
    last_login: string
    email: string
    first_name: string
    last_name: string
    phone_number: string
    about: string
    language: null | number
    is_active: boolean
    is_worker: boolean
    is_manager: false
    is_staff: boolean
    is_superuser: boolean
    communication_preferences: {
      id: number
      email_booking_info: boolean
      email_calendar_invites: boolean
      email_newsletter: boolean
      sms_marketing: boolean
      sms_service_notification: boolean
    }
    user_groups: UserGroupProps[]
  }
  token: string
}

export interface UserGroupInterface {
  id: number
  name: string
}
export interface BookingWindow {
  user: any
  group_name: any
  booking_window_id: number
  bubble_id: string
  start_public: string
  end_public: string
  start_internal: string
  end_internal: string
  price: number
  status: number
}
export interface BookingInterface {
  id: number
  deleted: null
  deleted_by_cascade: boolean
  uid: string
  created_at: string
  updated_at: string
  bubble_id: string
  slug: string
  comments_user: string
  comments_admin: string
  status: number
  created_by: string
  updated_by: string
  booking_time_window: BookingWindow
  user: { id: number; name: string }
  user_group: { id: number; name: string }
  address: number
}

export type RatingMark = StartRatingEnum.oneStar | StartRatingEnum.twoStar | StartRatingEnum.threeStar | StartRatingEnum.fourStar | StartRatingEnum.fiveStar

export interface Feedback {
  id: number
  booking: {
    booking_id: number
    booking_slug: string
    user_first_name: string
    user_last_name: string
    user_phone_number: string
    booking_status: number
    user_group_id: number
  }
  deleted: null
  deleted_by_cascade: boolean
  uid: string
  created_at: string
  updated_at: string
  bubble_id: string
  add_to_service_worker_stats: boolean
  customer_rating_car_result: number
  customer_rating_communication: number
  customer_rating_ease_of_use: number
  customer_rating_politeness: number
  customer_rating_overall: number
  customer_comment: string
  created_by: null
  updated_by: null
}

export enum StartRatingEnum {
  oneStar = 1,
  twoStar = 2,
  threeStar = 3,
  fourStar = 4,
  fiveStar = 5
}

export interface RatingAvg {
  key: string
  avg: number
  total: number
}

export enum RatingPropertyKey {
  'customer_rating_car_result' = 'Car Service',
  'ease_of_use' = 'Ease of use',
  'customer_rating_politeness' = 'Politeness',
  'customer_rating_communication' = 'Communication',
  'customer_rating_overall' = 'NPS Rating'
}

export interface MembershipInfo {
  id: number
  deleted: null
  deleted_by_cascade: boolean
  uid: string
  created_at: string
  updated_at: string
  bubble_id: string
  benefits_bubble_names: string[]
  name: string
  auth_code: string
  image: null | string | FileWithPath
  created_by: null
  updated_by: null
  user_groups: number[]
  membership_discounts: number[]
  membership_discounts_name: DiscountProps[]
  [key: string]: any
}

export interface SalesItemsInfo {
  car_sizes: []
  id: number
  deleted: null | any
  deleted_by_cascade: boolean
  uid: string
  created_at: string
  updated_at: string
  bubble_id: string
  name: string
  description: string
  is_active: boolean
  price: string
  currency: string
  vat_percentage: string
  service_time: string
  commission_payment: string
  freelance_payment: string
  created_by: null | any
  updated_by: null | any
  service_category: null | any
  // car_sizes: number[]
}

export type Service_Category = {
  id: number
  name: string
}
export interface ServiceInfo {
  id: number
  deleted: null | any
  deleted_by_cascade: boolean
  uid: string
  created_at: string
  updated_at: string
  bubble_id: string
  name: string
  description: string
  is_active: boolean
  price: string
  currency: string
  vat_percentage: string
  service_time: string
  commission_payment: string
  freelance_payment: string
  created_by: null | any
  updated_by: null | any
  service_category: Service_Category
  car_sizes: number[]
}

export interface FilterOption {
  label: string | number
  value: number | string
}

export interface CalendarEvent {
  id: string
  groupId?: string
  allDay?: boolean
  start: Date
  end?: Date | null
  startStr: string
  endStr: string
  title: string
  url?: string
  classNames?: string[]
  editable?: boolean | null
  startEditable?: boolean | null
  durationEditable?: boolean | null
  resourceEditable?: boolean | null
  display?: 'auto' | 'block' | 'list-item' | 'background' | 'inverse-background' | 'none'
  overlap?: boolean
  constraint?: any // Replace 'any' with the appropriate type
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  extendedProps?: Record<string, any> // Replace 'any' with the appropriate type
  source?: any // Replace 'any' with the appropriate type
}

export interface DailyStatus {
  DRAFT: number
  CONFIRMED: number
  ASSIGNED_TO_ROUTE: number
  CANCELLED: number
  COMPLETED: number
  UNABLE_TO_COMPLETE: number
}

export interface BookingCalendarData {
  [date: string]: DailyStatus
}

interface UserProfileTab {
  name: string
  label: string
  icon: string
  content: {
    header: string
    name: string
    id?: string
    image?: string
    first_name?: string
    last_name?: string
    last_login?: string
    phone_number?: string
    email?: string
    about?: string
    language?: string
    languages?: string[]
    data?: {
      heading: string
      list: {
        name: string
        label: string
        placeHolder?: string
        value: string | number
        type: string
        options?: string[]
        checked?: boolean
      }[]
    }[]
  }
}

export interface UserProfileTabs {
  heading: string
  firstActiveTab: string
  tabs: UserProfileTab[]
}

export interface Account {
  id: number
  deleted: string
  deleted_by_cascade: boolean
  uid: string
  created_at: string
  updated_at: string
  bubble_id: string
  points: string
  created_by: string
  updated_by: string
  user_group: number
}

export interface DepositRewards {
  id: number
  booking: { booking_id: number; booking_user_group_id: number; booking_status: number }
  reward_account: {
    id: number
    bubble_id: string
    points: number
  }
  deleted: string
  deleted_by_cascade: boolean
  uid: string
  created_at: string
  updated_at: string
  bubble_id: string
  points: string
  reason: number
  public_description: string
  internal_description: string
  created_by: string
  updated_by: string
  user: {
    user_id: number
    name: string
  }
}

export interface WithdrawalRewards {
  id: number
  deleted: string | null
  deleted_by_cascade: boolean
  uid: string
  created_at: string
  updated_at: string
  bubble_id: string
  points: string
  created_by: string | null
  updated_by: string | null
  reward_account: number
  booking: {
    booking_id: number
    booking_status: number
  }
}

export interface LicenseArea {
  id: number
  name: string
}

export interface ServiceOrigination {
  id: number
  bubble_id: string
  group_name: string
  user_group: number
  license_areas: LicenseArea[]
}

interface CarSize {
  id: number
  name: string
}

export interface SalesItems {
  id: number
  bubble_id: string
  name: string
  description: string
  is_active: boolean
  price: string
  currency: string
  vat_percentage: string
  service_time: string
  commission_payment: string
  freelance_payment: string
  car_sizes: number[]
  service_category: null | any // Change 'any' to a more specific type if possible
  car_sizes_name: CarSize[]
}
