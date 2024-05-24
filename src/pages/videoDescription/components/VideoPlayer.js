import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Plyr from 'plyr-react';
import './player.css';
import PropTypes from 'prop-types';

const VideoPlayer = ({ url }) => {
  const videoSrc = {
    type: 'video',
    sources: [
      {
        src: url ,
        provider: "youtube"
      },
    ],
  };
  return (
    <div>
      <Plyr source={videoSrc} />
    </div>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string,
};
export default VideoPlayer;
