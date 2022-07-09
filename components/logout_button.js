import { useRouter } from 'next/router'

import { signout } from '../firebase-services/authentication'

export default function LogoutButton() {
  const onClick = () => {
    signout()
  }

  return (
    <>
      <button onClick={onClick}>Logout</button>
    </>
  )
}