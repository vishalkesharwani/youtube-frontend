import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "@utils/axios";

export const toggleLikeAsync = createAsyncThunk('like/toggleLikeAsync', async (id, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/like/toggle-video-like/${id}`,
      method: 'post',
    })
  );

  export const getIsVideoLikedAsync = createAsyncThunk('like/getIsVideoLikedAsync', async (id, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/like/videoliked/${id}`,
      method: 'get',
    })
  );
  
  export const getVideosTotalLikeAsync = createAsyncThunk('like/getVideosTotalLikeAsync', async (id, toolkit) =>
    AxiosClient({
      toolkit,
      url: `/like/videos-total-likes/${id}`,
      method: 'get',
    })
  );
  