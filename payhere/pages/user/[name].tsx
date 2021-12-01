import { css } from '@emotion/react'
import axios from 'apis'

import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { Common } from 'styles/common'
import { userInfo, userRepoData } from 'types'

interface keyInterface {
  id: number
  name: string
  description: string
}

const User = () => {
  const router = useRouter()
  const { name } = router.query

  const [fetchData, setFetchData] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<userInfo[]>([])
  const [repos, setRepos] = useState<userRepoData[]>([])

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

  const fetchUser = useCallback(
    async (name) => {
      try {
        await axios.get(`/users/${name}`).then((res) => {
          if (res.status === 200) {
            setUserInfo(Array(res.data))
          }
        })
        /* /users/{username}/repos */
        await axios.get(`/users/${name}/repos?sort=updated&per_page=100`).then((res) => {
          if (res.status === 200) {
            setRepos(res.data)
          }
          setFetchData(true)
        })
      } catch (err) {
        console.log('err:', err)
        alert('깃허브에 등록되지 않은 사용자입니다🥲\n검색 페이지로 돌아갑니다')
        router.push('/')
      }
    },
    [router]
  )

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
      <div style={{ display: ' flex', paddingTop: '10px', width: '100%', flexWrap: 'wrap' }}>
        <div className="userInfo">
          {userInfo ? (
            <div>
              {userInfo.map((v) => (
                <div key={v.id} className="userInfoMain">
                  <Link href={`${v.html_url}`} passHref={true}>
                    <img
                      src={`${v.avatar_url}`}
                      alt="avatar"
                      style={{ borderRadius: '50%', width: '100%', cursor: 'pointer', marginBottom: 20 }}
                    />
                  </Link>
                  <div style={{ textAlign: 'left', width: '100%' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '1.7rem', width: '100%', margin: 0 }}>
                      <Link href={`${v.html_url}`}>
                        <a>{v.name}</a>
                      </Link>
                    </p>
                    <span style={{ width: '100%', fontSize: '1.3rem', color: 'grey' }}>
                      <Link href={`${v.html_url}`}>
                        <a>{v.login}</a>
                      </Link>
                    </span>
                    <p style={{ color: 'grey' }}>{v.bio}</p>
                    <p>{v.location}</p>
                    <p>📌 followers: {v.followers}</p>
                    <p>📌 following: {v.following}</p>
                    <p>📌 repositories: {v.public_repos}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span>Loading...</span>
          )}
        </div>
        <div className="repoInfo">
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
                <div css={nonDataWrap}>
                  <div>가져올 수 있는 데이터가 없어요... 🥲</div>
                  <div>아무 글도 작성하지 않은 사용자일 수 있어요, 다시 검색해주세요</div>
                  <button onClick={() => router.push('/')}>다시 검색하러 가기</button>
                </div>
              )}
            </ul>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default User

const userWrap = css`
  max-width: 1280px;
  margin: 0 auto;

  .userInfo {
    width: 25%;
    text-align: center;

    @media (max-width: 768px) {
      width: 100%;
    }

    .userInfoMain {
      padding-left: 20px;

      @media (max-width: 768px) {
        padding: 0 40px;
      }
    }
  }

  .repoInfo {
    width: 75%;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  form {
    padding-left: 2%;
    display: flex;

    img {
      width: 40px;
      background-color: white;
      border-radius: 50%;
    }
    input {
      margin-left: 2%;
      padding: 0 15px;
      border: 1px solid ${Common.colors.white};
      border-radius: 10px;
      width: 300px;
      background-color: ${Common.colors.navy};
      color: ${Common.colors.white};
    }
    button {
      padding: 10px 15px;
      border: none;
      border-radius: 10px;
      background-color: ${Common.colors.navy};
      color: ${Common.colors.white};
      font-weight: bolder;
    }

    input::placeholder {
      color: ${Common.colors.white};
    }
  }
  ul {
    list-style: none;
    padding: 0 40px;
  }

  li {
    border-bottom: 1px solid grey;
    margin-bottom: 10px;
    padding: 10px;
  }

  a {
    color: ${Common.colors.githubBlue};
    font-weight: bolder;
    font-size: 1rem;
  }
  p {
    font-size: 0.8rem;
  }

  button {
    margin-right: 5px;
  }
`

const nonDataWrap = css`
  font-weight: bold;
  div {
    margin-bottom: 10px;
  }

  button {
    padding: 5px 10px;
  }
`
