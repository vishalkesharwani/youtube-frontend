import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, AppBar, Toolbar, IconButton, Box, Button } from '@mui/material';
// utils
import { set } from 'nprogress';
import { useState } from 'react';
import SignupPopup from '@pages/login_Signup/LoginSignupPopup';
import { bgBlur } from '../../../utils/cssStyles';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// config
import { HEADER, NAV } from '../../../config-global';
// components
import Logo from '../../../components/logo';
import Iconify from '../../../components/iconify';
import { useSettingsContext } from '../../../components/settings';

import AccountPopover from './AccountPopover';
import Searchbar from './Searchbar';
// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const isDesktop = useResponsive('up', 'lg');

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

  const [open, setOpen] = useState(false);
  // const userdata = localStorage?.getItem('user') ? JSON?.parse(localStorage?.getItem('user')) : '';
  const getUserData = () => {
    try {
      const userDataString = localStorage.getItem('user');
  
      // Check if the retrieved value is null or undefined
      if (userDataString === null || userDataString === undefined) {
        return '';
      }
  
      // Attempt to parse the JSON string
      return JSON.parse(userDataString);
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      // If there's an error during parsing, return an empty string
      return '';
    }
  };
  
  const userdata = getUserData();
  console.log(userdata);


  const token = localStorage?.getItem('token');


  const renderContent = (
    <>
      {isDesktop && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon="eva:menu-2-fill" color="#fff" />
        </IconButton>
      )}

      {/* <Searchbar /> */}
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 3 }}
      >
       
       <SignupPopup open={open} onClose={() => setOpen(false)} />
        {token ? (
          <AccountPopover userImage={userdata?.avatar} />
        ) : (

          <Box textAlign="end">
          <Button variant="contained" onClick={() => setOpen(true)} sx={{ borderRadius: '3px' }}>
            Sign Up
          </Button>
        </Box>
        )}
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        // zIndex: theme.zIndex.appBar + 1,
        zIndex: 97,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
          // backgroundColor: 'primary.main',
          background: '#000',
          borderBottom: '1px soild #fff !important',
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
