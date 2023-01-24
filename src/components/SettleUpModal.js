import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import modalContext from '../context/modal/ModalContext';
import friendContext from '../context/showFriends/friendContext';

const SettleUpModal = (props) => {

    const [settleExpenseDate, setSettleExpenseDate] = useState(new Date());
    const [settlePayingAmount, setSettlePayingAmount] = useState(0);

    const { settleUpModal, settleExpensePaidByModal, setSettleExpensePaidByModal, setSettleUpModal, settleExpensePaidByName, settleExpensePaidById, settleExpenseResivedByModal, setSettleExpenseResivedByModal, settleExpenseReceiverName, setSettleExpenseReceiverId, settleExpenseReceiverId, updateAddExpenseState, setUpdateAddExpenseState } = useContext(modalContext);

    const toggleModal = (input) => {
        if (input === 'setSettleUpModal') {
            setSettleExpensePaidByModal(false);
            setSettleExpenseResivedByModal(false);
            if (settleUpModal) {
                setSettleUpModal(false);
            } else {
                setSettleUpModal(true);
            }
        } else if (input === 'setSettleExpensePaidByModal') {
            setSettleExpenseResivedByModal(false);
            if (settleExpensePaidByModal) {
                setSettleExpensePaidByModal(false);
            } else {
                setSettleExpensePaidByModal(true);
            }
        } else if (input === 'setSettleExpenseResivedByModal') {
            setSettleExpensePaidByModal(false);
            if (settleExpenseResivedByModal) {
                setSettleExpenseResivedByModal(false);
            } else {
                setSettleExpenseResivedByModal(true);
            }
        }
    }

    const handleSubmit = async (e) => {
        let sendData = {}
        sendData.paidBy = settleExpensePaidById;
        sendData.paidTo = settleExpenseReceiverId;
        sendData.amount = settlePayingAmount;
        sendData.date = settleExpenseDate;

        console.log(sendData);
        e.preventDefault();
        const authToken = localStorage.getItem('token');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(sendData)
        };
        const response = await fetch(`http://localhost:5000/api/v1/expense/settle/settleExpense`, requestOptions);
        const result = await response.json();

        console.log('addExpense result -> ', result);

        if (!result.error) {
            props.showAlert(result.message, "success");
            updateAddExpenseState ? setUpdateAddExpenseState(false) : setUpdateAddExpenseState(true);
        } else {
            props.showAlert(result.error, "danger");
        }
    }

    const setSettlePayingAmountFn = (e) => {
        const x = isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber;
        setSettlePayingAmount(x)
    }


    // console.log('data is -> ', settleExpenseDate);
    // console.log(settleExpensePaidById);
    // console.log(settleExpenseReceiverId);



    return (
        <SettleUpModalStyle>
            <>
                {
                    settleUpModal ?
                        <>
                            <div className="darkBG" onClick={() => { toggleModal('setSettleUpModal') }} />
                            <div className="centered">
                                <div className="myModal">
                                    <div className="modalHeader">
                                        <h5 className="heading">Settle up</h5>
                                        <button className="dismiss2" onClick={() => { toggleModal('setSettleUpModal') }} data-dismiss="modal">×</button>
                                    </div>
                                    <div className="body2">

                                        <form id="new_user" onSubmit={handleSubmit} >
                                            <div className="main_fields2">
                                                <div className="images">
                                                    <img className="imgAvatar payer" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal28-100px.png" />
                                                    <img className="arrow" src="https://assets.splitwise.com/assets/fat_rabbit/settle-up-arrow-83553d33b6848bbdfa3499d7e217748aab1f75ff2073ec5ac67cba5246e12459.png" />
                                                    <img className="imgAvatar payee" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-ruby46-100px.png" />
                                                </div>

                                                <div className="human_summary">
                                                    <span onClick={() => { toggleModal('setSettleExpensePaidByModal') }} className="payer2 textDecorationNone">{settleExpensePaidByName}</span>
                                                    <span className="transaction_human_summary"> &nbsp; paid &nbsp;</span>
                                                    <span onClick={() => { toggleModal('setSettleExpenseResivedByModal') }} className="payer2 textDecorationNone">{settleExpenseReceiverName}</span>
                                                </div>
                                                <br />
                                                <div className="">
                                                    <span className="currency_code"><span style={{ fontSize: '25px' }}> ₹ </span></span>
                                                    <input type="number" name='amount' className="cost constInput" required placeholder="0.00" value={settlePayingAmount} onChange={(e) => { { setSettlePayingAmountFn(e) } }} />
                                                </div>
                                            </div>
                                            <br />

                                            <DatePicker name='date' className="date slim-button2 textDecorationNone" selected={settleExpenseDate} onChange={settleExpenseDate => setSettleExpenseDate(settleExpenseDate)} />
                                            <br />
                                            <br />

                                            <div className='midalFooter'>
                                                <button className="btn btn-large btn-cancel" onClick={() => { toggleModal('setSettleUpModal') }} >Cancel</button>
                                                <button onClick={() => { setTimeout(() => toggleModal('setSettleUpModal'), 1000); }} className="btn btn-large btn-mint submit">Save</button>
                                            </div>

                                        </form>



                                    </div>


                                </div>
                            </div>

                        </> : ""}
            </>
        </SettleUpModalStyle>
    )
}

export default SettleUpModal;

const SettleUpModalStyle = styled.section`

.images{
    display: block;
    align-items: center;
    text-align: center;
    display: inline-flex;

}

.arrow{
    width: 32px;
    margin: 0 5px;
}
.cost_container2 {
    position: relative;
    width: 181px;
    text-align: left;
    display: inline-block; 
    white-space: nowrap;
}

.btn-cancel{
    margin-right: 7px;
}

.human_summary {
    text-align: center;
    clear: both;
    margin: 15px 0 10px;
    font-size: 15px;
}

.midalFooter {
    letter-spacing: 3px;
    border-top: 1px solid #eee;
    text-align: right;
    padding: 8px 10px;
}

.imgAvatar{
    width: 58px;
    height: 58px; 
    border-radius: 30px;
    border: 1px solid #999; 
    box-shadow: inset 0 1px 4px rgb(0 0 0 / 30%);
}

img{
    max-width: 100%;
    vertical-align: middle;
}

.main_fields2 {
    position: relative;
    width: 265px;
    margin: 5px auto;
    text-align: center; 
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

.body2 {
    max-height: 435px;
    position: relative;
    padding: 10px;
    text-align: center;
}

.heading {
    margin: 0;
    padding: 10px;
    color: white;
    font-weight: 500;
    font-size: 20px;
    text-align: center;
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

.textDecorationNone  {
    text-decoration: none !important;
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

 .constInput{
    font-size: 36px;
    font-weight: bold;
    height: 40px;
    line-height: 40px; 
    padding-bottom: 0;
    margin-bottom: 0;
    vertical-align: bottom;
    width: 100px !important;
    outline: none;
    /* border: none !important; */
    box-shadow: none !important;
    border-radius: 5% !important;
    text-align: left;
    width: 177px;
    color: #333; 
    border-radius: 0;
 }




`;
