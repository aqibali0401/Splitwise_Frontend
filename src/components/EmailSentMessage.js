import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Css/ForgotPassword.css';


const ForgotPassword = (props) => {
    let navigate = useNavigate();
    const cross = (e)=>{
        // e.preventDefault();
        document.getElementById('errorDiv').style.display='none';        
    }
    const [counter, setCounter] = useState(10);

    // const refuceCounter = () => {
    //     setTimeout(() => {
            
    //     }, 1000);
    // }

    setTimeout(() => {
       
        navigate('/login');
      
    }, 10000);

    useEffect(() => {
        if(counter>10){
            setCounter(counter-1)
        }
        // refuceCounter();    
    }, [counter])


    



    return (
        <div>
            {/* <Notes showAlert={showAlert} /> */}
            <div className="container">
                <div className="row" style={{ 'marginTop': '40px', 'fontSize': '16px', 'lineHeight': '20px' }}>
                    <div className="span2 offset3 columns">
                        <img width="128" src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" />
                    </div>

                    <div className="span4 columns">
                        <h2>Success</h2>An email has been sent with instructions to reset your password.

                    </div>

                </div>
            </div>

            <div className='errorDiv' id='errorDiv'>
                <span type='submit' className='cross btn' onClick={cross}>X</span>
                <p className='contentMsg'>Redirecting to login page in {counter} second</p>
            </div>

        </div>
    )
}

export default ForgotPassword
