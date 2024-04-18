import type { FC, ReactNode } from 'react'
import PropTypes from 'prop-types'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles/createTheme'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

import { SideNav } from './side-nav'
import { TopNav } from './top-nav'
import { useMobileNav } from './use-mobile-nav'
import { Outlet } from 'react-router-dom'
import { NavColor } from '../../types/settings'
import { MobileNav } from '../mobile-nav'

const SIDE_NAV_WIDTH = 280

const VerticalLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}))

const VerticalLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
})

interface VerticalLayoutProps {
  children?: ReactNode
  navColor?: NavColor
  sections?: []
}

export const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
  const { children, sections, navColor } = props
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const mobileNav = useMobileNav()
  return (
    <>
      <TopNav onMobileNavOpen={mobileNav.handleOpen} />
      {lgUp && <SideNav color={navColor} sections={sections} />}
      {!lgUp && <MobileNav color={navColor} onClose={mobileNav.handleClose} open={mobileNav.open} sections={sections} />}
      <VerticalLayoutRoot>
        <VerticalLayoutContainer>
          <Box
            component='main'
            sx={{
              flexGrow: 1,
              py: 8
            }}
          >
            <Outlet />
          </Box>
        </VerticalLayoutContainer>
      </VerticalLayoutRoot>
    </>
  )
}

VerticalLayout.propTypes = {
  children: PropTypes.node,
  navColor: PropTypes.oneOf<NavColor>(['blend-in', 'discrete', 'evident']),
  sections: PropTypes.array
}
