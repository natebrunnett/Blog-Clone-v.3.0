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
        <div className="FormWrapper">
            <div className='ColumnWrapper'>
                <h1>Login</h1>
                <form
                    onChange={handleInput}
                    onSubmit={handleLogin}
                    className='FormContainer'
                >
                <div>
                    <p>Username</p>
                    <input name="username"/>
                </div>
                <div>
                    <p>Password</p>
                    <input name="password"/>
                </div>
                    <div className="buttonWrapper">
                        <button className="buttonFormat">Submit</button>
                    </div>
                </form>
            <div className="ColumnWrapper">
                <p>New user?</p>
                <div className="buttonWrapper">
                <button 
                onClick={() => navigate('/RegisterUser')}
                className="buttonFormat">Register</button>
            </div>
            </div>    
            </div>
            
        </div>


        <div className="filler">
        </div>
    </>
    );
}
export default LoginUser