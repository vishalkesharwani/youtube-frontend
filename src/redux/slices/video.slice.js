import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addViewsToVideoAsync,
  deleteVideoAsync,
  getAllVideosAsync,
  getVideoByIdAsync,
  getVideoForUserAsync,
} from '../services';

const initialState = {
  isVideoLoading: false,
  isDeleting: false,
  isAdding:false,
  videosData: [],
  videoById: {},
  userVidoes: [],
  totalCount: 0,
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


    // Get Video By id ----------
    builder.addMatcher(isAnyOf(getVideoForUserAsync.pending), (state, { payload }) => {
      state.isVideoLoading = true;
    });
    builder.addMatcher(isAnyOf(getVideoForUserAsync.fulfilled), (state, { payload }) => {
      state.isVideoLoading = false;
      state.userVidoes = payload?.data;
      state.totalCount = payload?.totalData;
    });
    builder.addMatcher(isAnyOf(getVideoForUserAsync.rejected), (state, { payload }) => {
      state.isVideoLoading = false;
      state.totalCount = 0;      
      state.userVidoes = [];
    });
    // -------------

    // Get Video By id ----------
    builder.addMatcher(isAnyOf(deleteVideoAsync.pending), (state, { payload }) => {
      state.isDeleting = true;
    });
    builder.addMatcher(isAnyOf(deleteVideoAsync.fulfilled), (state, { payload }) => {
      state.isDeleting = false;
    });
    builder.addMatcher(isAnyOf(deleteVideoAsync.rejected), (state, { payload }) => {
      state.isDeleting = false;
      state.userVidoes = [];
    });
    // -------------


       // add views ----------
       builder.addMatcher(isAnyOf(addViewsToVideoAsync.pending), (state, { payload }) => {
        state.isAdding = true;
      });
      builder.addMatcher(isAnyOf(addViewsToVideoAsync.fulfilled), (state, { payload }) => {
        state.isAdding = false;
      });
      builder.addMatcher(isAnyOf(addViewsToVideoAsync.rejected), (state, { payload }) => {
        state.isAdding = false;
      });
      // -------------
  },
});

export const { clearAlert } = videoSlice.actions;
export default videoSlice.reducer;
