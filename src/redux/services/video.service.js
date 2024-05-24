import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '@utils/axios';

export const getAllVideosAsync = createAsyncThunk('users/getAllVideosAsync', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/video/all',
    method: 'get',
    params,
  })
);


export const getVideoByIdAsync = createAsyncThunk('users/getVideoByIdAsync', async (id, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/video/${id}`,
      method: 'get',
    })
  );
  