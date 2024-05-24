
import React from 'react';
import { Grid, Card, CardContent, Typography, Avatar, Button, IconButton } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeStyles } from '@mui/styles';
import Iconify from '@components/iconify';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from '@routes/paths';
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
    marginBottom:1
  },
}));

const data = [
  { title: 'How does a browser work?', author: 'Maluma', views: '100K Views', time: '18 hours ago', avatar: 'path/to/avatar1.jpg', image: 'path/to/image1.jpg' },
  { title: 'Building a multi million dollar app', author: 'Jonas Brothers', views: '100K Views', time: '18 hours ago', avatar: 'path/to/avatar2.jpg', image: 'path/to/image2.jpg' },
  // Add more data here
];



function App() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7.5}>
          <div className={classes.videoSection}>
            <VideoPlayer url='https://www.youtube.com/watch?v=zQYtiU7qPso' />
          </div>
          <Card>
            <CardContent>
              <Typography variant="h6">Lex Fridman plays Red Dead Redemption 2</Typography>
              <Typography variant="body2" color="textSecondary">
                109,067 Views • 18 hours ago
              </Typography>
              <div className={classes.actions}>
                <Avatar src="path/to/lex-fridman-avatar.jpg" className={classes.avatar} onClick={()=>navigate(PATH_DASHBOARD.profile.user('sandeep'))} />
                <Typography variant="body2" color="textSecondary">
                  Lex Fridman
                </Typography>
                <Button variant="contained" color="primary" style={{ marginLeft: 'auto' }}>
                  Follow
                </Button>
              </div>
              <Typography variant="body2" color="textSecondary">
                TimUrban is the author of the blog Wait But Why and a new book Whats Our Problem? A Self-Help Book for Societies...
              </Typography>
              <div className={classes.actions}>
                <IconButton>
             <Iconify icon='icon-park-solid:like' />
                </IconButton>
                <IconButton>
                 <Iconify icon='heroicons:share-solid' />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4.5} className={classes.videoList}>
          {data.map((item, index) => (
            <VideoCard
              key={index}
              title={item.title}
              author={item.author}
              views={item.views}
              time={item.time}
              avatar={item.avatar}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
