import { useRouter } from 'next/router'

import { signout } from '../firebase-services/authentication'

export default function LogoutButton() {
  const onClick = () => {
    signout()
  }

  return (
    <>
      <button
        className="dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 absolute right-6 top-8 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded-full shadow-sm text-sm"
        onClick={onClick}>
        Logout
      </button>
    </>
  )
}