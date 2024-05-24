/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
// /* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideosAsync } from '@redux/services';
import Video from './components/Video';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // padding: theme.spacing(1),
  },
  gridContainer: {
    justifyContent: 'center', // Center the items horizontally in the container
    alignItems: 'center', // Center the items vertically in the container
  },
}));


function Home() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { isVideoLoading, videosData } = useSelector((state)=>state?.videos)

  const fetchVideos = async () => {
    await dispatch(getAllVideosAsync());
  };

  useEffect(() => {
    fetchVideos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.gridContainer}>
        {videosData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Video item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
