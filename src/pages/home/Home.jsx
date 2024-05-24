/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
// /* eslint-disable import/no-extraneous-dependencies */
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
    // background:'#000',
    borderRadius:0
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
    marginLeft: theme.spacing(-1)
  },
}));

const data = [
  { title: 'How to learn react | A React Roadmap', author: 'Yash Mittal', views: '100K Views', time: '18 hours ago', image: 'path/to/image1.jpg', avatar: 'path/to/avatar1.jpg' },
  { title: 'How much I made with 70M views', author: 'Arnau Ros', views: '100K Views', time: '18 hours ago', image: 'path/to/image2.jpg', avatar: 'path/to/avatar2.jpg' },
  { title: 'How much I made with 70M views', author: 'Arnau Ros', views: '100K Views', time: '18 hours ago', image: 'path/to/image2.jpg', avatar: 'path/to/avatar2.jpg' },
  { title: 'How much I made with 70M views', author: 'Arnau Ros', views: '100K Views', time: '18 hours ago', image: 'path/to/image2.jpg', avatar: 'path/to/avatar2.jpg' },
  { title: 'How much I made with 70M views', author: 'Arnau Ros', views: '100K Views', time: '18 hours ago', image: 'path/to/image2.jpg', avatar: 'path/to/avatar2.jpg' },
  { title: 'How much I made with 70M views', author: 'Arnau Ros', views: '100K Views', time: '18 hours ago', image: 'path/to/image2.jpg', avatar: 'path/to/avatar2.jpg' },
  { title: 'How much I made with 70M views', author: 'Arnau Ros', views: '100K Views', time: '18 hours ago', image: 'path/to/image2.jpg', avatar: 'path/to/avatar2.jpg' },
  { title: 'How much I made with 70M views', author: 'Arnau Ros', views: '100K Views', time: '18 hours ago', image: 'path/to/image2.jpg', avatar: 'path/to/avatar2.jpg' },
  { title: 'How much I made with 70M views', author: 'Arnau Ros', views: '100K Views', time: '18 hours ago', image: 'path/to/image2.jpg', avatar: 'path/to/avatar2.jpg' },
  { title: 'How much I made with 70M views', author: 'Arnau Ros', views: '100K Views', time: '18 hours ago', image: 'path/to/image2.jpg', avatar: 'path/to/avatar2.jpg' },
  { title: 'How much I made with 70M views', author: 'Arnau Ros', views: '100K Views', time: '18 hours ago', image: 'path/to/image2.jpg', avatar: 'path/to/avatar2.jpg' },
  { title: 'How much I made with 70M views', author: 'Arnau Ros', views: '100K Views', time: '18 hours ago', image: 'path/to/image2.jpg', avatar: 'path/to/avatar2.jpg' },
  // ...add more data here
];

function ResponsiveGrid() {
  const classes = useStyles();
  const navigate = useNavigate()

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.gridContainer}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className={classes.card} onClick={()=>navigate(PATH_DASHBOARD.desc.root('sdfghjk'))}>
              <CardMedia
                className={classes.media}
                image='https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg'
                title={item.title}
              />
              <CardContent sx={{pt:2,pr:1.5}}>
                <Box sx={{ display:'flex'}} >
                  <Avatar src='https://api-prod-minimal-v510.vercel.app/assets/images/avatars/avatar_1.jpg' className={classes.avatar} />
                  <Box>
                    <Typography variant="h6" component="h2">
                      {item.title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {item.author}
                    </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.views} • {item.time}
                </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ResponsiveGrid;


