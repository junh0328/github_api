import { css } from '@emotion/react'
import React from 'react'
import { Common } from 'styles/common'

export type Props = {
  postsPerPage: number
  totalPosts: number
  paginate: (number: number) => void
}

const Pagination = ({ postsPerPage, totalPosts, paginate }: Props) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav css={pageWrap}>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination

const pageWrap = css`
  display: flex;
  justify-content: center;
  ul {
    display: flex;

    li:first-of-type {
      border: none;
    }

    li {
      border: none;
      cursor: pointer;

      margin-right: 10px;

      a {
        padding: 10px;
      }
    }

    li:hover {
      transition: 500ms;
      color: ${Common.colors.githubBlue};
    }
  }
`
