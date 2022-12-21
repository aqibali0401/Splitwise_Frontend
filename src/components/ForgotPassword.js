import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Css/ForgotPassword.css';

const ForgotPassword = (props) => {

  // const { showAlert } = props;

  const [credentials, setCredentials] = useState({ email: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = credentials;
    const response = await fetch(`http://localhost:5000/api/v1/auth/forgot-password`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.             
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const json = await response.json();
    if (json.success) {
      navigate('/emailSentMessage');
      props.showAlert("Reset password link send successfully", "success");
    } else {
      props.showAlert("Invalid email id", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      {/* <Notes showAlert={showAlert} /> */}
      <div className="container">
        <div className="row" style={{ 'marginTop': '40px', 'fontSize': '16px', 'lineHeight': '20px' }}>
          <div className="span2 offset3 columns">
            <img width="128" src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" />
          </div>

          <div className="span4 columns">
            <h2>Reset your password</h2>

            Enter your email address or phone number and we’ll send you a link to reset your password.
            <br />
            <br />

            <form className="reset-password-form form-stacked" onSubmit={handleSubmit}>
              <input type="hidden" name="authenticity_token" value="6pwDkpjkE4GbgzjkpWQUpQuwjTuH3VKIFQYJ6SLAg3SCU9titUYuPvOnB1AtbiQutsIBPMBN_v8ofzvm2UTtxA" autoComplete="off" />
              <div className="tab-content">
                <div className="tab-pane active" id="email">
                  <div className="clearfix">
                    <label for="email" className='emailHeading' >Your email address</label>

                    <div className="input emailInput">
                      <input type="email" id="email" autocapitalize="off" name='email' onChange={onChange} />
                    </div>
                  </div>
                </div>

                <div style={{ 'padding': '10px 0' }}>
                </div>
                <button type="submit" className="btn btn-mint btn-large">Reset password</button>
              </div>
            </form>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ForgotPassword
