import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Plyr from 'plyr-react';
import './player.css';
import PropTypes from 'prop-types';

const VideoPlayer = ({ url }) => {

  const videoRef = useRef(null);

  // useEffect(() => {
  //   const player = videoRef.current.plyr;

  //   const timeUpdateHandler = () => {
  //     // Check if the current time is less than or equal to 10 seconds
  //     if (player.currentTime <= 10) {
  //       console.log('Video played for the first 10 seconds');
  //       // Remove the event listener to prevent multiple console logs
  //       player.off('timeupdate', timeUpdateHandler);
  //     }
  //   };

  //   // Add event listener for timeupdate
  //   player.on('timeupdate', timeUpdateHandler);

  //   // Clean up function to remove event listener when component unmounts
  //   return () => {
  //     player.off('timeupdate', timeUpdateHandler);
  //   };
  // }, [url]);

  
  const videoSrc = {
    type: 'video',
    sources: [
      {
        src: url ,
        // provider: "youtube"
      },
    ],
  };
  return (
    <div>
      <Plyr ref={videoRef} source={videoSrc} />
    </div>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string,
};
export default VideoPlayer;
