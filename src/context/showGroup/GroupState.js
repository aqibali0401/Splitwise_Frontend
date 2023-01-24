import { useState } from "react";
import GroupContext from "./groupContext";


const GroupState = (props) => {
    const host = 'http://localhost:5000/api/v1/group/';
    const [groups, setGroups] = useState([]);

    const fetchGroups = async () => {
        const authToken = localStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`
            }
        };

        const response = await fetch(`${host}fetchGroup`, requestOptions);
        const result = await response.json();
        if (!result.error) {
            setGroups(result.result);
        }
    };

    return (
        <GroupContext.Provider value={{ groups, fetchGroups }}>
            {props.children}
        </GroupContext.Provider>
    )
}

export default GroupState;