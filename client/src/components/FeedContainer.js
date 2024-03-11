import React from 'react'
import Feed from '../components/Feed';

function FeedContainer({feed}) {
  return (
    <div className="grid grid-cols-1 bg-[rgb(8,41,8)] p-5 mt-5 rounded-3xl">
    {feed.length > 0 && feed.map((post, idx) => {
    return (
    <Feed post={post} idx={idx}/> 
    )})}
    </div>
  )
}

export default FeedContainer