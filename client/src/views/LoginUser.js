import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function LoginUser({Login, loginPayload, setLogin}) {

    let navigate = useNavigate();
    const URL = process.env.REACT_APP_SERVER_URL;

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                URL + '/user/Login',
                {loginPayload})
            if(response.data.ok === true){
                Login(response.data.token)
                navigate('/')
            } else alert(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const handleInput = (e) => {
        e.preventDefault();
        setLogin({...loginPayload,
        [e.target.name] : e.target.value})
    }

    return (
    <>
        <div className='flex flex-col items-center'>
            <h1 className=" text-4xl font-bold mt-3 mb-3">Login</h1>
            <form
                onChange={handleInput}
                onSubmit={handleLogin}
                className='mb-3'
            >
            <div>
                <p className="text-green-yellow font-bold text-lg">Username</p>
                <input className="text-black rounded-3xl pl-3 h-9" name="username"/>
            </div>
            <div>
                <p className="text-green-yellow font-bold text-lg mt-2" >Password</p>
                <input className="text-black rounded-3xl pl-3 h-9" name="password" type="password"/>
            </div>
                <div className="flex justify-center mt-3">
                    <button className="bg-white text-black p-3 rounded-3xl">Submit</button>
                </div>
            </form>
            <div className="flex flex-row gap-3 items-center">
                <p>New user?</p>
                <button 
                    onClick={() => navigate('/RegisterUser')}
                    className="bg-green-yellow p-3 text-black rounded-3xl">Register</button>
            </div>    
            <button className="p-4 mt-4 bg-green-yellow text-black rounded-3xl" onClick={() => {navigate('/')}}>Home</button>
        </div>
    </>
    );
}
export default LoginUser