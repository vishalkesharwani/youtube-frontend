import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '@utils/axios';

export const getAllVideosAsync = createAsyncThunk('video/getAllVideosAsync', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/video/all',
    method: 'get',
    params,
  })
);


export const getVideoByIdAsync = createAsyncThunk('video/getVideoByIdAsync', async (id, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/video/${id}`,
      method: 'get',
    })
  );
  
  export const getVideoForUserAsync = createAsyncThunk('video/getVideoForUserAsync', async (id, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/user/videos`,
      method: 'get',
    })
  );
  
  export const deleteVideoAsync = createAsyncThunk('video/deleteVideoAsync', async (id, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/video/${id}`,
      method: 'delete',
    })
  );

  export const addViewsToVideoAsync = createAsyncThunk('video/addViewsToVideoAsync', async (id, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/view/${id}`,
      method: 'delete',
    })
  );