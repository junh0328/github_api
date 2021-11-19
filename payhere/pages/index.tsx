import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { css } from '@emotion/react'
import { Common } from 'styles/common'

const Home: NextPage = () => {
  const router = useRouter()
  const [name, setName] = useState<string>('')

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      localStorage.setItem('name', name)
      setName('')
      router.push(`/user/${name}`)
    },
    [name, router]
  )
  return (
    <>
      <Head>
        <meta name="description" content="메인 화면입니다" />
      </Head>

      <div css={wrap}>
        <form onSubmit={onSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="검색할 유저의 아이디를 입력해주세요"
          />
        </form>
      </div>
    </>
  )
}

export default Home

const wrap = css`
  background-color: ${Common.colors.skyblue};
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    width: 100%;
    text-align: center;
  }

  form {
    input {
      background-color: ${Common.colors.navy};
      color: ${Common.colors.white};
      border: none;
      text-align: center;
      border-radius: 20px;
      width: 300px;
      padding: 15px 10px;
    }

    input::placeholder {
      color: ${Common.colors.white};
    }
  }
`
