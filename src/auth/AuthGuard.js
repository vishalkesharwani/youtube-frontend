import LoadingScreen from '@components/loading-screen';
// import LoginPage from '@pages/auth/pages/LoginPage';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';
 
AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const {  isInitialized } = useAuthContext();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  // if (!isAuthenticated) {
  //   if (pathname !== requestedLocation) {
  //     setRequestedLocation(pathname);
  //   }
  //   return <LoginPage />;
  // }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}
