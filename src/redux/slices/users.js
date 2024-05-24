import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  LoginUserAsync,
  addUserAsync,
  deleteUserAsync,
  getCurrentUserAsync,
  getUserProfileAsync,
  getUsersAsync,
  postUserSignupAsync,
  updateUserAsync,updateAvatarAsync,
  updateCoverAsync,
  profileUpdateAsync,
} from '../services';

const initialState = {
  isLoading: false,
  isSubmitting: false,
  isDeleting: false,
  alert: {
    type: '',
    message: '',
  },
  users: [],
  totalCount: 0,
  userData: {},
  loginData: {},
  currentUserData: {},
  profileData:{},
  avatarData:{},
  coverData:{}
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearAlert(state) {
      state.alert = {
        type: '',
        message: '',
      };
    },
  },
  extraReducers: (builder) => {
    // Get Users ----------
    builder.addMatcher(isAnyOf(getUsersAsync.pending), (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getUsersAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.alert = {
        type: 'success',
        message: 'Users data fetched successfully.',
      };
      state.totalCount = 62;
      state.users = payload;
    });
    builder.addMatcher(isAnyOf(getUsersAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      state.alert = {
        type: 'error',
        message: 'Something went wrong.',
      };
      state.users = [];
    });
    // -------------

    // Add User ----------
    builder.addMatcher(isAnyOf(addUserAsync.pending), (state, { payload }) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(addUserAsync.fulfilled), (state, { payload }) => {
      state.isSubmitting = false;
      state.alert = {
        type: 'success',
        message: 'User added successfully.',
      };
    });
    builder.addMatcher(isAnyOf(addUserAsync.rejected), (state, { payload }) => {
      state.isSubmitting = false;
      state.alert = {
        type: 'error',
        message: 'Something went wrong.',
      };
    });
    // -------------

    // Update User ----------
    builder.addMatcher(isAnyOf(updateUserAsync.pending), (state, { payload }) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(updateUserAsync.fulfilled), (state, { payload }) => {
      state.isSubmitting = false;
      state.alert = {
        type: 'success',
        message: 'User updated successfully.',
      };
    });
    builder.addMatcher(isAnyOf(updateUserAsync.rejected), (state, { payload }) => {
      state.isSubmitting = false;
      state.alert = {
        type: 'error',
        message: 'Something went wrong.',
      };
    });
    // -------------

    // Delete User ----------
    builder.addMatcher(isAnyOf(deleteUserAsync.pending), (state, { payload }) => {
      state.isDeleting = true;
    });
    builder.addMatcher(isAnyOf(deleteUserAsync.fulfilled), (state, { payload }) => {
      state.isDeleting = false;
      state.alert = {
        type: 'success',
        message: 'User deleted successfully.',
      };
    });
    builder.addMatcher(isAnyOf(deleteUserAsync.rejected), (state, { payload }) => {
      state.isDeleting = false;
      state.alert = {
        type: 'error',
        message: 'Something went wrong.',
      };
    });
    // -------------

    // User register ----------
    builder.addMatcher(isAnyOf(postUserSignupAsync.pending), (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(postUserSignupAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;

      state.loginData = payload.data;
    });
    builder.addMatcher(isAnyOf(postUserSignupAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      state.loginData = {};
    });

    // User login----------
    builder.addMatcher(isAnyOf(LoginUserAsync.pending), (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(LoginUserAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.userData = payload.data;
    });
    builder.addMatcher(isAnyOf(LoginUserAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      state.userData = {};
    });

    // current User ----------
    builder.addMatcher(isAnyOf(getCurrentUserAsync.pending), (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getCurrentUserAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.currentUserData = payload.data;
    });
    builder.addMatcher(isAnyOf(getCurrentUserAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      state.currentUserData = {};
    });

    // User profile----------
    builder.addMatcher(isAnyOf(getUserProfileAsync.pending), (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(getUserProfileAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;

      state.profileData = payload.data;
    });
    builder.addMatcher(isAnyOf(getUserProfileAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      state.profileData = {};
    });

     // Update avatar----------
     builder.addMatcher(isAnyOf(updateAvatarAsync.pending), (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(updateAvatarAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.avatarData = payload.data;
    });
    builder.addMatcher(isAnyOf(updateAvatarAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      state.avatarData = {};
    });

    // Update cover image----------
    builder.addMatcher(isAnyOf(updateCoverAsync.pending), (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(updateCoverAsync.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.coverData = payload.data;
    });
    builder.addMatcher(isAnyOf(updateCoverAsync.rejected), (state, { payload }) => {
      state.isLoading = false;
      state.coverData = {};
    });

        // Update profile image----------
        builder.addMatcher(isAnyOf(profileUpdateAsync.pending), (state, { payload }) => {
          state.isLoading = true;
        });
        builder.addMatcher(isAnyOf(profileUpdateAsync.fulfilled), (state, { payload }) => {
          state.isLoading = false;
        });
        builder.addMatcher(isAnyOf(profileUpdateAsync.rejected), (state, { payload }) => {
          state.isLoading = false;
        });
    
    
  },
});

export const { clearAlert } = usersSlice.actions;
export default usersSlice.reducer;
