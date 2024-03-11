import React from "react"

/*
    username: '',
    dateFormatted: '',
    dateRaw: '',
    albumImage: '',
    albumName: '',
    artistName: '',
    textBody: ''
*/

let Feed = ({post, idx}) => {
return(
    <div key={idx} className="mb-2">
      
      <div className="flex flex-row justify-between">
      <div>
        <h1 className="font-bold text-green-yellow">
          {post.albumName}
        </h1>
        <h1 className="text-green-yellow">
          {post.artistName}
        </h1>
        <h1 className=" italic">
          {post.textBody}
          <span className="text-green-yellow"> {post.username}</span>
        </h1>
      </div>
      <img className="w-28 rounded-2xl" src={post.albumImage}/>
      </div>      

    </div>
    )}

export default Feed 
