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
        <form className='FormWrapper'>
            <div className='ColumnWrapper'>
                <h1>{user}'s Account Settings</h1>
                <p style={{marginTop: 5,
                    fontSize: '36px'
                }}>⚙️</p>
                <div className="buttonWrapper">
                    <button onClick={() => handleLogout()}>Logout</button>
                </div>
            </div>
        </form>
        <div className="filler">
        </div>
    </>
    )
}

export default AccountSettings