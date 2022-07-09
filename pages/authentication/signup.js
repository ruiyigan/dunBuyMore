import { useRouter } from 'next/router'
import { signup } from '../../firebase-services/authentication';
import { LockClosedIcon } from '@heroicons/react/solid'

export default function SignupForm() {
  const router = useRouter()

  const onSubmit = (event) => {
    event.preventDefault()
    signup(event.target.email.value, event.target.password.value, event.target.username.value, event.target.size.value)
    router.push('/')
  };

  return (
    <div className="flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 dark:bg-gray-600 h-screen">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">Sign Up Form</h1>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type='email'
                name='email'
                placeholder='Email'
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
            <div>
              <input
                type='password'
                name='password'
                placeholder='Password'
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
            <div>
              <input
                type='text'
                name='username'
                placeholder='Username'
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
            <div>
              <input
                type='text'
                name='size'
                placeholder='Household Size'
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
          </div>
          <div>
            <button
              type='submit'
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-teal-400 group-hover:text-teal-300" aria-hidden="true" />
              </span>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}