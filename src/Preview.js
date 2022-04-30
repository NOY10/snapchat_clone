import { AttachFile, Close, Create, Crop, MusicNote, Note, Send, TextFields, Timer } from '@material-ui/icons';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import './Preview.css';
import { v4 as uuid} from "uuid";
import { db, storage} from './firebase';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { doc, serverTimestamp, setDoc } from "firebase/firestore"; 
import { selectUser } from './features/appSlice';


function Preview() {
  const CameraImage=useSelector(selectCameraImage);
  const history=useNavigate();
  const dispatch=useDispatch();
  const user = useSelector(selectUser);

  useEffect(()=> {
    if(!CameraImage){
      history('/');

    }

  },[CameraImage,history]);
  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = async () => {
    // I used uuid package to generate Ids
    const id = uuid();
    const storageRef = ref(storage, `posts/${id}`);

    // I await the uploadTast to finish
    const uploadTask = await uploadString(storageRef, CameraImage, 'data_url');
    

    //than get the url
    const url = await getDownloadURL(uploadTask.ref);

    //finally add the document to the DB
    await setDoc(
      doc(db, 'posts', id),
      {
        imageUrl: url,
        username: 'Lobzang Yonten',
        read: false,
        profilePic:user.profilePic,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    );
    
    history('/chats');

  };
  return (
    <div className='preview'>
      <Close onClick={closePreview} className='preview__close'/>
      <div className='preview__toolbarRight'>
        <TextFields />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />

      </div>
      <img src={CameraImage} alt=''/>
      <div onClick={sendPost} className='preview__footer'>
        <h2>Send Now</h2>
        <Send fontSize='small' className='preview__sendIcon'/>
      </div>

    </div>
  )
}

export default Preview