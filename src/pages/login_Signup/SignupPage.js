import DialogBox from '@components/DialogBox';
import { RHFTextField, RHFUpload, RHFUploadAvatar } from '@components/hook-form';
import FormProvider from '@components/hook-form/FormProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { fData } from '@utils/formatNumber';
import axios from 'axios';
import { stubTrue } from 'lodash';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// eslint-disable-next-line arrow-body-style
const SignupPage = ({ onClose, setShowLogin, showLogin }) => {
  const { enqueueSnackbar } = useSnackbar();

  const UserSchema = Yup.object().shape({
    fullName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    avatar: Yup.mixed().required('Avatar is required'),
    coverIamges: Yup.mixed().required('Cover Images is required'),
  });

  const defaultValues = useMemo(
    () => ({
      fullName: '',
      email: '',
      userName: '',
      coverIamges: null,
      avatar: null,
      password: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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
      const dataToSend = new FormData();

      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          dataToSend.append(key, data[key]);
        }
      });
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_API_KEY}user/register`,
        dataToSend,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );
      if (response) {
        reset();
        enqueueSnackbar('Create success!');
        localStorage.setItem('user', JSON.stringify(response?.data?.data?.user));
        localStorage.setItem('token', response?.data?.data?.accessToken);
        onClose();
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong!', {
        variant: 'error',
      });
      console.error(error);
    }
  };

  const handleDropImage = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          });

          setValue('avatar', file, { shouldValidate: true });
        };

        reader.readAsDataURL(file);
      }

      // const reader = new FileReader();

      // reader.onloadend = () => {
      //   // When the file is loaded, the result will be a base64-encoded string
      //   const base64String = reader.result;
      //   // If you want to update the state with the base64String, you can do this:
      //   setValue('avatar', base64String, { shouldValidate: true });
      // };

      // if (file) {
      //   reader.readAsDataURL(file);
      // }
    },
    [setValue]
  );

  const handleDropCoverImage = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          });

          setValue('coverIamges', file, { shouldValidate: true });
        };

        //   const reader = new FileReader();

        // reader.onloadend = () => {
        //   // When the file is loaded, the result will be a base64-encoded string
        //   const base64String = reader.result;
        //   // If you want to update the state with the base64String, you can do this:
        //   setValue('coverIamges', base64String, { shouldValidate: true });
        // };

        reader.readAsDataURL(file);
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('coverIamges', null);
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
                sm: 'repeat(2, 1fr)',
              }}
              mt={1}
            >
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                }}
              >
                <RHFTextField name="fullName" label="Full Name" />
                <RHFTextField name="email" label="Email Address" />
                <RHFTextField name="userName" label="Username" />
                <RHFTextField name="password" label="Password" />
              </Box>
              <RHFUploadAvatar
                name="avatar"
                maxSize={10000000}
                onDrop={handleDropImage}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(10000000)}
                  </Typography>
                }
              />
            </Box>
            <RHFUpload
              sx={{ mt: '10px' }}
              thumbnail
              // multiple
              name="coverIamges"
              maxSize={314572800}
              onDrop={handleDropCoverImage}
              onRemove={handleRemoveFile}
              onDelete={() => setValue('coverIamges', null)}
            />
            <Typography
              variant="caption"
              sx={{
                cursor: 'pointer',
                textAlign: 'center',
                width: '100%',
                mt: 1,
                '&:hover': {
                  color: 'primary.main',
                },
              }}
              onClick={() => setShowLogin(stubTrue)}
            >
              Don&apos;t Have Account Pls Login
            </Typography>
            <Stack gap="10px" justifyContent="flex-end" flexDirection="row" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              >
                Sign Up
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
SignupPage.propTypes = {
  onClose: PropTypes.func,
  showLogin: PropTypes.bool,
  setShowLogin: PropTypes.func,
};

export default SignupPage;
