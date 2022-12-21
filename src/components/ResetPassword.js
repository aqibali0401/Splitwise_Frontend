import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../Css/ResetPassword.css';

const ResetPassword = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ password: "", password2: "" })

    const location = useLocation();

    const values = (location.pathname).split('/');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, password2 } = credentials;
        const response = await fetch(`http://localhost:5000/api/v1/auth/reset-password/${values[2]}/${values[3]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, password2 })
        });
        const json = await response.json();
        if (json.success) {
            navigate('/login');
            props.showAlert("Password reset successfully", "success");
        } else {
            props.showAlert("Some error occured!", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div class="flex_container blank_page clearfix" style={{ 'paddingBottom': '35px' }}>
                <a href="/"><img height="180" width="180" class="envelope" src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" /></a>

                <div class="content-block">
                    <h1 className='h1ResetPassword'>Create a new password</h1>
                    <div style={{ 'fontSize': '18px', 'lineHeight': '24px', 'margin': '10px 0 5px', 'color': '#999' }}>
                        Very sorry for the trouble, AQIB!
                        <br />
                        Please enter a new password below:
                    </div>


                    <form class="form-stacked" style={{ 'marginBottom': '0', 'fontSize': '16px' }} onSubmit={handleSubmit}>
                        <input type="hidden" name="_method" value="patch" autoComplete="off" />
                        <input type="hidden" name="authenticity_token" value="OnPJ0-jAxg0q2CbeUxPfaKtEpD_58U2IGQXp-b-BsV5SvBEjxWL7skL8GWrbGe_jFjYoOL5h4f8kfNv2RAXf7g" autoComplete="off" />
                        <div class="clearfix">
                            <label for="password">Your new password</label>
                            <div class="input">
                                <input className='restetPassInput' type="password" name="password" id="password" onChange={onChange} />
                            </div>
                            <label for="password2">Confirm Password </label>
                            <div class="input">
                                <input className='restetPassInput' type="password" name="password2" id="password2" onChange={onChange} />
                            </div>
                            <label for="password">Password</label>
                        </div>

                        <button type="submit" class="btn btn-large btn-orange" style={{ 'fontSize': '22px' }} >Save</button>
                    </form>  </div>
            </div>
        </div>
    )
}

export default ResetPassword
