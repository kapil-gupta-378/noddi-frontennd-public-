import React from 'react'
import type { FC } from 'react'
import { useMemo } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import NoddiLogo from '../../assets/images/noddi.png'
import { SideNavSection } from './side-nav-section'
import { Scrollbar } from '../Scrollbar'
import { NavColor } from '../../types/settings'
import { Image } from 'react-bootstrap'
import { NavRoutes } from './nav-routes'
import { useLocation } from 'react-router-dom'

const SIDE_NAV_WIDTH = 280

const useCssVars = (color: NavColor): Record<string, string> => {
  const theme = useTheme()

  return useMemo((): Record<string, string> => {
    switch (color) {
      case 'blend-in':
        if (theme.palette.mode === 'dark') {
          return {
            '--nav-bg': theme.palette.background.default,
            '--nav-color': theme.palette.neutral[100],
            '--nav-border-color': theme.palette.neutral[700],
            '--nav-logo-border': theme.palette.neutral[700],
            '--nav-section-title-color': theme.palette.neutral[400],
            '--nav-item-color': theme.palette.neutral[400],
            '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
            '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
            '--nav-item-active-color': theme.palette.text.primary,
            '--nav-item-disabled-color': theme.palette.neutral[600],
            '--nav-item-icon-color': theme.palette.neutral[500],
            '--nav-item-icon-active-color': theme.palette.primary.main,
            '--nav-item-icon-disabled-color': theme.palette.neutral[700],
            '--nav-item-chevron-color': theme.palette.neutral[700],
            '--nav-scrollbar-color': theme.palette.neutral[400]
          }
        } else {
          return {
            '--nav-bg': theme.palette.background.default,
            '--nav-color': theme.palette.text.primary,
            '--nav-border-color': theme.palette.neutral[100],
            '--nav-logo-border': theme.palette.neutral[100],
            '--nav-section-title-color': theme.palette.neutral[400],
            '--nav-item-color': theme.palette.text.secondary,
            '--nav-item-hover-bg': theme.palette.action.hover,
            '--nav-item-active-bg': theme.palette.action.selected,
            '--nav-item-active-color': theme.palette.text.primary,
            '--nav-item-disabled-color': theme.palette.neutral[400],
            '--nav-item-icon-color': theme.palette.neutral[400],
            '--nav-item-icon-active-color': theme.palette.primary.main,
            '--nav-item-icon-disabled-color': theme.palette.neutral[400],
            '--nav-item-chevron-color': theme.palette.neutral[400],
            '--nav-scrollbar-color': theme.palette.neutral[900]
          }
        }

      case 'discrete':
        if (theme.palette.mode === 'dark') {
          return {
            '--nav-bg': theme.palette.neutral[900],
            '--nav-color': theme.palette.neutral[100],
            '--nav-border-color': theme.palette.neutral[700],
            '--nav-logo-border': theme.palette.neutral[700],
            '--nav-section-title-color': theme.palette.neutral[400],
            '--nav-item-color': theme.palette.neutral[400],
            '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
            '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
            '--nav-item-active-color': theme.palette.text.primary,
            '--nav-item-disabled-color': theme.palette.neutral[600],
            '--nav-item-icon-color': theme.palette.neutral[500],
            '--nav-item-icon-active-color': theme.palette.primary.main,
            '--nav-item-icon-disabled-color': theme.palette.neutral[700],
            '--nav-item-chevron-color': theme.palette.neutral[700],
            '--nav-scrollbar-color': theme.palette.neutral[400]
          }
        } else {
          return {
            '--nav-bg': theme.palette.neutral[50],
            '--nav-color': theme.palette.text.primary,
            '--nav-border-color': theme.palette.divider,
            '--nav-logo-border': theme.palette.neutral[200],
            '--nav-section-title-color': theme.palette.neutral[500],
            '--nav-item-color': theme.palette.neutral[500],
            '--nav-item-hover-bg': theme.palette.action.hover,
            '--nav-item-active-bg': theme.palette.action.selected,
            '--nav-item-active-color': theme.palette.text.primary,
            '--nav-item-disabled-color': theme.palette.neutral[400],
            '--nav-item-icon-color': theme.palette.neutral[400],
            '--nav-item-icon-active-color': theme.palette.primary.main,
            '--nav-item-icon-disabled-color': theme.palette.neutral[400],
            '--nav-item-chevron-color': theme.palette.neutral[400],
            '--nav-scrollbar-color': theme.palette.neutral[900]
          }
        }

      case 'evident':
        if (theme.palette.mode === 'dark') {
          return {
            '--nav-bg': theme.palette.neutral[800],
            '--nav-color': theme.palette.common.white,
            '--nav-border-color': 'transparent',
            '--nav-logo-border': theme.palette.neutral[700],
            '--nav-section-title-color': theme.palette.neutral[400],
            '--nav-item-color': theme.palette.neutral[400],
            '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
            '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
            '--nav-item-active-color': theme.palette.common.white,
            '--nav-item-disabled-color': theme.palette.neutral[500],
            '--nav-item-icon-color': theme.palette.neutral[400],
            '--nav-item-icon-active-color': theme.palette.primary.main,
            '--nav-item-icon-disabled-color': theme.palette.neutral[500],
            '--nav-item-chevron-color': theme.palette.neutral[600],
            '--nav-scrollbar-color': theme.palette.neutral[400]
          }
        } else {
          return {
            '--nav-bg': theme.palette.neutral[800],
            '--nav-color': theme.palette.common.white,
            '--nav-border-color': 'transparent',
            '--nav-logo-border': theme.palette.neutral[700],
            '--nav-section-title-color': theme.palette.neutral[400],
            '--nav-item-color': theme.palette.neutral[400],
            '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
            '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
            '--nav-item-active-color': theme.palette.common.white,
            '--nav-item-disabled-color': theme.palette.neutral[500],
            '--nav-item-icon-color': theme.palette.neutral[400],
            '--nav-item-icon-active-color': theme.palette.primary.main,
            '--nav-item-icon-disabled-color': theme.palette.neutral[500],
            '--nav-item-chevron-color': theme.palette.neutral[600],
            '--nav-scrollbar-color': theme.palette.neutral[400]
          }
        }

      default:
        return {}
    }
  }, [theme, color])
}

interface SideNavProps {
  color?: NavColor
  sections?: []
}

export const SideNav: FC<SideNavProps> = (props) => {
  const { color = 'evident', sections = [] } = props
  const location = useLocation()
  const pathname = location.pathname
  const cssVars = useCssVars(color)

  return (
    <Drawer
      anchor='left'
      open
      PaperProps={{
        sx: {
          ...cssVars,
          backgroundColor: 'var(--nav-bg)',
          borderRightColor: 'var(--nav-border-color)',
          borderRightStyle: 'solid',
          borderRightWidth: 1,
          color: 'var(--nav-color)',
          width: SIDE_NAV_WIDTH
        }
      }}
      variant='permanent'
    >
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%'
          },
          '& .simplebar-scrollbar:before': {
            background: 'var(--nav-scrollbar-color)'
          }
        }}
      >
        <Stack sx={{ height: '100%' }}>
          <Stack alignItems='center' direction='row' spacing={2} sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                p: '4px',
                width: '100%'
              }}
            >
              <Image src={NoddiLogo} alt={'Noddi'} width={'75'} />
            </Box>
          </Stack>
          <Stack
            component='nav'
            spacing={2}
            sx={{
              flexGrow: 1,
              px: 2
            }}
          >
            {NavRoutes.sort((a, b) => {
              const titleA = a?.items[0]?.title.toUpperCase()
              const titleB = b?.items[0]?.title.toUpperCase()

              if ((titleA as string) < (titleB as string)) {
                return -1
              }
              if ((titleA as string) > (titleB as string)) {
                return 1
              }
              return 0
            }).map((section, index) => (
              <SideNavSection items={section?.items} key={index} pathname={pathname} subheader={section?.subheader} />
            ))}
          </Stack>
        </Stack>
      </Scrollbar>
    </Drawer>
  )
}

SideNav.propTypes = {
  color: PropTypes.oneOf<NavColor>(['blend-in', 'discrete', 'evident']),
  sections: PropTypes.array
}
