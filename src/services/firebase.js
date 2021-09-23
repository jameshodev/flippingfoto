import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore() // go into the database
    .collection('users') // go into collection of users
    .where('username', '==', username) // does the username field equales to the provided username?
    .get(); // if true, get that username

  return result.docs.length > 0;
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore() // go into the database
    .collection('users') // go into collection of users
    .where('userId', '==', userId) // does the username field equals to the provided username?
    .get(); // if true, get that username

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase
    .firestore() // go into the database
    .collection('users') // go into collection of users
    .limit(10)
    .get();
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

// update the  array of the profile you are following
export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // currently logged in user document ID
  profileId, // the profile ID that you requested to follow
  isFollowingProfile // true/false if you are following this profile
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

// update the array of the user who has been followed
export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId, // the logged in user doc ID
  isFollowingProfile // true/false if you are following this profile
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

// The where() method takes three parameters: a field to filter on, a comparison operator, and a value
export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  console.log('result of getPhotos ', result);
  // get all the photos from the followed user
  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  console.log('userFollowedPhotos', userFollowedPhotos);

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);

      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}
