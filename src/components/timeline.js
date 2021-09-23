/* eslint-disable no-nested-ternary */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';

function Timeline() {
  // get the logged in user's photos (hook)
  const { photos } = usePhotos();
  // on loading the photos, we need to use react skeleton
  // if we have photos, render them (creat a post componet)
  // if the user has no photos, tell them to create some photos
  return (
    <div className="container col-span-2">
      {/* load skeleton when the photos hasn't loaded yet */}
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : photos?.length > 0 ? (
        photos.map((content) => <p key={content.docId}>{content.imageSrc}</p>)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos!</p>
      )}
    </div>
  );
}

export default Timeline;
