import React, { useContext, useEffect, useState } from 'react'
import '../Css/Dashbord.css';
import OwnOwedContext from '../context/showOwnOwedAmount/OwnOwedContext';
import modalContext from '../context/modal/ModalContext';

import { Link } from 'react-router-dom';

const MiddleDashbord = () => {

    const { setModal, setSettleUpModal, updateAddExpenseState, setUpdateAddExpenseState } = useContext(modalContext);
    const { totalOwnAmount, totalOwedAmount, fetchOwnOwedAmount, owedAmountsArr, oweAmountArr, fetchOwenOwedAmountFromDiffrentUser,  } = useContext(OwnOwedContext);
    

    useEffect(() => {
            fetchOwnOwedAmount();
            fetchOwenOwedAmountFromDiffrentUser()
            setUpdateAddExpenseState(false);
   
    }, [updateAddExpenseState]);

    const totalBalance = Math.round((totalOwedAmount - totalOwnAmount) * 100) / 100;

    return (
        <div>
            <div className="dashboard header">
                <div className="topbar topPadding0">
                    <h1>Dashboard</h1>
                    <div className="actions topPadding0">
                        <button onClick={() => { setModal(true) }} className="btn btn-large btn-orange" data-toggle="modal">
                            Add an expense
                        </button>
                        <button onClick={() => { setSettleUpModal(true) }} className="btn btn-large btn-mint" data-toggle="modal">
                            Settle up
                        </button>
                    </div>
                </div>
            </div>

            <div className="clearfix">
                <div id="dashboard_balances">
                    <div className="total_balances" >

                        <div className="block" style={{ 'fontSize': '17px', 'lineHeight': '25px', marginBottom: '10px' }}>
                            <div className="title">
                                total balance
                            </div>

                            <span className="neutral">
                                <strong style={{ color: totalBalance ? '#5bc5a7' : '#ff652f' }}>₹ {totalBalance}</strong>
                            </span>
                        </div>
                        <div className="block" style={{ 'fontSize': '17px', 'lineHeight': '25px', marginBottom: '10px' }}>
                            <div className="title">
                                you owe
                            </div>
                            <span className="neutral">
                                <span>
                                    <strong style={{ color: totalOwnAmount ? '#ff652f' : '#5bc5a7' }}>₹ {totalOwnAmount}</strong>
                                </span>
                            </span>
                        </div>
                        <div className="block" style={{ 'fontSize': '17px', 'lineHeight': '25px', marginBottom: '10px' }}>
                            <div className="title">
                                you are owed
                            </div>
                            <span className="neutral">
                                <strong style={{ color: totalOwedAmount ? '#5bc5a7' : '#ff652f' }}>₹ {totalOwedAmount}</strong>
                            </span>
                        </div>

                    </div>

                    <h2 style={{ 'position': 'relative' }}>
                        you owe
                        <span className="right">you are owed</span>

                    </h2>

                    <div className="summary">
                        <div id="people_summary">

                            {
                                (oweAmountArr.length <= 0 && owedAmountsArr.length <= 0) ?

                                    <div className="img" data-original-title="">
                                        <img
                                            src="https://assets.splitwise.com/assets/fat_rabbit/person-2d59b69b3e7431884ebec1a55de75a4153a17c4050e6b50051ca90412e72cf96.png" />
                                    </div>
                                    : ''
                            }

                            <div className="list">
                                <div className="negatives">
                                    <ul>
                                        {oweAmountArr.map((user, i) => {
                                            return (
                                                <li className="relationship" key={i}>
                                                    <a href="#/friends/53828957">
                                                        <img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-ruby46-100px.png"
                                                            alt="Avatar" />
                                                        <div className="name">{user.userName}</div>
                                                        <div className="balance i_owe">
                                                            you owe
                                                            <span className="amount">&nbsp;₹ {Math.round((user.amount) * 100) / 100}</span>
                                                        </div>

                                                    </a>
                                                </li>
                                            )
                                        })
                                        }
                                    </ul>

                                </div>

                                <div className="positives">

                                    <ul>
                                        {owedAmountsArr.map((user, i) => {
                                            return (
                                                <li className="relationship" key={i}>
                                                    <Link href="#/friends/59872089">
                                                        <img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-ruby12-100px.png"
                                                            alt="Avatar" />
                                                        <span className="name">{user.userName}</span><br />
                                                        <span className="balance owes_me">
                                                            owes you
                                                            <span className="amount">&nbsp;₹ {Math.round((user.amount) * 100) / 100}</span>
                                                        </span>

                                                    </Link>
                                                </li>
                                            )
                                        })
                                        }
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
    )
}

export default MiddleDashbord
