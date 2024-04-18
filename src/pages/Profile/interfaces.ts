export interface Booking {
    Name: string
    Date: string
    Status: number
    bookingId: string
  }
 export interface ObjectWithProps {
    updateUserProfile: () => void
    bookings?: Booking[]
  }

 export  interface InputRefType {
    last_name: HTMLInputElement | null
    // Add other properties if needed
  }

  export interface ReferredMemberData {
    id: number
    user: {
      user_id: number
      user_name: string
    }
    booking: {
      booking_id: number
      booking_status: number
      booking_created_at: string
    }
    reward_account: {
      id: number
      bubble_id: string
      points: number
    }
    deleted: null
    deleted_by_cascade: boolean
    uid: string
    created_at: string
    updated_at: string
    bubble_id: string
    points: string
    reason: number
    public_description: string
    internal_description: string
    created_by: null
    updated_by: null
  }
  
  export interface ReferralTabData {
    referral_code?: string
    user_id?: number
    email?: string
    first_name?: string
    last_name?: string
    detail?: string
    referral: ReferredMemberData[]
  }