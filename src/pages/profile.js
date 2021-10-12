import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';

function Profile() {
  // destructure out username from '/p/:username' from routes.js
  const { username } = useParams();
  const [user, setUser] = useState(null);
  // Check to see if the user exist
  const [userExists, setUserExists] = useState(null);
  const history = useHistory();

  // make service call to firebase
  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
        setUserExists(true);
      } else {
        setUserExists(false);
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
    console.log('user is', user);
  }, [username, history]);

  return userExists ? (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">{user.fullName}</div>
    </div>
  ) : null;
}

export default Profile;
