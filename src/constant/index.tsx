import { FilterOption } from '../interfaces'
import { StatusList } from '../pages/GroupProfile/interface'

export const constants = {
  apiEndpoints: {
    getLoginToken: 'getLoginToken',
    getUsersList: 'getUsersList',
    getBookings: 'getBookings',
    getCalendarBookings: 'getCalendarBookings',
    getLicenseAreasOld: 'getLicenseAreasOld',
    getLicenseAreas: 'getLicenseAreas',
    getLicenseAreasNames: 'getLicenseAreasNames',
    getLicenseCategories: 'getLicenseCategories',
    getOrganizations: 'getOrganizations',
    getLicenseAreaById: 'getLicenseAreaById',
    getServiceAreaById: 'getServiceAreaById',
    getUserById: 'getUserById',
    getReferredByUser: 'getReferredByUser',
    getReferredPendingByUser: 'getReferredPendingByUser',
    getReferredByUserName: 'getReferredByUserName',
    userReferral: 'userReferral',
    updateUser: 'updateUser',
    getLanguages: 'getLanguages',
    getUserGroups: 'getUserGroups',
    getGroupMembersById: 'getGroupMembersById',
    removeUserFromGroup: 'removeUserFromGroup',
    makeGroupAdmin: 'makeGroupAdmin',
    getGroupCars: 'getGroupCars',
    getGroupBookings: 'getGroupBookings',
    getGroupWithdrawalRewards: 'getGroupWithdrawalRewards',
    getGroupDepositRewards: 'getGroupDepositRewards',
    getUserGroupById: 'getUserGroupById',
    getUserGroupRewardAccount: 'getUserGroupRewardAccount',
    getGroupsOfUser: 'getGroupsOfUser',
    addUserToGroup: 'addUserToGroup',
    getFeedbacks: 'getFeedbacks',
    getFeedbackSummary: 'getFeedbackSummary',
    getMemberships: 'getMemberships',
    postMemberships: 'postMemberships',
    getMembershipsById: 'getMembershipsById',
    createMembershipProgram: 'createMembershipProgram',
    getMembershipProgramBySearch: 'getMembershipProgramBySearch',
    getProductById: 'getProductById',
    getAllUserGroups: 'getAllUserGroups',
    createProduct: 'createProduct',
    editProduct: 'editProduct',
    getServicesList: 'getServicesList',
    createService: 'createService',
    editService: 'editService',
    getServiceById: 'getServiceById',
    getServiceCategoryList: 'getServiceCategoryList',
    getCarSizesOption: 'getCarSizesOption',
    getServicesById: 'getServicesById',
    addUserGroupToMembership: 'addUserGroupToMembership',
    removeUserGroupFromMembership: 'removeUserGroupFromMembership',
    getUserGroupMembershipProgram: 'getUserGroupMembershipProgram',
    getCarDetail: 'getCarDetail',
    updateCarDetails: 'updateCarDetails',
    getBookingDetail: 'getBookingDetail',
    updateBookingDetails: 'updateBookingDetails',
    getServiceCategoryById: 'getServiceCategoryById',
    getServiceCategoryListByPage: 'getServiceCategoryListByPage',
    getServiceCategoryListBySearchAndPage: 'getServiceCategoryListBySearchAndPage',
    createServiceCategory: 'createServiceCategory',
    updateServiceCategory: 'updateServiceCategory',
    getServiceOrganization: 'getServiceOrganization',
    createServiceOrganization: 'createServiceOrganization',
    getServiceOrganizationById: 'getServiceOrganizationById',
    getServiceOrganizationBySearch: 'getServiceOrganizationBySearch',
    getLicenseCategory: 'getLicenseCategory',
    createLicenseCategory: 'getLicenseCategory',
    getLicenseCategoryById: 'getLicenseCategoryById',
    getLicenseCategoryListBySearchAndPage: 'getLicenseCategoryListBySearchAndPage',
    getServiceAreaNotification: 'getServiceAreaNotification',
    getServiceAreaNotificationById: 'getServiceAreaNotificationById',
    createServiceAreaNotification: 'createServiceAreaNotification',
    getMembershipsDiscount: 'getMembershipsDiscount',
    getAllDiscounts: 'getAllDiscounts',
    addMembershipDiscountInMembershipProgram: 'addMembershipDiscountInMembershipProgram',
    getMembershipDiscountById: 'getMembershipDiscountById',
    getMembershipProgramBySearchWithoutPage: 'getMembershipProgramBySearchWithoutPage',
    getServicesBySearch: 'getServicesBySearch',
    getSalesItemsBySearch: 'getSalesItemsBySearch',
    removeDiscount: 'removeDiscount',
    getCapacityContributionList: 'getCapacityContributionList',
    updateCapacityContribution: 'updateCapacityContribution',
    getBookingMessageHandler: 'getBookingMessageHandler',
    getCoupons: 'getCoupons',
    getCouponsById: 'getCouponsById',
    createCoupons: 'createCoupons',
    getServiceAreas: 'getServiceAreas',
    bundleDiscount: 'bundleDiscount',
    bundleDiscountByID: 'bundleDiscountByID',
    getCarWheelSetByCar: 'getCarWheelSetByCar',
    getCarWheel: 'getCarWheel',
    getBookingItemsByBookingId: 'getBookingItemsByBookingId',
    getBookingItemById: 'getBookingItemById',
    routePlannerBookings: 'routePlannerBookings',
    startRoutePlanner: 'startRoutePlanner',
    getCarWheelSetById: 'getCarWheelSetById',
    getContributorForRoutePlanner: 'getContributorForRoutePlanner',
    getBookingOverviewDetailsList: 'getBookingOverviewDetailsList',
    getOrderByBookingId: 'getOrderByBookingId',
    getOrderLinesByOrder: 'getOrderLinesByOrder',
    getOrderTransaction: 'getOrderTransaction',
    getOrderReceipt: 'getOrderReceipt',
    getOrderLineDetailDiscount: 'getOrderLineDetailDiscount',
    getOrderLineDetailNonDiscount: 'getOrderLineDetailNonDiscount',
    getOrderTransactionById: 'getOrderTransactionById',
    getRouteProblems: 'getRouteProblems',
    getRouteSolutionsById: 'getRouteSolutionsById',
    getRoutes: 'getRoutes',
    getRoutesById: 'getRoutesById',
    getAddress: 'getAddress',
    getSolutionById: 'getSolutionById',
    getSalesItems: 'getSalesItems',
    getSalesItemById: 'getSalesItemById',
    createSalesItem: 'createSalesItem',
    getDrivername: 'getDriverName'

  }
}

export const statusList: StatusList = {
  0: { label: 'Draft', color: 'info' },
  1: { label: 'Confirmed', color: 'primary' },
  2: { label: 'Assigned', color: 'primary' },
  3: { label: 'Cancelled', color: 'error' },
  4: { label: 'Completed', color: 'success' },
  5: { label: 'Unable to complete', color: 'warning' }
}
export const contributionStatusList: StatusList = {
  0: { label: 'Pending', color: 'info' },
  1: { label: 'Submitted', color: 'success' },
  2: { label: 'Wait list', color: 'primary' },
  3: { label: 'Reserved', color: 'error' },
  4: { label: 'Declined', color: 'error' },
  5: { label: 'Withdrawn', color: 'primary' },
  6: { label: 'Unassigned', color: 'warning' },
  7: { label: 'Assigned', color: 'warning' }
}
export const rewardStatusList: StatusList = {
  0: { label: 'Cancelled', color: 'error' },
  1: { label: 'Unable to complete', color: 'warning' },
  2: { label: 'Bad customer experience', color: 'warning' },
  3: { label: 'Referral bonus', color: 'success' },
  4: { label: 'Referral bonus - Pending', color: 'success' },
  5: { label: 'Signup bonus', color: 'success' },
  6: { label: 'General compensation', color: 'primary' }
}

export const orderStatusList = {
  0: { label: 'Initialized', color: 'error' },
  1: { label: 'On hold', color: 'warning' },
  2: { label: 'Declined', color: 'warning' },
  3: { label: 'Authorized', color: 'success' },
  4: { label: 'Unknown', color: 'success' },
  5: { label: 'Failed', color: 'success' },
  6: { label: 'Authorization voided', color: 'primary' },
  7: { label: 'Partially captured', color: 'primary' },
  8: { label: 'Captured', color: 'primary' },
  9: { label: 'Partially capture refunded', color: 'primary' },
  10: { label: 'Partially refunded', color: 'primary' },
  11: { label: 'Refunded', color: 'primary' }
}

export const categoryOptions: FilterOption[] = [
  {
    value: '7',
    label: 'Car wash'
  },
  {
    value: '8',
    label: 'Wheel change'
  },
  {
    value: '9',
    label: 'Wheel storage'
  }
]

export const statusOptions: FilterOption[] = [
  {
    label: 'Active',
    value: 'true'
  },
  {
    label: 'Inactive',
    value: 'false'
  }
]
export const contributionStatusOptions: FilterOption[] = [
  {
    label: 'Pending',
    value: 0
  },
  {
    label: 'Submitted',
    value: 1
  },
  {
    label: 'Wait list',
    value: 2
  },
  {
    label: 'Reserved',
    value: 3
  },
  {
    label: 'Declined',
    value: 4
  },
  {
    label: 'Withdrawn',
    value: 5
  },
  {
    label: 'Unassigned',
    value: 6
  },
  {
    label: 'Assigned',
    value: 7
  }
]
export const carSizeOptions: FilterOption[] = [
  {
    label: 8,
    value: 'Small'
  },
  {
    label: 9,
    value: 'Medium'
  },
  {
    label: 10,
    value: 'Large'
  },
  {
    label: 11,
    value: 'SUV'
  },
  {
    label: 11,
    value: 'Extra large'
  },
  {
    label: 11,
    value: 'Oversize'
  }
]

export const carSizeList = (() => {
  let list = {}
  for (let item = 0; item < carSizeOptions.length - 1; item++) {
    list = { ...list, [carSizeOptions[item].label]: carSizeOptions[item].value }
  }
  return list
})()

export const bookingItemsConstant = ['Not Started', 'Started', 'Completed', 'Unable To Complete', 'Cancelled']
export const orderConstant = ['Active', 'Cancelled', 'Invoiced']
export const paymentMethodConstant = ['Invoice', 'Dintero', 'Vipps', 'Stripe']
export const transactionStatusConstant = [
  'Initialized',
  'On Hold',
  'Authorized',
  'Unknown',
  'Failed',
  'Authorization voided',
  'Partially Captured',
  'Captured',
  'Partially Capture Refunded',
  'Partially Refunded',
  'Refunded'
]
