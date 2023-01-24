import React, { useState } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';

import modalContext from '../context/modal/ModalContext';
import userContext from '../context/UserContext/UserContext';




const Modal = () => {



    const { choosePayerModal, setChoosePayerModal, setPayingUser, payingUser, setAddExpensePaidBy, addExpensePerPersonShareToShow, disableInput, setDisableInput, addExpenseTotalAmount } = useContext(modalContext);
    const { user } = useContext(userContext);

    const showPayerAmountFn = () => {
        setAddExpensePaidBy("multiple people");
        if (document.getElementById('multiplePayerAmountList').classList.contains('hidePayerAmountList')) {
            document.getElementById('multiplePayerAmountList').classList.remove('hidePayerAmountList');
        } else {
            document.getElementById('multiplePayerAmountList').classList.add('hidePayerAmountList');
        }
    }

    // const [displayPerPersonShareOnChecked, setDisplayPerPersonShareOnChecked] = useState(0);



    const eachPersonPaidTheirOwnShareCheckBoxFn = (e) => {
        if (e.target.checked) {
            // setDisplayPerPersonShareOnChecked(addExpensePerPersonShareToShow);

            let resultArr = payingUser.filter((payingUser) => {
                payingUser.paidAmount = addExpensePerPersonShareToShow;
                return payingUser
            })

            setPayingUser(resultArr);
            setDisableInput(true);

        } else {
            setDisableInput(false);
        }
    }


    // console.log("user", user);
    // id
    // : 
    // "63b3d26ed67c7c0d1c24f8cc"
    // name
    // : 
    // "Aqib"

    // const [aqibDummy, setAqibDummy] = useState({ "userId": user.id, "share": 0 });

    const inputChoosePayerIndividualAmount = (user, e) => {
        let resultArr = payingUser.filter((payingUser) => {
            if (payingUser.value._id === user.value._id) {
                payingUser.paidAmount = e.target.value;
            }
            return payingUser
        })        
        setPayingUser(resultArr);
        console.log("resultArr", resultArr);
        // setAqibDummy(e.target.value)
    }

    const expensePaidBySingleUser = (userDetail) => {
        setAddExpensePaidBy(userDetail.value.userName);
        let resultArr = payingUser.map((user) => {
            if (user.value._id === userDetail.value._id) {
                user.paidAmount = addExpenseTotalAmount;
            }else{
                user.paidAmount = 0;
            }
            return user
        })
        setPayingUser(resultArr);
        console.log("resultArr", resultArr);
    }

    return (
        <ChoosePayerModalStyle>
            {
                choosePayerModal ?
                    <>
                        <div className="darkBG" onClick={() => { setChoosePayerModal(false) }} />
                        <div className="centered">
                            <div className="subview choosePayerModal">
                                <div className='choosePayerHeader'>
                                    <h5 className="heading">Choose payer</h5>
                                    <button className="dismiss" onClick={() => { setChoosePayerModal(false) }}>×</button>
                                </div>
                                <div className="choosePayerBody">
                                    <ul className='unorderedList'>
                                        {payingUser.map((user) => {
                                            return (
                                                <li key={user.value._id} onClick={() => { setChoosePayerModal(false); expensePaidBySingleUser(user); }} className="choosePayerName">
                                                    <img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal28-50px.png" />
                                                    &nbsp;&nbsp;{user.value.userName}
                                                </li>
                                            )
                                        })}

                                        <li className="main_payer">
                                            <div className='multiplePeopleButton' onClick={() => { showPayerAmountFn() }}>Multiple people</div>
                                            <ul id='multiplePayerAmountList' className='insideUl hidePayerAmountList' >
                                                <li>
                                                    <label className='chekboxText'>
                                                        <input type="checkbox" id="checkBoxInput" onChange={(e) => eachPersonPaidTheirOwnShareCheckBoxFn(e)} />
                                                        Each person paid for their own share
                                                    </label>
                                                </li>

                                                {payingUser.map((user) => {
                                                    return (
                                                        <li key={user.value._id}>
                                                            {user.value.userName}
                                                            <div className="inputPrepend">
                                                                <span className="dollarSymbol">$</span>
                                                                <input className='multiplePayerInput' disabled={disableInput} type="number" onChange={(e) => { inputChoosePayerIndividualAmount(user, e) }} value={user.paidAmount} />
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                                }
                                            </ul>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </> : ""
            }

        </ChoosePayerModalStyle>
    )
}

export default Modal


const ChoosePayerModalStyle = styled.section`

.subview{
    background: #fff;
    width: 350px;
    border: 1px solid #999;
    box-shadow: 0px 2px 8px rgb(0 0 0 / 30%);
    /* overflow: hidden; */
    border-radius: 5px;
}

.choosePayerHeader{
    background: #5cc5a7;
    color: #fff;
    padding: 5px;
    border-bottom: 1px solid #36977b;
    text-shadow: 0 -1px 0 #318a71;
    font-size: 18px;
    font-weight: bold;
    border-radius: 3px 3px 0px 0px;

}

.dismiss{
    float: right;
    font-size: 30px;
    margin-top: -3px;
    color: #fff;
    text-decoration: none;
    position: absolute;
    right: 7px;
    top: 7px;
}

.choosePayerBody{
    text-align: left;
    padding: 0px;
}

.choosePayerName{
    cursor: pointer;
    margin: 0;
    padding: 10px 10px 9px;
    border-bottom: 1px solid #eee;
    display: flex;
}

img{
    width: 22px;
    height: 22px;
    border: 1px solid #ccc;
    border-radius: 12px;
    margin-right: 2px;
    margin-top: -2px;
    max-width: 100%;
    vertical-align: middle;
}

.main_payer{
    background: #eee;
    padding: 10px;
}

.isActive{
    background: #eee;
    font-weight: bold;
}

.unorderedList{
    margin: 0px;
}

.insideUl{
    border-top: 1px solid #ddd;
    cursor: auto;
    font-weight: normal;
    list-style: none;
    margin: 10px 0 0;
    padding: 0;
}

.choosePayerBody > ul > li ul li {
    /* border: 2px solid red; */
    list-style: none;
    margin: 0;
    padding: 10px 0 0;
}

.inputPrepend{
    margin: 3px 0 1px;
}

.dollarSymbol{
    display: inline-block;
    width: auto;
    height: auto;
    min-width: 16px;
    padding: 4px 5px;
    font-weight: normal;
    line-height: 18px;
    text-align: center;
    text-shadow: 0 1px 0 #ffffff;
    vertical-align: middle;
    background-color: #eeeeee;
    border: 1px solid #ccc;    
}

.chekboxText{
    color: grey;
}

.multiplePayerInput{
    position: relative;
    margin-bottom: 0; 
    vertical-align: middle; 
    border-radius: 0 3px 3px 0;
    height: auto;
    background-color: #ffffff;
    border: 1px solid #cccccc;
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

.choosePayerModal{ 
    width: 350px ;
    height: auto; 
    border-radius: 5px;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
    left: 230px;
    top: -202px;
    position: fixed;
    max-height: 420px;
    overflow-y: auto;
}

.heading {
    margin: 0;
    padding: 10px;
    color: white;
    font-weight: 500;
    font-size: 20px;
    text-align: center;
}

.multiplePeopleButton{
    cursor: pointer;
}

.hidePayerAmountList{
    display: none;
}

`;