import React, {
} from 'react';
import { Link } from "react-router-dom";
import { useUser } from 'reactfire';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import Logout from '../Logout';
import Modali, { useModali } from 'modali';
import fbLogo from '../../assets/images/fb-logo-white-header.svg';

const Navigation = () => {
  const currentUser = useUser();
  const [loginModal, toggleLoginModal] = useModali({
    title: 'Login',
    animated: true
  });
  const [signupModal, toggleSignupModal] = useModali({
    title: 'Sign up',
    animated: true
  });

  return (
    <header className="header">
      <a className="fbLogo" href="http://www.franciscobenedict.com" rel="noopener noreferrer" target="_blank"><img src={fbLogo} alt="" /></a>
      <a className="btn" href="http://www.react.franciscobenedict.com/" rel="noopener noreferrer">Home</a>
      <a className="btn" href="https://github.com/franciscobenedict/firebase-simple-cms" rel="noopener noreferrer" target="_blank">Github</a>
      {
        currentUser &&
        <>
          <Logout />
        </>
      }

      {
        !currentUser &&
        <>
          <Link className="btn" to="" onClick={toggleLoginModal}>Login</Link>
          <Link className="btn" to="" onClick={toggleSignupModal}>Sign up</Link>

          <Modali.Modal {...loginModal}>
            <LoginModal />
          </Modali.Modal>

          <Modali.Modal {...signupModal}>
            <SignupModal />
          </Modali.Modal>
        </>
      }
    </header>
  );
}

export default Navigation;
