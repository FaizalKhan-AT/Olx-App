import React,{useEffect,useContext,useState} from 'react';
import {Userview} from '../../store/UserContext';
import {PostContext} from '../../store/PostContext';
import {fireBaseContext,AuthContext} from '../../store/Contexts';
import './UserProfile.css';
import Preloader from "../preLoader/Preloader";
import AvatarReact from "react-avatar";
import {toRupees} from "../../usefullFunctions/indianRupeeFormat";
import {useHistory} from 'react-router-dom';


export default function UserProfile() {
	const history = useHistory();
	const {userView} = useContext(Userview);
	const {firebasedb} = useContext(fireBaseContext);
	const {User} = useContext(AuthContext);
	const {setPost} = useContext(PostContext);
  	const [Googleuser, setGoogleuser] = useState(false);
  	const [loading, setLoading] = useState(false);
  	const [error,setError] = useState();
  	const [posts,setPosts] = useState([]);
 	const [openSuccess,setOpenSuccess] = useState(false);
  	const [closeError,setCloseError] = useState(false);
  	let postData = [];

	useEffect(() => {
		if (!userView) {
	      setLoading(true);
	    } else {
	      const googleUser = userView.googleUser; 
	      if (googleUser === "google.com") {
	        setGoogleuser(true);
	      }
	      firebasedb.firestore().collection('posts').where("id",'==',userView && userView.id).get().then(snapshot => {
	      	snapshot.forEach(doc => {	      		
	      		postData.push({...doc.data(),docid:doc.id})
	      	})
	      }).then(() => setPosts(postData)).catch(err => {
	      	setCloseError(true)
	        setError(err.message)
	      })
	      setLoading(false)
	    }
	},[])

	function handleFavorite (docid) {
	    firebasedb.firestore().collection('favorites').doc(docid).set({
	      id:User && User.uid
	    }).then(() => {
	      setOpenSuccess(true)
	      setTimeout(() => {setOpenSuccess(false)},5000)
	    }).catch(err => {
	      setError(err.message)
	      setCloseError(true)
	    })
	}

	return (
		<>
			{openSuccess && <div className="handle-favorite-success">
	        	Succesfully Added to Favorites
	    	</div>}
			{loading && <Preloader sticky/>}
		    {error && <div className={closeError ? "update-errors" : 'update-errors'}>
		        <button className='close-error' title='Close' onClick={()=>{
		          setCloseError(false)
		          setError(null)
		        }}
		        >&times;</button>
		        {error}
		    </div> }
			<div className="user-profile">
				<div className="user-profile-avatar-name-container">
					<div className="view-post-profile-avatar">
			            {Googleuser ? (
			                <img
			                  className="user-profile-avatar-google"
			                  src={userView && userView.photoUrl}
			                  alt="avatar"
			                />
			              ) : (
			                <AvatarReact
			                  className="user-profile-avatar-react"
			                  size="90"
			                  round={true}
			                  name={userView && userView.username}
			                />
			            )}
			        </div>      
			        <h1>{userView && userView.username}</h1>
				</div>
				<div className="user-profile-published-ad-container">
					<h3>Published Ads</h3>
					<div className='user-profile-ads-container'>
						{posts.map((post,index) => {
							return (
							  <div 
							  	onClick={() => {
			                    setPost(post)
			                    history.push('/view-more-about-post')
			                  	}} 
		              		 	key={index} className="card">
		                      <div className="card-top">
		                        <img src={post.images ? post.images[0] : ""} alt="Unable to load" />
		                        <span className="favorite" title="Favorite"
		                        onClick={(e) => {handleFavorite(post.docid);e.stopPropagation()}}>
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
		                        </span>
		                      </div>
		                      <div className="details">
		                        <p className="price">&#x20B9; {toRupees(post.price)}</p>
		                        <p className="date-used">{post.year ? post.year : post.type} - {post.driven ? `${post.driven } Km`: post.Category}</p>
		                        <p className="card-description" title={post.title}>{post.title}</p>
		                        <div className="location-date">
		                          <span className="location-posted">{post.locationExact ? post.locationExact : 'Unknown'},{post.state ? post.state : 'Unknown'}</span>
		                          <span className="date-posted">{post.datePosted}</span>
		                        </div>
		                      </div>
	                    	</div>)})}
						</div>
					</div>
			</div>
		</>
	)
}