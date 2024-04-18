import { FC, useContext } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import CreditCard01Icon from '@untitled-ui/icons-react/build/esm/CreditCard01';
import Settings04Icon from '@untitled-ui/icons-react/build/esm/Settings04';
import User03Icon from '@untitled-ui/icons-react/build/esm/User03';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { RouterLink } from '../../router-link';
import AuthContext from '../../../contexts/AuthProvider';

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { userData, logout } = useContext(AuthContext)

  const { anchorEl, onClose, open, ...other } = props;


  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      disableScrollLock
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 200 } }}
      {...other}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">
          <span>{`${userData?.user.first_name} ${userData?.user.last_name}`}</span>
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {userData?.user.email}
        </Typography>
      </Box>
      <Divider />
      <Divider sx={{ my: '0 !important' }} />
      <Box
        sx={{
          display: 'flex',
          p: 1,
          justifyContent: 'center'
        }}
      >
        <Button
          color="inherit"
          onClick={logout}
          size="small"
        >
          Logout
        </Button>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
