import { CameraIcon } from '@heroicons/react/solid'
import LogoutButton from '../components/LogoutButton';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import 'react-html5-camera-photo/build/css/index.css';
import CameraComponent from '../components/CameraComponent';
import AuthStateListener from '../components/AuthStateListener';
import BackButton from '../components/BackButton';

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
      <div className='pt-20'>
        <div className='flex py-10'>
          <CameraIcon className='h-15 w-14 ml-auto mr-auto' onClick={() => setOpenCamera(true)} />
        </div>
        <div className='flex py-10 align-middle justify-center'>
          <img onClick={() => router.push('/fridge/viewfood')} className='h-15 w-14' src="https://cdn-icons.flaticon.com/png/512/3441/premium/3441529.png?token=exp=1657397174~hmac=725d6a99df6121e309f21ceb5202ba83" />
        </div>
      </div>
      <div>
        <LogoutButton />
        <BackButton />
      </div>
    </div>
  )
}