import React from 'react';
import { useNavigate } from "react-router-dom";

let AccountSettings = ({user, Logout}) => {

    let navigate = useNavigate();

    let handleLogout = () => {
        Logout();
        navigate('/');
    }
    
    return(
    <>
        <div className='flex flex-col items-center'>
            <h1 className="text-green-yellow text-3xl pt-3">{user}'s Account Settings</h1>
            <p style={{marginTop: 5,
                fontSize: '36px'
            }}>⚙️</p>
            <button  className="bg-white text-black p-3 rounded-3xl mt-3" onClick={() => handleLogout()}>Logout</button>
            <button className="p-4 mt-4 bg-green-yellow text-black rounded-3xl" onClick={() => {navigate('/')}}>Home</button>
        </div>
    </>
    )
}

export default AccountSettings