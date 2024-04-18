interface Location {
  lat: number
  long: number
}

interface TimeWindow {
  start: string
  end: string
}

interface Customer {
  id: string
  location: Location
  demand: number[]
  time_window: TimeWindow
  service_duration: number
}

interface LicenseArea {
  id: number
  name: string
}

// export interface RouteProblemsProps {
//   id: number
//   date: string
//   customers_json: Customer
//   license_area: LicenseArea
//   type: string
//   created_at: string
// }

interface APICommonData {
  count: number
  page: number
  page_size: number
}

export interface RouteProblemsProps extends APICommonData {
  results: {
    id: number
    date: string
    customers_json: Customer
    license_area: LicenseArea
    type: string
    created_at: string
  }[]
}

export interface RouteSolutionResults {
  id: number
  is_selected: boolean
  problem: number
  summary: {
    id: number
    is_valid: true
    total_distance: number
    total_time: number
    total_cost: number
  }
  routes: number
}

export interface RouteSolution extends APICommonData {
  results: RouteSolutionResults[]
}

export interface RouteItem {
  id: number
  deleted: null | string
  deleted_by_cascade: boolean
  uid: string
  created_at: string
  updated_at: string
  bubble_id: string
  index: number
  estimated_arrival: string
  estimated_service_start: string
  estimated_departure: string
  estimated_waiting_time: string
  communicated_arrival_start: null | string
  communicated_arrival_end: null | string
  started_at: null | string
  completed_at: null | string
  created_by: null | string
  updated_by: null | string
  unable_to_complete: null | string
  booking: null | string
  route: number
  capacity_contribution: number
}

interface Route {
  id: number
  bubble_id: string
  started_at: null | string
  completed_at: null | string
  solution: number
  summary: {
    id: number
    is_valid: boolean
    total_distance: number
    total_time: number
    total_cost: number
  }
  capacity_contribution: number
  service_worker_name: string
  first_route_items: RouteItem[]
  last_route_items: RouteItem[]
}

export interface RouteProps extends APICommonData {
  results: Route[]
}

interface Summary {
  id: number
  is_valid: boolean
  total_distance: number
  total_time: number
  total_cost: number
}

export interface SingleRouteSolutionData {
  id: number
  bubble_id: string
  started_at: string | null
  completed_at: string | null
  solution: number
  summary: Summary
  capacity_contribution: number
  service_worker_name: string
  first_route_items: RouteItem[]
  last_route_items: RouteItem[]
}

export interface SingleRouteSolutionProps extends APICommonData {
  results: SingleRouteSolutionData[]
}
