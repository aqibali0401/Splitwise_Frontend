import { useState } from "react"
import modalContext from "./ModalContext"


const ModalState = (props) => {
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [choosePayerModal, setChoosePayerModal] = useState(false);
    const [settleExpensePaidByModal, setSettleExpensePaidByModal] = useState(false);  // settle paid by modal ke liye
    const [settleExpenseResivedByModal, setSettleExpenseResivedByModal] = useState(false);  // settle recived by modal ke liye

    const [settleUpModal, setSettleUpModal] = useState(false);

    const [payingUser, setPayingUser] = useState([]);

    const [addExpenseDiscription, setAddExpenseDiscription] = useState("");
    const [addExpenseTotalAmount, setAddExpenseTotalAmount] = useState(0);
    const [addExpensePaidBy, setAddExpensePaidBy] = useState('you');
    const [settleExpensePaidByName, setSettleExpensePaidByName] = useState('you'); // settle paid by name ke liye banaya he
    const [settleExpensePaidById, setSettleExpensePaidById] = useState(0); // settle paid by name ke liye banaya he

    const [settleExpenseReceiverName, setSettleExpenseReceiverName] = useState('you'); // settle paid by name ke liye banaya he
    const [settleExpenseReceiverId, setSettleExpenseReceiverId] = useState(0); // settle paid by name ke liye banaya he

    const [addExpenseSplitOption, setAddExpenseSplitOption] = useState('equally');
    const [addExpenseDate, setAddExpenseDate] = useState(new Date());
    const [addExpensePerPersonShareToShow, setAddExpensePerPersonShareToShow] = useState(0);
    const [disableInput, setDisableInput] = useState(false);

    const [updateAddExpenseState, setUpdateAddExpenseState] = useState(false);


    return (
        <modalContext.Provider value={{ modal, setModal, modal2, setModal2, choosePayerModal, setChoosePayerModal, payingUser, setPayingUser, addExpenseDiscription, setAddExpenseDiscription, addExpenseTotalAmount, setAddExpenseTotalAmount, addExpensePaidBy, setAddExpensePaidBy, addExpenseSplitOption, setAddExpenseSplitOption, addExpenseDate, setAddExpenseDate, addExpensePerPersonShareToShow, setAddExpensePerPersonShareToShow, disableInput, setDisableInput, settleUpModal, setSettleUpModal, settleExpensePaidByName, setSettleExpensePaidByName, settleExpensePaidByModal, setSettleExpensePaidByModal, settleExpensePaidById, setSettleExpensePaidById, settleExpenseResivedByModal, setSettleExpenseResivedByModal, settleExpenseReceiverName, setSettleExpenseReceiverName, settleExpenseReceiverId, setSettleExpenseReceiverId, updateAddExpenseState, setUpdateAddExpenseState }}>
            {props.children}
        </modalContext.Provider>
    )
}

export default ModalState;