import Link from "next/link";
import { useRouter } from 'next/router'
import { signin } from "../../firebase-services/authentication";

export default function LoginForm() {
  const router = useRouter()
  const onSubmit = (event) => {
    event.preventDefault()
    signin(event.target.email.value, event.target.password.value)
    router.push('/')
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label>Email <input type='email' name='email' required /></label>
        <br />
        <label>Password <input type='password' name='password' /></label>
        <button type='submit'>Login</button>
      </form>
      <Link href='/authentication/signup'>
        <a><p>Sign Up</p></a>
      </Link>
    </>
  )
}