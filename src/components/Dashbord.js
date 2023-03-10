import React, { useContext, useEffect, useState } from 'react'
import '../Css/Dashbord.css';
import GroupContext from '../context/showGroup/groupContext';
import UserContext from '../context/UserContext/UserContext';
import FriendContext from '../context/showFriends/friendContext';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';


const Dashbord = (props) => {

    const { groups, fetchGroups } = useContext(GroupContext);
    const { friends, fetchFriends } = useContext(FriendContext);
    const { setFriendId, getClickedFriendDetails, getClickedFriendSettlementDetails } = useContext(UserContext)

    const [style, setStyle] = useState("addFriend");
    const changeStyle = () => {
        setStyle(style === "addFriend" ? "" : "addFriend");
    };

    // send invite 
    const [credentials, setCredentials] = useState({ email: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email } = credentials;
        const authToken = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/v1/auth/inviteFriend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ email })
        });
        const json = await response.json();
        if (!json.error) {
            props.showAlert(json.message, "success");
        } else {
            props.showAlert(json.error, "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const [friendEmail, setFriendEmail] = useState("");

    useEffect(() => {
        fetchGroups();
        fetchFriends();
    }, []);


    // useEffect(() => {
    //     // fetchOwnOwedAmount();
    // }, []);

    const handleSave = async (e) => {
        const sendData = {};
        // sendData.friends = friendEmail.split(",");
        e.preventDefault()
        const authToken = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/v1/user/addFriends`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.             
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(sendData)
        });
        const json = await response.json();
        if (json.success) {
            setFriendEmail("");
            props.showAlert("Friend Added successfully!!", "success");
        } else {
            props.showAlert("Invalid Details", "danger");
        }
    };



    return (

        <DashbordStyle>

            <div id="center_container">
                <div id="center_bars">
                    <div id="left_sidebar">
                        <div id="view_links">
                            <Link to="/dashbord" id="dashboard_link"><i className="icon-flag"></i> Dashboard</Link>
                            <a href="#/activity" id="notifications_link"><i className="icon-flag"></i> Recent activity</a>

                            <div className="expense_filter_links">
                                <a href="#/all" id="group--1"><i className="icon-list"></i> All expenses</a>
                                <div className="tags">
                                    <div className="header">
                                        Groups
                                        <Link to="/addGroup"><i className="icon-plus"></i> Add</Link>
                                    </div>

                                    {groups || groups.length > 0 ? <>

                                        {groups.map((group) => {
                                            return (

                                                <Link style={{ 'height': 'auto' }} to="" key={group._id}
                                                    data-active="true">
                                                    <i className="icon-tag"></i>
                                                    {group.groupName}
                                                </Link>

                                            )
                                        })}
                                    </>
                                        :
                                        ""
                                    }
                                </div>


                                <div className="people">
                                    <div className="header">
                                        Friends
                                        <Link onClick={changeStyle}><i className="icon-plus"></i> Add</Link>
                                    </div>

                                    <div className={style}>
                                        <div style={{ 'background': '#5bc5a7', 'color': '#fff', 'border': '1px solid #39a385', 'fontWeight': 'bold', 'fontSize': '14px', 'padding': '3px 5px', 'margin': '2px 0 0 5px', 'textShadow': '0 -1px 0 #3eaf8f' }}>Add friends</div>
                                        <div className="sidebar_invites"
                                            style={{ margin: '0 0 0 5px', border: '1px solid #ccc', 'borderTop': 'none', padding: '5px' }}>
                                            <input onChange={(e) => { setFriendEmail(e.target.value) }} className="invite_email" type="email" placeholder="Enter an email address"
                                                style={{ width: '145px', margin: '0 0 5px' }} /><br />
                                            <button onClick={handleSave} className="btn btn-cancel send_invite" style={{ 'fontSize': '12px', padding: '2px 6px' }}>Add friend</button>
                                            &nbsp;
                                            <div className="invite_success"
                                                style={{ 'marginTop': '10px', 'borderTop': '1px solid #eee', 'paddingTop': '5px', display: 'none' }}>
                                                Invite sent! :
                                            </div>
                                        </div>
                                    </div>

                                    {friends || friends.length > 0 ?
                                        <>
                                            {friends.map((friend) => {
                                                return (
                                                    <Link style={{ 'height': 'auto' }} to={friend.friend._id} key={friend.friend._id} data-active="true" onClick={() => { getClickedFriendDetails(friend.friend._id); getClickedFriendSettlementDetails(friend.friend._id); }}>
                                                        <i className="icon-tag"></i>
                                                        {friend.friend.userName ? friend.friend.userName : "Anonymous user"}
                                                    </Link>

                                                )
                                            })}
                                        </>
                                        :
                                        ""
                                    }
                                </div>

                            </div>
                            <div style={{ 'background': '#5bc5a7', 'color': '#fff', 'border': '1px solid #39a385', 'fontWeight': 'bold', 'fontSize': '14px', 'padding': '3px 5px', 'margin': '15px 0 0 5px', 'textShadow': '0 -1px 0 #3eaf8f' }}>Invite friends</div>
                            <div className="sidebar_invites"
                                style={{ margin: '0 0 0 5px', border: '1px solid #ccc', 'borderTop': 'none', padding: '5px', 'height': '60px' }}>
                                <div style={{ color: '#666', 'lineHeight': '13px', 'fontSize': '13px', height: '13px', 'marginBbottom': '5px', display: 'none' }}>
                                    Send a message to</div>
                                <form onSubmit={handleSubmit}>
                                    <input className="invite_email" type="email" id='email' name='email' onChange={onChange} placeholder="Enter an email address"
                                        style={{ width: '145px', margin: '0 0 5px' }} /><br />
                                    <button className="btn btn-cancel send_invite" type='submit' style={{ 'fontSize': '12px', padding: '2px 6px' }}>Send
                                        invite</button>
                                </form>
                                &nbsp; <img className="invite_ajax_indicator" style={{ 'display': 'none' }}
                                    src="https://assets.splitwise.com/assets/ajax-114d999f10c3c983ba14dfc2b38f2d29c1aa3d4406abd7e73f54bffab6f33c7e.gif" />
                                <div className="invite_success"
                                    style={{ 'marginTop': '10px', 'borderTop': '1px solid #eee', 'paddingTop': '5px', display: 'none' }}>
                                    Invite sent! :
                                </div>
                            </div>

                        </div>
                    </div>


                    <div id="right_sidebar">
                        <div id="right_sidebar_content">
                            <h2>Split the dinner bill</h2>
                            <a href="https://itunes.apple.com/us/app/plates-by-splitwise-split/id669801762?mt=8&amp;uo=4&amp;at=11l4CC"
                                target="_blank"><img height="114" style={{ margin: '8px 0' }}
                                    src="https://assets.splitwise.com/assets/fat_rabbit/sidebar/plates-01a8a1ced1d926765746e2638c42d5d829416fb14326e1a1be5cd34440d4ba76.png" /></a><br />
                            Check out <strong>Plates</strong>, our free iOS app to quickly and easily split dinner bills with
                            friends.<br />

                            <a href="https://itunes.apple.com/us/app/plates-by-splitwise-split/id669801762?mt=8&amp;uo=4&amp;at=11l4CC"
                                className="btn btn-large btn-orange track" style={{ ' marginTop': '8px' }} data-action="plates"
                                target="_blank">
                                Download Plates
                            </a>



                        </div>

                        <div id="ad_block_container">
                            <div id="ad_block">
                                <h2 style={{ 'marginBottom': '5px' }}>Advertisement</h2>
                                <script async="" src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

                                <ins className="adsbygoogle" style={{ display: 'inlineBlock', width: '180px', height: '150px' }}
                                    data-ad-client="ca-pub-4342436770974124" data-ad-slot="3930952832"></ins>

                                {/* <script>
                                    (adsbygoogle = window.adsbygoogle || []).push({ });
                                </script> */}
                            </div>

                            <div className="ads_disabled" style={{ display: 'block' }}>
                                <h2 style={{ marginTop: '20px' }}>Hey there!</h2>

                                <div style={{ background: '#eee', padding: '10px', margin: '5px 20px 10px -5px' }}>
                                    <div className="share">
                                        It looks like you use an ad blocker. That???s cool! So do we :)
                                        <div style={{ height: '10px' }}>&nbsp;</div>
                                        Please support Splitwise by telling your friends about us!


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Middle Dashbord  */}
                    <div id="center_column">
                        <Outlet />
                    </div>

                </div>
            </div>

        </DashbordStyle>

    )
}


export default Dashbord

const DashbordStyle = styled.section`
 
#center_column {
    position: relative;
    margin: 0;
    padding-top: 33px;
    background: #fff;
    min-height: auto;
    height: 75vh;
    height: 100%;
    min-height: 100vh;
}

`;