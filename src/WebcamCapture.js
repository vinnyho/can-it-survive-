import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';


function WebcamCapture({ dataUri, setDataUri }) {

  function handleTakePhotoAnimationDone(dataUri) {
    console.log('takePhoto');
    setDataUri(dataUri);
  }

  const isFullscreen = false;
  return (
    <div>
      {
        (dataUri)
          ? <img src={dataUri} />

          : <Camera onTakePhotoAnimationDone={handleTakePhotoAnimationDone}

            isFullscreen={isFullscreen}
          />
      }
    </div>
  );
}

export default WebcamCapture;