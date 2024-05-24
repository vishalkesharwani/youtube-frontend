import { RHFTextField, RHFUploadAvatar } from '@components/hook-form';
import FormProvider from '@components/hook-form/FormProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { profileUpdateAsync, updateAvatarAsync } from '@redux/services';
import { fData } from '@utils/formatNumber';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

// eslint-disable-next-line arrow-body-style
const ProfileUpdate = ({ onClose, avatar, fetchProfile, profileData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const UserSchema = Yup.object().shape({
    fullName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = useMemo(
    () => ({
        fullName: profileData?.fullName || '',
        email: profileData?.email || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profileData]
  );

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    try {
    
      const response = await dispatch(profileUpdateAsync(data));
      console.log('response', response)
      if (response?.payload?.statusCode === 200) {
        reset();
        enqueueSnackbar(response?.payload?.message);
        fetchProfile()
        onClose();
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong!', {
        variant: 'error',
      });
      console.error(error);
    }
  };


  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Box sx={{ p: 3, width: '100%' }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
              }}
              mt={1}
            >
                <RHFTextField name="fullName" label="Full Name" />
                <RHFTextField name="email" label="Email Address" />
            </Box>

            <Stack gap="10px" justifyContent="flex-end" flexDirection="row" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              >
                Update
              </LoadingButton>

              <LoadingButton onClick={onClose} type="button" variant="contained" color="error">
                Cancel
              </LoadingButton>
            </Stack>
          </Box>
        </Grid>
      </FormProvider>
    </div>
  );
};
ProfileUpdate.propTypes = {
  onClose: PropTypes.func,
  avatar: PropTypes.string,
  fetchProfile: PropTypes.func,
  profileData: PropTypes.object
};

export default ProfileUpdate;
