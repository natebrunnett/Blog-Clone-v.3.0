import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function RegisterUser({Login, loginPayload, setLogin}) {

    let navigate = useNavigate();
    const URL = process.env.REACT_APP_SERVER_URL;

    const Register = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                URL + '/user/Register',
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
                <h1>Register Account</h1>
                <form
                    onChange={handleInput}
                    onSubmit={Register}
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
                <div>
                    <p>Email</p>
                    <input name="email"/>
                </div>
                    <div className="buttonWrapper">
                        <button className="buttonFormat">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        <div className="filler"></div>
        </>
    );
}
export default RegisterUser