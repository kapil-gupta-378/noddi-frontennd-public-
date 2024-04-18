import React from 'react'
import Dashboard from './pages/Dashboard/Dashboard'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import CreateServiceArea from './pages/ServiceArea/Create/CreateServiceArea'
import Profile from './pages/Profile'
import CreateLicenseArea from './pages/LicenseArea/Create/CreateLicenseArea'
import LicenseAreas from './pages/LicenseArea/LicenseAreas'
import EditLicenseArea from './pages/LicenseArea/Edit/EditLicenseArea'
import EditServiceArea from './pages/ServiceArea/Edit/EditServiceArea'
import Users from './pages/Users/Users'
import SalesItemsCreate from './pages/SalesItems/SalesItems-create'
import UserGroups from './pages/UserGroups/UserGroup'
import GroupProfile from './pages/GroupProfile'
import Feedbacks from './pages/Feedbacks/index'
import Memberships from './pages/Membership'
import MembershipInfo from './pages/Membership/MembershipInfo'
import CarDetail from './pages/CarDetail'
import BookingDetail from './pages/BookingDetails'
import BookingCalendar from './pages/BookingCalendar'
import ServiceCategory from './pages/ServiceCategory'
import ServiceCategoryEditAndUpdate from './pages/ServiceCategory/ServiceCategoryEditAndUpdate'
import ServiceOrganization from './pages/ServiceOrganization'
import LicenseCategory from './pages/LicenseCategory'
import LicenseCategoryEditAndUpdate from './pages/LicenseCategory/LicenseCategoryEditAndUpdate'
import ServiceOrganizationCreateAndUpdate from './pages/ServiceOrganization/ServiceOrganizationCreateAndUpdate'
import ServiceAreaNotification from './pages/ServiceAreaNotifications'
import ServiceAreaNotificationCreateAndUpdate from './pages/ServiceAreaNotifications/ServiceAreaNotificationCreateAndUpdate'
import CapacityContribution from './pages/CapacityContribution'
import MembershipDiscount from './pages/MembershipDiscount'
import MembershipDiscountCreateAndUpdate from './pages/MembershipDiscount/MembershipDiscountCreateAndUpdate'
import CapacityContributionDetails from './pages/CapacityContribution/Details'
import BookingMessageInfo from './pages/BookingDetails/BookingMessageInfo'
import Coupons from './pages/Coupons'
import CouponsCreateAndUpdate from './pages/Coupons/CouponsCreateAndUpdate'
import RoutePlanning from './pages/RoutePlanning'
import Discounts from './pages/MembershipDiscount'
import BundleDiscount from './pages/BundleDiscount'
import BundleDiscountCreateAndUpdate from './pages/BundleDiscount/BundleDiscountCreateAndUpdate'
import WheelSetDetail from './pages/CarDetail/WheelSetDetail'
import CarWheel from './pages/CarDetail/CarWheel'
import BookingItemDetails from './pages/BookingDetails/BookingItemDetails'
import OrderDetail from './pages/BookingDetails/OrderDetail'
import BookingTransaction from './pages/BookingDetails/BookingTransaction'
import OrderReceiptDetails from './pages/BookingDetails/OrderReceiptDetails'
import Routes from './pages/Routes'
import RouteProblemDetails from './pages/Routes/RouteProblemDetails'
// import RoutesList from './pages/Routes/RoutesList'
import AddressDetail from './pages/Address'
import RouteSolutionDetails from './pages/Routes/RouteSolutionDetails'
import RouteDetail from './pages/Routes/RouteDetail'
import SalesItems from './pages/SalesItems'
export const AppRoutes = {
  // pages
  CreateLicenseArea: {
    element: <CreateLicenseArea />,
    paths: ['/license-areas/create']
  },
  EditLicenseArea: {
    element: <EditLicenseArea />,
    paths: ['/license-areas/:licenseAreaId']
  },
  LicenseAreas: {
    element: <LicenseAreas />,
    paths: ['/license-areas']
  },
  CreateServiceArea: {
    element: <CreateServiceArea />,
    paths: ['/license-areas/:licenseAreaId/service-areas/create']
  },
  EditServiceArea: {
    element: <EditServiceArea />,
    paths: ['/license-areas/:licenseAreaId/service-areas/:serviceAreaId']
  },
  CatchAll: {
    element: <ErrorPage />,
    paths: ['*']
  },
  Dashboard: {
    element: <Dashboard />,
    paths: ['/', '/:date']
  },
  ErrorPage: {
    element: <ErrorPage />,
    paths: ['/error']
  },
  Login: {
    element: <Login />,
    path: '/login'
  },
  Profile: {
    element: <Profile />,
    paths: ['/users/:id/:tab']
  },
  Users: {
    element: <Users />,
    paths: ['/users']
  },
  SalesItems: {
    element: <SalesItems />,
    paths: ['/sales-items']
  },

  SalesItemsCreate: {
    element: <SalesItemsCreate />,
    paths: ['/SalesItems/create']
  },
  EditSalesItems: {
    element: <SalesItemsCreate />,
    paths: ['/SalesItems/edit/:id']
  },

  UserGroups: {
    element: <UserGroups />,
    paths: ['/user-groups']
  },
  GroupProfile: {
    element: <GroupProfile />,
    paths: ['/user-groups/:id/:tab']
  },
  CarDetail: {
    element: <CarDetail />,
    paths: ['/user-groups/:id/cars/:carId/:tab']
  },
  CarWheelSetDetail: {
    element: <WheelSetDetail />,
    paths: ['/user-groups/:id/cars/:carId/wheel-sets/:wheelSetId']
  },
  CarWheelDetail: {
    element: <CarWheel />,
    paths: ['/user-groups/:id/cars/:carId/wheel-sets/:wheelSetId/wheel/:wheelId']
  },
  BookingDetails: {
    element: <BookingDetail />,
    paths: ['/user-groups/:id/bookings/:bookingId/:tab']
  },
  BookingItemDetails: {
    element: <BookingItemDetails />,
    paths: ['/user-groups/:id/bookings/:bookingId/items/:bookingItemId']
  },
  OrderDetails: {
    element: <OrderDetail />,
    paths: ['/user-groups/:id/bookings/:bookingId/order/:orderId/:type']
  },
  BookingTransactionDetails: {
    element: <BookingTransaction />,
    paths: ['/user-groups/:id/bookings/:bookingId/transaction/:transactionId']
  },
  BookingOrderReceiptDetails: {
    element: <OrderReceiptDetails />,
    paths: ['/user-groups/:id/bookings/:bookingId/order-receipt/:orderReceiptId']
  },
  BookingDetailsDirect: {
    element: <BookingDetail />,
    paths: ['/bookings/:bookingId']
  },
  ServiceFeedbacks: {
    element: <Feedbacks />,
    paths: ['/service-feedbacks']
  },
  MembershipPrograms: {
    element: <Memberships />,
    paths: ['/membership/programs']
  },
  MembershipProgramsInfo: {
    element: <MembershipInfo action='edit' />,
    paths: ['/membership/programs/:id']
  },
  MembershipProgramsInfoCreate: {
    element: <MembershipInfo action='create' />,
    paths: ['/membership/programs/create/']
  },
  BookingCalendar: {
    element: <BookingCalendar />,
    paths: ['/calendar-overview']
  },
  BookingCalendarDetail: {
    element: <BookingCalendar />,
    paths: ['/calendar-overview/detail/:id']
  },
  ServiceCategory: {
    element: <ServiceCategory />,
    paths: ['/service-category']
  },

  ServiceCategoryCreate: {
    element: <ServiceCategoryEditAndUpdate action='edit' />,
    paths: ['/service-category/:id']
  },

  ServiceCategoryUpdate: {
    element: <ServiceCategoryEditAndUpdate action='create' />,
    paths: ['/service-category-create/']
  },
  ServiceOrganization: {
    element: <ServiceOrganization />,
    paths: ['/service-organization/']
  },
  ServiceOrganizationCreate: {
    element: <ServiceOrganizationCreateAndUpdate action='edit' />,
    paths: ['/service-organization/:id']
  },
  ServiceOrganizationUpdate: {
    element: <ServiceOrganizationCreateAndUpdate action='create' />,
    paths: ['/service-organization-create/']
  },

  LicenseCategory: {
    element: <LicenseCategory />,
    paths: ['/license-category/']
  },

  LicenseCategoryCreate: {
    element: <LicenseCategoryEditAndUpdate action='edit' />,
    paths: ['/license-category/:id']
  },

  LicenseCategoryUpdate: {
    element: <LicenseCategoryEditAndUpdate action='create' />,
    paths: ['/license-category-create/']
  },
  ServiceAreaNotifications: {
    element: <ServiceAreaNotification />,
    paths: ['/service-area-notifications/']
  },
  ServiceAreaNotificationsById: {
    element: <ServiceAreaNotificationCreateAndUpdate action='edit' />,
    paths: ['/service-area-notifications/:id']
  },
  ServiceAreaNotificationsCreate: {
    element: <ServiceAreaNotificationCreateAndUpdate action='create' />,
    paths: ['/service-area-notifications-create/']
  },
  CapacityContribution: {
    element: <CapacityContribution />,
    paths: ['/capacity-contribution/']
  },
  CapacityContributionDetails: {
    element: <CapacityContributionDetails />,
    paths: ['/capacity-contribution/:id']
  },
  MembershipDiscount: {
    element: <MembershipDiscount />,
    paths: ['/membership-discount/']
  },
  MembershipDiscountById: {
    element: <MembershipDiscountCreateAndUpdate action='edit' />,
    paths: ['/membership/discounts/:id']
  },
  MembershipDiscountCreate: {
    element: <MembershipDiscountCreateAndUpdate action='create' />,
    paths: ['/membership/discount/create']
  },
  Discounts: {
    element: <Discounts />,
    paths: ['/membership/discounts']
  },
  BookingMessageDetail: {
    element: <BookingMessageInfo />,
    paths: ['/user-groups/:id/bookings/:bookingId/message/:messageId']
  },
  Coupons: {
    element: <Coupons />,
    paths: ['/coupons']
  },
  CouponsById: {
    element: <CouponsCreateAndUpdate action='edit' />,
    paths: ['/coupons/:id']
  },
  CouponsCreate: {
    element: <CouponsCreateAndUpdate action='create' />,
    paths: ['/coupons-create/']
  },
  RoutePlanning: {
    element: <RoutePlanning />,
    paths: ['/route-planning/']
  },
  Routes: {
    element: <Routes />,
    paths: ['/routes-problem']
  },
  RouteProblemDetails: {
    element: <RouteProblemDetails />,
    paths: ['/route-problems/:problemId']
  },

  RouteSolutionDetails: {
    element: <RouteSolutionDetails />,
    paths: ['/route-problems/:problemId/solutions/:solutionId']
  },

  RouteDetails: {
    element: <RouteDetail />,
    paths: ['/route-problems/:problemId/solutions/:solutionId/route/:routeId']
  },

  BundleDiscount: {
    element: <BundleDiscount />,
    paths: ['/bundle-discounts/']
  },
  BundleDiscountUpdate: {
    element: <BundleDiscountCreateAndUpdate action='edit' />,
    paths: ['/bundle-discounts/:id']
  },
  BundleDiscountCreate: {
    element: <BundleDiscountCreateAndUpdate action='create' />,
    paths: ['/bundle-discount-create/']
  },
  // RouteList: {
  //   element: <RoutesList />,
  //   paths: ['/routes']
  // },

  Address: {
    element: <AddressDetail />,
    paths: ['/address/:id']
  },



}
