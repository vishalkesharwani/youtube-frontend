import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '@utils/axios';
import axios from 'axios';



export const getUsersAsync = createAsyncThunk('users/getUsersAsync', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/users',
    method: 'get',
    params,
  })
);

export const addUserAsync = createAsyncThunk('users/addUsersAsync', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/users',
    method: 'post',
    data,
  })
);

export const updateUserAsync = createAsyncThunk(
  'users/updateUsersAsync',
  async ({ id, data }, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/users/${id}`,
      method: 'put',
      data,
    })
);

export const deleteUserAsync = createAsyncThunk('users/updateUsersAsync', async (id, toolkit) =>
  AxiosClient({
    toolkit,
    url: `/users/${id}`,
    method: 'delete',
  })
);

export const postUserSignupAsync = createAsyncThunk(
  'user/postUserSignupAsync',
  async (formData, toolkit) =>
    axios.post(`http://localhost:8000/api/v1/user/register`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
        // Authorization: `${localStorage?.getItem('token')}`,
      },
    })
);

export const LoginUserAsync = createAsyncThunk('users/LoginUserAsync', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: 'user/login',
    method: 'post',
    data,
  })
);


export const logoutUserAsync = createAsyncThunk('users/logoutUserAsync', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: 'user/logout',
    method: 'post',
    data,
  })
);


export const getCurrentUserAsync = createAsyncThunk('users/getCurrentUserAsync', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: 'user/current-user',
    method: 'get',
    params,
  })
);


export const getUserProfileAsync = createAsyncThunk('users/getUserProfileAsync', async (id, toolkit) =>
  AxiosClient({
    toolkit,
    url: `user/channel/${id}`,
    method: 'get',
  })
);

export const updateAvatarAsync = createAsyncThunk(
  'user/updateAvatarAsync',
  async (formData, toolkit) =>
    axios.patch(`${process.env.REACT_APP_HOST_API_KEY}user/update-avatar`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage?.getItem('token')}` || null,
      },
    })
);

export const updateCoverAsync = createAsyncThunk(
  'user/updateCoverAsync',
  async (formData, toolkit) =>
    axios.patch(`${process.env.REACT_APP_HOST_API_KEY}user/update-cover-image`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage?.getItem('token')}` || null,
      },
    })
);

export const profileUpdateAsync = createAsyncThunk('users/profileUpdateAsync', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: 'user/update-profile',
    method: 'patch',
    data,
  })
);
