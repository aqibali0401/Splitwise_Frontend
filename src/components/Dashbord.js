import React, { useContext, useEffect, useState } from 'react'
import companyLogo from '../splitwiseImages/splitwiseLogo.png'
import userImage from '../splitwiseImages/userImage.png'
import '../Css/Dashbord.css';
import GroupContext from '../context/showGroup/groupContext';
import FriendContext from '../context/showFriends/friendContext';
import { Link } from 'react-router-dom';



const Dashbord = (props) => {

    const [style, setStyle] = useState("addFriend");
    const changeStyle = () => {
        setStyle(style === "addFriend" ? "" : "addFriend");
    };

    // send invite 

    const [credentials, setCredentials] = useState({ email: "" })

    const handleSubmit = async (e) => {
        console.log("invite friend called only");
        e.preventDefault();
        const { email } = credentials;
        const authToken = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/v1/auth/inviteFriend`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.             
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ email })
        });
        const json = await response.json();
        console.log("json in invite friend ->>", json);
        if (json.success) {
            console.log("invite friend called successfully");
            props.showAlert("Invite friend link send successfully", "success");
        } else {
            props.showAlert("Invalid email id or some error occur!", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const { groups, fetchGroups } = useContext(GroupContext);
    const { friends, fetchFriends } = useContext(FriendContext);

    console.log('friends ->', friends);

    const [friendEmail, setFriendEmail] = useState("")

    useEffect(() => {
        fetchGroups();
        fetchFriends();
    }, []);

    const handleSave = async (e) => {
        const sendData = {};
        sendData.friends = friendEmail.split(",")
        console.log("friendEmail", friendEmail);
        console.log("sendData.friends", sendData.friends);
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
        console.log("json----------------", json);
        if (json.success) {
            setFriendEmail("");
            props.showAlert("Friend Added successfully!!", "success");
        } else {
            props.showAlert("Invalid Details", "danger");
        }
    };



    return (
        <div>
            <div id="center_container">
                <div id="center_bars">
                    <div id="left_sidebar">
                        <div id="view_links">
                            <a href="#/dashboard" id="dashboard_link" className="open"><span></span> Dashboard</a>
                            <a href="#/activity" id="notifications_link"><i className="icon-flag"></i> Recent activity</a>

                            <div className="expense_filter_links">
                                <a href="#/all" id="group--1"><i className="icon-list"></i> All expenses</a>
                                <div className="tags">
                                    <div className="header">
                                        Groups
                                        <Link to="/addGroup"><i className="icon-plus"></i> Add</Link>
                                    </div>

                                    {groups || groups.length > 0 ?
                                        <>

                                            {groups.map((group) => {
                                                return (

                                                    <Link to="#/groups/32744573" key={group._id}
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

                                    {/* <a href="#/groups/38051475" data-filterable="true" data-search-string="aer trip"
                                        data-active="false" style={{ display: "none" }}><i className="icon-tag"></i> Aer trip</a>

                                    <a href="#/groups/32744573" data-filterable="true" data-search-string="dost daily "
                                        data-active="true"><i className="icon-tag"></i> Dost daily </a>

                                    <a href="#/groups/39906321" data-filterable="true" data-search-string="kantara 2"
                                        data-active="true"><i className="icon-tag"></i> Kantara 2</a> */}

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

                                    {/* <a href="#/friends/53828957" data-filterable="true" data-search-string="noor alam"
                                        data-active="true"><i className="icon-user"></i> Noor Alam</a>

                                    <a href="#/friends/59872089" data-filterable="true" data-search-string="thala"
                                        data-active="true"><i className="icon-user"></i> Thala</a> */}


                                    {friends || friends.length > 0 ?
                                        <>
                                            {friends.map((friend) => {
                                                return (

                                                    <Link to="" key={friend.friend._id}
                                                        data-active="true">
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


                                {/* <a href="#" className="show_inactive_accounts" id="friends_show_inactive_accounts"
                                    style={{ display: 'none' }}>
                                    Hiding accounts settled for more than 30 days. Show »
                                </a> */}
                            </div>
                            <div style={{ 'background': '#5bc5a7', 'color': '#fff', 'border': '1px solid #39a385', 'fontWeight': 'bold', 'fontSize': '14px', 'padding': '3px 5px', 'margin': '15px 0 0 5px', 'textShadow': '0 -1px 0 #3eaf8f' }}>Invite friends</div>
                            <div className="sidebar_invites"
                                style={{ margin: '0 0 0 5px', border: '1px solid #ccc', 'borderTop': 'none', padding: '5px' }}>
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

                    {/* ye vala karna he  */}

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
                                        It looks like you use an ad blocker. That’s cool! So do we :)
                                        <div style={{ height: '10px' }}>&nbsp;</div>
                                        Please support Splitwise by telling your friends about us!

                                        <div className="social">
                                            <a href="http://www.facebook.com/dialog/share?app_id=293864780643203&amp;display=popup&amp;redirect_uri=https%3A%2F%2Fwww.splitwise.com%2Fthanks&amp;href=&amp;href=https%3A%2F%2Fwww.splitwise.com"
                                                target="_blank" data-action="adblock share" className="btn btn-facebook track">
                                                <img alt="Facebook" src="/assets/fat_rabbit/social/facebook.png" />
                                                Share
                                            </a>
                                            <a href="https://twitter.com/intent/tweet?text=Splitwise+makes+it+easy+to+split+expenses+with+housemates%2C+trips%2C+groups%2C+friends%2C+and+family.+Check+it+out%21&amp;url=https%3A%2F%2Fwww.splitwise.com"
                                                target="_blank" data-action="adblock tweet" className="btn btn-twitter track">
                                                <img alt="Twitter" src="/assets/fat_rabbit/social/twitter.png" />
                                                Tweet
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div id="center_column">
                        <div className="dashboard header">
                            <div className="topbar topPadding0">
                                <h1>Dashboard</h1>
                                <div className="actions topPadding0">
                                    <a className="btn btn-large btn-orange" data-toggle="modal" href="#add_bill">
                                        Add an expense
                                    </a>
                                    <a className="btn btn-large btn-mint" data-toggle="modal" href="#settle_up_form">
                                        Settle up
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="clearfix">
                            <div id="dashboard_balances">
                                <div className="total_balances">

                                    <div className="block">
                                        <div className="title">
                                            total balance
                                        </div>

                                        <span className="neutral">


                                            $0.00*
                                        </span>
                                    </div>
                                    <div className="block">
                                        <div className="title">
                                            you owe
                                        </div>
                                        <span className="neutral">
                                            $0.00*
                                        </span>
                                    </div>
                                    <div className="block">
                                        <div className="title">
                                            you are owed
                                        </div>
                                        <span className="neutral">
                                            $0.00*
                                        </span>
                                    </div>

                                    <div className="multiple_currencies">
                                        * You have balances in multiple currencies.
                                    </div>

                                </div>

                                <h2 style={{ 'position': 'relative' }}>
                                    you owe
                                    <span className="right">you are owed</span>
                                    <div
                                        style={{ position: 'absolute', top: '10px', width: '100%', 'textAlign': 'center', 'marginLeft': '6px' }}>
                                        <div className="btn-group toggle-chart-list">
                                            <button className="btn view_as_list active"><i className="icon-reorder"></i> view as
                                                list</button>
                                            <button className="btn view_as_chart"><i className="icon-bar-chart"></i> view chart</button>
                                        </div>
                                    </div>
                                </h2>

                                <div className="summary">
                                    <div id="people_summary">
                                        <div className="chart">
                                            <div className="negative balances">
                                                <a className="bar" href="#/friends/53828957" style={{ width: '36.56888612038658%' }}
                                                    data-original-title="">
                                                    <span className="name" title="Noor Alam">
                                                        undefined
                                                    </span>
                                                    <span className="amount">
                                                        INR35.66
                                                    </span>
                                                </a><br />

                                            </div>
                                            <div className="img" data-original-title="">
                                                <img
                                                    src="https://assets.splitwise.com/assets/fat_rabbit/person-2d59b69b3e7431884ebec1a55de75a4153a17c4050e6b50051ca90412e72cf96.png" />
                                            </div>
                                            <div className="positive balances">

                                                <a className="bar" href="#/friends/59872089" style={{ width: '100%' }}
                                                    data-original-title="">
                                                    <span className="name" title="Thala">
                                                        Thala
                                                    </span>
                                                    <span className="amount">
                                                        INR266.66
                                                    </span>
                                                </a><br />

                                            </div>
                                        </div>
                                        <div className="list">
                                            <div className="negatives">

                                                <ul>

                                                    <li className="relationship">
                                                        <a href="#/friends/53828957">
                                                            <img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-ruby46-100px.png"
                                                                alt="Avatar" />
                                                            <div className="name">Noor Alam</div>
                                                            <div className="balance i_owe">
                                                                you owe
                                                                <span className="amount">INR35.66</span>
                                                            </div>

                                                        </a>
                                                    </li>

                                                </ul>

                                            </div>

                                            <div className="positives">

                                                <ul>

                                                    <li className="relationship">
                                                        <a href="#/friends/59872089">
                                                            <img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-ruby12-100px.png"
                                                                alt="Avatar" />
                                                            <span className="name">Thala</span><br />
                                                            <span className="balance owes_me">
                                                                owes you
                                                                <span className="amount">INR266.66</span>
                                                            </span>

                                                        </a>
                                                    </li>

                                                </ul>

                                            </div>

                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div id="recent_activity" style={{ display: 'none' }}></div>
                        </div>
                    </div>
                    <div style={{ 'clear': 'both' }}></div>
                </div>
            </div>


            {/* this is forom end first line  */}

            <div id="loading" style={{ display: 'none' }}>
                <div className="ajax">
                    <div
                        style={{ width: '52px', height: '52px', position: 'absolute', marginTop: '0px', marginLeft: '934px', animation: '0.8s linear 0s infinite normal none running spin12' }}>
                        <svg style={{ width: '52px', height: '52px' }}>

                            <g transform="translate(26,26)">
                                <g strokeWidth="4" strokeLinecap="round" stroke="rgb(204, 204, 204)">
                                    <line x1="0" y1="13" x2="0" y2="23" transform="rotate(0, 0, 0)" opacity="1"></line>
                                    <line x1="0" y1="13" x2="0" y2="23" transform="rotate(30, 0, 0)" opacity="0.91"></line>
                                    <line x1="0" y1="13" x2="0" y2="23" transform="rotate(60, 0, 0)"
                                        opacity="0.8200000000000001"></line>
                                    <line x1="0" y1="13" x2="0" y2="23" transform="rotate(90, 0, 0)" opacity="0.73"></line>
                                    <line x1="0" y1="13" x2="0" y2="23" transform="rotate(120, 0, 0)" opacity="0.64"></line>
                                    <line x1="0" y1="13" x2="0" y2="23" transform="rotate(150, 0, 0)" opacity="0.55"></line>
                                    <line x1="0" y1="13" x2="0" y2="23" transform="rotate(180, 0, 0)"
                                        opacity="0.45999999999999996"></line>
                                    <line x1="0" y1="13" x2="0" y2="23" transform="rotate(210, 0, 0)" opacity="0.37"></line>
                                    <line x1="0" y1="13" x2="0" y2="23" transform="rotate(240, 0, 0)" opacity="0.28"></line>
                                    <line x1="0" y1="13" x2="0" y2="23" transform="rotate(270, 0, 0)"
                                        opacity="0.19000000000000006"></line>
                                    <line x1="0" y1="13" x2="0" y2="23" transform="rotate(300, 0, 0)"
                                        opacity="0.09999999999999998"></line>
                                    <line x1="0" y1="13" x2="0" y2="23" transform="rotate(330, 0, 0)"
                                        opacity="0.09999999999999998"></line>
                                </g>
                            </g>
                        </svg></div>
                </div>

                <div style={{ marginTop: '65px' }}>
                    Loading
                </div>
            </div>

            {/* <!-- MODALS --> */}

            {<div id="ajax_statuses">
                <div id="ajax_loading">
                    <div id="ajax_activity">
                        <div
                            style={{ width: '52px', height: '52px', position: 'absolute', marginTop: '0px', marginLeft: '0px', animation: '0.8s linear 0s infinite normal none running spin12' }}>
                            <svg style={{ width: '52px', height: '52px' }}>
                                <g transform="translate(26,26)">
                                    <g strokeWidth="4" strokeLinecap="round" stroke="#ccc">
                                        <line x1="0" y1="13" x2="0" y2="23" transform="rotate(0, 0, 0)" opacity="1"></line>
                                        <line x1="0" y1="13" x2="0" y2="23" transform="rotate(30, 0, 0)" opacity="0.91"></line>
                                        <line x1="0" y1="13" x2="0" y2="23" transform="rotate(60, 0, 0)"
                                            opacity="0.8200000000000001"></line>
                                        <line x1="0" y1="13" x2="0" y2="23" transform="rotate(90, 0, 0)" opacity="0.73"></line>
                                        <line x1="0" y1="13" x2="0" y2="23" transform="rotate(120, 0, 0)" opacity="0.64"></line>
                                        <line x1="0" y1="13" x2="0" y2="23" transform="rotate(150, 0, 0)" opacity="0.55"></line>
                                        <line x1="0" y1="13" x2="0" y2="23" transform="rotate(180, 0, 0)"
                                            opacity="0.45999999999999996"></line>
                                        <line x1="0" y1="13" x2="0" y2="23" transform="rotate(210, 0, 0)" opacity="0.37"></line>
                                        <line x1="0" y1="13" x2="0" y2="23" transform="rotate(240, 0, 0)" opacity="0.28"></line>
                                        <line x1="0" y1="13" x2="0" y2="23" transform="rotate(270, 0, 0)"
                                            opacity="0.19000000000000006"></line>
                                        <line x1="0" y1="13" x2="0" y2="23" transform="rotate(300, 0, 0)"
                                            opacity="0.09999999999999998"></line>
                                        <line x1="0" y1="13" x2="0" y2="23" transform="rotate(330, 0, 0)"
                                            opacity="0.09999999999999998"></line>
                                    </g>
                                </g>
                            </svg></div>
                    </div>
                    <p>Loading...</p>
                </div>

                <div id="ajax_success">
                    <img
                        src="https://assets.splitwise.com/assets/adorable/ajax_success-39e3c3a3d0693964aa87e05d2474d40c1e4f42652cba313f82e87bed095d5b72.png" />
                    <p>Loading...</p>
                </div>

                <div id="ajax_error">
                    <img
                        src="https://assets.splitwise.com/assets/adorable/ajax_error-2d388efafbf6677f7a51addbf86f6f297bad8852716f5068f8fa0430d3f0ada8.png" />
                    <p>Loading...</p>
                </div>
            </div>}

            {/* <!-- START MODALS --> */}

            <div className="modal fade" id="user_summary"></div>
            <div className="modal fade" id="settle_up"></div>
            <div className="modal fade" id="group_member_details">
                <div className="input-data"></div>

            </div>
            <div className="modal fade" id="simplify_debts"></div>
            <div className="modal fade" id="charts_modal">
                <div className="input-data"></div>
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">×</button>
                    <h3>Charts</h3>
                </div>
                <div className="modal-body">
                    <h4>
                        <a href="#" className="btn previous">« previous</a>
                        Spending breakdown for November 2022
                        <a href="#" className="btn next">next »</a>
                    </h4>
                    <img src="https://chart.googleapis.com/chart?chf=a,s,00000091|bg,s,FFFFFF&amp;chxs=0,000000,11&amp;chxt=x&amp;chs=550x250&amp;cht=p&amp;chco=3072F3,80C65A,FF3131,FF9900,9C4F82&amp;chd=t:100&amp;chdl=General&amp;chp=0.1&amp;chl=$0.00&amp;chma=0,140,0,5|75&amp;chts=676767,11&amp;chdls=000000,12"
                        id="charts_graphic" style={{ display: 'none' }} />
                    <div className="no_spending"
                        style={{ padding: '20px 20px 30px', textAlign: 'center', 'fontSize': '24px', color: 'rgb(204, 204, 204)', lineHeight: '28px' }}>
                        No expenses have been<br />
                        added yet for this month.
                    </div>
                    <table>
                        <thead>
                            <tr className="block top">
                                <th>Category</th>
                                <th className="total">Total spending</th>
                                <th>You paid for</th>
                                <th className="small"></th>
                                <th>Your share</th>
                                <th className="small"></th>
                                <th>Net balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="block total">
                                <td>Total</td>
                                <td className="total">$0.00</td>
                                <td>$0.00</td>
                                <td className="small">-</td>
                                <td>$0.00</td>
                                <td className="small">=</td>
                                <td className="summary">
                                    <div>you owe</div>$0.00
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer">
                    <a href="#" className="btn btn-large" data-dismiss="modal">Close</a>
                </div>
            </div>

            <div className="modal fade transparent" id="add_bill"></div>
            <div className="modal fade transparent" id="settle_up_form">
                <div className="relative-container">
                    <div className="input-data"></div>

                </div>
            </div>

            <div className="modal fade" id="send_reminder"></div>
            <div className="modal fade" id="delete_friendship"></div>
            {/* <div className="modal fade" id="invite_friends">
                <div className="input-data"></div>
                <div className="padding_wrapper clearfix" style={{ 'border': '2px solid red' }}>
                    <h3>
                        <img
                            src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" />
                        Invite friends
                    </h3>
                    <button type="button" className="close" data-dismiss="modal">×</button>

                    <div className="invite_method email">
                        <div className="to">
                            <div className="to_label">To:</div>
                            <ul className="token-input-list-mac">
                                <li className="token-input-input-token-mac"><input type="text" autoComplete="off"
                                    id="token-input-invite-input" placeholder="Enter names or email addresses"
                                    style={{ outline: 'none', width: '300px' }} /> 
                                </li>
                            </ul><input type="text" className="invite-input" id="invite-input"
                                placeholder="Enter names or email addresses" style={{ display: 'none' }} />
                        </div>

                        <textarea placeholder="Include an optional message"></textarea>

                        <a href="#" className="btn btn-large btn-orange submit">Send invites and add friends</a>

                        <br />
                        <a href="/friend_invite" target="_blank" className="see_invite">
                            Preview the message you'll send
                        </a>
                    </div>
                </div>

                <div className="friends_on_splitwise">
                    &nbsp;
                </div>
            </div> */}
            <div className="modal fade" id="fullscreen_ad"></div>
            <div id="first_launch"></div>
            <br />
            <br />
        </div>
    )
}

export default Dashbord
