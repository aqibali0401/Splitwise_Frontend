import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../Css/AddGroup.css';

const AddGroup = (props) => {

    const navigate = useNavigate();
    const [style, setStyle] = useState("displayFlexEmailName");
    const [groupName, setGroupName] = useState("")
    const [groupType, setGroupType] = useState("Other")


    const changeStyle = (index, item) => {
        setStyle(style === "displayFlexEmailName" ? "displayFlexEmailName hideInputBox" : "displayFlexEmailName");
        let newArr = arr.filter((data, ind) => ind !== index)
        setArr(newArr);
    };

    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const name = userDetails.data.user.name;

    // const getUserDetails = async (e) => {      
    //     // e.preventDefault()
    //     const authToken = localStorage.getItem('token');
    //     const response = await fetch(`http://localhost:5000/api/v1/user/fetchUserDetails`, {
    //         method: 'GET', // *GET, POST, PUT, DELETE, etc.             
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': `Bearer ${authToken}`
    //         }
    //     });
    //     const userDetails = await response.json();
    //     console.log("USER DETAILS ----------------", userDetails.result.email);
    //     // if (json.success) {
    //     //     navigate('/dashbord');
    //     //     props.showAlert("Group Added successfully!!", "success");
    //     //   } else {
    //     //     props.showAlert("Invalid Details", "danger");
    //     //   }
    // }

    // getUserDetails();


    const handleSave = async (e) => {
        let sendData = {}
        sendData.groupName = groupName;
        sendData.groupType = groupType;
        sendData.admin = userDetails.data.user.id;
        sendData.members = arr.map(item => item.value)

        e.preventDefault()
        const authToken = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/v1/group/createGroup`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.             
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(sendData)
        });
        const json = await response.json();
        console.log('group ka result ->', json);
        if (!json.error) {
            navigate('/dashbord');
            props.showAlert(json.message, "success");
        } else {
            navigate('/dashbord');
            props.showAlert(json.error, "danger");
        }
    }

    const inputArr = [
        {
            type: "text",
            id: 1,
            value: ""
        }
    ];

    const [arr, setArr] = useState(inputArr);
    const addInput = () => {
        setArr(s => {
            const lastId = s[s.length - 1].id;
            return [
                ...s,
                {
                    type: "text",
                    value: ""
                }
            ];
        });
    };

    const handleChange = e => {
        e.preventDefault();
        const index = e.target.id;
        setArr(s => {
            const newArr = s.slice();
            newArr[index].value = e.target.value;
            return newArr;
        });
    };


    return (
        <div>

            <div className="flex_container blank_page clearfix inlineClass">
                <a href="/"><img height="200" width="200" className="envelope"
                    src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" /></a>

                <div className="contentBlock">
                    <h2 style={{ 'marginBottom': '10px', 'textTransform': 'uppercase', 'fontSize': '20px', 'color': '#999', 'fontWeight': 'bold', 'lineHeight': '20px' }}>
                        Start a new group
                    </h2>

                    <form className="form-stacked" onSubmit={handleSave}>

                        {/* <input type="hidden" name="authenticity_token"
                            value="wMTtlMqJnPdyrtVGLaETLJxEAMG5dx8opOoNTjyjT_O-ACipHqxe_54ViEpufZyD7tdnmqp1Q5NjuySEQys1bA"
                            autoComplete="off" /> */}

                        <div style={{ 'fontSize': '24px', 'lineHeight': '140%', 'margin': '16px 0 5px' }}>
                            My group shall be called…
                        </div>

                        <input tabIndex="1" placeholder="Grou Name" autoComplete="off" required
                            style={{ 'fontSize': '32px', 'height': '42px' }} type="text" name="group[name]" onChange={(e) => { setGroupName(e.target.value) }} id="group_name" />

                        <div className="secondary_fields" style={{ 'marginTop': '15px', 'position': 'relative' }}>
                            <hr style={{ 'marginTop': '-10px' }} />

                            <div style={{ 'minHeight': '126px' }}>
                                <div id="manual_entry">
                                    <h2 style={{ 'marginBottom': '10px', 'textTransform': 'uppercase', 'fontSize': '16px', 'color': '#999', 'fontWeight': 'bold', 'lineHeight': '20px' }}>Group members</h2>
                                    <div className="fields">
                                        <div className="group-member">

                                            <div className="fields displayFlexEmailName">
                                                <img className='emailImg'
                                                    src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal28-50px.png" />
                                                {name ? name : "null"}
                                                <input autoComplete="off" type="hidden" /></div>
                                        </div>
                                    </div>
                                    <div className="fields">
                                        <div className="fields">
                                            {arr.map((item, i) => {
                                                return (
                                                    <div className="displayFlexEmailName ">
                                                        <img className="faded emailImg "
                                                            src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey1-50px.png" />
                                                        <input placeholder="Email address (optional)" required className="emailBox" tabIndex="3"
                                                            onChange={handleChange}
                                                            value={item.value}
                                                            id={i}
                                                            type={item.type}
                                                            key={i}
                                                            size="40"
                                                        />
                                                        <a
                                                            className="removeCross"
                                                            onClick={() => { changeStyle(i, item) }}
                                                        >×</a>

                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>


                                    <a style={{ 'display': 'block', 'margin': '15px 0 10px', 'fontSize': '13px', 'lineHeight': '13px' }}
                                        className="add_nested_fields addPersonColor" onClick={addInput} >+
                                        Add a person</a>
                                </div>

                            </div>

                            <hr />

                            <h2 style={{ 'marginBottom': '10px' }}>Group type</h2>


                            <select required defaultValue={groupType}
                                onChange={(e) => { setGroupType(e.target.value) }} >
                                <option value="Trip">Trip</option>
                                <option value="Party">Party</option>
                                <option value="Home">Home</option>
                                <option value="Other">Other</option>
                            </select>

                            <hr />
                        </div>
                        <button className="btn btn-large btn-orange track" type="submit" >Save</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddGroup
