import React, { useState } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import modalContext from '../context/modal/ModalContext';
import userContext from '../context/UserContext/UserContext';
import friendContext from '../context/showFriends/friendContext';


const Modal = () => {



    const { settleExpensePaidByModal, setSettleExpensePaidByModal, setChoosePayerModal, settleExpensePaidByName, setSettleExpensePaidByName, setSettleExpensePaidById } = useContext(modalContext);
    const { user } = useContext(userContext);
    const { friends } = useContext(friendContext);


    let payingUserAll = [];
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const defaultUser = { userName: userDetails.data.user.name, userId: userDetails.data.user.id };
    payingUserAll.push(defaultUser);
    friends.map((user) => {
        return (
            payingUserAll.push({ userName: user.friend.userName, userId: user.friend._id })
        )
    });

    const setSettleExpensePaidByNameFn = (name) => {
        setSettleExpensePaidByName(name)
    }

    const setSettleExpensePaidByIdFn = (userId) => {
        setSettleExpensePaidById(userId)
    }



    return (
        <SettleExpensePaidByModal>
            {
                settleExpensePaidByModal ?
                    <>

                        <h1>Payer modal</h1>
                        <div className="darkBG" onClick={() => { setSettleExpensePaidByModal(false) }} />
                        <div className="centered">
                            <div className="subview choosePayerModal">
                                <div className='choosePayerHeader'>
                                    <h5 className="heading">Choose payer</h5>
                                    <button className="dismiss" onClick={() => { setSettleExpensePaidByModal(false) }}>×</button>
                                </div>
                                <div className="choosePayerBody">
                                    <ul className='unorderedList'>
                                        {payingUserAll.map((user) => {
                                            return (
                                                <li key={user.userId} onClick={(e) => { setSettleExpensePaidByModal(false); setSettleExpensePaidByNameFn(user.userName); setSettleExpensePaidByIdFn(user.userId); }} className="choosePayerName">
                                                    <img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal28-50px.png" />
                                                    &nbsp;&nbsp;{user.userName}
                                                </li>
                                            )
                                        })}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </> : ""
            }

        </SettleExpensePaidByModal>
    )
}

export default Modal


const SettleExpensePaidByModal = styled.section`

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

.subview{
    background: #fff;
    width: 350px;
    border: 1px solid #999;
    box-shadow: 0px 2px 8px rgb(0 0 0 / 30%);
    /* overflow: hidden; */
    border-radius: 5px;
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

.heading {
    margin: 0;
    padding: 10px;
    color: white;
    font-weight: 500;
    font-size: 20px;
    text-align: center;
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

.choosePayerBody > ul > li ul li {
    /* border: 2px solid red; */
    list-style: none;
    margin: 0;
    padding: 10px 0 0;
}

.unorderedList{
    margin: 0px;
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

`;