import React from 'react';

const CurrentUser = () => {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  return (
    <div className="center-text vh-50">
        Welcome {username ? username : "guest, please login"} {role ? `(${role})` : ''}
    </div>
  );
};

export default CurrentUser;

