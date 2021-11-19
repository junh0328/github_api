import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Common } from 'styles/common'
import { css } from '@emotion/react'
import router from 'next/router'

const AppLayOut = () => {
  const [query, setQuery] = useState('')
  const [isName, setIsName] = useState<boolean>(false)

  useEffect(() => {
    console.log('isName', isName)
  }, [isName])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bool = localStorage.getItem('name')
      if (bool?.length) setIsName(true)
    }
  })

  const onChange = useCallback(
    (e) => {
      if (!isName) {
        alert('첫 검색일 경우 가운데 검색창을 이용해주세요')
        return
      } else {
        setQuery(e.target.value)
      }
    },
    [isName]
  )

  const fetchRepo = useCallback(
    (e) => {
      e.preventDefault()
      if (query.length) {
        setQuery('')
        router.push(`/user/repo/${query}`)
      }
    },
    [router, query]
  )

  return (
    <div css={userWrap}>
      <nav css={navbar}>
        <form onSubmit={fetchRepo}>
          <Link href="/">
            <a>
              <img src="https://pic.onlinewebfonts.com/svg/img_326384.png" alt="github" />
            </a>
          </Link>
          <input style={{ width: 300 }} value={query} onChange={onChange} placeholder="Search or jump to..." />
          <button>
            <Link href="/keywords">
              <a>Repository</a>
            </Link>
          </button>
          <button>
            <Link href="/issues">
              <a>Issues</a>
            </Link>
          </button>
        </form>
      </nav>
    </div>
  )
}

export default AppLayOut

const userWrap = css`
  min-width: 1080px;
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

    a {
      color: #0969da;
      font-weight: bolder;
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

const navbar = css`
  padding: 10px 0;
  background-color: ${Common.colors.navy};

  button {
    margin-left: 10px;
  }
`
