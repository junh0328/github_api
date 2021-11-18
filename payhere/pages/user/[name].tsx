import { useRouter } from 'next/router'
import React from 'react'

const User = () => {
  const router = useRouter()
  const { name } = router.query
  return (
    <div>
      <h1>{name}님 어서오세요!</h1>
    </div>
  )
}

export default User
