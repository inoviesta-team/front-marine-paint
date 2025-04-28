import { useEffect } from 'react';
import useAuthStore from './zustand/useAuthStore';

export default function AuthProvider({children}) {

    const { loading, user, checkAuth } = useAuthStore()

    console.log("BFFFF USER: ", user);
    useEffect(() => {

      const checkAuthAsync = async () => {
        await checkAuth()
      }

      checkAuthAsync()
    }, [])

    if(loading) {
        return <div>Loading...</div>;
    }

    console.log("AFFF USER: ", user);
    

  return (
    <div>{children}</div>
  )
}
