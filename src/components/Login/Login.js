import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import './Login.css';
import { useHistory, useLocation } from "react-router";

firebase.initializeApp(firebaseConfig);
function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: '',
    success:false,
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  const {from} = location.state || {from: {pathname: "/"}};

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo:photoURL,
        };
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };


  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutuser = {
          isSignedIn: false,
          name: "",
          email: "",
          error: "",
          success: false,
        };
        setUser(signedOutuser);
      })
      .catch((err) => {});
  };
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserInfo(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log('sign in user info', res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    e.preventDefault();
  };

  const updateUserInfo = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name

      })
      .then(function () {
       console.log('user name updated successfully');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div style={{textAlign:"center"}}>
    
      <br/>
      {user.isSignedIn && (
        <div>
        </div>
      )}

      <h1> {newUser ? 'Register': 'Login'}</h1>
      <form  onSubmit={handleSubmit}>
     
        {newUser && (
          <input className="type-input"
            name="name"
            type="text"
            onBlur={handleBlur}
            placeholder="Enter Your name"
          />
        )}
        <br/>
        <input className='type-input' 
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Enter Your Email"
          required
        />
        <br />

        <input  className='type-input'
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Enter Your Password"
          required
        />
        <br />
        
        <label htmlFor="newUser">Create an account</label>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
      />
      <br/>

        <input className="button" type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>

      {user.success ? (
        <p style={{ color: "green" }}>
          User {newUser ? "created" : "Logged In"} successfully
        </p>
      ):( <p style={{ color: "red" }}>{user.error}</p>) }
     
      {user.isSignedIn ? (
        <button  className="google-btn" onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button className="google-btn" onClick={handleSignIn}>Google</button>
       )}
      
     
    </div>
  );
}


export default Login;