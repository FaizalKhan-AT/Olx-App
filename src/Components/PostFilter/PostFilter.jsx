import React,{useState,useRef,useEffect,useContext} from 'react'
import  './postfilter.css'
import Preloader from "../preLoader/Preloader";
import {useHistory} from 'react-router-dom'
import { fireBaseContext,AuthContext } from '../../store/Contexts';
import {SearchBarContext} from '../../store/FilterContexts';
import { PostContext } from '../../store/PostContext';
import {toRupees} from '../../usefullFunctions/indianRupeeFormat';

export default function PostFilter() {
	const [minVal,setMinVal] = useState(null)
	const [maxVal,setMaxVal] = useState(null)
  	const [data, setData] = useState([]);
  	const {firebasedb} = useContext(fireBaseContext);
  	const [posts, setPosts] = useState([]);
  	const {searchBarValue,setSearchBarValue,searchResults,setSearchResults} = useContext(SearchBarContext);
  	const [categoryFilter,setCategoryFilter] = useState()
 	const {User} = useContext(AuthContext);
  	const {setPost} = useContext(PostContext);
  	const [error,setError] = useState();
  	const [closeError,setCloseError] = useState(false);
  	const [openSuccess,setOpenSuccess] = useState(false);
  	const [locationVal,setLocationVal] = useState()
  	const [loading,setLoading] = useState(false)
  	const history = useHistory();
	const applyBtnRef = useRef()
	const filterCategory = [
		'All',
	    'OLX Autos (Cars)',
	    'Properties',
	    'Mobiles',
	    'Jobs',
	    'Bikes',
	    'Electronics & Appliances',
	    'Commercial Vehicles & Spares',
	    'Furniture',
	    'Fashion',
	    'Books, Sports & Hobbies',
	    'Pets',
	    'Services'   
	]


	useEffect(() => {
		setLoading(true)	
	 	let db = firebasedb.firestore().collection('posts').get().then(snapshot => {
	      const PostsData = snapshot.docs.map(post => {
	       return {...post.data(),docid:post.id}
	      })

	      setData(PostsData)
	      if (searchBarValue&&searchResults.length !== 0 ){
	      	filterSearchBar()
	      } else {
	      	setPosts(PostsData)
	      }
	    }).catch((err) => {
	      setCloseError(true)
	      setError(err.message)
	    })
	    document.querySelector('input[value=All]').checked = true
	    setLoading(false)	    
	    return () => db; 
	},[])

	useEffect(() => {
		handleMinMax()
		filterContent()
		filterSearchBar()
	},[minVal,maxVal,categoryFilter,searchResults])

	function handleCheckbox (e) {
		setCategoryFilter(e.target.value)
		document.querySelectorAll('.post-filter-all-categories-input').forEach(inp => {
			if (inp.checked) {
				inp.checked = false
				setSearchBarValue(null)
				setSearchResults([])
			}
		})
		e.currentTarget.checked = true
	}
	
	function filterContent () {
	    if(categoryFilter) {
	      let newData = data.filter(post => {
	      	if (categoryFilter === 'All') return post
	      	return post.Category === categoryFilter	      	
	      });
	      if (newData.length !== 0) {
	        setPosts(newData)
	      }else {	      	
	      	setCloseError(true)
	      	setError('Sorry 😪😪 ! Not Found any results for your Filters')
	        setPosts(data)
	      }
	    }    
  	}

  	function filterLocation () {
  		if (locationVal === '') {
  			setPosts(data)
  		}
		if (locationVal) {
			if (categoryFilter === "All") {setSearchBarValue(null)}
	    	let location = data.filter(post => {
	    		const locationExact = post.locationExact
	    		let state = post.state
	    		const category = post.Category
	    		if (locationExact.toLowerCase() === locationVal.toLowerCase()) {
	    			if(categoryFilter === "All") {return locationExact}
	    			if(!categoryFilter) {return locationExact}
	    			if(category === categoryFilter) {return locationExact}
	    		}
	    		if (locationExact.toLowerCase().includes(locationVal.toLowerCase())) {
	    			if(categoryFilter === "All") {return locationExact}
	    			if(!categoryFilter) {return locationExact}
	    			if(category === categoryFilter) {return locationExact}
	    		}
	    		if(state.toLowerCase() === locationVal.toLowerCase()){
	    			if(categoryFilter === "All") {return state}
	    			if(!categoryFilter) {return state}
	    			if(category === categoryFilter) {return state}
	    		}
		    	if(state.toLowerCase().includes(locationVal.toLowerCase())){
	    			if(categoryFilter === "All") {return state}
	    			if(!categoryFilter) {return state}
	    			if(category === categoryFilter) {return state}
	    		}
	    	})
	    	if (location.length !== 0) {
	    		setPosts(location)	    		
	    	}else {
	    		setCloseError(true)
	      		setError('Sorry 😪😪 ! Not Found any results for your Filters')	     
	    		setPosts(data)
	    	}
	    }
  	}

  	function filterBudget() {
  		if(minVal&&maxVal) {
			if (categoryFilter === "All") {setSearchBarValue(null)}  			
  			let budget = data.filter(post => {
  				const price = parseFloat(post.price)			
  				const category = post.Category
  				const minValue = parseFloat(minVal)
  				const maxValue = parseFloat(maxVal)  		
  				if (price >= minValue&& price <= maxValue) {
  					if(categoryFilter === 'All') {return price}
  					if(!categoryFilter) {return price}
  					if (category === categoryFilter) {return price}
  				}  				
  			}) 

  			if (budget.length !== 0) {
  				setPosts(budget)
  			}else {
  				setCloseError(true)
	      		setError('Sorry 😪😪 ! Not Found any results for your Filters')	     
	    		setPosts(data)
  			}  			  	
  		}
  	}

  	function filterSearchBar() {  	
	  	if(searchBarValue) {	  		
			if (searchResults.length !== 0) {
				setPosts(searchResults)  	
			}else {
				setCloseError(true)
		  		setError('Sorry 😪😪 ! Not Found any results for your Filters')	     
				setPosts(data)	    		
			}

	  	}
  	}	


	function handleMinMax() {
		if (!minVal&&!maxVal) {
			applyBtnRef.current.disabled = true
		}else {
			applyBtnRef.current.disabled = false			
		}
	}

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
		{loading && <Preloader/>}
		{openSuccess && <div className="handle-favorite-success">
        	Succesfully Added to Favorites
    	</div>}
    	{error && <div className={closeError ? "update-errors" : 'update-errors'}>
        <button className='close-error' title='Close' onClick={()=>{
	          setCloseError(false)
	          setError(null)
	        }}
	    >&times;</button>
        	{error}
    	</div> }
		<div className='post-filter'>
			<div className="post-filter-siderbar-filter">
				<h2 className='post-filter-h2'>Free classifieds</h2>
				<div className="post-filter-categories">
					<h3 className="post-filter-categories-title">CATEGORIES</h3>
					<h5 className="post-filter-categories-sub-title">&#9135; All Categories</h5>
					<div className="post-filter-all-categories-container">
						{filterCategory.map((value,key) => {
							return (
								<label key={key} className="post-filter-all-categories-label">
									<input className="post-filter-all-categories-input" type="checkbox" name="category" value={value}
									onChange={handleCheckbox}/>
									{value}
								</label>
							)
						})
						}
					</div>
				</div>
				<div className="post-filter-location">
					<h3 className="post-filter-location-title">LOCATIONS</h3>
					<h5 className="post-filter-location-sub-title">&#9135; Locations</h5>
					<div className="post-filter-location-container">
						<div className="post-filter-search-container">
							<input className="post-filter-search-inp" type="search" placeholder='Search Locations' 
							onChange={(e) => setLocationVal(e.target.value)}/>
							<span className='post-filter-loc-svg' onClick={filterLocation}>
								<svg
					                width="25px"
					                height="25px"
					                viewBox="0 0 1024 1024"
					                data-aut-id="icon">
					                <path
					                  d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z"
					                ></path>
					            </svg>
				            </span>
						</div>
					</div>
				</div>
				<div className="post-filter-budget">
					<h3 className="post-filter-budget-title">BUDGET</h3>
					<h5 className="post-filter-budget-sub-title">&#9135; Filters</h5>
					<div className="post-filter-budget-container">
						<div className="post-filter-inp-container">
							<input className="post-filter-budget-inp" type="text" placeholder='Min' onChange={(e) => setMinVal(e.target.value)}/>
							<span>To</span>
							<input className="post-filter-budget-inp" type="text" placeholder='Max' onChange={(e) => setMaxVal(e.target.value)}/>								
						</div>
						<button ref={applyBtnRef} className="post-filter-budget-apply" onClick={filterBudget}>Apply</button>
					</div>
				</div>
			</div>
			<div style={{width:'100%'}}>
				{searchBarValue && <h2 className='post-filter-h2-title'>You Searched For "{searchBarValue && searchBarValue}"</h2>}
				<div className="post-filter-posts-container">
					{
			            posts.map((post,index) => {
			             return (
			               <div key={index} className="card" 
			               onClick={() => {
			                  setPost(post)
			                  history.push('/view-more-about-post')
			                }}>
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
			                    <span className="location-posted" >{post.locationExact ? post.locationExact : 'Unknown'},{post.state ? post.state : 'Unknown'}</span>
			                    <span className="date-posted">{post.datePosted ? post.datePosted : ''}</span>
			                  </div>
			                </div>
			            </div> 
		            ) 
		            })
		            }
				</div>
			</div>
		</div>
		</>
	)
}