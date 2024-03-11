import React from 'react';
import { useNavigate } from 'react-router-dom';

let Profile = ({user, feed, renderPost}) => {
    /**Sparse feed, useEffect, create userFeed with useState */
    let navigate = useNavigate()
    return(
        <>
            <div className='flex flex-col items-center mt-3'>
                <h1 className='font-bold text-4xl'>{user},</h1>
                <p className='text-2xl mt-3'>Here is your profile page✨</p>
                <button onClick={()=> {navigate('/')}} className='bg-green-yellow text-black p-4 rounded-3xl mt-4'>Home</button>
            </div>
            
        </>
    )
}

export default Profile