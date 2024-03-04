import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import spotifyImage from '../media/spotify.jpg'
import { useNavigate } from "react-router-dom";

function HomePage({spotifyToken, writePost, renderPost, feed, payload, setPayload}) {

  const [testList, setList] = useState([]);
  const [searchInput, setInput] = useState('');
  const [searchType, setType] = useState('album');
  const [showWritePost, setWrite] = useState(false);
  
  let navigate = useNavigate();
  
  const LoginButton = async () => {
    navigate('/LoginUser');
  }


  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchInput}&type=${searchType}`,
      {
        headers: {
          Authorization : `Bearer ${spotifyToken}`,
        }
      })
      console.log(response);
      setList(response.data.albums.items)
    } catch (error) {
      console.log(error)
    }
  }

  const HandleSearchContainer = (idx) => {
    console.log(testList[idx]);
    setPayload({...payload,
      albumImage: testList[idx].images[0].url,
      albumName: testList[idx].name,
      artistName: testList[idx].artists[0].name
    })
  }

    return (
    <div className="AppWrapper">
      <div className="HeaderWrapper">
        <div className='HeaderContainer'>
          <h1>Spotify Forum</h1>
          <p>The Spotify Forum acts as a social media platfrom
            for music enthusiasts who want to share
            their love for music.
          </p>
          <div>
            <button 
              className="buttonFormat"
              onClick={LoginButton}
              >Login</button>
          </div>
        </div>
      </div>
      

      <div className="SearchWrapper">
        <p>Search by artist</p>
        <form
          onChange={handleSearch}>
          <input className="SearchInput" value={searchInput} onChange={(e) => setInput(e.target.value)}></input>
        </form>
          {(testList.length > 0) ? 
            <>
              <div className="SearchScrollWindow">
              {testList.map((item, idx) => {
              return(
              <div className="SearchContainer" key={idx} onClick={() => HandleSearchContainer(idx)}>
                <p className="one">{item.artists[0].name}</p>
                <p className="two">{item.name}</p>
                <p className="three">{item.release_date}</p>
                <img src={item.images[0].url}/>
              </div>
              )
              })}
            </div>
            </> :             
          <div className="SearchContainer">
            <p className="one">Search for an artist</p>
            <p className="two">by the album</p>
            <p className="three">Add the album cover image to your post!</p>
            <img src={spotifyImage}/>
          </div>
        }
      </div>

  <div className="FeedWrapper">
    <h1>Forum</h1>
    <div className="FeedNavWrapper">
      <div className="FeedNavContainer">
        <h1 className="PostTitle">Post</h1>
        <div>
          <button 
            className='buttonFormat'
            onClick={() => {setWrite(!showWritePost)}}>+</button>
        </div>
      </div>
      {showWritePost && writePost()}
    </div>
    <div className='FeedContainer'>
      {(feed.length > 0) && feed.map((data, idx) => {
        return(<>
          {renderPost(data, idx)}
        </>)
      })}
    </div>
  </div>

    </div>
    );
}

export default HomePage;