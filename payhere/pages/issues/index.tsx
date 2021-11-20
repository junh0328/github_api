import { css } from '@emotion/react'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { userRepoIssue } from 'types'
import Link from 'next/link'
import { Common } from 'styles/common'

interface keyInterface {
  id: number
  name: string
  description: string
}

const Issues = () => {
  const [keywords, setKeywords] = useState<keyInterface[]>([])
  const [localName, setLocalName] = useState<string | null>('')

  const [issues, setIssues] = useState<userRepoIssue[]>([])

  useEffect(() => {
    console.log('issues:', issues)
  }, [issues])

  // ① window 즉, 브라우저가 모두 렌더링된 상태에서 해당 함수를 실행할 수 있도록 작업
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('keywords') || '[]'
      setKeywords(JSON.parse(result))

      const name = localStorage.getItem('name')
      setLocalName(name)
    }
  }, [])

  useEffect(() => {
    if (keywords.length) {
      keywords.forEach((v, i) => {
        // console.log(i, ':', v.name)
        fetchIssue(v.name)
      })
    }
  }, [keywords])

  const fetchIssue = useCallback(
    async (name) => {
      try {
        await axios.get(`https://api.github.com/repos/${localName}/${name}/issues`).then((res) => {
          if (res.status === 200) {
            setIssues(issues.concat(res.data))
          }
        })
      } catch (err) {
        console.error(err)
      }
    },
    [localName]
  )

  return (
    <div css={userWrap}>
      <h1 style={{ textAlign: 'center' }}>이슈 모아보기</h1>

      <div>
        {issues.length ? (
          <ul className="ulWrap">
            {issues.map((v) => (
              <li key={v.id}>
                <div style={{ marginBottom: '15px' }}>
                  <Link href={`${v.html_url}`}>
                    <p>
                      <a style={{ marginRight: 10 }}>{v.repository_url.replace('https://api.github.com/repos/', '')}</a>
                      <a style={{ fontWeight: 'bold', color: '#0969da', cursor: 'pointer' }}>{v.title}</a>
                    </p>
                  </Link>
                </div>
                <div style={{ margin: '10px 0' }}>
                  {v.labels.length ? (
                    <div css={labelWrap}>
                      {v.labels.map((v) => (
                        <a key={v.id} style={{ marginRight: '5px' }}>
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
        ) : (
          <div>이슈가 아직 없어요...</div>
        )}
      </div>
    </div>
  )
}

export default Issues

const userWrap = css`
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
    padding: 10px 0;

    a {
      font-size: 1rem;
    }
    p {
      font-size: 0.8rem;
    }
  }

  button {
    margin-right: 5px;
  }

  .ulWrap {
    li & div {
      margin: 10px 0;
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
