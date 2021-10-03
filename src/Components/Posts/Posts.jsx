import React,{useState,useEffect,useContext} from "react";
import {useHistory} from 'react-router-dom'
import "./Post.css";
import Slider from 'react-elastic-carousel';
import { fireBaseContext,AuthContext } from '../../store/Contexts';
import { PostContext } from '../../store/PostContext';
import { BannerFilter } from '../../store/FilterContexts';
import { NavbarLocation } from '../../store/FilterContexts';
import {toRupees} from '../../usefullFunctions/indianRupeeFormat';
import Preloader from "../preLoader/Preloader";


function Posts() {

  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [sliderPost,setSliderPost] = useState([]);
  const {firebasedb} = useContext(fireBaseContext);
  const {smallBannerFilter} = useContext(BannerFilter);
  const {locationSearchVal} = useContext(NavbarLocation);
  const {User} = useContext(AuthContext);
  const {setPost} = useContext(PostContext);
  const [error,setError] = useState();
  const [closeError,setCloseError] = useState(false);
  const [openSuccess,setOpenSuccess] = useState(false);
  const [categoryTitle,setCategoryTitle] = useState();
  const [loading,setLoading] = useState(false)
  const history = useHistory();


  useEffect(() => {
    setLoading(true)
    let db = firebasedb.firestore().collection('posts').get().then(snapshot => {
      const PostsData = snapshot.docs.map(post => {
       return {...post.data(),docid:post.id}
      })
      setPosts(PostsData);
      setSliderPost(PostsData)
      setData(PostsData)
      setLoading(false)
    }).catch((err) => {
      setCloseError(true)
      setError(err.message)
    })
    return () =>db;
  },[]);
  useEffect(() => {
    filterContent()
    locationSearching()
  },[smallBannerFilter,locationSearchVal])

  function filterContent () {
    if(smallBannerFilter) {
      let newData = data.filter(post => post.Category === smallBannerFilter);
      if (newData.length !== 0) {
        setSliderPost(newData)
        setCategoryTitle(smallBannerFilter)
      }else {
        setCategoryTitle(null)
        setSliderPost(data)
      }
    }
  }  

  function locationSearching() {

    if(locationSearchVal) {
      let location = data.filter(loc => {        
        let state = loc.state
        const locationExact = loc.locationExact     
        if(state.toLowerCase().includes(locationSearchVal.toLowerCase())) {
          if(!smallBannerFilter) {return state}
          if(loc.Category === smallBannerFilter) {return state}
        }
        if(locationExact.toLowerCase().includes(locationSearchVal.toLowerCase())) {
          if(!smallBannerFilter) {return locationExact}
          if(loc.Category === smallBannerFilter) {return locationExact}
        }
      })
      
      if (location.length !== 0) {
          setSliderPost(location)
          setPosts(location)
      }else {         
          setCloseError(true)
          setError('Sorry 😪😪 ! Not Found any results for your Filters')
          setPosts(data)
          setSliderPost(data)
      }
    }
  }

  const breakpoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }]

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
          setError(null)
        }}
        >&times;</button>
        {error}
    </div> }
    <div className="posts">
      {/* quick cards */}
      <div className="quick-recommendations-container">
        <div className="recommendations-top">
          <h2 className="quick-recommendations-title">{categoryTitle ? `${categoryTitle} Recommendations` : "Quick recommendations"}</h2>
          <button className="view-more" onClick={() => history.push('/filter-post')}>View More</button>
        </div>
        <div className="card-container-quick">
          <Slider breakPoints={breakpoints}
           renderPagination={({ pages }) => {
            return (
              <div>
                {pages.map((page) => {
                  return null;
                })}
              </div>
            );
          }}>
            {
            sliderPost && sliderPost.map((post,index) => {
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
          </Slider>
        </div>
      </div>
      {/* fresh cards */}
      <h2 className="fresh-recommendations-title">Fresh recommendations</h2>
      <div className="card-container">
        {/* cards */}
        {posts.map((post,index) => {
          return (
              <div onClick={() => {
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
                    </div> 
                )
            })
        }
        <div className="card-blue">
          <div className="card-blue-top">
            <h3 className="card-blue-title">Want to see your stuff here?</h3>
            <p className="card-blue-description">
              Make some extra cash by selling things in your community.Go on,
              it's Quick and easy
            </p>
          </div>
          <div className="card-blue-bot">
            <button className="card-blue-button" onClick={() => history.push('/post')}>Start Selling</button>
          </div>
        </div>

        {/* card ending */}
      </div>
    </div>
    </>
  ); 
}

export default Posts;
