
import { getChannelTotalSubscribeAsync, getIsChannelscribedAsync, getMySubscriberAsync, getMySubscriptionAsync, toggleSubscribeAsync } from '@redux/services';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';


const initialState = {
  isSubsubmitting:false,
  subscribesData:{},
  isTotalSubLoading:false,
  totalChannelSubscriber:0,
  isSubscribeLoading: false,
  isSubscribed:{},
  isMysubscriptionLoading:false,
  mySubscriptionData :[],
  isMysubscriberLoading:false,
  mySubscriberListData:[]
};

const subscribeSlice = createSlice({
  name: 'subscribe',
  initialState,

  extraReducers: (builder) => {
    // toggle subscriber ----------
    builder.addMatcher(isAnyOf(toggleSubscribeAsync.pending), (state, { payload }) => {
      state.isSubsubmitting = true;
    });
    builder.addMatcher(isAnyOf(toggleSubscribeAsync.fulfilled), (state, { payload }) => {
      state.isSubsubmitting = false;
    });
    builder.addMatcher(isAnyOf(toggleSubscribeAsync.rejected), (state, { payload }) => {
      state.isSubsubmitting = false;
    });
    // -------------

     // get channel total subscriber ----------
     builder.addMatcher(isAnyOf(getChannelTotalSubscribeAsync.pending), (state, { payload }) => {
        state.isTotalSubLoading = true;
      });
      builder.addMatcher(isAnyOf(getChannelTotalSubscribeAsync.fulfilled), (state, { payload }) => {
        state.isTotalSubLoading = false;
        state.totalChannelSubscriber = payload?.data;
      });
      builder.addMatcher(isAnyOf(getChannelTotalSubscribeAsync.rejected), (state, { payload }) => {
        state.isTotalSubLoading = false;
        state.totalChannelSubscriber = 0;
      });
      // -------------

       // get channel subscribed ----------
     builder.addMatcher(isAnyOf(getIsChannelscribedAsync.pending), (state, { payload }) => {
        state.isSubscribeLoading = true;
      });
      builder.addMatcher(isAnyOf(getIsChannelscribedAsync.fulfilled), (state, { payload }) => {
        state.isSubscribeLoading = false;
        state.isSubscribed = payload?.data?.isSubscribed;
      });
      builder.addMatcher(isAnyOf(getIsChannelscribedAsync.rejected), (state, { payload }) => {
        state.isSubscribeLoading = false;
        state.isSubscribed = {};
      });
      // -------------

        // get my subscriptions ----------
     builder.addMatcher(isAnyOf(getMySubscriptionAsync.pending), (state, { payload }) => {
        state.isMysubscriptionLoading = true;
      });
      builder.addMatcher(isAnyOf(getMySubscriptionAsync.fulfilled), (state, { payload }) => {
        state.isMysubscriptionLoading = false;
        state.mySubscriptionData = payload?.data;
      });
      builder.addMatcher(isAnyOf(getMySubscriptionAsync.rejected), (state, { payload }) => {
        state.isMysubscriptionLoading = false;
        state.mySubscriptionData = {};
      });
      // -------------

        // get my subscriptions ----------
     builder.addMatcher(isAnyOf(getMySubscriberAsync.pending), (state, { payload }) => {
        state.isMysubscriberLoading = true;
      });
      builder.addMatcher(isAnyOf(getMySubscriberAsync.fulfilled), (state, { payload }) => {
        state.isMysubscriberLoading = false;
        state.mySubscriberListData = payload?.data;
      });
      builder.addMatcher(isAnyOf(getMySubscriberAsync.rejected), (state, { payload }) => {
        state.isMysubscriberLoading = false;
        state.mySubscriberListData = {};
      });
      // -------------
  
  },
});

export const { clearAlert } = subscribeSlice.actions;
export default subscribeSlice.reducer;
