import React, { useCallback, useEffect } from 'react'
import axios from 'axios'

const Issues = () => {
  // useEffect(() => {
  //   fetchIssue()
  // })

  // const fetchIssue = useCallback(async () => {
  //   try {
  //     await axios.get('https://api.github.com/user/issues').then((res) => console.log(res))
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }, [])

  return (
    <div>
      <h1>마이페이지입니다!</h1>
    </div>
  )
}

export default Issues
