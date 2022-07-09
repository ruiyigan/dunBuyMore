import { CameraIcon } from '@heroicons/react/solid'
import LogoutButton from '../components/LogoutButton';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import 'react-html5-camera-photo/build/css/index.css';
import CameraComponent from '../components/CameraComponent';
import AuthStateListener from '../components/AuthStateListener';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [openCamera, setOpenCamera] = useState(false)
  const [dataUri, setDataUri] = useState('');
  const router = useRouter()

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
      <button onClick={() => router.push('/fridge/addfood')}>Add Food to Fridge</button>
      <LogoutButton />
    </div>
  )
}