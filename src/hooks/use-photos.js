import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getPhotos, getUserByUserId } from '../services/firebase';

function usePhotos() {
  const [photos, setPhotos] = useState(null);
  // destructure user, then uid, then change uid to userId from firebase
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimeLinePhotos() {
      // give a list of userIds that the account is following
      // const followingUserIds = await getUserByUserId(userId);
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];

      // is the user following anyone
      if (following) {
        followedUserPhotos = await getPhotos(userId, following);
      }
      // sort photos from newest to oldest by date
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);

      setPhotos(followedUserPhotos);
    }
    getTimeLinePhotos();
  }, [userId]);

  return { photos };
}

export default usePhotos;
