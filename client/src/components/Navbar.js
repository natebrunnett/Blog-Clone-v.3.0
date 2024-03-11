import React from 'react';
import { useNavigate } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

let Navbar = ({user}) => {
  let navigate = useNavigate();
  return (
    <>
    <div className='flex bg-[rgb(8,41,8)] w-screen overflow-w-hidden items-center justify-between pl-1 pr-5 md:px-32 lg:px-60 xl:px-96 2xl:justify-center'>
        <div className='flex flex-row gap-2 cursor-pointer items-center 2xl:pr-80'>
        <IoSettingsSharp 
        size={"32px"}
        className='my-1'
        onClick={() => { if (user === null) {alert("Log on first")}
                  else{
                    navigate("/AccountSettings")}
                }
              }/>
        </div>
        <div className='flex items-center gap-2 cursor-pointer 2xl:pl-80'
        onClick={() => { if (user === null) {alert("Log on first")}
        else{
          navigate("/Profile")}
        }
         }>
            <h1 className='text-white'>{user}</h1>
            <CgProfile 
            size={"32px"}
            />
        </div>
    </div>
    </>
  )
}

export default Navbar