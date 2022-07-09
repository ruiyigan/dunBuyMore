import { CameraIcon } from '@heroicons/react/solid'
import LogoutButton from '../components/logout_button';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase-services/config'
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function AuthStateListener(isLoading, setIsLoading) {
  const router = useRouter()
  useEffect(() => {
    // Listener
    onAuthStateChanged(auth, (user) => {

      if (user) {
        setIsLoading(false)
        router.push('/')
      } else {
        // Kick user to login page (maybe thank you page)
        router.push('/authentication/login')
      }
    });
  }, [])
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [openCamera, setOpenCamera] = useState(false)
  const [dataUri, setDataUri] = useState('');
  const isFullscreen = false;
  const handleTakePhoto = (data) => {
    const fileResult = dataURItoFileData(data)
    console.log(fileResult)
    setDataUri(data);
    setOpenCamera(false)
  }

  const dataURItoFileData = (dataURI) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    //New Code
    const blob =  new Blob([ab], {type: mimeString});
    const fd = new FormData(document.forms[0]);
    fd.append("file", blob);
    return fd.get("file");
  }

  AuthStateListener(isLoading, setIsLoading)
  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    )
  }

  return (
    <div>
      {openCamera
        &&
        <Camera
          onTakePhotoAnimationDone={handleTakePhoto}
          isFullscreen={isFullscreen}
          imageType={IMAGE_TYPES.JPG}
        />}

      <p>Welcome, you are logged in</p>
      <div className='flex py-10'>
        <CameraIcon className='h-15 w-14 ml-auto mr-auto' onClick={() => setOpenCamera(true)} />
      </div>
      <LogoutButton />
    </div>
  )
}