import React,{useState,useContext,useEffect} from 'react';
import Slider from 'react-elastic-carousel';
import {toRupees} from '../../usefullFunctions/indianRupeeFormat';
import {toMonthYear} from '../../usefullFunctions/monthYearFormat';
import {fireBaseContext,AuthContext} from '../../store/Contexts';
import {PostContext} from '../../store/PostContext';
import {Userview} from '../../store/UserContext';
import AvatarReact from "react-avatar";
import Preloader from "../preLoader/Preloader";
import {useHistory} from 'react-router-dom';
import './View.css';
  
function ViewPost() {

	const history = useHistory();
	const {firebasedb} = useContext(fireBaseContext);
	const {User} = useContext(AuthContext);
	const {post} = useContext(PostContext);
	const {setUserView} = useContext(Userview);
  const [Googleuser, setGoogleuser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postData,setPostData] = useState();
  const [postImages,setPostImages] = useState([]);
  const [dataLoading,setDataLoading] = useState(false);
  const [error,setError] = useState();
  const [closeError,setCloseError] = useState(false);
  const [date,setDate] = useState();
  const [userDetails,setUserDetails] = useState();
  const [carsCategory,setCarsCategory] = useState(false);
  const [otherCategory,setOtherCategory] = useState(false);
  const [propCategory,setPropCategory] = useState(false);
  const [openSuccess,setOpenSuccess] = useState(false);


	useEffect(() => {
		setLoading(true);
		setPostData(post);
		setPostImages(post.images);

		if (postData) {
			firebasedb.firestore().collection('users').doc(post.id).get().then(res => {
					setUserDetails(res.data());
			}).then(() => {
      	setDate(toMonthYear(userDetails && userDetails.creationTime));
			}).catch((err) => {
				setError(err.message);
				setCloseError(true)
			});
			
			if (postData.Category === 'OLX Autos (Cars)') {
    		setCarsCategory(true);
    	}else if (postData.Category === 'Properties'){
    		setOtherCategory(true)
    		setPropCategory(true);
    	}else {
    		setOtherCategory(true);
    	}

			setDataLoading(true);
			setLoading(false);
		}

		if (!userDetails) {
      setLoading(true);
    } else {
      const googleUser = userDetails.googleUser; 
      if (googleUser === "google.com") {
        setGoogleuser(true);
      }
      setLoading(false)
    }
	},[postData,userDetails]);

  const breakpoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1, itemsToScroll: 1 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }];

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
      {loading && <Preloader sticky/>}
      {openSuccess && <div className="handle-favorite-success">
        Succesfully Added to Favorites
    	</div>}
      {error && <div className={closeError ? "update-errors" : 'update-errors'}>
        <button className='close-error' title='Close' onClick={()=>{
          setCloseError(false)
        }}
        >&times;</button>
        {error}
      </div> }
			 <div className='view-post'>
					{dataLoading && <div className='view-post-slider-details-container'>
						<div className='view-post-slider-container'>
							<div className='view-post-main-slider'>
								<Slider breakPoints={breakpoints}
									renderPagination={({pages,activePage, onClick}) => {
				            return (
				              <div className='view-post-pagination'>
				                {postImages.map((img,index) => {
				                  return <img key={index} src={img} alt="slider"/>
				                })}
				              </div>
			            		);
			          		}}
			       			>
									{
										postImages.map((image,index) => {
											return (
												<img className='view-post-slider-img' key={index} src={image} alt='slider'/>
											)
										})
									}
								</Slider>
							</div>
						</div>
						<div className='view-post-price-dec-details-container'>
								<div className="view-post-price-container">
									<div className="view-post-price">
										<h1>&#x20B9; {toRupees(postData && postData.price)}</h1>
										<span className="view-post-favorite" title="Favorite"
										onClick={(e) => {handleFavorite(post.docid);e.stopPropagation()}}>
	                    <svg
	                      width="24px"
	                      height="24px"
	                      viewBox="0 0 1024 1024">
	                      <path
	                        
	                        d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"
	                      ></path>
	                    </svg>
	                  </span>
									</div>
									<div className="view-post-km-year">
	                  <p className="view-post-date-used">{postData.year ? postData.year : postData.type} - {postData.driven ? `${postData.driven } Km`: postData.Category}</p>
									</div>
									<div className="view-post-title">
										<p>{postData && postData.title}</p>
									</div>
									<div className="view-post-date-time">
										<span className="location-posted">{postData.locationExact ? postData.locationExact : 'Unknown'},{postData.state ? postData.state : 'Unknown'}</span>
	                  <span className="date-posted">{postData.datePosted ? postData.datePosted : ''}</span>
									</div>
								</div>
								<div className="view-post-seller-container">
									<h2>Seller description</h2>
									<div className="view-post-profile-avatar" 
									onClick={() => {
										setUserView(userDetails)
										history.push('/user-profile')
									}}>
			              {Googleuser ? (
			                <img
			                  className="view-post-avatar-google"
			                  src={userDetails && userDetails.photoUrl}
			                  alt="avatar"
			                />
			              ) : (
			                <AvatarReact
			                  className="view-post-avatar-react"
			                  size="90"
			                  round={true}
			                  name={userDetails && userDetails.username}
			                />
			            )}
			             <div className="view-post-username-joined">
			            		<h3>{userDetails && userDetails.username}</h3>
			            		<br/>
			            		<h4>Member since {date ? date : "Someday"}</h4>
			             </div>
			            <span className='view-post-arrow'>❯</span>
	              </div>
	              <p className='view-post-phone-number'>
		              <span>
		             	 <svg width="29px" height="29px" viewBox="0 0 1024 1024" data-aut-id="icon"  fill-rule="evenodd"><path d="M784.555 852.395c-331.435-14.635-598.315-281.515-612.949-612.949l149.973-59.989 91.691 183.424-70.997 35.499v26.453c0 141.653 115.243 256.896 256.896 256.896h26.453l11.861-23.637 23.68-47.36 183.381 91.733-59.989 149.931zM918.101 643.456l-256.939-128.469-57.472 19.2-30.037 60.032c-74.069-11.093-132.736-69.803-143.872-143.872l60.075-30.037 19.157-57.429-128.427-256.939-54.187-20.608-214.187 85.632-26.88 39.808c0 401.365 326.571 727.893 727.936 727.893l39.765-26.88 85.632-214.187-20.608-54.187z"></path></svg>
		              </span> 
	              {postData ? postData.phone : 'Contact info unknown' }</p>
							</div>
						<div className="view-post-place-container">
							<h2>Posted In</h2>
							<br/>
	            <p className='location-posted'>{postData.locationExact ? postData.locationExact : 'Unknown'},{postData.state ? postData.state : 'Unknown'}</p>						
						</div>
					</div>
				</div>}
			{carsCategory && <div className="view-post-cars-container">
				<div className="view-post-cars-title-basic-info">
					<h1 className='cars-info-title'>{postData && postData.title}</h1>
					<h3 className="cars-info-brand">{postData.carBrand ? postData.carBrand : "Brand unknown"}</h3>
					<div className="cars-info">
						<div className="cars-info-icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 14 13" version="1.1">
							    <defs>
							        <rect id="path-1" x="0" y="0" width="14" height="13"/>
							    </defs>
							    <g id="PWA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							        <g id="ADPV-V1.1-" transform="translate(-38.000000, -419.000000)">
							            <g id="Group-6" transform="translate(38.000000, 419.000000)">
							                <mask id="mask-2" fill="white">
							                    <use href="#path-1"/>
							                </mask>
							                <g id="Mask"/>
							                <g opacity="0.739629836" mask="url(#mask-2)" stroke="#002F34">
							                    <g transform="translate(1.000000, 0.000000)">
							                        <polyline id="Path-10" points="-6.09036631e-15 2.6 -6.09036631e-15 9.53333333 1.85153404 9.53333333"/>
							                        <path d="M9.50980308,0.5 L3.71927877,0.5 L1.90290095,2.22529753 L1.90290095,12.5 L11.1886152,12.5 L11.1886152,2.17661696 L9.50980308,0.5 Z" id="Rectangle"/>
							                        <rect id="Rectangle" x="3.61718666" y="3.53333333" width="5.85714286" height="2.46666667"/>
							                    </g>
							                </g>
							            </g>
							        </g>
							    </g>
							</svg>
							<p>{postData && postData.carFuel}</p>
						</div>
						<div className='cars-info-icon'>
							<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 14 12" version="1.1">
						    <g id="PWA" stroke="none" stroke-width="1" fill="#000" fill-rule="evenodd" opacity="0.746791295">
					        <g id="ADPV-V1.1-" transform="translate(-146.000000, -420.000000)" fill="#002F34">
				            <g id="element/icon/millage/thin-copy-3" transform="translate(146.000000, 420.000000)">
				              <path d="M7.00017142,0.333333333 C10.6763162,0.333333333 13.6666667,3.3380404 13.6666667,7.03167677 C13.6666667,8.49539394 13.4865004,10.1727273 12.1490989,11.515899 L12.1490989,11.515899 L11.7863731,11.6666667 L2.2139697,11.6666667 L1.85090212,11.5152121 C0.513158737,10.1668889 0.33299243,8.49161616 0.333333817,7.0309899 C0.333676173,3.33769697 3.32471037,0.333333333 7.00017142,0.333333333 Z M7.00017142,1.36363636 C3.88982405,1.36363636 1.35929083,3.90608081 1.35894868,7.0309899 C1.35860708,8.72480808 1.67244517,9.78876768 2.43413498,10.6363636 L2.43413498,10.6363636 L11.5668916,10.6363636 C12.3275558,9.79254545 12.641052,8.72824242 12.641052,7.03167677 C12.641052,3.90608081 10.1105188,1.36363636 7.00017142,1.36363636 Z M10.4189211,3.59729899 L10.4189211,4.32057172 L10.0958525,4.64546061 L10.0979037,4.64717778 L8.64050531,6.11089495 C8.79298002,6.38358182 8.88049914,6.69748081 8.88049914,7.03164242 C8.88049914,8.07293535 8.03710202,8.92053131 7.00020561,8.92053131 C5.96330919,8.92053131 5.11991208,8.07293535 5.11991208,7.03164242 C5.11991208,5.99034949 5.96330919,5.14275354 7.00020561,5.14275354 C7.33216288,5.14275354 7.64394974,5.23067273 7.91505388,5.38281414 L7.91505388,5.38281414 L9.3724523,3.91875354 L9.37587102,3.92150101 L9.69893963,3.59729899 L10.4189211,3.59729899 Z M7.00020561,6.17305657 C6.52910661,6.17305657 6.14552673,6.55804646 6.14552673,7.03164242 C6.14552673,7.50523838 6.52910661,7.89022828 7.00020561,7.89022828 C7.4713046,7.89022828 7.85488448,7.50523838 7.85488448,7.03164242 C7.85488448,6.55804646 7.4713046,6.17305657 7.00020561,6.17305657 Z" id="Combined-Shape"/>
				            </g>
					        </g>
						    </g>
							</svg>
							<p>{toRupees(postData && postData.driven)} km</p>
						</div>
						<div className='cars-info-icon'>
							<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 14 10" version="1.1">
							    <g id="PWA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.739327567">
							        <g id="ADPV-V1.1-" transform="translate(-255.000000, -421.000000)" stroke="#002F34">
							            <g id="Group" transform="translate(255.000000, 421.000000)">
							                <circle id="Oval" cx="2" cy="2" r="1.5"/>
							                <circle id="Oval-Copy-3" cx="2" cy="8" r="1.5"/>
							                <circle id="Oval-Copy" cx="7" cy="2" r="1.5"/>
							                <circle id="Oval-Copy-4" cx="7" cy="8" r="1.5"/>
							                <circle id="Oval-Copy-2" cx="12" cy="2" r="1.5"/>
							                <line x1="2" y1="3.5562714" x2="2" y2="6.35894784" id="Path-8"/>
							                <polyline id="Path-7" points="2 5 12 5 12 3.5562714"/>
							                <line x1="7" y1="3.5562714" x2="7" y2="6.35894784" id="Path-8-Copy"/>
							          </g>
								      </g>
								    </g>
							</svg>
							<p>{postData && postData.carGear}</p>
						</div>
					</div>
				</div>	
				<div className="view-post-cars-location-posted-info">
					<div className="cars-location-title-container">
						<h1 className='cars-location-title'>Overview</h1>
					</div>
					<div className="cars-location-posted-container">
						<div className="cars-location-info">
							<span className="cars-location-icon">
								<svg xmlns="http://www.w3.org/2000/svg"  width="35px" height="35px" viewBox="0 0 24 24" version="1.1">
							    <g id="PWA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							        <g id="ADPV-V1.1-" transform="translate(-137.000000, -473.000000)">
							            <g id="Icons/ic_pinfilled-Copy" transform="translate(137.000000, 473.000000)">
							                <g id="Group-2">
							                    <path d="M12,2 C16.9628571,2 21,5.97468354 21,10.8607595 C21,15.6977215 15.4837714,20.3488608 13.3016571,22 L13.3016571,22 L10.6988571,22 C8.51674286,20.3488608 3,15.6977215 3,10.8607595 C3,5.97468354 7.03765714,2 12,2 Z M12,3.51898734 C7.88828571,3.51898734 4.54285714,6.8121519 4.54285714,10.8607595 C4.54285714,15.2632911 10.3419429,19.8425316 12,21.0612658 C13.6575429,19.8410127 19.4571429,15.2562025 19.4571429,10.8607595 C19.4571429,6.8121519 16.1122286,3.51898734 12,3.51898734 Z M12.0002571,7.06303797 C14.1273429,7.06303797 15.8574,8.76632911 15.8574,10.8605063 C15.8574,12.9546835 14.1273429,14.6579747 12.0002571,14.6579747 C9.87317143,14.6579747 8.14311429,12.9546835 8.14311429,10.8605063 C8.14311429,8.76632911 9.87317143,7.06303797 12.0002571,7.06303797 Z M12.0002571,8.58202532 C10.7243143,8.58202532 9.68597143,9.6043038 9.68597143,10.8605063 C9.68597143,12.1167089 10.7243143,13.1389873 12.0002571,13.1389873 C13.2762,13.1389873 14.3145429,12.1167089 14.3145429,10.8605063 C14.3145429,9.6043038 13.2762,8.58202532 12.0002571,8.58202532 Z" id="Combined-Shape" fill="#002F34"/>
							                    <rect id="Rectangle" x="0" y="0" width="24" height="24"/>
							                </g>
							            </g>
							        </g>
							    </g>
								</svg>
							</span>
							<div className="cars-location-infos-conatainer">
								<p>Location</p>
								<h3>{postData.locationExact ? postData.locationExact : 'Unknown'},{postData.state ? postData.state : 'Unknown'}</h3>
							</div>
						</div>
						<div className="cars-location-info">
							<span className="cars-location-icon">
								<svg width="35px" height="35px" viewBox="0 0 24 24" version="1.1" >
								    <defs>
								        <rect id="path-1" x="0" y="0" width="24" height="24"></rect>
								    </defs>
								    <g id="PWA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
								        <g id="ADPV-V1.1-" transform="translate(-25.000000, -559.000000)">
								            <g id="element/icon/calendar/thin-copy-3" transform="translate(25.000000, 559.000000)">
								                <mask id="mask-2" fill="white">
								                    <use href="#path-1"></use>
								                </mask>
								                <g id="Mask"></g>
								                <g mask="url(#mask-2)" fill="#002F34" id="Combined-Shape">
								                    <g transform="translate(4.000000, 3.000000)">
								                        <path d="M4.55315668,0.666666667 L4.55315668,1.72151899 L11.4610655,1.72151899 L11.4610655,0.666666667 L12.6801082,0.666666667 L12.6801082,1.72151899 L15.3071453,1.72151899 L15.9166667,2.35443038 L15.9166667,16.7004219 L15.3071453,17.3333333 L0.692854699,17.3333333 L0.0833333333,16.7004219 L0.0833333333,2.35443038 L0.692854699,1.72151899 L3.33411395,1.72151899 L3.33411395,0.666666667 L4.55315668,0.666666667 Z M14.6976239,7.20675105 L1.30237606,7.20675105 L1.30237606,16.0675105 L14.6976239,16.0675105 L14.6976239,7.20675105 Z M4.35002353,9.42185654 C4.85511356,9.42185654 5.26430557,9.847173 5.26430557,10.3712236 C5.26430557,10.8956962 4.85511356,11.3205907 4.35002353,11.3205907 C3.84493349,11.3205907 3.43574148,10.8956962 3.43574148,10.3712236 C3.43574148,9.847173 3.84493349,9.42185654 4.35002353,9.42185654 Z M3.33411395,2.98734177 L1.30237606,2.98734177 L1.30237606,5.94092827 L14.6976239,5.94092827 L14.6976239,2.98734177 L12.6801082,2.98734177 L12.6801082,4.25316456 L12.0705869,4.88607595 L11.4614718,4.25316456 L11.4614718,4.04219409 L11.4610655,4.04219409 L11.4610655,2.98734177 L4.55315668,2.98734177 L4.55315668,4.25316456 L3.94404166,4.88607595 L3.33411395,4.25316456 L3.33411395,2.98734177 Z"></path>
								                    </g>
								                </g>
								            </g>
								        </g>
								    </g>
								</svg>
							</span>
							<div className="cars-location-infos-conatainer">
								<p>Posting date</p>
								<h3>{postData.datePosted ? postData.datePosted : 'Unknown date'}</h3>
							</div>
						</div>
					</div>
				</div>
				<div className="view-post-cars-description">
					<h1 className='cars-desc-title'>Description</h1>
					<div className="cars-desc-container">
						{postData.description ? postData.description : "No description provided"}
					</div>
				</div>								
			</div>}
			{otherCategory &&<div className="view-post-others-container">
				<div className="other-category-details-desc-container">
					<h2>Details</h2>
					{propCategory ?
						(<div className="prop-details-container">
							<p>Type : {postData.type ? postData.type : "Type unknown"}</p>
							<p>Bathrooms : {postData.propertyBath ? postData.propertyBath : "Beds unknown"}</p>
							<p>Area : {postData.squarefeet ? postData.squarefeet : "Area unknown (sqft)"} Sqft</p>
							<p>Bedrooms : {postData.propertyBed ? postData.propertyBed : "Beds unknown"}</p>
							<p>Furnished : {postData.propertyFurnishing ? postData.propertyFurnishing : "Furnishing unknown"}</p>
							<p>Listed by : {postData.propertyListedby ? postData.propertyListedby : "Listed by unknown"}</p>
						</div>)
					:(<div className="others-category-container">
							<p>Type : {postData.type ? postData.type : "Type unknown"}</p>
							{postData.VehicleItem && <p>Vehicle type : {postData.VehicleItem ? postData.VehicleItem : "Type unknown"}</p>}
							{postData.MobileBrand && <p>Make : {postData.MobileBrand ? postData.MobileBrand : "Make unknown"}</p>}
							{postData.BikeBrand && <p>Brand : {postData.BikeBrand ? postData.BikeBrand : "Brand unknown"}</p>}
							{postData.driven && <p>km Driven : {postData.driven ? toRupees(postData.driven) : "unknown drive"} Km</p>}
							{postData.year && <p>Year of Make : {postData.year ? postData.year : "No year of purchase"}</p>}
							{postData.salaryPeriod && <p>Salary Period : {postData.salaryPeriod ? postData.salaryPeriod : "No salary period"}</p>}
							{postData.JobPosition && <p>Position : {postData.JobPosition ? postData.JobPosition : "No postion"}</p>}
							{postData.Salaryfrom && <p>Salary from : {postData.Salaryfrom  ? postData.Salaryfrom  : "No Salary from"}</p>}
							{postData.Salaryto && <p>Salary to : {postData.Salaryto ? postData.Salaryto : "No Salary to"}</p>}
							{postData.fashionFor && <p>Fashion for : {postData.fashionFor ? postData.fashionFor : "No fashion for"}</p>}
						</div>)}	
					<h2>Description</h2>
					<div className="others-desc-container">
						{postData.description ? postData.description : "No description provided"}
					</div>
				</div>
			</div>}
		</div>
	</>
	)
}

export default ViewPost;