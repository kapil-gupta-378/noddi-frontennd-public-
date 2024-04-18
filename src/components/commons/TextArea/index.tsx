import * as React from 'react'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { styled } from '@mui/system'
import { TextAreaProps } from './interface'

const MinHeightTextarea: React.FC<TextAreaProps> = (props) => {
  const { minRows = 0, placeholder = 'Please type...', fullwidth = false } = props
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75'
  }

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f'
  }

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: ${fullwidth ? '100%' : 'auto'};
    padding: 12px;
    border-radius: 12px 12px 12px 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    // border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    &:focus {
    //   border-color: ${blue[400]};
      box-shadow: 0 0 0 2px #6610f2;
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  )

  return <StyledTextarea {...props} aria-label={placeholder} minRows={minRows} placeholder={placeholder} />
}

export default MinHeightTextarea
