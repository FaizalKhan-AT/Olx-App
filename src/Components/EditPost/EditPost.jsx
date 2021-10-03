import React,{useState,useContext,useEffect} from 'react'
import { PostContext } from '../../store/PostContext';
import {fireBaseContext} from '../../store/Contexts';
import Preloader from "../preLoader/Preloader";
import {useHistory} from 'react-router-dom';
import  './editPost.css'

function EditPost() {
	const {post} = useContext(PostContext);
	const {firebasedb} = useContext(fireBaseContext);
	const history = useHistory();	
	const [loading,setLoading] = useState(false)
	const [error,setError] = useState()
  	const [closeError,setCloseError] = useState(true);
	const [titleLength,setTitleLength] = useState()
	const [descLength,setDescLength] = useState()
	const [descLengthError,setDescLengthError] = useState(false)
	const [titleLengthError,setTitleLengthError] = useState(false);
	const [postData,setPostData] = useState();
	const [title,setTitle] = useState(post.title)
	const [desc,setDesc] = useState(post.description)
	const [price,setPrice] = useState(post.price)
	const [state,setState] = useState(post.state)
	const [location,setLocation] = useState(post.locationExact)
	const [phone,setPhone] = useState(post.phone)

	useEffect(() => {
		LengthChangeInput()
		setPostData(post)
	},[])

	function LengthChangeInput() {
	    const adDesc = document.querySelector("#setAdDesc");
	    const adTitle = document.querySelector("#setAdTitle");

	    adDesc.addEventListener('input',(e) => {
	    	setDescLength(e.target.value.length)
	    	if(e.target.value.length > 4096) {
	    		setDescLengthError(true)
	    	}else {
	    		setDescLengthError(false)

	    	}
	    })
	    adTitle.addEventListener('input',(e) => {
	    	setTitleLength(e.target.value.length)
	    	if(e.target.value.length > 70) {
	    		setTitleLengthError(true)
	    		
	    	}else {
	    		setTitleLengthError(false)

	    	}
	    });
    }

    function handlePostUpdate () {
    	let task
    	setLoading(true)
    	if(title !== postData.title) {
    		task = firebasedb.firestore().collection('posts').doc(postData && postData.docid).update({
    			title:title
    		}).catch(err => {
    			setCloseError(true)
	        	setError(err.message)
    		})
    	}
    	if(desc !== postData.description) {
    		task = firebasedb.firestore().collection('posts').doc(postData && postData.docid).update({
    			description:desc
    		}).catch(err => {
    			setCloseError(true)
	        	setError(err.message)
    		})
    	}
    	if(price !== postData.price) {
    		task = firebasedb.firestore().collection('posts').doc(postData && postData.docid).update({
    			price:price
    		}).catch(err => {
    			setCloseError(true)
	        	setError(err.message)
    		})
    	}
    	if(state !== postData.state) {
    		task = firebasedb.firestore().collection('posts').doc(postData && postData.docid).update({
    			state:state
    		}).catch(err => {
    			setCloseError(true)
	        	setError(err.message)
    		})
    	}
    	if(location !== postData.locationExact) {
    		task = firebasedb.firestore().collection('posts').doc(postData && postData.docid).update({
    			locationExact:location
    		}).catch(err => {
    			setCloseError(true)
	        	setError(err.message)
    		})
    	}
    	if(phone !== postData.phone) {
    		task = firebasedb.firestore().collection('posts').doc(postData && postData.docid).update({
    			phone:phone
    		}).catch(err => {
    			setCloseError(true)
	        	setError(err.message)
    		})
    	}
    	task.then(() => {
    		setLoading(false)
    		history.push('/view-profile')
    	})
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
			<div className='create-ad-navbar'>
				<div className="logo-ad-navbar" onClick={() => history.push("/")}>
		          <svg
		            width="60px"
		            height="60px"
		            viewBox="0 0 1024 1024"
		            data-aut-id="icon">
		            <path
		              
		              d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"
		            ></path>
		          </svg>
		        </div>
			</div>
			{/*navbar end*/}
			<div className="create-ad-container">
				<div className="create-ad-title">EDIT YOUR AD</div>
				<div className='create-ad-form-container'>				
					<form className='create-ad-form'>			
						<div className='create-ad-set-title-desc'>
							<label>Ad Title *</label>						
							<div className='create-ad-set-title'>
								<input id='setAdTitle' className={titleLengthError ? 'create-ad-set-title-input create-ad-form-input-error' : 'create-ad-set-title-input' } type='text' 
								 required defaultValue={title} onChange={(e) => {
								 	setTitle(e.target.value)
								 }}/>
								<div className='create-ad-set-title-spans'>
									<span className='create-ad-set-title-sub'>Mention the key features of your item (e.g. brand, model, age, type)</span>
									<span className='create-ad-set-title-length'>{titleLength ? titleLength : 0} / 70</span>
							</div>
							</div>
							<label >Description *</label>
							<div className='create-ad-set-desc'>
								<textarea id="setAdDesc" className={descLengthError ? 'create-ad-set-desc-input create-ad-form-input-error':'create-ad-set-desc-input'} 
								 required defaultValue={desc}
								 onChange={(e) => {
								 	setDesc(e.target.value)
								 }}></textarea>
								<div className='create-ad-set-desc-spans'>
									<span className='create-ad-set-desc-sub'>Include condition, features and reason for selling</span>
									<span className='create-ad-set-desc-length'>{descLength ? descLength : 0} / 4096</span>
								</div>
							</div>
							
						</div>

						<div className='create-ad-set-price'>
							<div className='create-ad-set-price-title'>SET A PRICE</div>
							<div className='create-ad-set-price-input' >
								<span className='create-ad-set-price-input-icon'>&#8377;</span>
								<input defaultValue={price} onChange={(e) => {
								 	setPrice(e.target.value)
								 }}  type='tel' required/>	
							</div>
						</div>
						<div className='create-ad-set-location'>
							<div className='create-ad-set-location-title'>SET YOUR LOCATION</div>
							<div className='create-ad-location'>
								<label >Your State *</label>
								<div className='create-ad-set-location-input' >
									<input defaultValue={state} onChange={(e) => {
								 	setState(e.target.value)
								 }} type='text' required/>	
								</div>
								<br/>
							</div>
							<label > Your Location *</label>
							<div className='create-ad-set-location-input' >
								<input defaultValue={location} onChange={(e) => {
								 	setLocation(e.target.value)
								 }} type='text'  required/>	
							</div>
						</div>
						<div className='create-ad-set-phone'>
							<div className='create-ad-set-phone-title'>ENTER YOUR PHONE NUMBER</div>
							<div className='create-ad-set-phone-input' >
								<span className='create-ad-set-phone-input-icon'>+91</span>
								<input defaultValue={phone} onChange={(e) => {
								 	setPhone(e.target.value)
								 }} type='tel'  required/>	
							</div>
						</div>
						<div className="edit-post-button-cotainer">
							<button className="edit-post-discard-btn" type='button' onClick={()=> history.push('/view-profile')}>Discard</button>
							<button className="edit-post-submit-btn" type='button' onClick={handlePostUpdate}>Save Changes</button>
						</div>
					</form>
				</div>			
			</div>
			{/*footer*/}
			<div className='create-ad-footer'>
				<div>Sitemap</div>
				<div>Free Classifieds in India. © 2006-2021 OLX</div>
			</div>
		</>
	)
}

export default EditPost