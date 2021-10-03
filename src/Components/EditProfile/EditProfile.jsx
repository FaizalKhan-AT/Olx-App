import React, { useContext, useEffect, useState } from "react";
import AvatarReact from "react-avatar";
import Preloader from "../preLoader/Preloader";
import {useHistory} from 'react-router-dom';
import { AuthContext,fireBaseContext } from "../../store/Contexts";
import "./editProfile.css"; 

function EditProfile() {
  const { User } = useContext(AuthContext);
  const {firebasedb} = useContext(fireBaseContext)
  const [Googleuser, setGoogleuser] = useState(false);
  const [userData,setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName ] = useState();
  const [warningName, setWarningName] = useState(false);
  const [warningBio, setWarningBio] = useState(false);
  const [username, setUsername] = useState();
  const [bio , setBio] = useState();
  const [phone,setPhone] = useState();
  const [email, setEmail] = useState(); 
  const [name,setName] = useState();
  const [error, setError] = useState();
  const [closeError,setCloseError] = useState(false);
  const currentUser = firebasedb.auth().currentUser;
  const [nameLength, setNameLength] = useState();
  const [bioLength, setBioLength] = useState();
  const history = useHistory();
   window.onbeforeunload = function() { 
    window.setTimeout(function () { 
        window.location = '/';
    }, 0); 
    window.onbeforeunload = null;}


  useEffect(() => {
    if (!User) {
      setLoading(true);
    } else {
      setUsername(User.displayName)
      setDisplayName(User && User.displayName);
      const googleUser = User.providerData[0].providerId;
      if (googleUser === "google.com") {
        setGoogleuser(true);
      }

      firebasedb.firestore().collection('users').doc(User.uid).get().then(snap => {
        setUserData(snap.data())
      }).catch(err => {
        setCloseError(true)
        setError(err.message)
      })
        setLoading(false);   
    }

  },[User]);
  useEffect(() => {
    LengthChangeInput();
  },[setNameLength,setBioLength])

  function LengthChangeInput() {
    const textArea = document.querySelector(".edit-profile-textarea");
    const userName = document.querySelector(".input-profile-username");
        setNameLength(username && username.length)
        setBioLength(userData.bio && userData.bio.length )
    textArea.addEventListener('input',(e) => {
      setBioLength(e.target.value.length)
      if(e.target.value.length > 200) {
        setWarningBio(true)
      }else {
        setWarningBio(false)
      }
    })
    userName.addEventListener('input',(e) => {
      setNameLength(e.target.value.length)      
      if(e.target.value.length > 30) {
        setWarningName(true)
      }else {
        setWarningName(false)
      }
    })
  }
  function  updateProfileInfo () {
    
    if( name !== currentUser.displayName && name){
          setLoading(true)
          currentUser.updateProfile({displayName:name}).then(() => {
            firebasedb.firestore().collection('users').doc(User.uid).update({
              username: name
            }).then(() => {
              setLoading(false)
              history.push('/view-profile')
            })
          }).catch((err) => {
            setCloseError(true)
            setError(err.message)
          })     
    }
    if(bio) {
      setLoading(true)
      firebasedb.firestore().collection('users').doc(User.uid).update({
          bio: bio
        }).then(() => {
          setLoading(false)
          history.push('/view-profile')
        }).catch((err) => {
          setCloseError(true)
          setError(err.message)
        })
    }else {
      setLoading(true)
      if (userData.bio) {
        setLoading(false)
        history.push('/view-profile')
        return
      }
      firebasedb.firestore().collection('users').doc(User.uid).update({
          bio: null
        }).then(() => {
          setLoading(false)
          history.push('/view-profile')
        }).catch((err) => {
          setCloseError(true)
          setError(err.message)
        })
    }
    if(phone){
      setLoading(true)
      firebasedb.firestore().collection('users').doc(User.uid).update({
          phone: phone
        }).then(() => {
          setLoading(false)
          history.push('/view-profile')
        }).catch((err) => {
          setCloseError(true)
          setError(err.message)
        })
    }else {
      setLoading(true)
      if (userData.phone) {
          setLoading(false)
          history.push('/view-profile')
          return
      }
      firebasedb.firestore().collection('users').doc(User.uid).update({
          phone: null
        }).then(() => {
          setLoading(false)
          history.push('/view-profile')
        }).catch((err) => {
          setCloseError(true)
          setError(err.message)
        })
    }
    if(email !== currentUser.email && email){
      setLoading(true)
      currentUser.updateEmail(email).then(() => {
        setLoading(false)
        history.push('/view-profile')
      }).catch((err) => {
        setCloseError(true)
        setError(err.message)
      })
    }
    
 
  }

  return (
    <>
      {loading && <Preloader sticky/>}
      {error && <div className={closeError ? "update-errors" : 'update-errors update-close'}>
        <button className='close-error' title='Close' onClick={()=>{
          setCloseError(false)
          setLoading(false)
        }}
        >&times;</button>
        {error}
      </div> }
            
      <div className="edit-Profile">
        <div className="sidebar-edit-profile">
          <div className="sidebar-contents-edit">
            <h3 className="sidebar-title-edit">Edit Profile</h3>
            <button className="view-profile-btn" onClick={() => history.push('/view-profile')} >View Profile</button>
          </div>
        </div>
        <div className="edit-profile-container">
          <h2 className="profile-title">Edit Profile</h2>
          <p className="basic-info-title">Basic information</p>
          <div className="basic-information-container">
            <div className="basic-input-profile">
              <input
                className={
                  (warningName
                    ? "input-profile-username profile-input-warn"
                    : "input-profile-username")
                }
                placeholder="Username"
                defaultValue={displayName && `${name ? name : displayName}`}
                type="text"
                onChange={(e) =>setName(e.target.value) }
              />
              <span
                className={
                  (warningName
                    ? "length-of-text profile-input-warn"
                    : "length-of-text")
                }
              >
                {nameLength ? nameLength : 0} / 30
              </span>
              <textarea
                className={
                  warningBio
                    ? "edit-profile-textarea profile-input-warn"
                    : "edit-profile-textarea"
                }
                placeholder="About me (Optional)"
                defaultValue={userData.bio && `${ bio ? bio : userData.bio}` }
                cols="30"
                rows="10"
                onChange={(e)=> {
                  setBio(e.target.value)
                }}
              ></textarea>
              <span
                className={
                  warningBio
                    ? "length-of-bio profile-input-warn"
                    : "length-of-bio"
                }
              >
               {bioLength ? bioLength : 0} / 200
              </span>
            </div>
            <div className="avatar-profile-page">
              {Googleuser ? (
                <img
                  className="edit-profile-pic"
                  src={User && User.photoURL}
                  alt="avatar"
                />
              ) : (
                <AvatarReact
                  className="edit-avatar-react-big"
                  size="130"
                  round={true}
                  name={User && User.displayName}
                />
              )}
            </div>
          </div>
          <div className="separator-line"></div>
          <p className="contact-info-title-edit">Contact information</p>
          <div className="contact-information-container">
            <div className="contact-input-profile">
              <input
                className="input-profile-phone"
                type="tel"
                placeholder="Mobile Number"
                defaultValue={userData.phone && `${phone ? phone : userData.phone}`}
                onChange={(e) => {
                  setPhone(e.target.value)
                }}
              />
              <input
                type="email"
                className="email-profile-container"
                placeholder={User && `Your Email : ${User.email}`}
                defaultValue={User && `${email ? email :User.email}`}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="separator-line"></div>
          <div className="button-profile-controls">
            <button className="discard-btn-edit" onClick={() => history.push('/view-profile')}>Discard</button>
            <button className="save-btn-edit" onClick={updateProfileInfo}>Save Changes</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
