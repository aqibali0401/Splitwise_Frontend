import { useContext, useState } from "react";
import ModalContext from "../modal/ModalContext";
import UserContext from "./UserContext";

const UserState = (props) => {

    const { setPayingUser } = useContext(ModalContext);



    const callfromModalState = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        setPayingUser([{ label: userDetails.data.user.name, value: { _id: userDetails.data.user.id, userName: userDetails.data.user.name } }]);
    }

    const [user, setUser] = useState({});

    if (Object.keys(user).length === 0 && localStorage.getItem('token')) {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        setUser(userDetails.data.user);
        // setPayingUser([{ label: userDetails.data.user.name, value: { _id: userDetails.data.user.id, userName: userDetails.data.user.name } }]);
    }


    return (
        <UserContext.Provider value={{ user, setUser, callfromModalState }}>
            {props.children}
        </UserContext.Provider>

    )
}

export default UserState;