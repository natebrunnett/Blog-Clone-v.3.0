import React from 'react';

let Profile = ({user, feed, renderPost}) => {
    /**Sparse feed, useEffect, create userFeed with useState */
    return(
        <>
        <div className='ProfileHeader'>
            <div className='ProfileContainer'>
                <h1>{user},</h1>
                <p>Here are all your posts✨</p>
            </div>
        </div>
        <div className="filler">
        </div>
        </>
    )
}

export default Profile