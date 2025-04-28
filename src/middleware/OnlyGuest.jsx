import useAuthStore from '@features/auth/zustand/useAuthStore'
import React, { useRef, useEffect } from 'react'

export default function OnlyGuest({children}) {

    const { isAuthenticated, user } = useAuthStore()
    const backButtonRef = useRef();

    useEffect(() => {
      const jwtToken = localStorage.getItem("jwtToken");

      if(isAuthenticated && user && jwtToken) {
        backButtonRef.current.click();
      }
    }, [isAuthenticated, user]);

  return (
    <div><a ref={backButtonRef} className='hidden' href="/"></a> {children}</div>
  )
}

