import { useRouter } from 'next/router'
import { signup } from '../../firebase-services/authentication';

export default function SignupForm() {
  const router = useRouter()

  const onSubmit = (event) => {
    event.preventDefault()
    signup(event.target.email.value, event.target.password.value, event.target.username.value)
    router.push('/')
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <label>Email <input type='email' name='email' required /></label>
        <label>Password <input type='password' name='password' /></label>
        <label>Username <input type='text' name='username' /></label>
        <button type='submit'>Sign Up</button>
      </form>
    </>
  )
}