import React, { useContext, useEffect, useId, useState } from 'react';
import styled from 'styled-components'
import userContext from '../context/UserContext/UserContext';
import '../Css/Dashbord.css';
import { useHistory, useLocation } from 'react-router-dom';




const UserDashbord = (props) => {


    const { user, userDetails, getClickedFriendDetails, getClickedFriendSettlementDetails, friendExpenseDetails } = useContext(userContext);

    const location = useLocation();

    console.log('user detail', user.id);


    const path = location.pathname;
    const directories = path.split('/');
    var userId = directories[directories.length - 1];


    console.log('userId he hamare pass', user.id);

    useEffect(() => {
        if (JSON.stringify(userDetails) === '{}') {
            getClickedFriendDetails(userId);
        }
        if (JSON.stringify(friendExpenseDetails) === '[]') {
            console.log('friend expense detail called-------');
            getClickedFriendSettlementDetails(userId);
        }
    }, [])

    console.log('friendExpenseDetails1111111111111111111111', friendExpenseDetails);

    const sendMaliToRemindFriend = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('token');

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`
            }
        };

        const response = await fetch(`http://localhost:5000/api/v1/user/remindUser/${userDetails.result._id}`, requestOptions);
        const result = await response.json();
        console.log('SEND MAIL result -> ', result);

        if(!result.sendMail){
            alert(`${userDetails.result.userName} dosn't owe any amount!!`)
        }       
        

        // if (!result.error) {
        //     props.showAlert(result.message, "success");
        // } else {
        //     props.showAlert(result.error, "danger");
        // }
    }







    return (
        <UserDashbordStyle>


            <div className="topbar friend" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                    <img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue27-100px.png" />
                    <h1>
                        {Object.keys(userDetails).length !== 0 ? (userDetails.result.userName) : "User Name"}
                    </h1>
                </div>

                <button className='remindButton' onClick={(e) => { sendMaliToRemindFriend(e) }}>Remind User</button>
            </div>

            <div>

                {friendExpenseDetails.map((friendDetail) => {
                    return (
                        <>
                            {/* <div id="expenses">
                                <div id="expenses_list">
                                    <div className="month-divider ">
                                        <span>January 2023</span>
                                    </div>
                                </div>
                            </div> */}

                            <div className="expense">
                                <div className="summary">
                                    <div className="expense summary payment involved" data-date="2023-01-21T15:50:57Z">
                                        <div className="main-block">
                                            <div className="header">
                                                <div className="date">{(new Date(friendDetail.date).toString()).split(' ')[1]} <div className="number">{(new Date(friendDetail.date).getDate())}</div></div>
                                                <img src="https://assets.splitwise.com/assets/api/payment_icon/square/small/offline.png" />
                                                <span className="description">
                                                    <span>{friendDetail.paidBy.userName}</span>
                                                    <span>&nbsp;paid&nbsp; </span>
                                                    <span>{friendDetail.paidTo.userName}</span>
                                                    <span>&nbsp; ₹{friendDetail.amount}</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="cost">

                                            {(user.id == friendDetail.paidBy._id) ? <span>you paid</span> : <span>you received</span>}



                                        </div><div className="you ">
                                            <span className="negative">₹{friendDetail.amount}</span>
                                        </div>
                                    </div>


                                </div>
                                <div className="users">

                                </div>
                            </div>

                        </>

                    )
                }
                )

                }

            </div>

        </UserDashbordStyle>
    )
}

export default UserDashbord;


const UserDashbordStyle = styled.section`    
.topbar {
    /* border: 2px solid red; */
    width: 100%;
    display: inline-flex;
    height: 100%;
}

/* .topbar img {
    width: 34px;
    height: 34px;
    border: 1px solid #bbb;
    -webkit-border-radius: 18px;
    -moz-border-radius: 18px;
    border-radius: 18px;
    max-width: 100%;
    vertical-align: middle;
} */

/* .topbar h1 {
    overflow: hidden;
    max-width: 315px;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 24px !important;
    line-height: 38px;
    height: 38px;
    display: inline-block;
    vertical-align: middle;
    color: #333;
    padding-left: 5px;
    max-width: 270px;
} */

.expense>.summary .expense {
    border-bottom: 1px solid #eee;
}

.expense.payment {
    line-height: 0px;
}

.expense {
    position: relative;
}

.expense.payment div.main-block {
    padding: 7px 0px 9px 8px;
    width: 332px;
    overflow: hidden;
    text-overflow: ellipsis;
    box-shadow: none;
}

.expense div.main-block {
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    width: 307px;
    padding: 9px 5px 6px 68px;
    position: relative;
}
 
.expense.payment div.main-block>.header {
    padding: 1px 0 0 0;
    margin: 0;
    line-height: 14px;
    height: auto;
    font-size: 12px;
    font-weight: normal;
    overflow: visible;
    display: inline-flex;
}

.expense.payment div.main-block>.header .description {
    margin-top: 3px;
    max-width: 285px;
    vertical-align: middle;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.expense.payment div.cost {
    padding-top: 10px;
    padding-bottom: 10px;
    /* width: 75px; */
}

.expense>div.cost {
    text-align: right;
    padding: 11px 10px 12px 5px;
    font-size: 12px;
    line-height: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: top;
    color: #aaa;
    cursor: pointer;

    /* border: 1px solid red; */
    width: 100px;
    margin-right: -30px !important;
}

.expense.payment div.you {
    padding-top: 9px;
    padding-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.expense div.you {
    position: relative;
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    padding: 11px 4px 12px;
    font-size: 12px;
    width: 100px;
    color: #aaa;
    line-height: 15px;
    /* margin-left: 20px; */

    /* border: 2px solid blue; */
    margin-left: 45px;
}

.expense div.you .negative {
    color: #ff652f;
    font-weight: bold;
    font-size: 16px;
}

.remindButton{
    background-color: orange;
    color: white;
    border-radius: 5%;
    padding: 10px;
}




`
