import { RHFTextField, RHFUpload, RHFUploadBox } from '@components/hook-form';
import FormProvider from '@components/hook-form/FormProvider';
import Iconify from '@components/iconify/Iconify';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';
import * as Yup from 'yup';

// eslint-disable-next-line arrow-body-style
const UploadVideo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  console.log('state', state)
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage?.getItem('token')}` || null,
    },
  }
  const { enqueueSnackbar } = useSnackbar();

  const UserSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    videoFile: id ? Yup.string().notRequired : Yup.mixed().required('Video is required'),
    thumbnail: Yup.mixed().required('Cover Images is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: state?.title || '',
      description: state?.description || '',
      videoFile: null,
      thumbnail: state?.thumbnail || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;
  const values = watch();
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
        `${process.env.REACT_APP_HOST_API_KEY}video/upload-video`,
        dataToSend,
        config
      );
      if (response) {
        console.log('first', response)
        reset();
        enqueueSnackbar('Create success!');
        // localStorage.setItem('user', JSON.stringify(response?.data?.data?.user));
        // localStorage.setItem('token', response?.data?.data?.accessToken);
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong!', {
        variant: 'error',
      });
      console.error(error);
    }
  };

  const handleDropCoverImage = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          });

          setValue('thumbnail', file, { shouldValidate: true });
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
    setValue('thumbnail', null);
  };
  console.log('videoFile', values);


  const handleDropVideo = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {

        Object.assign(file, {
          preview: URL.createObjectURL(file),
        });

        // Set both the file and the FormData object
        setValue('videoFile', file, { shouldValidate: true });
        // setValue('videoFileFormData', formData, { shouldValidate: true });
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
                sm: 'repeat(2, 1fr)',
              }}
              mt={1}
            >
              <RHFTextField name="title" label="Title" />
              <RHFTextField name="description" label="Description" />
              {/* <RHFEditor name="description" label="Password" /> */}
              <RHFUpload
                sx={{ mt: '10px' }}
                thumbnail
                // multiple
                name="thumbnail"
                maxSize={314572800}
                onDrop={handleDropCoverImage}
                onRemove={handleRemoveFile}
                onDelete={() => setValue('thumbnail', null)}
              />
              {!id &&
              <Box>
                <Typography> Upload Video File</Typography>
                <RHFUploadBox
                  sx={{ mt: '10px' }}
                  thumbnail
                  accept={{
                    'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv'],
                  }}
                  // multiple
                  name="videoFile"
                  maxSize={314572800}
                  onDrop={handleDropVideo}
                  onRemove={handleRemoveFile}
                  onDelete={() => setValue('videoFile', null)}
                />
                {values?.videoFile && (
                  <Box sx={{ border: '1px dashed', p: 2 }}>
                    {values?.videoFile?.path}{' '}
                    <IconButton onClick={() => setValue('videoFile', null)}>
                      <Iconify icon="ep:circle-close-filled" color="primary.main" />
                    </IconButton>
                  </Box>
                )}
              </Box>}
            </Box>

            <Stack gap="10px" justifyContent="flex-end" flexDirection="row" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              >
                {id ? 'Update' : 'Upload'}
              </LoadingButton>

              <LoadingButton onClick={() => navigate(-1)} type="button" variant="contained" color="error">
                Cancel
              </LoadingButton>
            </Stack>
          </Box>
        </Grid>
      </FormProvider>
    </div>
  );
};

export default UploadVideo;
