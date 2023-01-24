import React, { useId, useState } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';

import modalContext from '../context/modal/ModalContext';

const Modal = () => {

    const { modal2, setModal2, payingUser, setPayingUser, addExpenseTotalAmount, setAddExpenseSplitOption } = useContext(modalContext);

    const switchModals = (myDiv) => {
        document.getElementById("div1").style.display = 'none';
        document.getElementById("div2").style.display = 'none';
        document.getElementById("div3").style.display = 'none';
        document.getElementById("div4").style.display = 'none';

        document.getElementById(myDiv).style.display = 'block';
    }


    const [splitByExactAmountTotal, setSplitByExactAmountTotal] = useState(addExpenseTotalAmount);
    const [splitByExactAmountLeft, setSplitByExactAmountLeft] = useState(0);
    const [splitByPercentageTotal, setSplitByPercentageTotal] = useState(0);
    const [splitByPercentageLeft, setSplitByPercentageLeft] = useState(100);

    const countUserShareEqually = () => {
        const filteredUsers = payingUser.filter((user) => {
            if (user.splitEquallyIncludeCheckBox === true) {
                return user
            }
        })

        const length = filteredUsers.length;

        let perpersonAmount = addExpenseTotalAmount / length;

        let equallySplitedAmountOfCheckedUser = Math.round(perpersonAmount * 100.0) / 100.0;

        let checkedUserArray = payingUser.map((user) => {
            if (user.splitEquallyIncludeCheckBox === true) {
                user.shareAmount = equallySplitedAmountOfCheckedUser;
            } else {
                user.shareAmount = 0;
            }
            return user
        })
        setPayingUser(checkedUserArray);
    }

    const includePersonOnSplitEquallyCheckBox = (e, userId) => {
        const divId = 'div' + userId;
        let counter = 0;
        let equallySplitedAmountOfCheckedUser = 0;

        if (e.target.checked) {
            document.getElementById(`${divId}`).style.opacity = 1;
            payingUser.map((payingUser) => {
                if (payingUser.splitEquallyIncludeCheckBox) {
                    counter++;
                }
                if (payingUser.value._id === userId && !payingUser.splitEquallyIncludeCheckBox) {
                    payingUser.splitEquallyIncludeCheckBox = true;
                    counter++;
                }
                return payingUser
            })

        } else {
            document.getElementById(`${divId}`).style.opacity = 0.3;
            payingUser.map((payingUser) => {
                if (payingUser.splitEquallyIncludeCheckBox) {
                    counter++;
                }
                if (payingUser.value._id === userId && payingUser.splitEquallyIncludeCheckBox) {
                    payingUser.splitEquallyIncludeCheckBox = false;
                    counter--;
                }
                return payingUser
            })
        }

        let equallySplitedAmountOfCheckedUser2 = addExpenseTotalAmount / counter;
        equallySplitedAmountOfCheckedUser = Math.round(equallySplitedAmountOfCheckedUser2 * 100.0) / 100.0;

        let arr = payingUser.map((user) => {
            if (user.splitEquallyIncludeCheckBox === true) {
                user.shareAmount = equallySplitedAmountOfCheckedUser;
            } else {
                user.shareAmount = 0;
            }
            return user
        })
        setPayingUser(arr);
    }

    const updateShareWhenSplitExactAmount = (e, userId) => {
        const updatedArr = payingUser.map((user) => {
            if (user.value._id === userId) {
                const value = isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber;
                user.shareAmount = value;
            }
            return user
        })
        setPayingUser(updatedArr);
    }

    const updateTotalAndLeft = () => {
        let total = 0;
        let left = 0;
        payingUser.map((user) => {
            total += user.shareAmount;
        })
        setSplitByExactAmountTotal(total);
        left = addExpenseTotalAmount - total;
        const x = Math.round(left * 100.0) / 100.0;
        setSplitByExactAmountLeft(x);
    }

    const updateShareWhenSplitPersentage = (e, userId) => {
        const persentage = isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber;
        const amount = addExpenseTotalAmount / 100 * persentage;
        const updatedArr = payingUser.map((user) => {
            if (user.value._id === userId) {
                user.shareAmount = amount;
            }
            return user
        })
        setPayingUser(updatedArr);

        console.log('updatedArr', updatedArr);

    }

    const updateShareWhenSplitByShare = (e, userId) => {
        const updatedArr = payingUser.map((user) => {
            if (user.value._id === userId) {
                user.sharesValue = isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber;
            }
            return user
        })
        setPayingUser(updatedArr);

        let totalShare = 0;

        payingUser.map((user) => {
            totalShare += user.sharesValue;
        })

        const arr = payingUser.map((user) => {
            const amount = addExpenseTotalAmount / totalShare * user.sharesValue;
            const x = Math.round(amount * 100.0) / 100.0;
            user.shareAmount = x;
            return user;
        })
        setPayingUser(arr);
    }

    const updateTotalAndLeftOfPercentage = () => {

        let totalShareAmount = 0;
        payingUser.map((user) => {
            totalShareAmount += user.shareAmount;
        })
        const percentage = totalShareAmount * 100 / addExpenseTotalAmount;
        setSplitByPercentageTotal(percentage);
        const leftPersentage = 100 - percentage;
        const x = Math.round(leftPersentage * 100.0) / 100.0;
        setSplitByPercentageLeft(x);

    }

    const splitShareByPersentageCallingFn = () => {
        // const updatedArr = payingUser.map((user) => {
        //     user.shareAmount = 0;
        //     return user
        // })
        // setPayingUser(updatedArr);
    }

    const splitShareBySharesCallingFn = () => {
        const updatedArr = payingUser.map((user) => {
            user.sharesValue = 1;
            return user
        })
        setPayingUser(updatedArr);
    }

    return (
        <SplitOptionModalStyle>
            {
                modal2 ?
                    <>
                        <div className="darkBG" onClick={() => { setModal2(false) }} />
                        <div className="centered">
                            <div className="splitOptionModal">
                                <div className="modalHeader">
                                    <h5 className="heading">Choose split options</h5>
                                    <button className="dismiss2" onClick={() => { setModal2(false) }} data-dismiss="modal">×</button>
                                </div>
                                <div className="body2">
                                    <div className="split-details">

                                        <div className="btn-group btn-group-inline" data-toggle="buttons-radio" id="split_method">
                                            <button onClick={() => { switchModals("div1"); setAddExpenseSplitOption('equally'); countUserShareEqually() }} className="split_button btn btn-gray equal btn-width-inc " data-split-subtype="equal" rel="tooltip"
                                                data-original-title="Split equally">=</button>
                                            <button onClick={() => { switchModals("div2"); setAddExpenseSplitOption('unqually') }} className="split_button btn btn-gray btn-width-inc unequal" data-split-subtype="unequal" rel="tooltip"
                                                data-original-title="Split by exact amounts">1.23</button>
                                            <button onClick={() => { switchModals("div3"); setAddExpenseSplitOption('unqually'); splitShareByPersentageCallingFn(); }} className="split_button btn btn-gray btn-width-inc percent" data-split-subtype="percent" rel="tooltip"
                                                data-original-title="Split by percentages">%</button>
                                            <button onClick={() => { switchModals("div4"); setAddExpenseSplitOption('unqually'); splitShareBySharesCallingFn(); }} className="split_button btn btn-gray btn-width-inc shares" data-split-subtype="shares" rel="tooltip"
                                                data-original-title="Split by shares"><i className="icon-tasks"></i></button>
                                        </div>

                                        <div id='div1' className="displayBlock">
                                            <h3>Split equally</h3>
                                            {payingUser.map((user) => {
                                                return (
                                                    <div id={'div' + (user.value._id)} className="person flex items-center justify-between">
                                                        <div className='flex items-center personInputDiv'>
                                                            <input className="share" type="checkbox" checked={user.splitEquallyIncludeCheckBox} onChange={(e) => { includePersonOnSplitEquallyCheckBox(e, user.value._id) }} />
                                                            <img
                                                                src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal28-100px.png" />
                                                            <span className="name">{user.value.userName}</span>
                                                        </div>
                                                        <span className="amount">
                                                            &#8377; {user.shareAmount}
                                                        </span>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>

                                        <div id='div2' className="displayNone" >
                                            <h3>Split by exact amounts</h3>
                                            {payingUser.map((user) => {
                                                return (
                                                    <div className="person flex items-center justify-between" >
                                                        <img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal28-100px.png" alt='userLogo' />
                                                        <span className="UserName">{user.value.userName}</span>
                                                        <div className="UnequallyInput">
                                                            <span className="rupeeSymbol" style={{ height: 'auto' }}> &#8377;</span>
                                                            <input style={{ width: '70px', height: 'auto' }} type="number" onChange={(e) => { updateShareWhenSplitExactAmount(e, user.value._id); updateTotalAndLeft(e); }} value={user.shareAmount} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                            <div className="totals flex items-center justify-between" style={{ margin: '10px 5px', 'textAlign': 'right' }}>
                                                <strong style={{ 'textTransform': 'uppercase' }}>Total</strong>
                                                <div className="subtotals">
                                                    <span className="OwedTotal">₹{splitByExactAmountTotal}</span>
                                                    <div className="remaining">
                                                        <span className="owed_remaining">₹{splitByExactAmountLeft} left</span>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <div id='div3' className="displayNone">
                                            <h3>Split by percentages</h3>
                                            {payingUser.map((user) => {
                                                return (
                                                    <div className="person flex  items-center justify-between">
                                                        <div className='flex items-center splitPersentageNameDiv'>
                                                            <img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal28-100px.png" />
                                                            <span className="UserName">{user.value.userName}</span>
                                                        </div>
                                                        <div className="input-append">
                                                            <input className='splitPersentageInputBox' style={{ 'fontSize': '15px' }} type="number" onChange={(e) => { updateShareWhenSplitPersentage(e, user.value._id); updateTotalAndLeftOfPercentage(); }} value={user.shareAmount} />
                                                            <span className="add-on persentageSymbol" >%</span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                            <div className="totals flex items-center justify-between" style={{ margin: '10px 5px', 'textAlign': 'right' }}>
                                                <strong style={{ 'textTransform': 'uppercase' }}>Total</strong>
                                                <div className="subtotals">
                                                    <span className="OwedTotal">{splitByPercentageTotal}</span>
                                                    <div className="remaining">
                                                        <span className="owed_remaining">{splitByPercentageLeft} left</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id='div4' className="displayNone">
                                            <h3>Split by shares</h3>
                                            {payingUser.map((user) => {
                                                return (
                                                    <div className="person flex items-center justify-between">
                                                        <div className='flex items-center personInputDiv'>
                                                            <img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal28-100px.png" />
                                                            <span className="name">
                                                                <span>{user.value.userName}</span><br />
                                                                <span className="subsummary2">
                                                                    Total share: ₹{user.shareAmount}
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div className="input-append splitbyShareInputDiv">
                                                            <input className='splitShareInput' type="number" style={{ width: '80px', }} placeholder="0" value={user.sharesValue} onChange={(e) => { updateShareWhenSplitByShare(e, user.value._id) }} />
                                                            <span className="add-on persentageSymbol">
                                                                <span className='' style={{}}>share(s)</span>
                                                            </span>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                            }

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </> : ""
            }

        </SplitOptionModalStyle >
    )
}

export default Modal


const SplitOptionModalStyle = styled.section`

.heading {
    margin: 0;
    padding: 10px;
    color: white;
    font-weight: 500;
    font-size: 20px;
    text-align: center;
}

.dismiss2 {
    float: right;
    font-size: 30px;
    margin-top: -3px;
    color: #fff;
    text-decoration: none;
    position: absolute;
    right: 7px;
    top: 7px;
}

.modalHeader {
    height: 50px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background: #5cc5a7;
    color: #fff;
    padding: 10px;
    border-bottom: 1px solid #36977b;
    text-shadow: 0 -1px 0 #318a71;
    font-size: 20px;
    font-weight: bold;
}

.darkBG {
    background-color: rgba(0, 0, 0, 0.2);
    width: 100vw;
    height: 100vh;
    z-index: 11;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
}

.centered {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 12;
}

.splitOptionModal {
    width: 350px ;
    height: auto;
    background: white;
    border-radius: 16px;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
    left: 230px;
    top: -205px;
    position: fixed;
}

.body2 {
    position: relative;
    padding: 10px;
    text-align: left;
    line-height: 18px;
}   

.person {
    cursor: pointer;
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* display: flex; */
}
.amount{
    float: right;
    margin-top: 8px;
}

img{
    margin-right: 5px;
    width: 38px;
    height: 38px;
    border-radius: 20px;
    border: 1px solid #ccc;    
    max-width: 100%;
    vertical-align: middle;
    overflow-clip-margin: content-box;
    overflow: clip;
    margin: 5px 13px;
}

.name{
    display: inline-block;
    max-width: 170px;
    overflow-x: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    line-height: 16px;
    min-height: 18px;
}

.btn-group-inline{  
    margin-bottom: 5px;
    margin-left: 65px;
}

.btn-width-inc{
width: 50px;
height: 35px;
}

 
.personInputDiv{ 
    min-width: 260px;
}

.midalFooter{
    position: fixed;
    bottom: 15px;
    right: 15px;
}

.splitBody{ 
    max-height: 252px;
    min-height: 252px;
    overflow: scroll;
}

.UserName{
    position: absolute;
    left: 80px;
}

.UnequallyInput{
    height: 33px;
    width: auto;
}

.rupeeSymbol{
    /* position: fixed; */
    height: auto;
    font-size: larger;
    margin: 0px 5px 12px 0px;
    
}

.OwedTotal{
    font-weight: bold;
    font-size: 16px;
}

.remaining{
    font-size: 12px;
    color: #aaa;
}

.splitPersentageNameDiv{
    min-width: 240px;
}

.splitPersentageInputBox{
    width: 60%;
    font-size: 20px;
    height: 25px;
}

.persentageSymbol{
    padding: 0px;
    height: 25px;
    font-size: 14px;
}

.splitShareInput{
height: 25px;
width: 45px !important;
}

.persentageSymbol{
height: 25px;
}

.splitbyShareInputDiv{
    position: absolute;
    right: 25px;    
}

.subsummary2{
    display: inline-block;
    color: #999;
    font-size: 11px;
}

.displayNone{
    display: none;
}

.displayBlock{
    display: block;
}

.addOpacity{
    opacity: 0.3;
}


`;