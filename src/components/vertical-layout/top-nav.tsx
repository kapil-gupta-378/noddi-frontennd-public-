import { FC, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01'
import { alpha } from '@mui/system/colorManipulator'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles/createTheme'
import EnvContext from '../../contexts/EnvProvider'
import { Switch, Typography } from '@mui/material'
import { AccountButton } from './AccountButton/account-button'

const TOP_NAV_HEIGHT = 64
const SIDE_NAV_WIDTH = 280

interface TopNavProps {
  onMobileNavOpen?: () => void
}

export const TopNav: FC<TopNavProps> = (props) => {
  const { onMobileNavOpen, ...other } = props
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const { changeEnv, envIsProd } = useContext(EnvContext)
  const [envLabel, setEnvLabel] = useState(envIsProd() ? 'PROD' : 'TEST')
  return (
    <Box
      component='header'
      sx={{
        backdropFilter: 'blur(6px)',
        backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
        position: 'sticky',
        left: {
          lg: `${SIDE_NAV_WIDTH}px`
        },
        top: 0,
        width: {
          lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
        },
        zIndex: (theme) => theme.zIndex.appBar
      }}
      {...other}
    >
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 2
        }}
      >
        <Stack alignItems='center' direction='row' spacing={2}>
          {!lgUp && (
            <IconButton onClick={onMobileNavOpen}>
              <SvgIcon>
                <Menu01Icon />
              </SvgIcon>
            </IconButton>
          )}
        </Stack>
        <Stack alignItems='center' className='w-100' justifyContent='center' direction='row' spacing={2}>
          <Stack alignItems='center' direction='row' justifyContent='center' spacing={3}>
            <Typography gutterBottom variant='subtitle1'>
              <small style={{ backgroundColor: envIsProd() ? 'red' : 'green' }}>Environment: {envLabel}</small>
              <Switch
                sx={{
                  '.MuiSwitch-thumb ': {
                    backgroundColor: 'rgba(16, 185, 129)'
                  },
                  '.MuiSwitch-track': {
                    backgroundColor: 'rgba(16, 185, 129, .5)'
                  },
                  '.Mui-checked .MuiSwitch-thumb ': {
                    backgroundColor: 'rgb(240, 68, 56)'
                  }
                }}
                color={'error'}
                // color='warning'
                edge='start'
                name='isVerified'
                onChange={() => {
                  setEnvLabel(!envIsProd() ? 'PROD' : 'TEST')
                  changeEnv()
                  window.location.reload()
                }}
                checked={envIsProd()}
              />
            </Typography>
          </Stack>
        </Stack>
        <Stack alignItems='center' direction='row' spacing={2}>
          <AccountButton />
        </Stack>
      </Stack>
    </Box>
  )
}

TopNav.propTypes = {
  onMobileNavOpen: PropTypes.func
}
