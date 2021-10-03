import React, { useContext,useState,useEffect,useRef } from "react";
import AvatarReact from "react-avatar";
import { AuthContext, fireBaseContext } from "../../store/Contexts";
import { useHistory,Link } from "react-router-dom";
import Preloader from '../preLoader/Preloader'
import "./avatar.css";
function Avatar() {
  const menuRef =  useRef();
  const history = useHistory();
  const { User } = useContext(AuthContext);
  const { firebasedb } = useContext(fireBaseContext);
  const [loading, setLoading] = useState(false);
  const [Googleuser, setGoogleuser] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const googleUser = User.providerData[0].providerId;
    if (googleUser === "google.com") {
      setGoogleuser(true);
    }   
  }, [])
  
  useEffect(() => {
    function handleOutsideClick(e) {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
       setOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    }
  },[open])
 
  function handleSignout() {
    setLoading(true)
    firebasedb
      .auth()
      .signOut()
      .then(() => {
          setLoading(false);
          history.push('/');
      })
      .catch((error) => {
        alert('Something went Wrong !')
    });
  }
 
    return (
            
      <>
        {loading && <Preloader />}
        <div className="avatar">
          {Googleuser ? (
            <button
              onClick={() => setOpen(!open)}
              className="avatar-button"
              type="button"
            >
              <img className="avatar-image" src={User.photoURL} alt="avatar" />
              &#x25BC;
            </button>
          ) : (
            <button
              onClick={() => setOpen(!open)}
              className="avatar-button"
              type="button"
            >
              <AvatarReact size="40" round={true} name={User.displayName} />
              &#x25BC;
            </button>
          )}

          <div
            ref={menuRef}
            className={
              open ? "avatar-dropdown avatar-drop-active" : "avatar-dropdown"
            }
          >
            <div className="avatar-dropdown-details">
              <div className="avatar-profile">
                {Googleuser ? (
                  <img
                    className="avatar-profile-pic"
                    src={User.photoURL}
                    alt="avatar"
                  />
                ) : (
                  <AvatarReact
                    className="avatar-react-big"
                    size="60"
                    round={true}
                    name={User.displayName}
                  />
                )}
              </div>
              <div className="avatar-profile-details">
                <p>Hello,</p>
                <h3>{User.displayName}</h3>        
                <Link className="edit-profile-link" to="/edit-profile">
                  View and edit profile
                </Link>
              </div>
            </div>
            <div className="divider"></div>
            <div onClick={() => history.push('/post')} className="avatar-dropdown-items">
              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><g><path d="M21.41,11.41l-8.83-8.83C12.21,2.21,11.7,2,11.17,2H4C2.9,2,2,2.9,2,4v7.17c0,0.53,0.21,1.04,0.59,1.41l8.83,8.83 c0.78,0.78,2.05,0.78,2.83,0l7.17-7.17C22.2,13.46,22.2,12.2,21.41,11.41z M12.83,20L4,11.17V4h7.17L20,12.83L12.83,20z"/><circle cx="6.5" cy="6.5" r="1.5"/></g></g></svg>
              Start Selling
            </div>
            <div onClick={() => history.push('/Favorites')} className="avatar-dropdown-items">
              <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 1024 1024"
                  data-aut-id="icon"
                >
                  <path
                    
                    d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"
                  ></path>
              </svg>
              Favorites
            </div>
            <div onClick={handleSignout} className="avatar-dropdown-items">
              <svg
                width="23px"
                height="23px"
                viewBox="0 0 1024 1024"
              >
                <path
                  d="M128 85.333l-42.667 42.667v768l42.667 42.667h768l42.667-42.667v-213.333l-42.667-42.667-42.667 42.667v170.667h-682.667v-682.667h682.667v170.667l42.667 42.667 42.667-42.667v-213.333l-42.667-42.667h-768zM494.336 298.667l-183.168 183.168v60.331l183.168 183.168h60.331v-60.331l-110.336-110.336h323.669l42.667-42.667-42.667-42.667h-323.669l110.336-110.336v-60.331h-60.331z"
                ></path>
              </svg>
              Log Out
            </div>
            
          </div>
        </div>
      </>
    );
}

export default Avatar;
