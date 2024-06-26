import React, { FC } from 'react'
import numeral from 'numeral'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface AccountBalanceCardProps {
  cost: number
  profit: number
  sales: number
}

export const AccountBalanceCard: FC<AccountBalanceCardProps> = (props) => {
  const { sales } = props

  const formattedSales = numeral(sales).format('0.[0]')

  return (
    <Card>
      <CardHeader title='Rewards' sx={{ pb: 0 }} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Stack
              alignItems='center'
              direction='row'
              spacing={2}
              sx={{
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'neutral.800' : 'error.lightest'),
                borderRadius: 2.5,
                px: 3,
                py: 4
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  height: 48,
                  width: 48,
                  '& img': {
                    width: '100%'
                  }
                }}
              >
                <img src='/assets/iconly/iconly-glass-chart.svg' />
              </Box>
              <div>
                <Typography color='text.secondary' variant='body2'>
                  Balance
                </Typography>
                <Typography variant='h5'>{`${formattedSales} `}Points</Typography>
              </div>
            </Stack>
          </Grid>
          {/* <Grid xs={12} md={4}>
            <Stack
              alignItems='center'
              direction='row'
              spacing={2}
              sx={{
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'neutral.800' : 'warning.lightest'),
                borderRadius: 2.5,
                px: 3,
                py: 4
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  height: 48,
                  width: 48,
                  '& img': {
                    width: '100%'
                  }
                }}
              >
                <img src='/assets/iconly/iconly-glass-discount.svg' />
              </Box>
              <div>
                <Typography color='text.secondary' variant='body2'>
                  Cost
                </Typography>
                <Typography variant='h5'>{formattedCost}</Typography>
              </div>
            </Stack>
          </Grid>
          <Grid xs={12} md={4}>
            <Stack
              alignItems='center'
              direction='row'
              spacing={2}
              sx={{
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'neutral.800' : 'success.lightest'),
                borderRadius: 2.5,
                px: 3,
                py: 4
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  height: 48,
                  width: 48,
                  '& img': {
                    width: '100%'
                  }
                }}
              >
                <img src='/assets/iconly/iconly-glass-tick.svg' />
              </Box>
              <div>
                <Typography color='text.secondary' variant='body2'>
                  Profit
                </Typography>
                <Typography variant='h5'>{formattedProfit}</Typography>
              </div>
            </Stack>
          </Grid> */}
        </Grid>
      </CardContent>
    </Card>
  )
}
