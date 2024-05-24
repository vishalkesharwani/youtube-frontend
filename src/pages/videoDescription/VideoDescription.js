import React, { useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Avatar, Button, IconButton } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeStyles } from '@mui/styles';
import Iconify from '@components/iconify';
import { useNavigate, useParams } from 'react-router';
import { PATH_DASHBOARD } from '@routes/paths';
import { getAllVideosAsync, getVideoByIdAsync } from '@redux/services';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbar from '@components/scrollbar/Scrollbar';
import { hideScrollbarY } from '@utils/cssStyles';
import VideoCard from './components/VideoCard';
import VideoPlayer from './components/VideoPlayer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  videoSection: {
    position: 'relative',
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

  const { isVideoLoading, videoById, videosData } = useSelector((state) => state?.videos);

  const fetchVideo = async () => {
    await dispatch(getVideoByIdAsync(id));
  };

  const fetchVideosForSide = async () => {
    await dispatch(getAllVideosAsync());
  };


  useEffect(() => {
    fetchVideo();
    fetchVideosForSide()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('videoById', videoById);

  const { title, videoFile, views, createdAt, owner, description } = videoById;

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
            <VideoPlayer url={videoFile} />
          </div>
          <Card>
            <CardContent>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {views} Views • {timeSinceUpload(createdAt)}
              </Typography>
              <div className={classes.actions}>
                <Avatar
                  src={owner?.avatar}
                  className={classes.avatar}
                  onClick={() => navigate(PATH_DASHBOARD.profile.user(owner?.userName))}
                />
                <Typography variant="body2" color="textSecondary">
                  {owner?.fullName}
                </Typography>
                <Button variant="contained" color="primary" style={{ marginLeft: 'auto' }}>
                  Follow
                </Button>
              </div>
              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
              <div className={classes.actions}>
                <IconButton>
                  <Iconify icon="icon-park-solid:like" />
                </IconButton>
                <IconButton>
                  <Iconify icon="heroicons:share-solid" />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4.5} sx={{  ...hideScrollbarY,}} className={classes.videoList}>
          {/* <Scrollbar> */}
          {videosData.map((item, index) => (
            <VideoCard
              key={index}
              thumbnail={item?.thumbnail}
              title={item?.title}
              author={item?.owner?.fullName}
              views={item.views}
              time={timeSinceUpload(item?.createdAt)}
              avatar={item?.owner?.avatar}
            />
          ))}
          {/* </Scrollbar> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default VideoDescription;
