import { RHFUploadAvatar } from '@components/hook-form';
import FormProvider from '@components/hook-form/FormProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { updateAvatarAsync } from '@redux/services';
import { fData } from '@utils/formatNumber';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

// eslint-disable-next-line arrow-body-style
const AvatarUpdate = ({ onClose, avatar, fetchProfile }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const UserSchema = Yup.object().shape({
    avatar: Yup.mixed().required('Avatar is required'),
  });

  const defaultValues = useMemo(
    () => ({
      avatar: avatar || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [avatar]
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
      const response = await dispatch(updateAvatarAsync(dataToSend));
      if (response?.payload?.data?.statusCode === 200) {
        reset();
        enqueueSnackbar(response?.payload?.data?.message);
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
    },
    [setValue]
  );

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
AvatarUpdate.propTypes = {
  onClose: PropTypes.func,
  avatar: PropTypes.string,
  fetchProfile: PropTypes.func
};

export default AvatarUpdate;
