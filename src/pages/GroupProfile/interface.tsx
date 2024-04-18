import { SeverityPillColor } from '../../components/severity-pill'
import { Account as Account, BookingInterface, DepositRewards, GroupMember, WithdrawalRewards, car } from '../../interfaces'

export interface CarsTabProps {
  cars: car[]
  isLoading: boolean
  id?: number
}
export interface BookingTabProps {
  bookings: BookingInterface[]
  isLoading: boolean
}

export interface MembersTabProps {
  members: GroupMember[]
  isLoading: boolean
  refetchDataHandler: () => void
  groupId: string
}

export interface AllTabs {
  [key: string]: React.ReactNode
}

export type status = {
  label: string
  color: SeverityPillColor
}
export interface StatusList {
  [key: string]: status
}

export interface RewardAccountData {
  account?: Account
  withdrawalRewards?: WithdrawalRewards[]
  depositRewards?: DepositRewards[]
}
