/* eslint-disable react/prop-types */

import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Avatar, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '@routes/paths';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // padding: theme.spacing(1),
  },
  card: {
    maxWidth: 345,
    margin: 'auto', // Center the card horizontally
    background:'#000',
    // border:"1px soild",
    borderRadius: 0,
  },
  media: {
    height: 140,
  },
  gridContainer: {
    justifyContent: 'center', // Center the items horizontally in the container
    alignItems: 'center', // Center the items vertically in the container
  },
  avatar: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(-1),
  },
}));

function Video({ item }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleDescription =(e)=>{
    e.stopPropagation();
    navigate(PATH_DASHBOARD.desc.root(item?._id))
  }

  const handleProfile = (e) => {
    // e.stopPropagation(); // Stop the click event from propagating to the Card
    navigate(PATH_DASHBOARD.profile.user(item?.owner?.userName));
  }

  // Custom function to calculate time since the video was uploaded
  const timeSinceUpload = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
      return `${Math.floor(interval)  } years ago`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)  } months ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)  } days ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)  } hours ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)  } minutes ago`;
    }
    return `${Math.floor(seconds)  } seconds ago`;
  }

  return (
    <Card className={classes.card} onClick={handleDescription} sx={{cursor:'pointer', border:"1px solid"}}>
      <CardMedia className={classes.media} image={item?.thumbnail} title={item?.title}  />
      <CardContent sx={{ pt: 2, pr: 1.5 }}>
        <Box sx={{ display: 'flex' }} onClick={(e) => e.stopPropagation()}>
          <Avatar src={item?.owner?.avatar} className={classes.avatar} onClick={handleProfile} />
          <Box onClick={handleDescription}>
            <Typography variant="h6" component="h2">
              {item.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {item.owner?.fullName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item?.views} Views • {timeSinceUpload(item?.createdAt)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Video;
