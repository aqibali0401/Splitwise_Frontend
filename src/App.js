import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useEffect, useState } from 'react';
import Dashbord from './components/Dashbord';
import Header from './components/Header';
import Footer from './components/Footer';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import EmailSentMessage from './components/EmailSentMessage';
import GroupState from './context/showGroup/GroupState';
import FriendState from './context/showFriends/FriendState';
import OwnOwedState from './context/showOwnOwedAmount/OwnOwedState';
import AddGroup from './components/AddGroup';
import AddExpenseModal from './components/AddExpenseModal';
import SettleUpModal from './components/SettleUpModal';
import SplitOptions from './components/ChooseSplitOptions';
import ChoosePayer from './components/ChoosePayer';
import SettlePayer from './components/SettlePayer';
import SettleReciver from './components/SettleReciver';
import MiddleDashbord from './components/MiddleDashbord';
import UserDashbord from './components/UserDashbord';


import { Link, useNavigate } from "react-router-dom";



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }

  const auth = localStorage.getItem('token');

  const navigate = useNavigate();




  useEffect(() => {
    if (!auth) {
      navigate('/');

    }
  }, [auth])



  return (
    <>


      <Header />
      <Alert alert={alert} />
      <div className="">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} ></Route>
          <Route exact path="/dashbord" element={<><Dashbord showAlert={showAlert} /> <AddExpenseModal showAlert={showAlert} /> <SplitOptions /> <ChoosePayer /> <SettleUpModal showAlert={showAlert} /> <SettlePayer /> <SettleReciver />  </>} >
            <Route index element={<MiddleDashbord />} />
            <Route  path=':friendId' element={<UserDashbord />} />
          </Route>
          {/* <Route exact path="/login" element={auth ? <Dashbord /> : <Login showAlert={showAlert} />} ></Route> */}
          <Route exact path="/login" element={<Login showAlert={showAlert} />} ></Route>
          <Route exact path="/signup" element={<Signup showAlert={showAlert} />} ></Route>
          <Route exact path="/forgotpassword" element={<ForgotPassword showAlert={showAlert} />} ></Route>
          <Route exact path="/reset-password/:id/:token" element={<ResetPassword showAlert={showAlert} />} ></Route>
          <Route exact path="/emailSentMessage" element={<EmailSentMessage showAlert={showAlert} />} ></Route>
          <Route exact path="/addGroup" element={<AddGroup showAlert={showAlert} />} ></Route>
        </Routes>
      </div>
      <Footer />


    </>
  );
}

export default App;
