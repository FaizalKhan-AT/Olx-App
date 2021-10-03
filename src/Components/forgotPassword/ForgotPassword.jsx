import React, { useState,useContext } from 'react'
import { fireBaseContext } from '../../store/Contexts';
import Preloader from "../preLoader/Preloader";
import { Link } from 'react-router-dom'; 
import './forgot.css'
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState('')
  const [Error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const {firebasedb} = useContext(fireBaseContext)
  function forgottenPassword(e) {
    setError('')
    e.preventDefault();
    setLoading(true);
    firebasedb.auth().sendPasswordResetEmail(email).then(() => {
      setMessage('Check your Email for password reset link')
      setLoading(false)
    }).catch(err => {
      setError('Failed to reset password. '+ err.message)
      setLoading(false);
      if (!window.navigator.onLine) {
        setLoading(true)
      }else {
        setLoading(false)
      }
    })
  }
    return (
      <div className="forgot-password">
        {loading && <Preloader />}
        <div className="forgot-password-container">
          <h2 className="forgot-title">Forgotten Password</h2>
          <form onSubmit={forgottenPassword} className="forgot-form">
            <div className="form-controls-forgot">
              <input
                className="form-input-forgot"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="email-forgot"
                placeholder="e"
                required
              />
              <label htmlFor="email-forgot">Enter Email Address</label>
            </div>
            <button className="forgot-button" type="submit">
              Reset Password
            </button>
          </form>
          <Link className="forgot-login-link" to="/login">
            LogIn
          </Link>
          {message && <div className="forgot-message">{message}</div>}
          {Error && <div className="forgot-error">{Error}</div>}
        </div>
      </div>
    );
}

export default ForgotPassword
