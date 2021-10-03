import React,{useContext,useState,useEffect,useRef} from 'react'
import {useHistory} from 'react-router-dom'
import { AuthContext,fireBaseContext } from '../../store/Contexts';
import {NavbarLocation,SearchBarContext} from '../../store/FilterContexts';
import Avatar from '../Avatar/Avatar';
import './Navbar.css'
import { PostContext } from '../../store/PostContext';


function Navbar() {

  const {User} = useContext(AuthContext)
  const {firebasedb} = useContext(fireBaseContext)
  const {setLocationSearch} = useContext(NavbarLocation)
  const {setSearchBarValue,setSearchResults} = useContext(SearchBarContext)
  const {setPost} = useContext(PostContext);
  const history = useHistory();
  const [Scroll,setScroll] = useState(false)
  const [locationSearch,setLocationsearch] = useState()
  const [error,setError] = useState();
  const [closeError,setCloseError] = useState(false);
  const [locations,setLocations] = useState([])
  const [data,setData] = useState([])
  const [inputVal,setInputVal] = useState()
  const [locationAuto,setLocationAuto] = useState(false)
  const [searchAuto,setSearchAuto] = useState(false)
  const [searchValue,setSearchValue] = useState()
  const [searchData,setSearchData] = useState([])
  const [searchAutoData,setSearchAutoData] = useState([])
  const [uniqueState,setUniqueState] = useState(null)
  const searchValueRef = useRef()

  useEffect(() => {
   let db = firebasedb.firestore().collection('posts').get().then(res => {
      let newData = res.docs.map(doc =>{
      return {locationExact:doc.data().locationExact,state:doc.data().state}})
      let searchauto = res.docs.map(doc => {
        return {...doc.data(),docid:doc.id}
      }) 
      setData(newData)
      setLocations(newData)
      setSearchAutoData(searchauto)
      setSearchData(searchauto)
    }).catch(err => {
      setError(err.message)
      setCloseError(true)
    })
    return () => db
  },[])

  useEffect(() => {
    locationSearching()
    searchAutoComplete()
  },[locationSearch,searchValue])

  window.addEventListener('scroll', () => {
    if (window.scrollY > 550) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  })
  
  function locationSearching () {
    if(locationSearch === '') {
      setLocations(data)
      setLocationAuto(false)
    }

    if(locationSearch) {
      setLocationAuto(true)
      let location = data.filter(loc => {
        const state = loc.state
        const locationExact = loc.locationExact
        if(state.toLowerCase().includes(locationSearch.toLowerCase())) {
          return state
        }
        if(locationExact.toLowerCase().includes(locationSearch.toLowerCase())) {
          return locationExact
        }
      })

      if (location.length !== 0) {
        let uniqueLocationExactVals = [...new Set(location.map(val => {return {locationExact:val.locationExact}}))]
        let uniqueLocationStateVals = [...new Set(location.map(val => val.state))]
        const [element] = uniqueLocationStateVals
        setUniqueState(element)
        let val = uniqueLocationExactVals.map(el => {return {...el,state:element}})
        setLocations(val)
      }
    }
  }

  function searchAutoComplete() {
    if (searchValue === '') {
      setSearchData(searchAutoData)
      setSearchAuto(false)
    }
    if (searchValue) {
      setSearchAuto(true)
      let search = searchAutoData.filter(val => {
        const title = val.title
        const desc = val.description
        const category = val.Category
        const type = val.type
        let carBrand = val.carBrand
        let bikeBrand = val.BikeBrand
        if (title.toLowerCase().includes(searchValue.toLowerCase())) {
          return title
        }
        
        if (category.toLowerCase().includes(searchValue.toLowerCase())) {
          return category
        }
        if (desc.toLowerCase().includes(searchValue.toLowerCase())) {
          return category
        }
        if(type) {
          if (type.toLowerCase().includes(searchValue.toLowerCase())) {
            return type
          }
        }
        if (carBrand) {
          if(carBrand.toLowerCase().includes(searchValue.toLowerCase())) {return carBrand}
        }
        if(bikeBrand) {
          if (bikeBrand.toLowerCase().includes(searchValue.toLowerCase())) {return bikeBrand}
        }
      })
      if (search.length !== 0) {
        setSearchData(search)
      }
    }
  }

  function handleLocationInp (e) {
    setInputVal(e.target.innerText)
    setLocationSearch(document.querySelector('.location-inp').value)
    setLocationAuto(false)
    document.querySelector('.location-inp').value =''
  }

  function handleSearch (value) {
    setSearchBarValue(value)    
    setSearchAuto(false)
    if (value) {
      let searchvalue = searchAutoData.filter(post => {  
          let category = post.Category
          let carbrand = post.carBrand
          let bikebrand = post.BikeBrand
          let Type = post.type
          let title = post.title
          let stateval = post.state

          if (category.toLowerCase().includes(value.toLowerCase())) {
            return category
          }else if (carbrand && carbrand.toLowerCase().includes(value.toLowerCase())) {
            return carbrand
          }else if (bikebrand && bikebrand.toLowerCase().includes(value.toLowerCase())) {
            return bikebrand
          }else if (Type && Type.toLowerCase().includes(value.toLowerCase())) {
            return Type
          }else if (title.toLowerCase().includes(value.toLowerCase())) {
            return title
          }else if (stateval.toLowerCase().includes(value.toLowerCase())) {
            return stateval
          }else if (post.locationExact.toLowerCase().includes(value.toLowerCase())) {
            return post.locationExact
          }else if (post.description.toLowerCase().includes(value.toLowerCase())) {
            return post.description
          }
        })
        if (searchvalue.length !== 0) {          
          setSearchResults(searchvalue)
        }
      history.push('/filter-post')
      
    }
  }

  function backtoTop() {
    window.scrollTo(0, 0);
  }
    return (
      <>
       {error && <div className={closeError ? "update-errors" : 'update-errors'}>
        <button className='close-error' title='Close' onClick={()=>{
          setCloseError(false)
          setError(null)
        }}
        >&times;</button>
        {error}
      </div> }
      <div className="navbar">
        <button
          onClick={backtoTop}
          className={Scroll ? "back-to-top toTop" : "back-to-top"}
        >
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 1024 1024"
            data-aut-id="icon"
          >
            <path d="M85.392 746.667h60.331l366.336-366.336 366.336 366.336h60.331v-60.331l-408.981-409.003h-35.307l-409.045 409.003z"></path>
          </svg>
          Back to top
        </button>
        <div className="logo" onClick={() => history.push("/")}>
          <svg
            width="48px"
            height="48px"
            viewBox="0 0 1024 1024"
            data-aut-id="icon"
            style={{fill:"var(--text-color)"}}>
            <path 
              d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"
            ></path>
          </svg>
        </div>
        <ul className="nav-items">
          <li className="location">
            <span className="search">
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
            <input
              type="search"
              className="location-inp"
              placeholder={inputVal ? inputVal : "Search city, area or locality"}
            onChange={e => setLocationsearch(e.target.value)}/>
            <span className="down">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 1024 1024"
                data-aut-id="icon"
              >
                <path
                  d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"
                ></path>
              </svg>
            </span>
            {locationAuto &&<span className="location-auto-complete">
                <div>
                    <p onClick={handleLocationInp}>{uniqueState && uniqueState}</p>
                    {locations.map((val,key) => {
                      return(
                        <p key={key} onClick={handleLocationInp}>{val ? `${val.state ? val.state : ''}, ${val.locationExact}` : `${val.state}, ${val.locationExact}`}</p>
                      )
                    })}
                </div>                  
            </span>}
          </li>
          <li className="search-box">
            <input
              ref={searchValueRef}
              type="search"
              className="search-bar"
              placeholder="Find Cars, Mobile Phones and more..."
              onChange={e => setSearchValue(e.target.value)}
            />

            <button className="search-btn" onClick={() => handleSearch(searchValueRef.current.value)}>
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 1024 1024"
                data-aut-id="icon"
              >
                <path
                  d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z"
                ></path>
              </svg>
            </button>
            {searchAuto && <span className="search-auto-complete">
              {searchData.map((value,key) => {
                return (
                <div  key={key}>
                  {value.Category &&<p onClick={() => handleSearch(value.Category)}>Category: {value.Category ? value.Category : ''}</p>}               
                  {value.carBrand &&<p onClick={() => handleSearch(value.carBrand)}>Brand: {value.carBrand ? value.carBrand : ''}</p>}               
                  {value.BikeBrand &&<p onClick={() => handleSearch(value.BikeBrand)}>Brand: {value.BikeBrand ? value.BikeBrand : ''}</p>}               
                  {value.type && <p onClick={() => handleSearch(value.type)}>Type: {value.type ? value.type : ''}</p>}                  
                  {value.title && <p onClick={() => {
                    setPost(value)
                    history.push('/view-more-about-post')
                  }}>Go to: {value.title ? value.title : ""}</p>}                  
                </div>
              )})}
            </span>}
          </li>
          <li className="language">
            English
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 1024 1024"
              data-aut-id="icon" >
              <path
                d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"
              ></path>
            </svg>
          </li>
          <li className="login-sell-links">
            {User ? (
              <Avatar className="avatar-navbar"  />
            ) : (
              <span className="login" onClick={() => history.push("/login")}>
                Login
              </span>
            )}
            <button className="sell-btn">
              <span className="sell-btn-container">
                <svg width="104" height="48" viewBox="0 0 1603 768">
                  <g>
                    <path
                      fill="#ffffff"
                      d="M434.442 16.944h718.82c202.72 0 367.057 164.337 367.057 367.058s-164.337 367.057-367.057 367.057h-718.82c-202.721 0-367.058-164.337-367.058-367.058s164.337-367.058 367.058-367.058z"
                    ></path>
                    <path
                      fill="#ffce32"
                      d="M427.241 669.489c-80.917 0-158.59-25.926-218.705-73.004l-0.016-0.014c-69.113-54.119-108.754-131.557-108.754-212.474 0-41.070 9.776-80.712 29.081-117.797 25.058-48.139 64.933-89.278 115.333-118.966l-52.379-67.581c-64.73 38.122-115.955 90.98-148.159 152.845-24.842 47.745-37.441 98.726-37.441 151.499 0 104.027 50.962 203.61 139.799 273.175h0.016c77.312 60.535 177.193 93.887 281.22 93.887h299.699l25.138-40.783-25.138-40.783h-299.698z"
                    ></path>
                    <path
                      fill="#23e5db"
                      d="M1318.522 38.596v0c-45.72-14.369-93.752-21.658-142.762-21.658h-748.511c-84.346 0-165.764 21.683-235.441 62.713l3.118 51.726 49.245 15.865c54.16-31.895 117.452-48.739 183.073-48.739h748.511c38.159 0 75.52 5.657 111.029 16.829v0c44.91 14.111 86.594 37.205 120.526 66.792l66.163-57.68c-43.616-38.010-97.197-67.703-154.957-85.852z"
                    ></path>
                    <path
                      fill="#3a77ff"
                      d="M1473.479 124.453l-55.855 9.91-10.307 47.76c61.844 53.929 95.92 125.617 95.92 201.88 0 25.235-3.772 50.26-11.214 74.363-38.348 124.311-168.398 211.129-316.262 211.129h-448.812l25.121 40.783-25.121 40.783h448.812c190.107 0 357.303-111.638 406.613-271.498 9.572-31.009 14.423-63.162 14.423-95.559 0-98.044-43.805-190.216-123.317-259.551z"
                    ></path>
                  </g>
                </svg>
              </span>
              <span className="sell-text" onClick={() => history.push('/post')}>&#43; Sell</span>
            </button>
          </li>
        </ul>
      </div>
      </>
    );
}

export default Navbar
