import React from 'react'
import { StartRatingEnum } from '../../../interfaces'
import StarIcon from '@mui/icons-material/Star'

interface StartRatingProps {
    rating: StartRatingEnum.oneStar | StartRatingEnum.twoStar | StartRatingEnum.threeStar | StartRatingEnum.fourStar | StartRatingEnum.fiveStar
}

export const StarRating = ({ rating }: StartRatingProps) => {
    const allRatingIcon: { [key: number]: React.ReactElement } = {
        [StartRatingEnum.oneStar]: <StarIcon sx={{ color: "#ff5722" }} />,
        [StartRatingEnum.twoStar]: <StarIcon sx={{ color: "#ff5722" }} />,
        [StartRatingEnum.threeStar]: <StarIcon sx={{ color: "#ff9800" }} />,
        [StartRatingEnum.fourStar]: <StarIcon sx={{ color: '#76ff03' }} />,
        [StartRatingEnum.fiveStar]: <StarIcon sx={{ color: "#76ff03" }} />,
    }

    return allRatingIcon[rating] || null
}