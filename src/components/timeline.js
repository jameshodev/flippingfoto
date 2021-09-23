import React from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';

function Timeline() {
  // get the logged in user's photos (hook)
  const { photos } = usePhotos();
  console.log('photos', photos);
  return (
    <div className="container col-span-2">
      <p>I am the Timeline</p>
    </div>
  );
}

export default Timeline;
