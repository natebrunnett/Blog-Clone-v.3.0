
import React from "react";
import axios from "axios";
import {useState} from "react";
import spotifyImage from '../media/spotify.jpg';
import Result from "./Result";

let Search=({spotifyToken, payload, setPayload})=>{
      
  const [testList, setList] = useState([]);
  const [searchInput, setInput] = useState('');
      
  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchInput}&type=album`,
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
      
 return(
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-2xl">Search by album</h1>
        <form onChange={handleSearch}>
          <input 
            className="text-black rounded-xl pl-2 h-7" 
            value={searchInput}
            placeholder="ex. electronic" 
            onChange={(e) => setInput(e.target.value)}/>
        </form>

        {(testList.length > 0) ? 
        <div className="mx-2 h-64 overflow-y-auto bg-[rgb(8,41,8)] rounded-xl pl-2 snap-y snap-mandatory">
        {testList.map((item, idx) => {
        return(
          <Result item={item} idx={idx} payload={payload} setPayload={setPayload} testList={testList}/>
        )})}
        </div>
         :             
        <div className="flex items-center bg-[rgb(8,41,8)] rounded-xl">
          <div className="flex">
          <p className="w-32 pl-2">Artist</p>
          <p className="w-32">Album</p>
          <p className="w-32">Date created</p>
          </div>
          <img className="w-16 rounded-2xl" src={spotifyImage}/>
        </div>
        }
      </div>
)

}

export default Search
