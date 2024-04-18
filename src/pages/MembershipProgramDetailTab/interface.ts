interface MembershipDiscount {
    id: number;
    name: string;
}

interface UserGroup {
    id: number;
    name: string;
}

interface MembershipResult {
    id: number;
    bubble_id: string;
    benefits_bubble_names: string[];
    name: string;
    auth_code: string;
    image: string | null;
    membership_discount: number[];
    membership_discount_name: MembershipDiscount[];
    user_groups: UserGroup[];
}

export interface MembershipResponse {
    next: null | string;
    previous: null | string;
    count: number;
    page: number;
    page_size: number;
    results: MembershipResult[];
}
