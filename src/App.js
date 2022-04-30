import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useDispatch, useSelector} from 'react-redux';
import { logout ,login, selectUser} from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=> {
    auth.onAuthStateChanged((authUser) => {
      if (authUser){
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id:authUser.uid,

        }))
      }  else {
        dispatch(logout())
      }
    })
  },[])


  return (
    <div className="app">
      
      <Router>
        {!user ? (
          <Login />
        ):(
          <>
          <img className='app__logo' src='https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg' />
          <div className='app__body'>
            <div className='app__bodyBackground'>
            <Routes>
                <Route  exact path="/"  element={<WebcamCapture />}/>
                <Route  path="/preview"  element={<Preview/>}/>
                <Route  path="/chats"  element={<Chats/>}/>
                <Route  path="/chats/view"  element={<ChatView/>}/>
                
              </Routes>
             </div>
            </div>
        </>
        )}
        
      </Router>
      



    </div>
  );
}

export default App;
