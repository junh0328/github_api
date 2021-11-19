import { css } from '@emotion/react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { userRepoData } from 'types'

interface keyInterface {
  id: number
  name: string
  description: string
  // 이슈에 해당하는 href 추가 필요
}

const User = () => {
  const router = useRouter()
  const { name } = router.query

  const [fetchData, setFetchData] = useState<boolean>(false)
  const [githubName, setGithubName] = useState<string>('')
  const [repos, setRepos] = useState<userRepoData[]>([])
  const [query, setQuery] = useState('')

  const [keywords, setKeywords] = useState<keyInterface[]>([])

  useEffect(() => {
    if (name) {
      fetchUser(name)
    }
  }, [name])

  // ① window 즉, 브라우저가 모두 렌더링된 상태에서 해당 함수를 실행할 수 있도록 작업
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('keywords') || '[]'
      setKeywords(JSON.parse(result))
    }
  }, [])

  // ② keywords 객체를 의존하여, 변경될 경우 새롭게 localStroage의 아이템 'keywords'를 세팅한다
  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords))
  }, [keywords])

  const fetchRepo = useCallback(
    (e) => {
      e.preventDefault()
      router.push(`/user/repo/${query}`)
    },
    [router, query]
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

  /* 로컬 스토리지에 퍼블릭 레포지토리 저장하기 */
  const addPublicRepo = useCallback(
    (id, name, description) => {
      if (keywords.length >= 4) {
        alert('더이상 즐겨찾는 레포지토리를 추가할 수 없습니다.')
        return
      } else {
        alert(`id:${id}\n레포지토리명: ${name}\n설명: ${description}`)

        const newKeyword: keyInterface = {
          id: id,
          name: name,
          description: description,
        }
        setKeywords([...keywords, newKeyword])
      }
    },
    [keywords]
  )

  return (
    <div css={userWrap}>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <div>
          <Link href="/keywords">
            <a>즐겨찾는 레포지토리로 가기</a>
          </Link>
        </div>
        <div>{githubName ? <span>{githubName}님 환영합니다</span> : <span>Loading...</span>}</div>
        <form onSubmit={fetchRepo}>
          <input
            style={{ width: 300 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`${githubName}님의 레포지토리를 검색해보세요`}
          />
        </form>
      </div>
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
                  <button type="button" onClick={() => addPublicRepo(v.id, v.name, v.description)}>
                    등록하기
                  </button>
                  <button type="button" onClick={() => router.push(`/user/repo/${v.name}`)}>
                    이동하기
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

  button {
    margin-right: 5px;
  }
`
