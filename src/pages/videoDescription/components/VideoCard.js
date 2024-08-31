import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeStyles } from '@mui/styles';
import Image from '@components/image';
import { useNavigate } from 'react-router';

const VideoCard = ({ title, author, views, time, thumbnail,videoId }) => {

  const navigate = useNavigate();
  
  const useStyles = makeStyles((theme) => ({
    videoCard: {
      display: 'flex',
      //   alignItems: 'center',
      marginBottom: theme.spacing(2),
      height: '115px',
      borderRadius: theme.spacing(1),
      border: '1px Solid #fff',
      background: 'transparent',
    },
    media: {
      height: 60,
    },
  }));
  const classes = useStyles();

  return (
    <Card className={classes.videoCard} onClick={()=>navigate(`/dashboard/description/${videoId}`)}>
      <Stack sx={{ alignItems: 'center' }}>
        <Image
          src={thumbnail}
          //   ratio="16/9"
          //   width="115px"
          sx={{ p: 1, width: '155px', height: '95px' }}
        />
      </Stack>

      <CardContent sx={{ p: 0.5 }}>
        <Box>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {author}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {views} Views • {time}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

VideoCard.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  views: PropTypes.string,
  thumbnail: PropTypes.string,
  time: PropTypes.string,
  videoId: PropTypes.string,
};

export default VideoCard;
