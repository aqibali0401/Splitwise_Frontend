import { useState, useContext } from "react";
import FriendContext from "./friendContext";
import ModalContext from "../modal/ModalContext";


const FirendState = (props) => {

    const { setUpdateAddExpenseState, updateAddExpenseState } = useContext(ModalContext);

    const host = 'http://localhost:5000/api/v1/user/';
    const [friends, setFriends] = useState([]);

    const fetchFriends = async () => {
        const authToken = localStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`
            }
        };

        const response = await fetch(`${host}fetchFriends`, requestOptions);
        const result = await response.json();
        if (!result.error) {
            setFriends(result.result);
            updateAddExpenseState ? setUpdateAddExpenseState(false) : setUpdateAddExpenseState(true);
        }
    };

    return (
        <FriendContext.Provider value={{ friends, fetchFriends }}>
            {props.children}
        </FriendContext.Provider>
    )
}

export default FirendState;