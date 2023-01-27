import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ModalContext from "../modal/ModalContext";
import UserContext from "./UserContext";

const UserState = (props) => {

    const { setPayingUser } = useContext(ModalContext);
    const [user, setUser] = useState({});
    const [auth, setAuth] = useState(false);
    // const [friendId, setFriendId] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const [friendExpenseDetails, setFriendExpenseDetails] = useState([])


    // const { friendId } = useParams();
    // console.log('friendId', friendId);



    const callfromModalState = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        setPayingUser([{ label: userDetails.data.user.name, value: { _id: userDetails.data.user.id, userName: userDetails.data.user.name } }]);
    }

    if (Object.keys(user).length === 0 && localStorage.getItem('token')) {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        setUser(userDetails.data.user);
        // setAuth(true);
        // setPayingUser([{ label: userDetails.data.user.name, value: { _id: userDetails.data.user.id, userName: userDetails.data.user.name } }]);
    }


    const getClickedFriendDetails = async (userId) => {
        const authToken = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/v1/user/fetchUserDetails/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`
            }
        });
        const details = await response.json();
        setUserDetails(details);
    };

    const getClickedFriendSettlementDetails = async (userId) => {
        const authToken = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/v1/user/fetchUserSettleExpenses/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`
            }
        });
        const details = await response.json();
        setFriendExpenseDetails(details);
    };



    return (
        <UserContext.Provider value={{ user, setUser, callfromModalState, auth, setAuth, getClickedFriendDetails, userDetails, setUserDetails, getClickedFriendSettlementDetails, friendExpenseDetails, setFriendExpenseDetails }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;