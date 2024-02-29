import React from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function AdminLogin({Login, loginPayload, setLogin}) {

    let navigate = useNavigate();
    const URL = process.env.REACT_APP_SERVER_URL;

    const submitLogin = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                URL + '/admin/login',
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
        <div className="FormWrapper">
            <div className='ColumnWrapper'>
                <h1>Admin login</h1>
                <form
                    onChange={handleInput}
                    onSubmit={submitLogin}
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
            </div>
        </div>
    );
}

export default AdminLogin;