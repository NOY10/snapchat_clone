import { Avatar } from '@material-ui/core';
import { StopRounded } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactTimeago from 'react-timeago';
import './Chat.css';
import { selectImage } from './features/appSlice';
import { auth, db } from './firebase';


function Chat({id, username, timestamp, read, imageUrl, profilePic}) {

    const dispatch = useDispatch();
    const navigate= useNavigate();

    const open = () => {
        if (!read) {
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).set({
                read:true,

            },
                {merge:true}
            );
        }
        navigate('/chats/view');
    }
  return (
    <div onClick={open} className='chat'>
        <Avatar src={profilePic} />
        <div className='chat__info'>
            <h4>{username}</h4>
            <p>
                {!read && "Tap to view-"} {" "} <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/></p>
        </div>

        {!read && <StopRounded className='chat__readIcon'/>}

    </div>
  )
}

export default Chat;