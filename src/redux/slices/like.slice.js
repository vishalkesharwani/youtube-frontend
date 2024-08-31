import { getIsVideoLikedAsync, getVideosTotalLikeAsync, toggleLikeAsync } from '@redux/services';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';


const initialState = {
  isLikeLoading: false,
  issubmitting:false,
  likesData:{},
  isTotalLikeLoader:false,
  videosTotalLike:0
};

const likeSlice = createSlice({
  name: 'like',
  initialState,

  extraReducers: (builder) => {
    // Get Likes ----------
    builder.addMatcher(isAnyOf(toggleLikeAsync.pending), (state, { payload }) => {
      state.issubmitting = true;
    });
    builder.addMatcher(isAnyOf(toggleLikeAsync.fulfilled), (state, { payload }) => {
      state.issubmitting = false;
    });
    builder.addMatcher(isAnyOf(toggleLikeAsync.rejected), (state, { payload }) => {
      state.issubmitting = false;
    });
    // -------------

     // Get Likes ----------
     builder.addMatcher(isAnyOf(getIsVideoLikedAsync.pending), (state, { payload }) => {
        state.isLikeLoading = true;
      });
      builder.addMatcher(isAnyOf(getIsVideoLikedAsync.fulfilled), (state, { payload }) => {
        state.isLikeLoading = false;
        state.likesData = payload?.data;
      });
      builder.addMatcher(isAnyOf(getIsVideoLikedAsync.rejected), (state, { payload }) => {
        state.isLikeLoading = false;
        state.likesData = [];
      });
      // -------------

          // Get Likes ----------
     builder.addMatcher(isAnyOf(getVideosTotalLikeAsync.pending), (state, { payload }) => {
      state.isTotalLikeLoader = true;
    });
    builder.addMatcher(isAnyOf(getVideosTotalLikeAsync.fulfilled), (state, { payload }) => {
      state.isTotalLikeLoader = false;
      state.videosTotalLike = payload?.data;
    });
    builder.addMatcher(isAnyOf(getVideosTotalLikeAsync.rejected), (state, { payload }) => {
      state.isTotalLikeLoader = false;
      state.videosTotalLike = [];
    });
    // -------------
  
  },
});

export const { clearAlert } = likeSlice.actions;
export default likeSlice.reducer;
