import LoadingScreen from '@components/loading-screen';
import { Suspense, lazy } from 'react';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );


export const LoginPage = Loadable(lazy(() => import('@pages/auth/pages/LoginPage')));
export const Home = Loadable(lazy(() => import('@pages/home/Home')));
export const VideoDescription = Loadable(lazy(() => import('@pages/videoDescription/VideoDescription')));
export const MyProfile = Loadable(lazy(() => import('@pages/profile/Profile')));


export const User = Loadable(lazy(() => import('@pages/users/pages/User')));
export const UserList = Loadable(lazy(() => import('@pages/users/pages/UserList')));


export const Page404 = Loadable(lazy(() => import('@pages/Page404')));
