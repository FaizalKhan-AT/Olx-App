import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { fireBaseContext } from "../../store/Contexts";
import Preloader from "../preLoader/Preloader";
import "./Signup.css";

function Signup() {
  const [Password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const { firebasedb } = useContext(fireBaseContext);
  const history = useHistory();

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

  function showPassword() {
    const passwordInput = document.querySelector("#password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      setShowPassword(true);
    } else {
      passwordInput.type = "password";
      setShowPassword(false);
    }
  }
  function checkPassword() {
    const passwordField = document.querySelector("#password");
    const passwordWarning = document.querySelector(".password-warning");
    const submitButton = document.querySelector(".signup-btn");
    if (passwordField.value.length < 8) {
      passwordWarning.innerText = "Enter more than 8 characters !";
      submitButton.disabled = true;
      submitButton.classList.add("submit-disabled");
    } else {
      passwordWarning.innerText = "";
      submitButton.disabled = false;
      submitButton.classList.remove("submit-disabled");
    }
  }
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    firebasedb
      .auth()
      .createUserWithEmailAndPassword(Email, Password)
      .then((res) => {
        res.user.updateProfile({ displayName: Username }).then(() => {
         firebasedb.firestore().collection('users').doc(`${res.user.uid}`).set({
              id: res.user.uid,
              username: Username,
              creationTime: new Date().toGMTString()
          })
        })
      })
      .then(() => {
        setLoading(false);
        history.push("/login");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="signup">
      {loading && <Preloader />}
      <div className="signup-form-container">
        <div className="signup-logo">
          <svg
            width="100px"
            height="100px"
            viewBox="0 0 1024 1024"
            data-aut-id="icon"
          >
            <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
          </svg>
        </div>
        <form onSubmit={handleSignupSubmit} className="signup-form">
          <div className="form-controls">
            <input
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              type="text"
              id="username"
              name="username"
              required
            />
            <label htmlFor="username">User Name</label>
          </div>
          <div className="form-controls">
            <input
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              type="email"
              id="email"
              name="email"
              placeholder="e"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-controls password-controls">
            <input
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPassword();
              }}
              className="form-input"
              type="password"
              id="password"
              name="password"
              required
            />
            <label htmlFor="password">Password</label>
            <button
              type="button"
              className="eye-icon"
              onClick={showPassword}
              title={ShowPassword ? "Hide Password" : "Show Password"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                className={ShowPassword ? "show-password-svg" : ""}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" />
              </svg>
            </button>
          </div>
          <div className="password-warning"></div>

          <button className="signup-btn" type="submit">
            Sign Up
          </button>
        </form>
        <div className="already-member">
          Already a member?
          <Link className="login-link-in-form" to="/login">
            Login
          </Link>
        </div>
        {Error && <div className="signup-errors">{Error}</div>}
      </div>
    </div>
  );
}

export default Signup;
