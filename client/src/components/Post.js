import React, { useState, useEffect } from 'react'
import axios from 'axios'
/*
    username: '',
    dateFormatted: '',
    dateRaw: '',
    albumImage: '',
    albumName: '',
    artistName: '',
    textBody: ''  
*/
function Post({payload, setPayload, user, setFeed}) {

  const [submit, setSubmit] = useState(false);
  const URL = process.env.REACT_APP_SERVER_URL;

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
      onComponentDidMountPost() 
    }

  },[submit])

  const onComponentDidMountPost = async() =>{
    try {
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


  const handlePostChanges = (e) => {
    e.preventDefault();
    setPayload({...payload,
    [e.target.name] : e.target.value });
    console.log(payload.textBody);
  }

  return (
    <>
    <div className='flex flex-col bg-[rgb(8,41,8)] mt-5 rounded-2xl mb-1 w-96'>
        <div className='flex flex-row pl-2 justify-between'>
            <div className='flex flex-col justify-center'>
            {payload.albumName != '' && <h1 className=''>{payload.albumName}</h1>}
            {payload.artistName != '' && <h1 className=''>{payload.artistName}</h1>}
            </div>
            {payload.albumImage != '' && <img className=" w-32 rounded-2xl ml-5" src={payload.albumImage}/>}
        </div>
        
    </div>
    <form
      onSubmit={submitPost}
      onChange={handlePostChanges}
      className='flex flex-row'
      >
      <textarea name="textBody" value={payload.textBody}  className='w-96 rounded-l-2xl pl-2 pt-2 h-10 text-black' placeholder={`This music is awesome! -${user}`}/>
      <button className='bg-green-yellow rounded-r-2xl text-black font-bold w-12'>Post</button>
    </form>
    </>
  )
}

export default Post