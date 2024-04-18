export interface LicenseAreasProps {
  id: number
  name: string
}

export interface BookingProps {
  id: number
  slug: string
  user_group_name: string
  start_time: string
  end_time: string
  latitude: number
  longitude: number
}
export interface ContributorProps {
  id: number
  start_address: string
  end_address: string
  start_time: string
  end_time: string
  performance_factor: string
  priority: number
  service_worker:string
}
