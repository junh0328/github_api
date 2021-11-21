import { css } from '@emotion/react'
import React from 'react'
import Link from 'next/link'
import { userRepoIssue } from 'types'

export type Props = {
  issues: userRepoIssue[]
  currentPosts: userRepoIssue[]
}

const Issuses = ({ issues, currentPosts }: Props) => {
  return (
    <>
      <div className="ulTHeader">
        <div>
          <p>total Issues: {issues.length}</p>
        </div>
      </div>
      <ul className="ulWrap">
        {/* 10개만 보여주기 */}
        {currentPosts.map((v) => (
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
    </>
  )
}

export default Issuses

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
