import React, { useEffect } from 'react'
import './ChatView.css';
import { useSelector } from 'react-redux';
import { selectselectedImage } from './features/appSlice';
import { useNavigate } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function ChatView() {
    const selectImage = useSelector(selectselectedImage);
    const navigate=useNavigate();
    useEffect(() => {
      if (!selectImage){
          exit();
      }
    }, [selectImage])

    const exit =()=>{
        navigate('/chats')
    }
    
  return (
    <div className='chatView'>
        <img src={selectImage} onClick={exit} alt=""/>
        <div className='chatView__timer'>
          <CountdownCircleTimer
              isPlaying
              duration={10}
              strokeWidth={6}
              size={50}
              colors="#A30000"
              >
                  {({ remainingTime }) => {
                    if (remainingTime===0){
                      exit();
                    }
                    return remainingTime;}
                    }

            
          </CountdownCircleTimer>
        </div>
        
        
        

    </div>
  )
}

export default ChatView;