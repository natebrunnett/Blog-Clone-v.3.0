import {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import axios from 'axios';
import * as jose from "jose";

import HomePage from './views/HomePage';
import Navbar from './components/Navbar';
import LoginUser from './views/LoginUser';
import AccountSettings from './views/AccountSettings';
import Profile from './views/Profile'
import RegisterUser from './views/RegisterUser'

function App() {
  const [user, setUser] = useState(null);
  const [feed, setFeed] = useState([]);
  const [spotifyToken, setSpotifyToken] = useState(null);
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const URL = process.env.REACT_APP_SERVER_URL;
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("tokenUser")));
  const [isAdmin, setAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    //API SPOTIFY
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
        setSpotifyToken(response.data.access_token);
      } catch(e){
        console.log(e)
    }
    }
    requestSpotifyToken();
    //feed from Mongodb
    const fetchFeed = async () => {
      try {
        const response = await axios.post(URL + "/feed/fetch");
        if(response.data.ok) setFeed(response.data.feedList)
        else alert("Reload, cannot fetch the feed!")
      } catch (error) {
        console.log(error);
        alert("Reload, cannot fetch the feed!")
      }   
    };
    fetchFeed();
    //Login 
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
        setUser('blogger')
        return false
      }
    }
    LocalToken();
  }, []);

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
    setUser('blogger');
    setIsLoggedIn(false);
    setAdmin(false);
  }
  
  const [loginPayload, setLogin] = useState({
    username: '',
    password: '',
    passwordTwo: '',
    email: '',
})

  return (
    <main className="bg-[rgb(1,78,1)] text-white h-screen overflow-x-hidden z-0">
    <Router>
    <Navbar user={user}/>
      <Routes>
        <Route 
          path='/'
          element={<HomePage user={user} spotifyToken={spotifyToken} feed={feed} setFeed={setFeed}/>}
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
          path='/AccountSettings'
          element={
            <AccountSettings 
              user={user}
              Logout={Logout}
              />
          }
        />
        <Route 
          path='/Profile'
          element={<Profile 
            user={user}
            feed={feed}
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
      </Routes>
    </Router>
    </main>
  );
}

export default App;
