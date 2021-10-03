import React,{useState,useContext,useEffect} from 'react';
import AvatarReact from "react-avatar";
import {useHistory} from 'react-router-dom';
import './viewprofile.css';
import {AuthContext,fireBaseContext} from '../../store/Contexts';
import Preloader from "../preLoader/Preloader";
import {toMonthYear} from "../../usefullFunctions/monthYearFormat";
import {toRupees} from "../../usefullFunctions/indianRupeeFormat";
import noPost from "../../Images/no-publications.webp";
import { PostContext } from '../../store/PostContext';


export default function Viewprofile() {

	const history = useHistory();
	const {User} = useContext(AuthContext);
	const {setPost} = useContext(PostContext);
	const {firebasedb} = useContext(fireBaseContext);
  	const [Googleuser, setGoogleuser] = useState(false);
  	const [loading, setLoading] = useState(false);
  	const [userData, setUserData] = useState()
  	const [error, setError] = useState();
  	const [closeError,setCloseError] = useState(false);
  	const [posts,setPosts] = useState([]);
  	let postData = []
  	const [postExist,setPostExist] = useState(false);
  	const [postDelete,setPostDelete] = useState();
  	const [openModal,setOpenModal] = useState(false)

  	useEffect(() => {
  		if (!User) {
	      setLoading(true);
	    } else {
	      setLoading(false);
	      const googleUser = User.providerData[0].providerId;
	      if (googleUser === "google.com") {
	        setGoogleuser(true);
	      }
	      firebasedb.firestore().collection('users').doc(User && User.uid).get().then(res => {
	      	setUserData(res.data());
	      }).catch(err => {
			setCloseError(true)
	        setError(err.message)
	      })
	      firebasedb.firestore().collection('posts').where("id",'==',User && User.uid).get().then(snapshot => {
	      	snapshot.forEach(doc => {	      		
	      		postData.push({...doc.data(),docid:doc.id})
	      		setPostExist(true);
	      	})
	      }).then(() => setPosts(postData)).catch(err => {
	      	setCloseError(true)
	        setError(err.message)
	      })
	  	}
  	},[User])

  	function handleDotMenu(e) {
  		e.stopPropagation()
  		e.currentTarget.classList.toggle('show-dot-menu')	  		
  		document.querySelectorAll('.three-dots-menu').forEach(button => {
	  		if(button.classList.contains('show-dot-menu')) {
	  			button.classList.remove('show-dot-menu')
	  			e.currentTarget.classList.add('show-dot-menu')
	  		}
  		})
  		document.addEventListener('click',() => {
  			document.querySelectorAll('.three-dots-menu').forEach(button => {
		  		if(button.classList.contains('show-dot-menu')) {
		  			button.classList.remove('show-dot-menu')	
		  		}
  			})
  		})
  	}

  	function deletePost(docid,index) {
  		console.log(index)
  		firebasedb.firestore().collection('posts').doc(docid).delete().then(() => {
			if (index > -1) {
				posts.splice(index,1)
				setPosts(posts)
				console.log(posts.length)
			}
			setError('Post Deleted successfully');
			setCloseError(true);
			setOpenModal(false)
			if(posts.length === 0) {
				setPostExist(false)
			}
		})
  	}
	return (
		<>
			{loading && <Preloader sticky/>}
			{error && <div className={closeError ? "update-errors" : 'update-errors'}>
		        <button className='close-error' title='Close' onClick={()=>{
		          setCloseError(false)
		          setError('')
		          setLoading(false)
		        }}
		        >&times;</button>
		        {error}
		    </div> }
		    {openModal&&<div className="view-profile-delete-modal">
		    	<h2 className="view-profile-delete-modal-h2">Are you sure to delete this post?</h2>
		    	<h3 className="view-profile-delete-modal-h3">{postDelete && postDelete.title}</h3>
		    	<div className="view-profile-modal-buttons">
		    		<button className='view-profile-cancel-btn'
		    		onClick={() => setOpenModal(false)}>Cancel</button>
		    		<button className='view-profile-delete-btn' onClick={() => deletePost(postDelete.docid,postDelete.index)}>Delete</button>
		    	</div>
		    </div>}
			<div className='view-profile'>
				<div className="view-profile-sidebar-container">
					<div className="view-profile-avatar-container">
		              {Googleuser ? (
		                <img
		                  className="view-profile-pic"
		                  src={User && User.photoURL}
		                  alt="avatar"
		                />
		              ) : (
		                <AvatarReact
		                  className="view-profile-react-big"
		                  size="150"
		                  round={true}
		                  name={User && User.displayName}
		                />
		              )}
            		</div>
            		<div>
            			<h4 className='view-profile-member'>Member since {toMonthYear(User && User.metadata.creationTime)}</h4>
            		</div>
				</div>
				<div className="view-profile-name-post-container">	
					<div className="view-profile-name-desc-container">
						<div className="view-profile-name-button">						
							<h1>{User ? User.displayName : ""}</h1>
		            		<button type='button' className="view-profile-edit-button" onClick={() => history.push('/edit-profile')}>Edit Profile</button>
						</div>
	            		<div className="view-profile-desc">
	            			{userData ? userData.bio : ""} 
	            		</div>	            		
					</div>
					<div className="view-profile-posts-container">
						{ postExist ?
							(<div className="view-post-with-posts">
							{posts.map((post,index) => {
								
								return (
									<div key={index} className="card"
									onClick={() => {
					                  setPost(post)
					                  history.push('/view-more-about-post')
                					}}>
				                      <div className="card-top">
				                        <img src={post.images ? post.images[0] : ""} alt="Unable to load data" />
				                        <span  className='three-dots-menu' onClick={handleDotMenu}>
				                        	<div className="dot-menu-container">
				                        		<div className="dots"></div>
				                        		<div className="dots"></div>
				                        		<div className="dots"></div>
				                        	</div>
				                        </span>	
				                        <div
				                        className="dot-menu-edit-delete"
				                        onClick={(e) => e.stopPropagation()}>
				                        	<span onClick={() =>{
				                        		setPost(post)
				                        		history.push('/edit-post')
				                        	}}>Edit post</span>
				                        	<span onClick={() => {
				                        		setPostDelete({...post,index:index})
				                        		setOpenModal(true)
				                        	}}>Delete</span>
				                        </div>
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
	                    			</div>
                    			)
                    		})}
							</div>)
							:(<div className="view-profle-no-posts">
								<img src={noPost} alt="No Posts till Now"/>
								<h3>There are no Ads</h3>
								<p>When users post ads, will appear here. If you want to post something you can do it now</p>
			            		<button type='button' className="view-profile-edit-button" onClick={() => history.push('/post')}>Start selling</button>
							</div>) 
						}
					</div>
				</div>
			</div>
		</>
	)
}