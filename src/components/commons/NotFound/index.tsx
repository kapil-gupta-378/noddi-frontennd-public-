/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Typography from '@mui/material/Typography';

interface NotFoundProps {
  data: any[]; // Replace 'any' with the actual type of members array
  isLoading : boolean |undefined 
}

const NotFound: React.FC<NotFoundProps> = ({ data , isLoading}) => {
  return (
    <>
      {data.length === 0 && !isLoading && (
        <Typography sx={{ margin: '30px', textAlign: 'center' }}>
          Data Not Available
        </Typography>
      )}
    </>
  );
};

export default NotFound;
