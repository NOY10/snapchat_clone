import React, { useCallback, useRef} from 'react'
import Webcam from 'react-webcam';
import { RadioButtonUnchecked } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import './WebcamCapture.css';


const videoConstraints = {
    width: 250,
    height:400,
    facingMode:"user",
};

function WebcamCapture() {
    const webcamRef =useRef(null);

    const dispatch= useDispatch();

    const history=useNavigate();

    const capture = useCallback(()=>{
        const imagrSrc=webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imagrSrc));
        history('/Preview');
    },[webcamRef]);
  return (
    <div className='webcamCapture'>
        <Webcam 
          audio={false}
          height={videoConstraints.height}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={videoConstraints.width}
          videoConstraints={videoConstraints}
        />

        <RadioButtonUnchecked
            className='webcamCapture__button'
            onClick={capture}

        />
         
    </div>
  )
}

export default WebcamCapture