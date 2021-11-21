import { css } from '@emotion/react'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { userRepoIssue } from 'types'
import Link from 'next/link'
import { Common } from 'styles/common'
import Pagination from 'components/Pagination'
import Issuses from 'components/Issues'
import Loading from 'components/Loading'

interface keyInterface {
  id: number
  name: string
  description: string
}

const Issues = () => {
  /* 로컬스토리지에 저장했던 키워드(모아보기 객체) */
  const [keywords, setKeywords] = useState<keyInterface[]>([])
  /* 로컬스토리지에 저장했던 유저의 깃허브 이름 */
  const [localName, setLocalName] = useState<string | null>('')
  /* 패칭한 이슈 */
  const [issues, setIssues] = useState<userRepoIssue[]>([])
  /* 로딩 axios 요청 간의 로딩 */
  const [loading, setLoading] = useState<boolean>(false)

  // -- 페이지네이션 --
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = issues.slice(indexOfFirstPost, indexOfLastPost)

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
        fetchIssue(v.name)
      })
    }
  }, [keywords])

  const fetchIssue = useCallback(
    async (name) => {
      setLoading(true)
      try {
        await axios.get(`https://api.github.com/repos/${localName}/${name}/issues`).then((res) => {
          if (res.status === 200) {
            setIssues(issues.concat(res.data))
          }
        })
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    },
    [localName, issues]
  )

  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber)
  }, [])

  return (
    <>
      {!loading ? (
        <div css={userWrap}>
          {issues.length ? (
            <Issuses issues={issues} currentPosts={currentPosts} />
          ) : (
            <Loading comment={'레포지토리에 모아볼 수 있는 이슈가 없어요...🥲'} />
          )}
          <Pagination postsPerPage={postsPerPage} totalPosts={issues.length} paginate={paginate} />
        </div>
      ) : (
        <Loading comment={'Loading...'} />
      )}
    </>
  )
}

export default Issues

const userWrap = css`
  max-width: 1280px;
  margin: 0 auto;

  .ulTHeader {
    margin-top: 10px;
    height: 50px;
    padding: 0 40px;

    div {
      height: 100%;

      p {
        font-weight: bolder;
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }

  ul {
    margin: 0 0;
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
