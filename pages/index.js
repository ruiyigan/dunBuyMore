import { CameraIcon } from '@heroicons/react/solid'
import LogoutButton from '../components/LogoutButton';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import 'react-html5-camera-photo/build/css/index.css';
import CameraComponent from '../components/CameraComponent';
import AuthStateListener from '../components/AuthStateListener';
import BackButton from '../components/BackButton';
import fridgePic from '../images/fridge.png'
import Image from 'next/image';

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
        <div className='flex py-20'>
          <CameraIcon className='h-20 w-20 ml-auto mr-auto' onClick={() => setOpenCamera(true)} />
        </div>
        <div className='flex py-20 align-middle justify-center'>
          <Image src={fridgePic} onClick={() => router.push('/fridge/viewfood')} width={80} height={80} />
        </div>
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  )
}