import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Tab, Card, Tabs, Container, Box } from '@mui/material';
// routes
import { LoginUserAsync, getCurrentUserAsync, getUserProfileAsync } from '@redux/services';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
import {
  _userAbout,
  _userFeeds,
  _userFriends,
  _userGallery,
  _userFollowers,
} from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
} from '../../sections/profile';

// ----------------------------------------------------------------------

export default function UserProfilePage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { id } = useParams();

  const location = useLocation();

  const myProfile = location.pathname.includes('myProfile');
  console.log('id', myProfile);

  const [searchFriends, setSearchFriends] = useState('');

  const [currentTab, setCurrentTab] = useState('profile');

  const { isLoading, profileData } = useSelector((state) => state.users);
  console.log('profileData', profileData);
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

  const fetchProfile = async () => {
    const userName = userdata?.userName;
    await dispatch(getUserProfileAsync(id || userName));
  };

  const TABS = [
    {
      value: 'profile',
      label: 'Profile',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <Profile info={_userAbout} posts={_userFeeds} profileData={profileData} />,
    },
    {
      value: 'followers',
      label: 'Followers',
      icon: <Iconify icon="eva:heart-fill" />,
      component: <ProfileFollowers followers={_userFollowers} />,
    },
    {
      value: 'friends',
      label: 'Friends',
      icon: <Iconify icon="eva:people-fill" />,
      component: (
        <ProfileFriends
          friends={_userFriends}
          searchFriends={searchFriends}
          onSearchFriends={(event) => setSearchFriends(event.target.value)}
        />
      ),
    },
    {
      value: 'gallery',
      label: 'Gallery',
      icon: <Iconify icon="ic:round-perm-media" />,
      component: <ProfileGallery gallery={_userGallery} />,
    },
  ];

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Helmet>
        <title> User: Profile | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User' },
            // { name: user?.displayName },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover
            name={profileData?.fullName}
            email={profileData.email}
            avatar={profileData?.avatar}
            cover={profileData?.coverIamges}
            myProfile={myProfile}
            fetchProfile={fetchProfile}
            profileData={profileData}
          />

          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              bgcolor: 'background.paper',
              '& .MuiTabs-flexContainer': {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-end',
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
        </Card>

        {TABS.map(
          (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
        )}
      </Container>
    </>
  );
}
