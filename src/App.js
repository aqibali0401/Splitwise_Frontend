import './App.css';
// import Navbar from './components/Navbar';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Dashbord from './components/Dashbord';
import Header from './components/Header';
import Footer from './components/Footer';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import EmailSentMessage from './components/EmailSentMessage';
import GroupState from './context/showGroup/GroupState';
import FriendState from './context/showFriends/FriendState';
import AddGroup from './components/AddGroup';


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



  return (
    <>

      <FriendState>
        <GroupState>
          <Router>
            {/* <Navbar /> */}
            <Header />
            <Alert alert={alert} />
            <div className="">
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} />} ></Route>
                <Route exact path="/dashbord" element={<Dashbord showAlert={showAlert} />} ></Route>
                <Route exact path="/login" element={auth ? <Dashbord /> : <Login showAlert={showAlert} />} ></Route>
                <Route exact path="/signup" element={<Signup showAlert={showAlert} />} ></Route>
                <Route exact path="/forgotpassword" element={<ForgotPassword showAlert={showAlert} />} ></Route>
                <Route exact path="/reset-password/:id/:token" element={<ResetPassword showAlert={showAlert} />} ></Route>
                <Route exact path="/emailSentMessage" element={<EmailSentMessage showAlert={showAlert} />} ></Route>
                <Route exact path="/addGroup" element={<AddGroup showAlert={showAlert} />} ></Route>
              </Routes>
            </div>
            <Footer />
          </Router>
        </GroupState>
      </FriendState>
    </>
  );
}

export default App;
