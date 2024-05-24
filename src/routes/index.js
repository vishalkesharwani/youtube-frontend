import { Navigate, useRoutes } from 'react-router-dom';

import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';

import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';

import { PATH_AFTER_LOGIN } from '../config-global';

import { LoginPage, Page404,
  //   CategoryList, Category ,Course , CourseList, ChatBot, 
   Home, VideoDescription, User, UserList,
   MyProfile} from './elements';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/list" replace />, index: true },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <User /> },
            { path: ':id/edit', element: <User /> },
            { path: ':id/view', element: <User /> },
          ],
        },
        { path: 'home', element: <Home />, index: true },
        { path: 'description/:id', element: <VideoDescription />, index: true },
        { path: 'myprofile', element: <MyProfile />, index: true },
        { path: 'profile/:id', element: <MyProfile />, index: true },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
