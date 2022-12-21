import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Css/signUp.css';


const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: '', email: "", password: "", cpassword: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/v1/auth/createuser`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.             
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    if (json.success) {
      // save the auth token and rediredt
      // localStorage.setItem('token', json.authtoken);
      navigate('/login');
      props.showAlert("Account created Successfully", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (

    <div>
      <div id="fat_rabbit" data-new-gr-c-s-check-loaded="14.1088.0" data-gr-ext-installed="" cz-shortcut-listen="true">
        <div className="wrapper" style={{ 'display': 'contents' }}>
          <div className="flex_container blank_page clearfix displayStyle">
            <a href="/"><img height="200" width="200" className="envelope"
              src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" alt='logo' /></a>
            <div className="content-block">
              <h2>Introduce yourself</h2>
              <form className="form-stacked" id="new_user" onSubmit={handleSubmit} >

                <label htmlFor="name" style={{ 'fontSize': '24px', 'lineHeight': '140%', margin: '16px 0 5px' }}>Hi there! My name is</label>
                <input tabIndex="1" autoComplete="off" style={{ fontSize: '32px', height: '42px' }}
                  type="text" id="name" name='name' required onChange={onChange} />


                <div className="secondary_fields" style={{}}>
                  <div>
                    <label htmlFor="email" className="form-label fontsize18px"> Here’s my <strong>email address</strong>:</label>
                    <input tabIndex="2" className='signupEmail' autoComplete="off" type="email" id="email" name='email' required onChange={onChange} />

                  </div>

                  <div>
                    <label htmlFor="password" className="form-label fontsize18px"> And here’s my <strong>password</strong>:</label>
                    <input tabIndex="3" autoComplete="off" className='signupEmail' type="password" id="password" name='password' required onChange={onChange} />
                  </div>

                  {/* <div>
                    <label htmlFor="cpassword" className="form-label fontsize18px">Confirm Password</label>
                    <input tabIndex="3" autoComplete="off" type="password" id="password" name='cpassword' onChange={onChange} />
                  </div> */}

                </div>

                <div style={{ position: 'relative', 'marginTop': '10px' }}>
                  <button type="submit" className="btn btn-large btn-orange">Sign me up!</button>
                </div>


              </form>
            </div>
          </div>


        </div>
      </div>


    </div>
  )
}

export default Signup
