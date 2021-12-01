import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { userRepoData, userRepoIssue } from 'types'
import Link from 'next/link'
import axios from 'apis'

interface keyInterface {
  id: number
  name: string
  description: string
}

const Repository = () => {
  const router = useRouter()
  const { query } = router.query

  /* 로컬 스토리지에 저장한 사용자 이름 */
  const [localName, setLocalName] = useState<string | null>('')
  /* axios fetching 결과 */
  const [result, setResult] = useState<userRepoData[]>([])
  /* axios fetching issue 결과 */
  const [issue, setIssue] = useState<userRepoIssue[]>([])

  /* 로컬 스토리지에 저장할 키워드 배열 */
  const [keywords, setKeywords] = useState<keyInterface[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('name')
      setLocalName(name)
    }
  }, [])

  useEffect(() => {
    if (localName && query) {
      fetchRepo(localName, query)
      fetchIssue(localName, query)
    }
  }, [query, localName])

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

  const fetchRepo = useCallback(async (localName, query) => {
    try {
      await axios.get(`/repos/${localName}/${query}`).then((res) => {
        if (res.status === 200) {
          setResult(Array(res.data))
        }
      })
    } catch (err) {
      console.error(err)
    }
  }, [])

  const fetchIssue = useCallback(async (localName, query) => {
    try {
      await axios.get(`/repos/${localName}/${query}/issues`).then((res) => {
        if (res.status === 200) {
          setIssue(res.data)
        }
      })
    } catch (err) {
      console.error(err)
    }
  }, [])

  /* 로컬 스토리지에 퍼블릭 레포지토리 저장하기 */
  const addPublicRepo = useCallback(
    (id, name, description) => {
      if (keywords.some((keyword) => keyword.id === id) === true) {
        alert('같은 레포지토리를 추가할 수 없습니다')
        return
      } else {
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
      }
    },
    [keywords]
  )

  return (
    <div css={userWrap}>
      <h1>
        {localName}님의 게시글 {query}입니다!
      </h1>

      <div>
        {result.length ? (
          <ul>
            {result.map((v) => (
              <li key={v.id}>
                <a>제목: {v.name}</a>
                <p>{v.description}</p>
                <button type="button" onClick={() => addPublicRepo(v.id, v.name, v.description)}>
                  등록하기
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div>Loading</div>
        )}
      </div>

      <div>
        {issue.length ? (
          <>
            <h2>Issues</h2>
            <ul>
              {issue.map((v) => (
                <li key={v.id}>
                  <Link href={v.html_url}>
                    <a>이슈명: {v.title}</a>
                  </Link>
                  <a>({query})</a>
                  <div style={{ padding: '10px 0' }}>
                    {v.labels.length ? (
                      <div css={labelWrap}>
                        {v.labels.map((v) => (
                          <a key={v.id} style={{}}>
                            {v.name}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>작성하신 이슈가 없어요...</div>
        )}
      </div>
    </div>
  )
}

export default Repository

const userWrap = css`
  h1 {
    text-align: center;
  }

  h2 {
    text-align: center;
  }

  a {
    margin-right: 5px;
  }
  ul {
    list-style: none;
    padding: 0 40px;
  }

  li:first-of-type {
    border-top: 1px solid black;
  }

  li {
    border-bottom: 1px solid black;
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

const labelWrap = css`
  a {
    background-color: #d3d3d3;
    font-size: 1rem !important;
    margin-right: 5;
    border: 1px solid #d3d3d3;
    border-radius: 20px;
    padding: 8px 10px;
  }
`
