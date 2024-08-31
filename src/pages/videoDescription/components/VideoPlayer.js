import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr-react';
import './player.css';
import PropTypes from 'prop-types';

const VideoPlayer = React.memo(({ url }) => {

  const videoRef = useRef(null);
  
  const videoSrc = {
    type: 'video',
    sources: [
      {
        src: url ,
        // provider: "youtube"
      },
    ],
  };

  useEffect(() => {
    const player = videoRef.current.plyr;

    const handleTimeUpdate = () => {
      console.log('player.currentTime', player?.currentTime);
    };

    player.on('timeupdate', handleTimeUpdate);

    // Cleanup event listener on component unmount
    return () => {
      player.off('timeupdate', handleTimeUpdate);
    };
  }, [videoRef]);

  return (
    <div>
      <Plyr ref={videoRef} source={videoSrc} />
    </div>
  );
});

VideoPlayer.propTypes = {
  url: PropTypes.string,
};
export default VideoPlayer;
