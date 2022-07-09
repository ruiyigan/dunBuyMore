import { CameraIcon } from '@heroicons/react/solid'
import LogoutButton from '../components/LogoutButton';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase-services/config'
import Camera, { IMAGE_TYPES, FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import CameraComponent from '../components/CameraComponent';

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

  AuthStateListener(isLoading, setIsLoading)
  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    )
  }

  if (openCamera) {
    return (
      <CameraComponent setDataUri={setDataUri} setOpenCamera={setOpenCamera} />
    )
  }

  return (
    <div>
      <p>Welcome, you are logged in</p>
      <div className='flex py-10'>
        <CameraIcon className='h-15 w-14 ml-auto mr-auto' onClick={() => setOpenCamera(true)} />
      </div>
      <LogoutButton />
    </div>
  )
}