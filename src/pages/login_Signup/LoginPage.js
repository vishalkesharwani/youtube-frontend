/* eslint-disable react-hooks/exhaustive-deps */
import { RHFTextField } from '@components/hook-form';
import FormProvider from '@components/hook-form/FormProvider';
import Iconify from '@components/iconify';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { LoginUserAsync } from '@redux/services';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const LoginPage = ({ onClose, setShowLogin, showLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.users);

  const { enqueueSnackbar } = useSnackbar();

  const UserSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(LoginUserAsync(data));
      if (response?.payload?.statusCode === 200) {
        reset();
        enqueueSnackbar(response?.payload?.message);
        localStorage.setItem('user', JSON.stringify(response?.payload?.data?.user));
        localStorage.setItem('token', response?.payload?.data?.accessToken);
        onClose();
      }
    } catch (error) {
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
                sm: 'repeat(1, 1fr)',
              }}
              mt={1}
            >
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
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
              onClick={() => setShowLogin(false)}
            >
              Don&apos;t Have Account Pls Signup
            </Typography>

            <Stack gap="10px" justifyContent="flex-end" flexDirection="row" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
                onClick={handleSubmit(onSubmit)}
              >
                Login
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
LoginPage.propTypes = {
  onClose: PropTypes.func,
  showLogin: PropTypes.bool,
  setShowLogin: PropTypes.func,
};

export default LoginPage;
