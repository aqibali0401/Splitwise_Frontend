import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import ModalState from './context/modal/ModalState';
import UserState from './context/UserContext/UserState';
import FirendState from './context/showFriends/FriendState';
import OwnOwedState from './context/showOwnOwedAmount/OwnOwedState';
import GroupState from './context/showGroup/GroupState';
import { BrowserRouter as Router, } from 'react-router-dom';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ModalState>
      <UserState>
        <FirendState>
          <OwnOwedState>
            <GroupState>
              <Router>
                <App />
              </Router>
            </GroupState>
          </OwnOwedState>
        </FirendState>
      </UserState>
    </ModalState>
  </React.StrictMode>
);
