import {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import axios from 'axios';
import HomePage from './components/HomePage'
import Profile from "./components/Profile"
import Footer from "./components/Footer"
import image1 from './media/spotifyTest1.jpg'

//*Backend start*/
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'
import * as jose from "jose";
import LoginUser from "./components/LoginUser"
import RegisterUser from "./components/RegisterUser"
import Navbar from './Navbar'
import AccountSettings from './components/AcountSettings';
/*Backend end */


function AppRouter() {
  
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [testImages, setImages] = useState([]);
  const [user, setUser] = useState(null);

  /**Backend start */
    const URL = process.env.REACT_APP_SERVER_URL;
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("tokenUser")));
    const [isAdmin, setAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [feed, setFeed] = useState([]);
    

    useEffect(()=> {
      const LocalToken = async () => {
        if(token)
        {
          axios.defaults.headers.common["Authorization"] = token;
          let decodedToken = jose.decodeJwt(JSON.stringify(token));
          if(decodedToken.admin === true) 
          { const response = await axios.post(URL+'/admin/verifyToken');
            return response.data.ok ? Login(token) : Logout();}
          else
          { const response = await axios.post(URL+'/user/verifyToken');
          return response.data.ok ? Login(token) : Logout();}
        }
        else{
          console.log("Token not found!")
          return false
        }
      }
      LocalToken();
    },[])

    const Login = (token) => {
          
      let decodedToken = jose.decodeJwt(JSON.stringify(token));
      setUser(decodedToken.username);
      setAdmin(decodedToken.admin);
      setIsLoggedIn(true)
      localStorage.setItem("tokenUser", JSON.stringify(token));
      console.log(`${decodedToken.username} has been logged in`)
      setLogin({
      username: '',
      password: '',
      passwordTwo: '',
      email: '',
      })
    }

    let Logout = () => {
        localStorage.removeItem("tokenUser");
        setUser(null);
        setIsLoggedIn(false);
        setAdmin(false);
        alert("Logged out");
    }
    /*postRequest start*/
      const [payload, setPayload] = useState({
        username: '',
        dateFormatted: '',
        dateRaw: '',
        albumImage: '',
        albumName: '',
        artistName: '',
        textBody: ''
      })


    const [loginPayload, setLogin] = useState({
      username: '',
      password: '',
      passwordTwo: '',
      email: '',
  })

      const feedAdd = async() =>{
        try {
          console.log("feedAdd");
          const response = await axios.post(
            URL + '/feed/add',
            {payload}
          );
          if(response.data.ok === true){
            setPayload({
              username: '',
              dateFormatted: '',
              dateRaw: '',
              albumImage: '',
              albumName: '',
              artistName: '',
              textBody: ''
            })
            setFeed(response.data.feedList)  
        }
          console.log(response);

        } catch (error) {
          console.log(error)
        }
      }

    /*postRequest end*/


  /*Backend end */

  useEffect(()=>{
    const requestSpotifyToken = async() => {
      try{
        delete axios.defaults.headers.common["Authorization"];
        const response = await axios.post(
          'https://accounts.spotify.com/api/token',
          { 
            grant_type: 'client_credentials', 
            client_id: clientId,
            client_secret: clientSecret,
          }, 
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }        
        )
        console.log(response.data.access_token);
        setSpotifyToken(response.data.access_token);
      } catch(e){
        console.log(e)
    }
    }
    requestSpotifyToken();
    const fetchFeed = async () => {
      try {
        const response = await axios.post(URL + "/feed/fetch");
        if(response.data.ok) setFeed(response.data.feedList)
        else alert("Reload, cannot fetch the feed!")
      } catch (error) {
        console.log(error);
        alert("Reload, cannot fetch the feed!")
      }   
    }
    fetchFeed();
  }, [])

  const handlePostChanges = (e) => {
    e.preventDefault();
    setPayload({...payload,
    [e.target.name] : e.target.value });
    console.log(payload.textBody);
  }

  const [submit, setSubmit] = useState(false);

  const submitPost = (e)=> {
    e.preventDefault();
    if(user)
    {
      const newDate1 = new Date();
      setPayload({...payload, 
      username : user,
      dateFormatted: newDate1,
      dateRaw: newDate1})
      setSubmit(true)
    }
    else alert("Sign in first")
  }

  useEffect(() => {
    if(submit == true){
      setSubmit(false)
      console.log(payload)
      feedAdd() 
    }

  },[submit])

  const writePost = () => {
    return(
    <>
      <form
        onChange={handlePostChanges}
        onSubmit={submitPost}
        className='AddPostWrapper'
        >
        <div className="writeOne">
          <img src={payload.albumImage} />
        </div>
        <div className="writeTwo">
          <h1>{payload.artistName ? payload.artistName : "Select an album first"}</h1>
          <h1>{payload.albumName}</h1>
          <h1>Write out your heart!</h1>
          <textarea value={payload.textBody} name="textBody"></textarea>
          <div className="writeFour">
            <button className='buttonFormat'>Upload</button>
          </div>
        </div>
      </form>
    </>)
  }

  const renderPost = (data, idx) => {
    return(
      <>
      <div className='PostContainer' key={idx}>
        <div className='PostBulk'>
          <div className="PostLeft">
            <h1>{data.albumName}, {data.artistName}</h1>
            {(data.username === user) ? <div className='DeleteButton' onClick={() => handleDelete(data)}>
              <h1>❌</h1> </div>: <div> </div>}
          </div>
          <img src={data.albumImage} />
          <p>{data.textBody}</p>
        </div>
        <div className="postBottom">
          <h1>{data.username}</h1>
          <h1>{data.dateFormatted}</h1>
        </div>        

      </div>
      </>
    )
  }

  const handleDelete = async(data) => {
    console.log(data['_id'])
    try {
      const response = await axios.post(URL + "/feed/deleteOne", {_id : data['_id']});
      console.log(response)
      if(response.data.ok === true){
        setFeed(response.data.feed)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Router>
      <Navbar 
        user={user}
      />
      <Routes>
        <Route 
          path='/'
          element={<HomePage
            spotifyToken={spotifyToken}
            testImages={testImages}
            transitionTime={3000}
            writePost={writePost}
            renderPost={renderPost}
            user={user}
            feed={feed}
            payload={payload}
            setPayload={setPayload}
          />}
        />
        <Route
          path='/adminLogin'
          element={<AdminLogin 
            Login={Login}
            loginPayload={loginPayload}
            setLogin={setLogin}
          />}
        />
        <Route
          path='/LoginUser'
          element={<LoginUser 
            Login={Login}
            loginPayload={loginPayload}
            setLogin={setLogin}
          />}
        />
        <Route
          path='/RegisterUser'
          element={<RegisterUser 
            Login={Login}
            loginPayload={loginPayload}
            setLogin={setLogin}
          />}
        />
        <Route 
          path='/Profile'
          element={<Profile 
            user={user}
            feed={feed}
          />}
        />
        <Route
          path='/AccountSettings'
          element={
            <AccountSettings 
              user={user}
              Logout={Logout}
              />
          }
        />
      </Routes>
    <Footer />
    </Router>
  );
}

export default AppRouter;
