import React from 'react'
import Search from '../components/Search'
import {useState} from 'react';
import Post from '../components/Post';
import FeedContainer from '../components/FeedContainer'
import Header from '../components/Header';

function HomePage({spotifyToken, user, feed, setFeed}) {

  const [payload, setPayload] = useState({
    username: '',
    dateFormatted: '',
    dateRaw: '',
    albumImage: '',
    albumName: '',
    artistName: '',
    textBody: ''
  })

  return (
  <div class="flex flex-col items-center bg-[rgb(1,78,1)]">
    <Header />
    <Search spotifyToken={spotifyToken} setPayload={setPayload} payload={payload}/>
    <Post payload={payload} user={user} setPayload={setPayload} setFeed={setFeed}/>
    <FeedContainer feed={feed} />
  </div>
  )
}

export default HomePage