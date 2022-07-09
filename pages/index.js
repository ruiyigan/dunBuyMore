import { CameraIcon } from '@heroicons/react/solid'
import LogoutButton from '../components/logout_button';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase-services/config'


function AuthStateListener(isLoading, setIsLoading) {
  const router = useRouter()

  useEffect(() => {
    // Listener
    onAuthStateChanged(auth, (user) => {

      if (user) {
        console.log('listened user signed in')
        console.log(user.uid)
        setIsLoading(false)
        router.push('/')
      } else {
        console.log('listened user signed out')
        // Kick user to login page (maybe thank you page)
        router.push('/authentication/login')
      }
    });
  }, [])
}

export default function Home() {

  const [isLoading, setIsLoading] = useState(true)

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
      <p>Welcome, you are logged in</p>
      <div className='flex py-10'>
        <CameraIcon className='h-15 w-14 ml-auto mr-auto' onClick={() => console.log("clicked")}/>
      </div>
      <LogoutButton/>
    </div>
  )
}