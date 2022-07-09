import Head from 'next/head'
import Link from 'next/link'

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
      <p>Logged in</p>
      <LogoutButton />
    </div>
  )
}