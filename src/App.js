import {useContext,useEffect, useState} from 'react'
import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Editprofile from './Pages/EditProfilePage';
import ForgottenPassword from './Pages/ForgottenPassword';
import CreatePost from './Pages/CreatePost';
import ViewProfile from './Pages/ViewProfilePage';
import ViewPost from './Pages/PostView';
import UserProfile from './Pages/UserProfilePage';
import Favorites from './Pages/FavoritePage';
import EditPost from './Pages/EditPostPage';
import PostFilter from './Pages/PostFilterPage';
import {BrowserRouter as Router , Route}  from 'react-router-dom'
import { AuthContext, fireBaseContext } from './store/Contexts';
import Postcontext from './store/PostContext';
import UserView from './store/UserContext';
import FilterContexts from './store/FilterContexts';
import Preloader from './Components/preLoader/Preloader';

function App() {
  const {setUser } = useContext(AuthContext);
  const { firebasedb } = useContext(fireBaseContext);
  const [loading, setLoading] = useState(false);
  const [closeError,setCloseError] = useState(false);

  useEffect(() => {
    setLoading(true)
    firebasedb.auth().onAuthStateChanged((user) => {
      setUser(user)
    })
    setLoading(false)
  }, []);

  
  
  const handleOffline = () => {
    if (!window.navigator.onLine) {
      setLoading(true);
      setInterval(() => {    
        setCloseError(true);
        setTimeout(() => 
          {setCloseError(false)
        },6000);

      },60000)
    } else {
      setLoading(false);
    }
  }

useEffect(() => {
  handleOffline();
},[handleOffline])
  
  return (
    <div className="App">
      {loading && <Preloader sticky/>}
      {closeError && <div className={closeError ? "offline-indication" : 'offline-indication offline-close'}>
      You are Offline
      </div> }
        <FilterContexts>
          <Router>
              <Postcontext>
                <UserView>
                    <Route exact path='/'>
                      <Home/>
                    </Route>
                    <Route path='/signup'>
                      <Signup/>
                    </Route>
                    <Route path='/login'>
                      <Login />
                    </Route>
                    <Route path='/forgotten-password'>
                      <ForgottenPassword/>
                    </Route>
                    <Route path='/edit-profile'>
                       <Editprofile/>     
                    </Route>
                    <Route path='/view-profile'>
                       <ViewProfile/>     
                    </Route>
                    <Route path='/post'>
                       <CreatePost/>     
                    </Route>
                    <Route path='/view-more-about-post'>
                       <ViewPost/>     
                    </Route>
                    <Route path='/user-profile'>
                       <UserProfile/>     
                    </Route>
                    <Route path='/Favorites'>
                       <Favorites/>     
                    </Route>
                    <Route path='/edit-post'>
                       <EditPost/>     
                    </Route>
                    <Route path='/filter-post'>
                       <PostFilter/>     
                    </Route>
                </UserView>    
            </Postcontext>
          </Router> 
        </FilterContexts>
      </div>
  );
}

export default App;
