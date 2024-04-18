import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link } from 'react-router-dom'
import SvgIcon from '@mui/material/SvgIcon'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import Stack from '@mui/material/Stack'
function NoddiBreadcrumb({ items }) {
  return (
    <Stack>
      <Breadcrumb>
        <SvgIcon sx={{ mr: 1 }}>
          <ArrowLeftIcon />
        </SvgIcon>
        {items.map((value, index) => {
          return (
            <Breadcrumb.Item className='react-link' key={index} linkAs={Link} linkProps={{ to: value.path }} active={index === items.length - 1}>
              {value.title}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    </Stack>
  )
}

export default NoddiBreadcrumb
