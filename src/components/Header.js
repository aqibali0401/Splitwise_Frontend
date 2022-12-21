import React, { useState } from 'react'
import companyLogo from '../splitwiseImages/splitwiseLogo.png'
import userImage from '../splitwiseImages/userImage.png'
import { Link, useLocation, useNavigate } from "react-router-dom";



const Header = () => {

    const [style, setStyle] = useState("dropdown");
    const changeStyle = () => {
        setStyle(style === "dropdown" ? "dropdown open" : "dropdown");
    };
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    // const {data : {user : {name}}} = JSON.parse(userDetails);
    const name = userDetails.data.user.name;


    return (

        <div>
            {
                !localStorage.getItem('token') ?
                    <header className="flex items-center justify-between px-8 py-5 font-mont mx-auto">
                        <Link to="/" className="flex items-center w-[105px] h-[36px] sm:w-[140px] sm:h-[48px]">
                            <img className='logo-size' src={companyLogo} viewBox="0 0 140 48" width="140" height="48" alt="BigCo Inc. logo" />
                        </Link>
                        <div id="guest" className="flex items-center text-xs sm:text-sm md:text-normal font-normal">
                            <div className="dropdown relative">
                                <Link className="dropdown-reveal text-teal px-4 block cursor-pointer font-mont font-semibold"
                                    to="/login">Log in</Link>
                            </div>
                            <Link className="bg-teal text-white px-3 py-2 sm:px-5 sm:py-3 rounded shadow sm-cta-button" to="/signup">Sign
                                up</Link>
                        </div>
                    </header>
                    :
                    <div id="body-min-width">
                        <div className="navbar navbar-fixed-top">
                            <div className="navbar-inner">
                                <div className="container">
                                    <Link className="brand" to="/dashbord">
                                        <img id="logo" src={companyLogo} />
                                    </Link>
                                    <ul className="nav pull-right">
                                        <li className={style}>
                                            <Link to="#" className="dropdown-toggle dropdownSelect paddingTop" onClick={changeStyle}>
                                                <img src={userImage} />
                                                <strong>{name ? name : "User"}</strong>
                                                <b className="caret"></b>
                                            </Link>
                                            <ul className="dropdown-menu pull-right">
                                                <li><Link to="/account/settings">Your account</Link></li>
                                                <li><Link to="/addGroup">Create a group</Link></li>
                                                <li><Link to="/calculators">Fairness calculators</Link></li>
                                                <li><Link to="/contact">Contact support</Link></li>
                                                <li><Link className='cousorPointer' onClick={handleLogout} >Log out</Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Header