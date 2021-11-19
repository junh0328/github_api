import { css } from '@emotion/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'

interface keyInterface {
  id: number
  name: string
  description: string
  // 이슈에 해당하는 href 추가 필요
}

const Keywords = () => {
  const router = useRouter()
  const [keywords, setKeywords] = useState<keyInterface[]>([])

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

  // 단일 검색어 삭제
  const handleRemoveKeyword = (id: number) => {
    const nextKeyword = keywords.filter((keyword) => {
      return keyword.id != id
    })
    setKeywords(nextKeyword)
  }

  //검색어 전체 삭제
  const handleClearKeywords = () => {
    setKeywords([])
  }

  return (
    <div css={userWrap}>
      <div css={infoWrap}>
        <h1>마이 페이지</h1>
        <p>
          <button type="button" onClick={() => router.back()}>
            뒤로가기
          </button>
          <button type="button" onClick={() => handleClearKeywords()}>
            전체 삭제하기
          </button>
        </p>
      </div>
      <div>
        <ul>
          {keywords.length ? (
            keywords.map((v) => (
              <li key={v.id}>
                <a>{v.name}</a>
                <p>{v.description}</p>
                <button type="button" onClick={() => router.push(`/user/repo/${v.name}`)}>
                  이슈보기
                </button>
                <button type="button" onClick={() => handleRemoveKeyword(v.id)}>
                  삭제하기
                </button>
              </li>
            ))
          ) : (
            <div>등록한 데이터가 없어요...</div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Keywords

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

const infoWrap = css`
  h1 {
    width: 100%;
    text-align: center;
  }

  p {
    text-align: center;
    button {
      text-align: center;
    }
  }
`
