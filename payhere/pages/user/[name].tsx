import { css } from '@emotion/react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { userRepoData } from 'types'

const User = () => {
  const router = useRouter()
  const { name } = router.query

  const [fetchData, setFetchData] = useState<boolean>(false)
  const [githubName, setGithubName] = useState<string>('')
  const [repos, setRepos] = useState<userRepoData[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (name) {
      fetchUser(name)
    }
  }, [name])

  const fetchRepo = useCallback(
    async (e) => {
      e.preventDefault()
      setQuery('')
      try {
        await axios.get(`https://api.github.com/repos/${name}/${query}`).then((res) => console.log('res:', res))
      } catch (err) {
        console.error(err)
      }
    },
    [name, query]
  )

  const fetchUser = useCallback(async (name) => {
    try {
      await axios.get(`https://api.github.com/users/${name}`).then((res) => {
        if (res.status === 200) {
          setGithubName(res.data.name)
        }
      })
      await axios.get(`https://api.github.com/users/${name}/repos?per_page=10`).then((res) => {
        if (res.status === 200) {
          setRepos(res.data)
        }
        setFetchData(true)
      })
    } catch (err) {
      console.error(err)
    }
  }, [])

  const addPublicRepo = useCallback((name, description) => {
    console.log(`레포지토리명: ${name}\n설명: ${description}`)
  }, [])

  return (
    <div css={userWrap}>
      <div>{githubName ? <span>{githubName}님 환영합니다</span> : <span>Loading...</span>}</div>
      <form onSubmit={fetchRepo}>
        <input
          style={{ width: 300 }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`${githubName}님의 레포지토리를 검색해보세요`}
        />
      </form>
      <div>
        {fetchData ? (
          <ul>
            {repos.length ? (
              repos.map((v, i) => (
                <li key={v.id}>
                  <Link href={`${v.html_url}`}>
                    <a>{v.name}</a>
                  </Link>
                  <p>{v.description}</p>
                  <button type="button" onClick={() => addPublicRepo(v.name, v.description)}>
                    등록하기
                  </button>
                </li>
              ))
            ) : (
              <div>가져올 수 있는 데이터가 없어요...</div>
            )}
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
    padding: 0 40px;
  }

  li {
    border: 1px solid black;
    margin-bottom: 10px;
    padding: 10px;

    a {
      font-size: 1.3rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`
