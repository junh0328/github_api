import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'

const User = () => {
  const router = useRouter()
  const { name } = router.query
  const [githubName, setGithubName] = useState<string>('')

  useEffect(() => {
    console.log('githubName:', githubName)
  }, [githubName])

  useEffect(() => {
    if (name) {
      fetchUser(name)
    }
  }, [name])

  const fetchUser = useCallback(async (name) => {
    try {
      await axios.get(`https://api.github.com/users/${name}`).then((res) => {
        if (res.status === 200) {
          console.log('user name:', res.data)
          setGithubName(res.data.name)
        }
      })
      // await axios.get(`https://api.github.com/users/${name}/repos`).then((res) => console.log(res))
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <div>
      <div>{githubName ? <span>{githubName}님 환영합니다</span> : <span>Loading...</span>}</div>
    </div>
  )
}

export default User
