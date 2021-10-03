import React,{useState,useEffect,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import Preloader from "../preLoader/Preloader";
import { PostContext } from '../../store/PostContext';
import {toRupees} from '../../usefullFunctions/indianRupeeFormat';
import {fireBaseContext,AuthContext} from '../../store/Contexts'
import './favorite.css'


function Favorite() {

	const {firebasedb} = useContext(fireBaseContext)
	const {User} = useContext(AuthContext)
	const {setPost} = useContext(PostContext)
	const history = useHistory();
	let docs = []
	let posts = [];
	const [hasFavorites,setHasFavorites] = useState(false);
  	const [loading, setLoading] = useState(false);
  	const [error, setError] = useState();
  	const [closeError,setCloseError] = useState(false);
	const [favorites,setFavorites] = useState([]);

	useEffect(() => {
		let task
		firebasedb.firestore().collection("favorites").where("id","==",User && User.uid).get().then(snapshot => {
			snapshot.forEach(doc => {
				docs.push(doc.id)
				setHasFavorites(true)
			})	
		}).then(() => {
			docs.forEach(doc => {
				task = firebasedb.firestore().collection('posts').doc(doc).get().then((shot) => {
					posts.push({...shot.data(),doc})
				}).catch(err => {
					setCloseError(true)
	        		setError(err.message)
				})
			})
			task.then(() => setFavorites(posts))
		}).catch(err => {
			if(err.message === "Cannot read properties of undefined (reading 'then')") return
			setCloseError(true)
	        setError(err.message)
		})
	},[])
	

	function removeFavorite (docid,index) {
		firebasedb.firestore().collection('favorites').doc(docid).delete().then(() => {
			if (index > -1) {
				favorites.splice(index,1)
				setFavorites(favorites)
			}
			setError('Removed from favorites');
			setCloseError(true);
			if(favorites.length === 0) {
				setHasFavorites(false)
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
			<div className='favorite'>
			{hasFavorites ? (
				<div className="favorite-post-container">
					<h2>Your Favorites</h2>
					<div className="favorite-posts">
					{favorites.map((post,index) => {
          				return (
			              	<div onClick={() => {
			                    setPost(post)
			                    history.push('/view-more-about-post')
			                 }} 
			                key={index} className="card">
	                      	<div className="card-top">
	                        	<img src={post.images ? post.images[0] : ""} alt="Unable to load" />
	                        	<span className="remove-favorite" title="Remove from favorites"
	                        	onClick={(e) => {removeFavorite(post.doc,index); e.stopPropagation()}}>
		                          	<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" viewBox="0 0 16 16">
									  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
									  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
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
	                    </div> 
                	)
           		 	})
       		 		}
       		 		</div>
				</div>				
				) :
				<div className="no-favorites-container">
					<div className="favorite-no-post">					
						<h1>You have no Favorites added</h1>
		            	<button type='button' className="favorite-go-home-button" onClick={() => history.push('/')}>Go Home</button>					
					</div>
				</div>			
			}
			</div>
		</>
	)
}

export default Favorite