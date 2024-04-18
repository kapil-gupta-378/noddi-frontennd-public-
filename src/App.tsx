// Remove if react-quill is not used
import 'react-quill/dist/quill.snow.css'
// Remove if simplebar is not used
import 'simplebar-react/dist/simplebar.min.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppRoutes } from './appRoutes'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from './theme'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Toaster } from 'react-hot-toast'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from './pages/ErrorPage'
import { Stack } from '@mui/system'
function App() {
  const MultiplePathsRoute = ({ appRoute }) => appRoute.paths.map((path) => <Route key={path} path={path} element={appRoute.element} />)
  const theme = createTheme({
    colorPreset: 'indigo',
    contrast: 'normal',
    direction: 'ltr',
    isCustom: false,
    isInitialized: false,
    layout: 'vertical',
    navColor: 'evident',
    openDrawer: false,
    paletteMode: 'light',
    responsiveFontSizes: true,
    stretch: false
  })
  return (
    <ErrorBoundary
      fallback={
        <Stack height={'100vh'} alignItems={'center'} justifyContent={'center'}>
          <ErrorPage />
        </Stack>
      }
    >
      <ThemeProvider theme={theme}>
        <Toaster position='top-right' reverseOrder={false} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <HelmetProvider>
            <Routes>
              <Route path={AppRoutes.Login.path} element={AppRoutes.Login.element} />
              <Route element={<Layout />}>
                {/* Private routes */}
                <Route element={<PrivateRoute />}>
                  {MultiplePathsRoute({ appRoute: AppRoutes.CreateLicenseArea })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.EditLicenseArea })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.LicenseAreas })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.CreateServiceArea })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.EditServiceArea })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.Dashboard })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.Profile })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.ErrorPage })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.Users })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.CatchAll })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.SalesItemsCreate })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.EditSalesItems })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.UserGroups })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.GroupProfile })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.CarDetail })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.CarWheelSetDetail })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.CarWheelDetail })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.ServiceFeedbacks })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.MembershipPrograms })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.MembershipProgramsInfo })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.MembershipProgramsInfoCreate })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.BookingDetails })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.BookingItemDetails })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.OrderDetails })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.BookingDetailsDirect })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.BookingCalendar })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.BookingCalendarDetail })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.ServiceCategory })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.ServiceCategoryCreate })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.ServiceCategoryUpdate })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.ServiceOrganization })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.ServiceOrganizationCreate })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.ServiceOrganizationUpdate })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.LicenseCategory })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.LicenseCategoryCreate })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.LicenseCategoryUpdate })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.ServiceAreaNotifications })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.ServiceAreaNotificationsById })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.ServiceAreaNotificationsCreate })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.CapacityContribution })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.CapacityContributionDetails })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.MembershipDiscount })}
                  {/* {MultiplePathsRoute({ appRoute: AppRoutes.MembershipDiscount })} */}
                  {MultiplePathsRoute({ appRoute: AppRoutes.MembershipDiscountById })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.MembershipDiscountCreate })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.BookingMessageDetail })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.Coupons })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.CouponsById })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.CouponsCreate })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.RoutePlanning })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.Routes })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.Discounts })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.BundleDiscount })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.BundleDiscountCreate })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.BundleDiscountUpdate })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.BookingTransactionDetails })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.BookingOrderReceiptDetails })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.RouteProblemDetails })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.RouteSolutionDetails })}
                  {MultiplePathsRoute({ appRoute: AppRoutes.RouteDetails })}
                  {/* {MultiplePathsRoute({ appRoute: AppRoutes.RouteList })} */}
                  {MultiplePathsRoute({ appRoute: AppRoutes.SalesItems })}
                </Route>
              </Route>
            </Routes>
          </HelmetProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
