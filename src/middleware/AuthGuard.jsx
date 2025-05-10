import useAuthStore from '@features/auth/zustand/useAuthStore'
import React, { useRef, useEffect } from 'react'

export default function AuthGuard({children, redirect = "/"}) {

    const { isAuthenticated, user, loading } = useAuthStore()
    const backButtonRef = useRef();

    useEffect(() => {
      const jwtToken = localStorage.getItem("jwtToken");

      if(!isAuthenticated || !user || !jwtToken) {
        backButtonRef.current.click();
      }
    }, [isAuthenticated, user]);

  return (
    <div><a ref={backButtonRef} className='hidden' href={redirect}></a> {children}</div>
  )
}