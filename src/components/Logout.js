import React from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';

const Logout = ({history}) => {
  // Import firebase
  const firebase = useFirebaseApp();

  // Log out function
  const handleClick = () => {
    firebase.auth().signOut();
    sessionStorage.clear();
    window.location.href="/";
  }

  return (
    <>
      <button type="button" onClick={handleClick}>Log Out</button>
    </>
  )
};

export default Logout;
