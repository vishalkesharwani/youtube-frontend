import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, IconButton, Stack, Typography } from '@mui/material';
// utils
import { bgBlur } from '@utils/cssStyles';
// components
import Image from '@components/image';
import { CustomAvatar } from '@components/custom-avatar';
import zIndex from '@mui/material/styles/zIndex';
import Iconify from '@components/iconify';
import ProfilePopup from '@pages/profile/ProfilePopup';
import { useState } from 'react';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  '&:before': {
    ...bgBlur({
      color: theme.palette.primary.darker,
    }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const StyledInfo = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
  cover: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  myProfile: PropTypes.bool,
  fetchProfile: PropTypes.func,
  profileData: PropTypes.object,
};

export default function ProfileCover({
  name,
  email,
  cover,
  avatar,
  myProfile,
  fetchProfile,
  profileData,
}) {
  const [open, setOpen] = useState(false);
  const [showAvatar, setShowAvatar] = useState(true);
  const handleShowAvatar = () => {
    setShowAvatar('avatar');
    setOpen(true);
  };

  const handleShowCover = () => {
    setShowAvatar('cover');
    setOpen(true);
  };

  const handleShowProfile = () => {
    setShowAvatar('profile');
    setOpen(true);
  };
  return (
    <StyledRoot>
      <StyledInfo>
        <Box sx={{ position: 'relative' }}>
          <CustomAvatar
            src={avatar}
            sx={{
              mx: 'auto',
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: 'common.white',
              width: { xs: 80, md: 128 },
              height: { xs: 80, md: 128 },
            }}
          />
          {myProfile && (
            <IconButton
              onClick={() => {
                handleShowAvatar();
              }}
              sx={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.main' },
              }}
            >
              <Iconify icon="basil:edit-outline" color='#fff' />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Stack direction="row">
            {' '}
            <Typography variant="h4">{name}</Typography>{' '}
            {myProfile && (
              <IconButton
                onClick={() => {
                  handleShowProfile();
                }}
                // sx={{
                //   position: 'absolute',
                //   right: 0,
                //   top: 0,
                //   zIndex: 11111,
                //   backgroundColor: 'primary.main',
                //   '&:hover': { backgroundColor: 'primary.main' },
                // }}
              >
                <Iconify icon="grommet-icons:edit" color="#fff" />
              </IconButton>
            )}
          </Stack>

          <Typography sx={{ opacity: 0.72 }}>{email}</Typography>
        </Box>
      </StyledInfo>
      {/* <Box sx={{position:"relative"}}> */}
      <Image
        // alt="cover"
        src={cover}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
          zIndex: 9,
        }}
      />
      {myProfile && (
        <IconButton
          onClick={() => {
            handleShowCover();
          }}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 11111,
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.main' },
          }}
        >
          <Iconify icon="basil:edit-outline" color='#fff' />
        </IconButton>
      )}
      {/* </Box> */}
      <ProfilePopup
        open={open}
        onClose={() => setOpen(false)}
        setShowAvatar={setShowAvatar}
        showAvatar={showAvatar}
        avatar={avatar}
        cover={cover}
        fetchProfile={fetchProfile}
        profileData={profileData}
      />
    </StyledRoot>
  );
}
