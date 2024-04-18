import React from 'react'
import type { FC } from 'react'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { StarRating } from '../../components/commons/StarRating'
import { RatingAvg, RatingPropertyKey } from '../../interfaces'

interface FeedbackSummaryProps {
  data: RatingAvg[]
}

export const FeedbackSummary: FC<FeedbackSummaryProps> = ({ data }: FeedbackSummaryProps) => (
  <div>
    <Grid container spacing={3}>
      {data.map((avgRating) => {
        return (
          <Grid xs={12} md={6} lg={4}>
            <Card sx={{ height: '150px', display: 'flex', alignItems: 'center' }}>
              <CardContent>
                <Stack alignItems='center' direction='row' spacing={2}>
                  <Avatar
                    sx={{
                      height: 48,
                      width: 48
                    }}
                  >
                    <StarRating rating={Math.floor(avgRating.avg)} />
                  </Avatar>
                  <div>
                    <Typography color='text.secondary' variant='body2'>
                      Average rating of {RatingPropertyKey[avgRating.key as keyof typeof RatingPropertyKey]}
                    </Typography>
                    <Typography variant='h6'>{avgRating.avg}</Typography>
                    <Typography color='text.secondary' variant='body2'>
                      {`from ${avgRating.total} feedback${parseInt(avgRating.total.toString()) > 1 ? 's' : ''}`}
                    </Typography>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  </div>
)
