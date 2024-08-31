import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "@utils/axios";

export const toggleSubscribeAsync = createAsyncThunk('subscribe/toggleSubscribeAsync', async (channelId, toolkit) =>
    AxiosClient({
      toolkit,
      url: `subscriber/toggle/${channelId}`,
      method: 'post',
    })
  );

  export const getIsChannelscribedAsync = createAsyncThunk('subscribe/getIsChannelscribedAsync', async (channelId, toolkit) =>
    AxiosClient({
      toolkit,
      url: `subscriber/channel-subscribed/${channelId}`,
      method: 'post',
    })
  );
  
  export const getChannelTotalSubscribeAsync = createAsyncThunk('subscribe/getChannelTotalSubscribeAsync', async (channelId, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/subscriber/channel-subcount/${channelId}`,
      method: 'post',
    })
  );
  
  export const getMySubscriptionAsync = createAsyncThunk('subscribe/getMySubscriptionAsync', async (toolkit) =>
    AxiosClient({
      toolkit,
      url: `/subscriber/my-subscription`,
      method: 'post',
    })
  );
  
  export const getMySubscriberAsync = createAsyncThunk('subscribe/getMySubscriberAsync', async (toolkit) =>
    AxiosClient({
      toolkit,
      url: `/subscriber/my-subscribers`,
      method: 'post',
    })
  );