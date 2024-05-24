import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getAllVideosAsync,
  getVideoByIdAsync,
} from '../services';

const initialState = {
  isVideoLoading: false,
  videosData: [],
  videoById:{}
};

const videoSlice = createSlice({
  name: 'video',
  initialState,

  extraReducers: (builder) => {
    // Get Videos ----------
    builder.addMatcher(isAnyOf(getAllVideosAsync.pending), (state, { payload }) => {
      state.isVideoLoading = true;
    });
    builder.addMatcher(isAnyOf(getAllVideosAsync.fulfilled), (state, { payload }) => {
      state.isVideoLoading = false;
      state.videosData = payload?.data;
    });
    builder.addMatcher(isAnyOf(getAllVideosAsync.rejected), (state, { payload }) => {
      state.isVideoLoading = false;
      state.videosData = [];
    });
    // -------------

    // Get Video By id ----------
    builder.addMatcher(isAnyOf(getVideoByIdAsync.pending), (state, { payload }) => {
      state.isVideoLoading = true;
    });
    builder.addMatcher(isAnyOf(getVideoByIdAsync.fulfilled), (state, { payload }) => {
      state.isVideoLoading = false;
      state.videoById = payload?.data;
    });
    builder.addMatcher(isAnyOf(getVideoByIdAsync.rejected), (state, { payload }) => {
      state.isVideoLoading = false;
      state.videoById = {};
    });
    // -------------

  },
});

export const { clearAlert } = videoSlice.actions;
export default videoSlice.reducer;
