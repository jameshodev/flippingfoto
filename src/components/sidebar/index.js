import React from 'react';
import useUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './suggestions';

function Sidebar() {
  // Destructuring user object out
  // assign to empty object {} due to initial render being undefined
  const { user: { docId, fullName, username, userId, following } = {} } =
    useUser();

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
}

export default Sidebar;

Sidebar.whyDidYouRender = true;
