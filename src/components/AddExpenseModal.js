import React, { useContext, useEffect, useState } from 'react';
import '../Css/Dashbord.css';
import modalContext from '../context/modal/ModalContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import friendContext from '../context/showFriends/friendContext';
import userContext from '../context/UserContext/UserContext';



const Modal = (props) => {

    const { modal, setModal, modal2, setModal2, choosePayerModal, setChoosePayerModal, payingUser, setPayingUser, addExpenseDiscription, setAddExpenseDiscription, addExpenseTotalAmount, setAddExpenseTotalAmount, addExpensePaidBy, addExpenseSplitOption, addExpenseDate, setAddExpenseDate, setAddExpensePerPersonShareToShow, disableInput, setUpdateAddExpenseState, updateAddExpenseState } = useContext(modalContext);
    const { friends } = useContext(friendContext);
    const { user, callfromModalState } = useContext(userContext);

    const payersList = (e) => {
        const userDetail = { label: user.name, value: { _id: user.id, userName: user.name }, paidAmount: 0, shareAmount: 0, splitEquallyIncludeCheckBox: true, sharesValue: 1 };
        const arr = [userDetail, ...e];
        setPayingUser(arr);
    };

    let options = [];
    friends.map(({ friend }) => {
        return (
            options.push({ value: friend, label: friend.userName, paidAmount: 0, shareAmount: 0, splitEquallyIncludeCheckBox: true, sharesValue: 1 })
        )
    });

    useEffect(() => {
        callfromModalState();
    }, [])

    const toggleModal = (input) => {
        if (input === 'setChoosePayerModal') {
            setChoosePayerModal(false);
            setModal2(false);
            if (choosePayerModal) {
                setChoosePayerModal(false);
            } else {
                setChoosePayerModal(true);
            }

        } else if (input === 'setModal') {
            setChoosePayerModal(false);
            setModal2(false);
            if (modal) {
                setModal(false);
            } else {
                setModal(true);
            }
        } else if (input === 'setModal2') {
            setChoosePayerModal(false);
            setModal2(false);
            if (modal2) {
                setModal2(false);
            } else {
                setModal2(true);
            }
        }
    }

    const setDiscriptionValue = (e) => {
        setAddExpenseDiscription(e.target.value);
    }
    const setExpenseTotalAmount = (e) => {
        setAddExpenseTotalAmount(e.target.value);
    }


    const splitEquallyForDisplay = (e, length) => {
        const totalAmount = e;
        let sharePerPersoneByEqually2 = totalAmount / length;
        let sharePerPersoneByEqually = Math.round(sharePerPersoneByEqually2 * 100.0) / 100.0;
        setAddExpensePerPersonShareToShow(sharePerPersoneByEqually);
        // if (disableInput === true) {
        //     let resultArr = payingUser.filter((payingUser) => {
        //         payingUser.paidAmount = sharePerPersoneByEqually;
        //         return payingUser
        //     })
        //     setPayingUser(resultArr);
        // }
    }

    const setDefaultPayerLoginUser = (e) => {
        const logdinUserId = user.id;
        let resultArr = payingUser.map((user) => {
            if (user.value._id === logdinUserId) {
                user.paidAmount = isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber;
            } else {
                user.paidAmount = 0;
            }
            return user
        })
        setPayingUser(resultArr);
        console.log("resultArr", resultArr);
    }


    const countUserShareEquallyDuplicate = () => {
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
        console.log('checkedUserArr', checkedUserArray);
    }


    const countUserShareEquallyDuplicate2 = (e) => {
        const filteredUsers = payingUser.filter((user) => {
            if (user.splitEquallyIncludeCheckBox === true) {
                return user
            }
        })

        const length = filteredUsers.length;

        const totalAmountt = isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber;

        const perpersonAmount = totalAmountt / length;

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
        console.log('checkedUserArr', checkedUserArray);
    }


    // const [addExpenseInputs, setAddExpenseInputs] = useState({ desc: '', amount: 0, date: addExpenseDate })

    const handleSubmit = async (e) => {
        let sendData = {}
        sendData.type = "Friend";
        sendData.desc = addExpenseDiscription;
        sendData.amount = addExpenseTotalAmount;
        sendData.category = "General";
        sendData.date = addExpenseDate;
        sendData.split_method = "equally";
        sendData.split_between = payingUser.map(v => ({ user: v.value._id, paid: v.paidAmount, share: v.shareAmount }))

        e.preventDefault();

        console.log('sendData->', sendData);

        const authToken = localStorage.getItem('token');

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(sendData)
        };

        const response = await fetch(`http://localhost:5000/api/v1/expense/addExpense`, requestOptions);
        const result = await response.json();
        console.log('addExpense result -> ', result);

        if (result.success) {
            props.showAlert(result.message, "success");
            updateAddExpenseState ? setUpdateAddExpenseState(false) : setUpdateAddExpenseState(true);
        } else {
            props.showAlert(result.error, "danger");
        }

    }

    return (
        <AddexpenseModalStyle>
            <>
                {
                    modal ?
                        <>
                            <div className="darkBG" onClick={() => { toggleModal('setModal') }} />
                            <div className="centered">
                                <div className="myModal">
                                    <div className="modalHeader">
                                        <h5 className="heading">Add an expense</h5>
                                        <button className="dismiss2" onClick={() => toggleModal('setModal')} data-dismiss="modal">×</button>
                                    </div>



                                    <div className="with_field ">
                                        <span className="with">With <strong>you</strong> and:</span>
                                        <div className='dropdown' >
                                            <Select required onChange={(e) => { payersList(e); splitEquallyForDisplay(addExpenseTotalAmount, (e.length + 1)) }} isMulti options={options} />
                                        </div>
                                    </div>

                                    <form id="new_user" onSubmit={handleSubmit} >

                                        <div className="body2">
                                            <div className="main_fields2">
                                                <img src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                                                    className="category2" />
                                                <div className='inputFields' >
                                                    <input type="text" className="description2" name='desc' required placeholder="Enter a description"
                                                        onChange={(e) => { setDiscriptionValue(e) }}
                                                        style={{ 'fontSize': '20px' }}
                                                        value={addExpenseDiscription}
                                                    />
                                                    <div className="cost_container2">
                                                        <span className="currency_code"><span style={{ fontSize: '20px' }}> ₹ </span></span>
                                                        <input type="number" name='amount' className="cost" required placeholder="0.00" onChange={(e) => { setExpenseTotalAmount(e); countUserShareEquallyDuplicate2(e); splitEquallyForDisplay(e.target.value, payingUser.length); setDefaultPayerLoginUser(e) }} value={addExpenseTotalAmount} />
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="human_summary">Paid by
                                                <span onClick={() => { toggleModal('setChoosePayerModal') }} className="payer2 textDecorationNone">{addExpensePaidBy}</span> and split&nbsp;
                                                <span onClick={() => { toggleModal('setModal2'); countUserShareEquallyDuplicate(); }} className="payer2 textDecorationNone"> {addExpenseSplitOption}</span>.
                                                {/* <div className="details2">($0.00/person)</div> */}
                                            </div>

                                            <DatePicker name='date' className="date slim-button2 textDecorationNone" selected={addExpenseDate} onChange={addExpenseDate => setAddExpenseDate(addExpenseDate)} />

                                            {/* <Link className="notes slim-button2 textDecorationNone">Add image/notes</Link>

                                            <Link className="group slim-button2 textDecorationNone">
                                                20 test
                                            </Link> */}

                                        </div>

                                        <div className='midalFooter'>
                                            <button className="btn btn-large btn-cancel" data-dismiss="modal" onClick={() => toggleModal('setModal')}>Cancel</button>
                                            <button type='submit' onClick={() => { setTimeout(() => toggleModal('setModal'), 1000); }} className="btn btn-large btn-mint submit">Save</button>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </> : ""}
            </>
        </AddexpenseModalStyle>
    )
}



export default Modal;


const AddexpenseModalStyle = styled.section`
 



.heading {
    margin: 0;
    padding: 10px;
    color: white;
    font-weight: 500;
    font-size: 20px;
    text-align: center;
}


.modalActions {
    position: absolute;
    bottom: 2px;
    margin-bottom: 10px;
    width: 100%;
}

.actionsContainer {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.closeBtn {
    cursor: pointer;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 8px;
    border: none;
    font-size: 20px;
    color: #2c3e50;
    background: white;
    transition: all 0.25s ease;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.06);
    position: absolute;
    right: 0;
    top: 0;
    align-self: flex-end;
    margin-top: -7px;
    margin-right: -7px;
}

.closeBtn:hover {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
    transform: translate(-4px, 4px);
}

.with_field {
    position: relative;
    padding: 4px;
    border-bottom: 1px solid #eee;
    padding-left: 98px;
}

.with {
    position: absolute;
    left: 10px;
    top: 11px;
    font-size: 18px;
}

.body2 {
    max-height: 435px;
    position: relative;
    padding: 10px;
    text-align: center;
}

.main_fields2 {
    position: relative;
    width: 265px;
    margin: 5px auto;
    text-align: right;
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

 .myModal {
     width: 450px;
     height: auto;
     background: white;
     border-radius: 16px;
     box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
 }

.description2 {
    height: auto !important;
    line-height: 24px;
    margin-top: 1px;
    margin-bottom: 3px;
    padding-left: 3px;
    padding-right: 3px; 
    width: 260px;
}

.cost_container2 {
    position: relative;
    width: 181px;
    text-align: left;
    display: inline-block; 
    white-space: nowrap;
}

.category2 {
    float: left;
    width: 64px;
    height: 64px;
    margin: 1px 16px 1px 0;
    border-radius: 4px;
    cursor: pointer;
}

.inputFields {
    display: flex;
    flex-wrap: wrap;
}

.human_summary {
    clear: both;
    margin: 15px 0 10px;
    font-size: 15px;
}

.payer2 {
    display: inline-block;
    background: #f6f6f6;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    height: 23px;
    line-height: 16px;
    padding: 2px 5px 0;
    border: 1px dashed #ccc;
    vertical-align: middle;
    color: #5cc5a7;
    margin: 0px;
    font-size: inherit;
    cursor: pointer;
    text-decoration: none;
    overflow: hidden;
    white-space: nowrap;
}

.details2 {
    margin: 3px 0;
    font-size: 15px;
}

.slim-button2 {
    display: inline-block;
    background: #f6f6f6;
    border-radius: 12px;
    height: 24px;
    line-height: 24px;
    width: 140px;
    padding: 0 5px;
    border: 1px solid #ccc;
    color: #666;
    margin: 5px;
    font-size: 15px;
    cursor: pointer;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
}

.midalFooter {
    letter-spacing: 3px;
    border-top: 1px solid #eee;
    text-align: right;
    padding: 8px 10px;
}

.btn-cancel {
    margin-right: 7px;
}



.textDecorationNone  {
    text-decoration: none !important;
    /* color: white; */
}
 
.textDecorationNone:hover {
    /* text-decoration: none !important; */
    color: #5cc5a7;
}
 

.dropdown{
    width: 300px;
    position: relative;
    right: -35px;
    font-size: 16px;
    size: 16px;

}

.cost{
    height: auto !important;
    width: 235px;
    font-size: 18px;

}

`;