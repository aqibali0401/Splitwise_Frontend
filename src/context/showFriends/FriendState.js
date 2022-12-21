import { useState } from "react";
import FriendContext from "./friendContext";


const FirendState = (props) => {
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
        console.log("frind result all -> ", result);
        if (!result.error) {
            setFriends(result.result);
        }
    };

    return (
        <FriendContext.Provider value={{ friends, fetchFriends }}>
            {props.children}
        </FriendContext.Provider>
    )
}

export default FirendState;