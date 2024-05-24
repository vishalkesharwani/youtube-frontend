import { RHFUpload } from '@components/hook-form';
import FormProvider from '@components/hook-form/FormProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Stack } from '@mui/material';
import { updateCoverAsync } from '@redux/services';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

// eslint-disable-next-line arrow-body-style
const CoverImageUpdate = ({ onClose, cover, fetchProfile }) => {
  const { enqueueSnackbar } = useSnackbar();
  
  const dispatch = useDispatch();

  const UserSchema = Yup.object().shape({
    coverIamges: Yup.mixed().required('Cover Images is required'),
  });

  const defaultValues = useMemo(
    () => ({
      coverIamges:cover || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cover]
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
      const response = await dispatch(updateCoverAsync(dataToSend));
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
CoverImageUpdate.propTypes = {
  onClose: PropTypes.func,
  cover: PropTypes.string,
  fetchProfile: PropTypes.func

};

export default CoverImageUpdate;
