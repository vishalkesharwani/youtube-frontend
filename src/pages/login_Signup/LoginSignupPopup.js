import DialogBox from '@components/DialogBox';
import PropTypes from 'prop-types';
import { useState } from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

// eslint-disable-next-line arrow-body-style
const SignupPopup = ({ onClose, open }) => {
  const [showLogin, setShowLogin] = useState(true);
  const handleClose =()=>{
    setShowLogin(true)
    onClose()
  }

  return (
    <div>
      <DialogBox
        maxWidth={showLogin ? 'xs' : 'md'}
        ScrollHeight={showLogin ? 350 : 600}
        title="Sign Up"
        open={open}
        onClose={handleClose}
      >
        {showLogin ? (
          <LoginPage setShowLogin={setShowLogin} onClose={handleClose} showLogin={showLogin} />
        ) : (
          <SignupPage setShowLogin={setShowLogin} onClose={handleClose} showLogin={showLogin} />
        )}
      </DialogBox>
    </div>
  );
};
SignupPopup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SignupPopup;
