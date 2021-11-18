import { css } from '@emotion/react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { userRepoData } from 'types'

const User = () => {
  const router = useRouter()
  const { name } = router.query
  const [githubName, setGithubName] = useState<string>('')
  const [repos, setRepos] = useState<userRepoData[]>([])
  const [query, setQuery] = useState('')

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
      await axios.get(`https://api.github.com/users/${name}/repos`).then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          setRepos(res.data)
        }
      })
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <div css={userWrap}>
      <div>{githubName ? <span>{githubName}님 환영합니다</span> : <span>Loading...</span>}</div>
      <form>
        <input
          style={{ width: 300 }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`${githubName}님의 레포지토리를 검색해보세요`}
        />
      </form>
      <div>
        {repos.length ? (
          <ul>
            {repos.map((v, i) => (
              <li key={v.id}>
                <Link href={`${v.html_url}`}>
                  <a>{v.name}</a>
                </Link>
                <p>{v.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  )
}

export default User

const userWrap = css`
  ul {
    list-style: none;
  }

  li {
    border: 1px solid black;
    height: 80px;
    margin-bottom: 5px;
    padding: 5px;

    a {
      font-size: 1.3rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`
