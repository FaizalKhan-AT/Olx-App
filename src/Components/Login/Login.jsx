import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase";
import { Link, useHistory } from "react-router-dom";
import { fireBaseContext } from "../../store/Contexts";
import Preloader from "../preLoader/Preloader";
import "./Login.css";
function Login() {
  const [ShowPasswordlog, setShowPasswordlog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const { firebasedb } = useContext(fireBaseContext);
  function showPasswordLogin() {
    const passwordInput = document.querySelector("#password-login");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      setShowPasswordlog(true);
    } else {
      passwordInput.type = "password";
      setShowPasswordlog(false);
    }
  }
  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    firebasedb
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  }
  function signinWithGoogle() {
    setLoading(true);
    setError("");
    const Provider = new firebase.auth.GoogleAuthProvider();

    firebasedb
      .auth()
      .signInWithPopup(Provider).then((response) => {
        firebasedb.firestore().collection('users').doc(response.user.uid).get().then((snapshot)=>{
          if (snapshot.exists) {
            return
          }else {
            firebasedb
           .firestore()
           .collection("users")
           .doc(response.user.uid)
           .set({
             id: response.user.uid,
             username: response.user.displayName,
             creationTime: response.user.metadata.creationTime,
             photoUrl:response.user.photoURL,
             googleUser:response.user.providerData[0].providerId
           }).catch((err) => {
            alert(err)
          }); 
          }
        })
           
      })
      .then(() => {
            setLoading(false);
            history.push("/");
          })
      .catch((err) => {
        setError(err.message);
        setError(err.email);
      });
  }
  useEffect(() => {
    handleOffline();
  }, []);
  const handleOffline = () => {
    if (!window.navigator.onLine) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="logIn">
      {loading && <Preloader />}
      <div className="login-form-container">
        <div className="login-logo">
          <svg
            width="100px"
            height="100px"
            viewBox="0 0 1024 1024"
            data-aut-id="icon"
          >
            <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
          </svg>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-controls-login">
            <input
              className="form-input-login"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email-login"
              placeholder="e"
              required
            />
            <label htmlFor="email-login">Email</label>
          </div>
          <div className="form-controls-login">
            <input
              className="form-input-login"
              type="password"
              id="password-login"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <label htmlFor="password-login">Password</label>
            <button
              type="button"
              className="eye-icon-login"
              onClick={showPasswordLogin}
              title={ShowPasswordlog ? "Hide Password" : "Show Password"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                className={ShowPasswordlog ? "show-password-svg-login" : ""}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" />
              </svg>
            </button>
          </div>
          <div className="login-warnings"></div>
          <button type="submit" className="login-btn">
            LogIn
          </button>
        </form>
        <div className="no-account">
          Don't have an account?
          <Link className="signup-link-in-form" to="/signup">
            SignUp
          </Link>
        </div>
        <Link className="forgotten-link-in-form" to="/forgotten-password">
          forgotten Password?
        </Link>

        <button onClick={signinWithGoogle} className="login-google-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Google"
            viewBox="0 0 512 512"
            width="35px"
            height="35px"
          >
            <path
              fill="#4285f4"
              d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z"
            />
            <path
              fill="#34a853"
              d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z"
            />
            <path
              fill="#fbbc02"
              d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z"
            />
            <path
              fill="#ea4335"
              d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z"
            />
          </svg>
          SignIn with Google
        </button>
        {Error && <div className="login-errors">{Error}</div>}
      </div>
    </div>
  );
}

export default Login;
