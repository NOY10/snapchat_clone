import { Avatar } from '@material-ui/core';
import { ChatBubble,RadioButtonUnchecked, Search } from '@material-ui/icons';
import React, { useEffect,useState } from 'react'
import './Chats.css';
import Chat from './Chat';
import { auth, db } from './firebase';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';
import { selectUser } from './features/appSlice';

function Chats() {
    const [posts,setPosts]=useState([]);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => setPosts(snapshot.docs.map((doc) =>({
            id:doc.id,
            data:doc.data(),   
        
           })
        )))
    },[]);
   
    const takeSnap = ()  =>{
        dispatch(resetCameraImage());
        navigate('/');
    }
  return (
    <div className='chats'>
        <div className='chats__header'>
            <Avatar src={user.profilePic} onClick={() => auth.signOut()} className='chats__avatar' />  
            <div className='chats__search'>
                <Search className='chats__searchIcon'/>
                <input placeholder='Friends' type='text'/>
            </div>
            <ChatBubble className='chats__chatIcon'/>
        </div>
        <div className='chat__posts'>
            {posts.map(({id,
                        data: {profilePic ,username ,timestamp,imageUrl,read},})=>(
                <Chat 
                    key={id}
                    id={id}
                    username={username}
                    timestamp={timestamp}
                    imageUrl={imageUrl}
                    read={read}
                    profilePic={profilePic}
                />

            ))}

        </div>
        <RadioButtonUnchecked
            className='chats__takePicIcon'
            onClick={takeSnap}
            fontSize='large'
        />

    </div>
  )
}

export default Chats;