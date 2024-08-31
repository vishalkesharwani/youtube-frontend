/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Avatar, Button, IconButton, Box } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeStyles } from '@mui/styles';
import Iconify from '@components/iconify';
import { useNavigate, useParams } from 'react-router';
import { PATH_DASHBOARD } from '@routes/paths';
import { getAllVideosAsync, getChannelTotalSubscribeAsync, getIsChannelscribedAsync, getIsVideoLikedAsync, getVideoByIdAsync, getVideosTotalLikeAsync, toggleLikeAsync, toggleSubscribeAsync } from '@redux/services';
import { useDispatch, useSelector } from 'react-redux';
import { hideScrollbarY } from '@utils/cssStyles';
import VideoCard from './components/VideoCard';
import VideoPlayer from './components/VideoPlayer';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // padding: theme.spacing(2),
  },
  videoSection: {
    // position: 'relative',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  videoTitle: {
    padding: theme.spacing(2),
  },
  videoCard: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  videoList: {
    maxHeight: 'calc(100vh - 100px)',
    overflowY: 'auto',
    padding: theme.spacing(2),
    marginBottom: 1,
  },
}));


function VideoDescription() {
  const classes = useStyles();

  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  const { videoById, videosData } = useSelector((state) => state?.videos);
  const { likesData, videosTotalLike } = useSelector((state) => state?.likes);
  const { isSubscribed, totalChannelSubscriber } = useSelector((state) => state?.subscribeSlice);

  // fetch video
  const fetchVideo = useCallback(async () => {
    await dispatch(getVideoByIdAsync(id))
  }, [dispatch, id]);

  // fetch total likes
  const getVideosLike = useCallback(async () => {
    await dispatch(getVideosTotalLikeAsync(id))
  }, [dispatch, id]);

  // fetch videos for side bar
  const fetchVideosForSide = useCallback(async () => {
    await dispatch(getAllVideosAsync());
  }, [dispatch]);

  // fetch if video is liked by user
  const fetchIsLiked = useCallback(async () => {
    await dispatch(getIsVideoLikedAsync(id))
  }, [dispatch, id]);

  // function to check if user is subscribed to the channel
  const handleChannelscribedCheck = useCallback(async () => {
    dispatch(getIsChannelscribedAsync(id))
  }, [dispatch, id])


  // toggle subscriptions
  const handleToggleSubscribe = useCallback(async (channelId) => {
    dispatch(toggleSubscribeAsync(channelId)).then(() => {
      handleChannelscribedCheck()
      handleGetTotalSubscribers()
    })
  }, [dispatch, id])

  // total subscribers
  const handleGetTotalSubscribers = useCallback(async () => {
    dispatch(getChannelTotalSubscribeAsync(id))
  }, [dispatch, id]);

  const addLike = useCallback(async () => {
    const response = await dispatch(toggleLikeAsync(id));
    if (response?.payload?.statusCode === 200) {
      fetchIsLiked();
      getVideosLike();
    }
  }, [dispatch, fetchIsLiked, id]);

  useEffect(() => {
    if (token) {
      fetchIsLiked();
      handleChannelscribedCheck()
    }
    fetchVideo();
    fetchVideosForSide();
    getVideosLike()
    handleGetTotalSubscribers()

  }, [token, fetchIsLiked, fetchVideo, fetchVideosForSide]);


  const { title, videoFile, views, createdAt, owner = {}, description,thumbnail } = videoById || {};

  // Custom function to calculate time since the video was uploaded
  const timeSinceUpload = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
      return `${Math.floor(interval)} years ago`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)} months ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)} days ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)} hours ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };



  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7.5}>
          <div className={classes.videoSection}>
            <VideoPlayer url={videoFile}  />
          </div>
          <Card>
            <CardContent>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {views} Views • {timeSinceUpload(createdAt)}
              </Typography>
              <Box
                //  className={classes.actions}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 1
                }}
              >

                <Avatar
                  src={owner?.avatar}
                  className={classes.avatar}
                  onClick={() => navigate(PATH_DASHBOARD.profile.user(owner?.userName))}
                />
                <Box>
                <Typography variant="body2" color="textSecondary">
                  {owner?.fullName}
                </Typography>
                  <Typography variant='caption' sx={{mt:-1}}>
{totalChannelSubscriber || 0} subscribers
                  </Typography>
                  </Box>
                <Button variant={isSubscribed ? 'contained' : "outlined"} color="primary" style={{ marginLeft: 'auto' }} onClick={() => handleToggleSubscribe(id)}>
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </Button>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 1
                }}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <IconButton onClick={() => {
                    if (token) addLike()
                  }} color="secondary">
                    <Iconify icon="icon-park-solid:like" sx={{ color: likesData?.isVideoLiked ? 'red' : 'inherit' }} />
                  </IconButton>
                  <Typography variant="caption" sx={{ opacity: 0.5, mt: -1 }}>{videosTotalLike || '0'}</Typography>
                </Box>
                <IconButton>
                  <Iconify icon="heroicons:share-solid" />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4.5} sx={{ ...hideScrollbarY, }} className={classes.videoList}>
          {/* <Scrollbar> */}
          {videosData?.map((item, index) => (
            <VideoCard
              key={index}
              thumbnail={item?.thumbnail}
              title={item?.title}
              author={item?.owner?.fullName}
              views={item.views}
              time={timeSinceUpload(item?.createdAt)}
              avatar={item?.owner?.avatar}
              videoId={item._id}
            />
          ))}
          {/* </Scrollbar> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default VideoDescription;
