import React from 'react'
import styled from 'styled-components'

const UserDashbord = () => {
    return (
        <UserDashbordStyle>

            <div id="center_column">
                <div className="topbar friend">

                    <img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue27-100px.png" />
                    <h1 title="coolasg971886@gmail.com">
                        ashwani goyal
                    </h1>

                </div>
            </div>

            <div id="expenses">
                <div id="expenses_list">
                    <div className="month-divider ">
                        <span>January 2023</span>

                    </div>
                </div>
            </div>



            <div className="expense" id="expense-2140026156" data-date="2023-01-21T15:50:57Z">
                <div className="summary">




                    <div className="expense summary payment involved" data-date="2023-01-21T15:50:57Z">
                        <div className="main-block">
                            <div className="header">

                                <img src="https://assets.splitwise.com/assets/api/payment_icon/square/small/offline.png" />
                                <span className="description">
                                    ashwani G. paid AQIB A. $100.00
                                </span>
                            </div>
                        </div><div className="cost">

                            you received

                        </div><div className="you ">




                            <span className="negative">$100.00</span>


                        </div><div className="actions">
                            <a href="#" className="delete" data-method="delete">×</a>
                        </div>
                    </div>


                </div>
                <div className="users">

                </div>
            </div>


        </UserDashbordStyle>
    )
}

export default UserDashbord;


const UserDashbordStyle = styled.div`
    
    .topbar {
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 40px;
    width: 538px;
    position: relative;
    z-index: 9;
    background: #eee;
    border-bottom: none;
    padding: 13px 10px 10px;
    border-bottom: 1px solid #ddd;
    }
`
