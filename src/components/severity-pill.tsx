import type { FC, ReactNode } from 'react'
import PropTypes from 'prop-types'
import type { SxProps } from '@mui/system/styleFunctionSx'
import type { Theme } from '@mui/material/styles/createTheme'
import { styled } from '@mui/material/styles'

export type SeverityPillColor = 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success' | 'blue' | 'indigo' | 'pink'

interface SeverityPillProps {
  children?: ReactNode
  color?: SeverityPillColor
  style?: object
  sx?: SxProps<Theme>
  hover?: boolean
  active?: boolean
}

interface SeverityPillRootProps {
  ownerState: {
    color: SeverityPillColor
  }
  hover?: boolean
  active?: boolean
}

const SeverityPillRoot = styled('span')<SeverityPillRootProps>(({ theme, ownerState, hover, active }) => {
  const backgroundColor = active ? theme.palette[ownerState.color].contrastText : theme.palette[ownerState.color].alpha12
  const color = theme.palette.mode === 'dark' ? theme.palette[ownerState.color].main : theme.palette[ownerState.color].dark

  return {
    alignItems: 'center',
    backgroundColor,
    borderRadius: 12,
    color,
    cursor: 'default',
    display: 'inline-flex',
    flexGrow: 0,
    flexShrink: 0,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 2,
    fontWeight: 600,
    justifyContent: 'center',
    letterSpacing: 0.5,
    minWidth: 20,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    boxShadow: active ? '0 4px 8px rgba(0, 0, 0, 0.3)' : hover ? '0 2px 5px rgba(0, 0, 0, 0.2)' : 'none',
    transition: hover ? 'transform 0.3s, box-shadow 0.3s' : 'none',
    transform: active ? 'translateY(-2px)' : 'translateY(0)',

    '&:hover': hover
      ? {
          backgroundColor: theme.palette[ownerState.color].contrastText,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          transform: 'translateY(-2px)'
        }
      : null
  }
})

export const SeverityPill: FC<SeverityPillProps> = (props) => {
  const { color = 'primary', children, ...other } = props

  const ownerState = { color }

  return (
    <SeverityPillRoot ownerState={ownerState} {...other}>
      {children}
    </SeverityPillRoot>
  )
}

SeverityPill.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'warning', 'success'])
}
