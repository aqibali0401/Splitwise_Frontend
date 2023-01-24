import { useState } from "react";
import OwnOwedContext from "./OwnOwedContext";

const OwnOwedState = (props) => {
    const host = 'http://localhost:5000/api/v1/user/';
    const [totalOwnAmount, setTotalOwnAmount] = useState(0);
    const [totalOwedAmount, setTotalOwedAmount] = useState(0);

    const [owedAmountsArr, setOwedAmountsArr] = useState([]);
    const [oweAmountArr, setOweAmountArr] = useState([]);

    const fetchOwnOwedAmount = async () => {
        const authToken = localStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`
            }
        };

        const response = await fetch(`${host}totalOwenOwedAmount`, requestOptions);
        const result = await response.json();

        // console.log('restult ye he -> ', result);
        // console.log('result.totalLenahe -> ', result.result.totalLenahe);

        if (!result.error) {
            const tlh = Math.round(result.result.totalLenahe * 100) / 100;
            const tdh = Math.round(result.result.totalDenahe * 100) / 100;

            setTotalOwedAmount(tlh);
            setTotalOwnAmount(tdh)
        }

    };


    const fetchOwenOwedAmountFromDiffrentUser = async () => {
        const authToken = localStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`
            }
        };
        const response = await fetch(`${host}fetchOwenOwedAmountFromDiffrentUser`, requestOptions);
        const result = await response.json();
        if (!result.error) {
            // const tlh = Math.round(result.result.totalLenahe * 100) / 100;
            // const tdh = Math.round(result.result.totalDenahe * 100) / 100;

            setOwedAmountsArr(result.result.lenaHePeople);
            setOweAmountArr(result.result.denaHePeople)
        }

    };

    return (
        <OwnOwedContext.Provider value={{ totalOwnAmount, totalOwedAmount, fetchOwnOwedAmount, owedAmountsArr, oweAmountArr, fetchOwenOwedAmountFromDiffrentUser }}>
            {props.children}
        </OwnOwedContext.Provider>
    )
}

export default OwnOwedState;