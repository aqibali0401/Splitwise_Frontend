import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

// import '../Css/login.css';
import '../Css/login2.css';


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/v1/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.             
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        localStorage.setItem("userDetails",JSON.stringify(json));
        if (json.success) {
            // save the auth token and rediredt
            localStorage.setItem('token', json.token);
            navigate('/dashbord');
            props.showAlert("Login Successfully", "success");
        } else {
            props.showAlert(json.error, "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
     
        <div className="bg-facets" >

            <div className="font-sans subpixel-antialiased login" id="" cz-shortcut-listen="true" data-new-gr-c-s-check-loaded="14.1088.0" data-gr-ext-installed="">
                <div className="containerl mx-auto-l">


                    <div className="containerl mx-auto-l px-4 modal_box  ">
                        <div className="align-center justify-center items-center ">
                            <div className=" ">
                                <div className="text-3xll   mb-4l">
                                    <strong>Log in</strong>
                                </div>

                                <form className="font-mont" onSubmit={handleSubmit}>
                                    <label htmlFor="email">Email address</label>
                                    <div className=" mb-4l">
                                        <input type="email" className='inputStyle' onChange={onChange} value={credentials.email} id="email" name="email" />
                                    </div>


                                    <label htmlFor="password">Password</label>
                                    <div className="mb-4l">
                                        <input type="password" className='inputStyle' onChange={onChange} value={credentials.password} id="password" name="password" />
                                    </div>


                                    <div className="py-4l">
                                        <button type="submit" className="cta-button block   rounded bg-teal-darker text-white shadow px-4 y-2 text-center w-full myPadding" >Log in</button>
                                    </div>
                                </form>
                                <Link className="block text-center font-mont font-semibold text-teal-darkerl py-2 loginButton" to="/forgotpassword">Forgot your password?</Link>


                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )
}

export default Login
