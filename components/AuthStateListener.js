import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../firebase-services/config";

const AuthStateListener = (isLoading, setIsLoading) => {
  const router = useRouter()
  useEffect(() => {
    // Listener
    onAuthStateChanged(auth, (user) => {

      if (user) {
        setIsLoading(false)
      } else {
        // Kick user to login page (maybe thank you page)
        router.push('/authentication/login')
      }
    });
  }, [])
}

export default AuthStateListener