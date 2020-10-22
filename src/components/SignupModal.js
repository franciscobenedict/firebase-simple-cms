import React, {
  useState,
} from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import history from '../store/history';

// const SignupModal = ({history}) => {
const SignupModal = () => {
  console.log('history', history);

  // User State
  const [user, setUser] = useState({
    nickname: '',
    email: '',
    password: '',
    error: '',
  });

  const [ nickname, setNickname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const isInvalid = email === '' || password === '';

  // onChange function
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: '',
    })
  };

  // Import firebase
  const firebase = useFirebaseApp();

  // Submit function (Create account)
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Sign up code here.
    await firebase.auth()
      .createUserWithEmailAndPassword(
        // user.nickname,
        user.email,
        user.password
      )
      .then(result => {
        // Update the nickname
        result.user.updateProfile({
          displayName: user.nickname,
        });

        // URL of my website.
        const myURL = { url: 'http://www.simplecms.franciscobenedict.com/' }

        // Send Email Verification and redirect to my website.
        result.user.sendEmailVerification(myURL)
          .then(() => {
            setUser({
              ...user,
              verifyEmail: `Welcome ${user.nickname}. To continue please verify your email.`,
            })

            if (result.user) {
              if (result.user.emailVerified === false) {

                // Sign Out the user.
                firebase.auth().signOut();
                window.location.href="/emailnotverified";
                // history.push("/emailnotverified");
              }
            }
          })
      }).catch(error => {
        // Update the error
        console.log(error);
        setUser({
          ...user,
          error: error.message,
        })
      });
  }

  // signInWithGoogle
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        window.location.href="/";
        // history.push('/home');
      })
      .catch(error => {
        // Update the error
        console.log(error);
        setUser({
          ...user,
          error: error.message,
        })
      });
    })
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Email login */}
        <div className="modali-subheading">Sign up with your email address</div>
        <input
          type="text"
          placeholder="Nickname"
          name="nickname"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          onBlur={handleChange}
        /> <br />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={handleChange}
        /> <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={handleChange}
        /> <br />
        <button disabled={isInvalid} type="submit" className="button submit_btn form_button">Sign up</button>
        {user.error && <p className="error">{user.error}</p>}

        <hr />

        {/* Google register button */}
        <div className="modali-subheading">Sign up with your Google account</div>
        <button onClick={() => handleGoogleLogin()} className="button form_button flex_align_center" type="button">
          <div className="button_text flex_align_center">
            <span className="aligned_element">Register With Google</span>
          </div>
          <span className="button_divider"></span>
          <div className="button_image flex_align_center">
            <img className="googleBtn aligned_element"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="logo"
            />
          </div>
        </button>
      </form>
      <div className="modali-footer"></div>
    </>
  )
};

export default SignupModal;
