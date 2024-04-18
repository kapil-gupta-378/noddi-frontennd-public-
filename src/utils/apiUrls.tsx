import { apiUrls } from '../interfaces'

const apiVersion = '/v1/'
export const ApiEndPoints: apiUrls[] = [
  {
    name: 'getLoginToken',
    path: `${apiVersion}login-token/`
  },
  {
    name: 'getUsersList',
    path: `${apiVersion}users/?page_size=:page_size&search=:search&page=:page`
  },
  {
    name: 'getBookings',
    path: `${apiVersion}bookings/?search=:search&start_date=:start_date&end_date=:end_date&page=:page`
  },
  {
    name: 'getCalendarBookings',
    path: `${apiVersion}bookings/calendar_overview/?date=:date&user_group_id=:user_group_id&license_area_id=:license_area_id`
  },
  {
    name: 'getLicenseAreasOld',
    path: `${apiVersion}license-areas/`
  },
  {
    name: 'getLicenseAreas',
    path: `${apiVersion}license-areas/list`
  },
  {
    name: 'getLicenseAreasNames',
    path: `${apiVersion}license-areas/names`
  },
  {
    name: 'getLicenseCategories',
    path: `${apiVersion}license-areas/categories/`
  },
  {
    name: 'getOrganizations',
    path: `${apiVersion}organizations/`
  },
  {
    name: 'getLicenseAreaById',
    path: `${apiVersion}license-areas/id/:licenseAreaId/`
  },
  {
    name: 'getServiceAreaById',
    path: `${apiVersion}license-areas/id/:licenseAreaId/service-areas/id/:serviceAreaId/`
  },
  {
    name: 'getUserById',
    path: `${apiVersion}users/:userId`
  },
  {
    name: 'getReferredByUser',
    path: `${apiVersion}rewards/get_referral_bonus/:id/?page_size=:page_size&page=:page`
  },
  {
    name: 'getReferredPendingByUser',
    path: `${apiVersion}rewards/get_referral_pending_bonus/:id/?page_size=:page_size&page=:page`
  },
  {
    name: 'getReferredByUserName',
    path: `${apiVersion}rewards/referred_by/:id/`
  },
  {
    name: 'userReferral',
    path: `${apiVersion}users/referral/:id`
  },
  {
    name: 'updateUser',
    path: `${apiVersion}users/:userId`
  },
  {
    name: 'getLanguages',
    path: `${apiVersion}languages/`
  },
  {
    name: 'getUserGroups',
    path: `${apiVersion}user_groups/?page_size=:page_size&page=:page&search=:search`
  },
  {
    name: 'getAllUserGroups',
    path: `${apiVersion}user_groups/?search=:search`
  },
  {
    name: 'getGroupMembersById',
    path: `${apiVersion}user_groups/list_members/:groupId`
  },
  {
    name: 'getGroupWithdrawalRewards',
    path: `${apiVersion}rewards/withdrawal_rewards_by_rewards/:id/?page_size=:page_size&page=:page`
  },
  {
    name: 'getGroupDepositRewards',
    path: `${apiVersion}rewards/deposit_rewards_by_rewards/:id/?page_size=:page_size&page=:page`
  },
  {
    name: 'getUserGroupById',
    path: `${apiVersion}user_groups/:id`
  },
  {
    name: 'getUserGroupRewardAccount',
    path: `${apiVersion}rewards/user_group_rewards/:id/`
  },
  {
    name: 'removeUserFromGroup',
    path: `${apiVersion}user_groups/remove_user_from_group/`
  },
  {
    name: 'makeGroupAdmin',
    path: `${apiVersion}user_groups/change_member_permission/`
  },
  {
    name: 'getGroupCars',
    path: `${apiVersion}cars/get_user_group_cars/:groupId?page_size=:page_size&page=:page`
  },
  {
    name: 'addUserToGroup',
    path: `${apiVersion}user_groups/add_user_to_group/`
  },
  {
    name: 'getGroupBookings',
    path: `${apiVersion}bookings/get_user_group_bookings/:groupId?page_size=:page_size&page=:page`
  },
  {
    name: 'getBookingItemsByBookingId',
    path: `${apiVersion}booking_items/get_booking_items_by_booking/:bookingId`
  },
  {
    name: 'getBookingItemById',
    path: `${apiVersion}booking_items/:bookingItemId`
  },
  {
    name: 'getGroupsOfUser',
    path: `${apiVersion}user_groups/get_user_groups/:userId`
  },
  {
    name: 'getFeedbacks',
    path: `${apiVersion}service_feedbacks/?page_size=:page_size&page=:page&driver_name=:search&start_date=:start_date&end_date=:end_date&ratings=:ratings`
  },
  {
    name: 'getFeedbackSummary',
    path: `${apiVersion}service_feedbacks/stats/`
  },
  {
    name: 'getMemberships',
    path: `${apiVersion}memberships/?page_size=:page_size&page=:page`
  },
  {
    name: 'postMemberships',
    path: `${apiVersion}memberships/`
  },
  {
    name: 'getMembershipProgramBySearch',
    path: `${apiVersion}memberships/?page=:page&search=:query`
  },
  {
    name: 'getMembershipProgramBySearchWithoutPage',
    path: `${apiVersion}memberships/?search=:query`
  },
  {
    name: 'getMembershipsById',
    path: `${apiVersion}memberships/:id`
  },
  {
    name: 'getMembershipsDiscount',
    path: `${apiVersion}memberships/get_membership_discounts/:id`
  },
  {
    name: 'createMembershipProgram',
    path: `${apiVersion}memberships/`
  },
  {
    name: 'getProductsBySearch',
    path: `${apiVersion}products/?search=:query`
  },
  {
    name: 'getProductById',
    path: `${apiVersion}products/:id`
  },
  {
    name: 'createProduct',
    path: `${apiVersion}products/`
  },
  {
    name: 'editProduct',
    path: `${apiVersion}products/:id`
  },
  // {
  //   name: 'getServicesList',
  //   path: `${apiVersion}services/?page_size=:page_size&page=:page&is_active=:is_active&service_category=:service_category&search=:search`
  // },
  {
    name: 'getServicesBySearch',
    path: `${apiVersion}services/?search=:query`
  },
  {
    name: 'getServiceById',
    path: `${apiVersion}services/:id`
  },
  {
    name: 'createService',
    path: `${apiVersion}services/`
  },
  {
    name: 'editService',
    path: `${apiVersion}services/:id`
  },
  {
    name: 'getServiceCategoryList',
    path: `${apiVersion}service_categories/`
  },
  {
    name: 'getServiceCategoryListByPage',
    path: `${apiVersion}service_categories/?page_size=:page_size&page=:page`
  },
  {
    name: 'getServiceCategoryListBySearchAndPage',
    path: `${apiVersion}service_categories/?page=:page&search=:query`
  },
  {
    name: 'getServiceCategoryById',
    path: `${apiVersion}service_categories/:id`
  },
  {
    name: 'addUserGroupToMembership',
    path: `${apiVersion}memberships/add_user_group_to_membership/`
  },
  {
    name: 'removeUserGroupFromMembership',
    path: `${apiVersion}memberships/remove_user_group_from_membership/`
  },
  {
    name: 'getCarSizesOption',
    path: `${apiVersion}cars/car_size`
  },
  {
    name: 'getCarDetail',
    path: `${apiVersion}cars/:carId`
  },
  {
    name: 'updateCarDetails',
    path: `${apiVersion}cars/:carId`
  },
  {
    name: 'getCarWheelSetByCar',
    path: `${apiVersion}cars/get_wheel_set_by_car/:carId`
  },
  {
    name: 'getCarWheelSetById',
    path: `${apiVersion}cars/car_wheel_set/:carWheelSetId`
  },
  {
    name: 'getCarWheel',
    path: `${apiVersion}cars/car_wheels/:wheelId`
  },
  {
    name: 'getBookingDetail',
    path: `${apiVersion}bookings/:bookingId`
  },
  {
    name: 'updateBookingDetails',
    path: `${apiVersion}bookings/:bookingId`
  },
  {
    name: 'getServiceOrganization',
    path: `${apiVersion}service_organizations/?page_size=:page_size&page=:page`
  },
  {
    name: 'createServiceOrganization',
    path: `${apiVersion}service_organizations/`
  },
  {
    name: 'getServiceOrganizationById',
    path: `${apiVersion}service_organizations/:id`
  },
  {
    name: 'getServiceOrganizationBySearch',
    path: `${apiVersion}service_organizations/?page=:page&search=:query`
  },
  {
    name: 'getLicenseCategory',
    path: `${apiVersion}license_categories/?page_size=:page_size&page=:page`
  },
  {
    name: 'createLicenseCategory',
    path: `${apiVersion}license_categories/`
  },
  {
    name: 'getLicenseCategoryById',
    path: `${apiVersion}license_categories/:id`
  },
  {
    name: 'getLicenseCategoryListBySearchAndPage',
    path: `${apiVersion}license_categories/?page=:page&search=:query`
  },
  {
    name: 'getServiceAreaNotification',
    path: `${apiVersion}service_area_notification/?page_size=:page_size&page=:page&search=:query`
  },
  {
    name: 'createServiceAreaNotification',
    path: `${apiVersion}service_area_notification/`
  },
  {
    name: 'getServiceAreaNotificationById',
    path: `${apiVersion}service_area_notification/:id`
  },
  {
    name: 'getUserGroupMembershipProgram',
    path: `${apiVersion}memberships_program_user_group/:id?page_size=:page_size&page=:page`
  },
  {
    name: 'getAllDiscounts',
    path: `${apiVersion}memberships/discounts/?page_size=:page_size&search=:query`
  },
  {
    name: 'addMembershipDiscountInMembershipProgram',
    path: `${apiVersion}memberships/discounts/`
  },
  {
    name: 'getMembershipDiscountById',
    path: `${apiVersion}memberships/discount/:id`
  },
  {
    name: 'getCapacityContributionList',
    path: `${apiVersion}capacity_contributions/earlist_worker_available/?page_size=:page_size&page=:page&search=:search&start_date=:start_date&end_date=:end_date`
  },
  {
    name: 'updateCapacityContribution',
    path: `${apiVersion}capacity_contributions/:id`
  },
  {
    name: 'getBookingMessageHandler',
    path: `${apiVersion}booking_messages/:id`
  },
  {
    name: 'getCoupons',
    path: `${apiVersion}coupons/?page_size=:page_size&page=:page&search=:query`
  },
  {
    name: 'createCoupons',
    path: `${apiVersion}coupons/`
  },
  {
    name: 'getCouponsById',
    path: `${apiVersion}coupons/:id`
  },
  {
    name: 'getServiceAreas',
    path: `${apiVersion}service_areas/list?search=:query`
  },
  {
    name: 'bundleDiscountByID',
    path: `${apiVersion}bundle_discounts/:id`
  },
  {
    name: 'bundleDiscount',
    path: `${apiVersion}bundle_discounts/?page_size=:page_size&search=:query&page=:page`
  },
  {
    name: 'routePlannerBookings',
    path: `${apiVersion}bookings/get-bookings-for-route-planner/?date=:date&license_area=:license_area`
  },
  {
    name: 'startRoutePlanner',
    path: `${apiVersion}route-problems/start-route-planner/?date=:date&license_area=:license_area&is_capacity_planning=:is_capacity_planning`
  },
  {
    name: 'getContributorForRoutePlanner',
    path: `${apiVersion}capacity_contributions/get_contributor_for_route_planner/?date=:date&license_area=:license_area&page=:page&page_size:page_size`
  },
  {
    name: 'getBookingOverviewDetailsList',
    path: `${apiVersion}bookings/booking_calendar_details/?page_size=:page_size&page=:page&search=:search&date=:date&user_group_id=:user_group_id&license_area_id=:license_area_id&status=:status`
  },
  {
    name: 'getOrderByBookingId',
    path: `${apiVersion}orders/get_orders_by_booking/:bookingId`
  },
  {
    name: 'getOrderLinesByOrder',
    path: `${apiVersion}order_lines/get_order_lines_by_order/:orderId`
  },
  {
    name: 'getOrderTransaction',
    path: `${apiVersion}order-transactions/list/:orderId`
  },
  {
    name: 'getOrderReceipt',
    path: `${apiVersion}order_receipt/:bookingId`
  },
  {
    name: 'getOrderLineDetailDiscount',
    path: `${apiVersion}order_lines/discount/detail/:orderId`
  },
  {
    name: 'getOrderLineDetailNonDiscount',
    path: `${apiVersion}order_lines/non_discount/detail/:orderId`
  },
  {
    name: 'getOrderTransactionById',
    path: `${apiVersion}order-transactions/detail/:transactionId`
  },
  {
    name: 'getRouteProblems',
    path: `${apiVersion}route-problems/?date=:date&license_area_id=:licenseArea&page=:page&page_size=:pageSize`
  },
  {
    name: 'getRouteSolutionsById',
    path: `${apiVersion}route_solutions/:routeProblemId`
  },
  {
    name: 'getRoutes',
    path: `${apiVersion}routes/?page=:page&page_size=:page_size`
  },
  {
    name: 'getRoutesById',
    path: `${apiVersion}routes/:routeId/`
  },
  {
    name: 'getSolutionById',
    path: `${apiVersion}routes/routes_by_solution/:solutionId?page=:page&page_size=:page_size`
  },
  {
    name: 'getAddress',
    path: `${apiVersion}addresses/:id`
  },
  {
    name: 'getSalesItems',
    path: `${apiVersion}sales-items/?page_size=:page_size&page=:page&search=:search&is_active=:is_active&service_category=:service_category`
  },
  {
    name: 'createSalesItem',
    path: `${apiVersion}sales-items/`
  },
  {
    name: 'getSalesItemById',
    path: `${apiVersion}sales-items/:id`
  },
  {
    name: 'getDriverName',
    path: `${apiVersion}service_feedbacks/drivers_name/?page=:page&page_size=:page_size&search=:search`
  }
]
