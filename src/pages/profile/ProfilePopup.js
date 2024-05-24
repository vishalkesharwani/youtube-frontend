/* eslint-disable no-nested-ternary */
import DialogBox from '@components/DialogBox';
import PropTypes from 'prop-types';
import AvatarUpdate from './AvatarUpdate';
import CoverImageUpdate from './CoverImageUpdate';
import ProfileUpdate from './ProfileUpdate';

// eslint-disable-next-line arrow-body-style
const ProfilePopup = ({
  onClose,
  open,
  setShowAvatar,
  showAvatar,
  cover,
  avatar,
  fetchProfile,
  profileData,
}) => {
  const handleClose = () => {
    setShowAvatar(true);
    onClose();
  };

  return (
    <div>
      <DialogBox
        maxWidth={showAvatar !== 'cover' ? 'xs' : 'md'}
        ScrollHeight={showAvatar === 'avatar' ? 390 : showAvatar === 'cover' ? 450 : 320}
        title={showAvatar === 'avatar' ? 'Update Avatar' : showAvatar === 'cover' ? 'Update Cover Image' : 'Update Profile'}
        open={open}
        onClose={handleClose}
      >
        {showAvatar === 'avatar' && (
          <AvatarUpdate onClose={handleClose} avatar={avatar} fetchProfile={fetchProfile} />
        )}{' '}
        {showAvatar === 'cover' && (
          <CoverImageUpdate onClose={handleClose} cover={cover} fetchProfile={fetchProfile} />
        )}
        {showAvatar === 'profile' && (
          <ProfileUpdate
            onClose={handleClose}
            fetchProfile={fetchProfile}
            profileData={profileData}
          />
        )}
      </DialogBox>
    </div>
  );
};
ProfilePopup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  showAvatar: PropTypes.bool,
  setShowAvatar: PropTypes.func,
  cover: PropTypes.string,
  avatar: PropTypes.string,
  fetchProfile: PropTypes.func,
  profileData: PropTypes.object,
};

export default ProfilePopup;
