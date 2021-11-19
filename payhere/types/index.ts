export type userInfo = {
  avatar_url: string
  bio: string
  html_url: string
  id: string
  location: string
  login: string
  /* 유저 이름 */
  name: string
  node_id: string
  /* 퍼블릭 레포지토리 개수 */
  public_repos: string
  repos_url: string
  url: string
}

export type userRepoData = {
  description: string
  git_url: string
  hooks_url: string
  html_url: string
  id: number
  name: string
  open_issues_count: number
}

export type userRepoIssue = {
  id: number
  title: string
  html_url: string
  url: string
  labels: issueLabel[]
}

export type issueLabel = {
  id: number
  name: string
  color: string
}
/*
description: "📜 33 concepts every JavaScript developer should know."
git_url: "git://github.com/junh0328/33-js-concepts.git"
hooks_url: "https://api.github.com/repos/junh0328/33-js-concepts/hooks"
html_url: "https://github.com/junh0328/33-js-concepts"
id: 354268472
is_template: false
license: {key: 'mit', name: 'MIT License', spdx_id: 'MIT', url: 'https://api.github.com/licenses/mit', node_id: 'MDc6TGljZW5zZTEz'}
mirror_url: null
name: "33-js-concepts"
open_issues_count: 0
*/

/*
active_lock_reason: null
assignee: {login: 'junh0328', id: 54658162, node_id: 'MDQ6VXNlcjU0NjU4MTYy', avatar_url: 'https://avatars.githubusercontent.com/u/54658162?v=4', gravatar_id: '', …}
assignees: [{…}]
author_association: "OWNER"
body: "### `[자료구조]` 힙\r\n\r\n#### 꼭 알아둬야 할 자료 구조: 힙 (Hea
closed_at: null
comments: 0
comments_url: "https://api.github.com/repos/junh0328/TIL/issues/44/comments"
created_at: "2021-11-03T07:36:42Z"
events_url: "https://api.github.com/repos/junh0328/TIL/issues/44/events"
html_url: "https://github.com/junh0328/TIL/issues/44"
id: 1043166513
labels: (2) [{…}, {…}]
labels_url: "https://api.github.com/repos/junh0328/TIL/issues/44/labels{/name}"
locked: false
milestone: null
node_id: "I_kwDOFnmJ6s4-LXUx"
number: 44
performed_via_github_app: null
reactions: {url: 'https://api.github.com/repos/junh0328/TIL/issues/44/reactions', total_count: 0, +1: 0, -1: 0, laugh: 0, …}
repository_url: "https://api.github.com/repos/junh0328/TIL"
state: "open"
timeline_url: "https://api.github.com/repos/junh0328/TIL/issues/44/timeline"
title: "[20211103] 제로베이스 알고리즘 자료구조 51일 대비반 DAY 19"
updated_at: "2021-11-05T14:04:16Z"
url: "https://api.github.com/repos/junh0328/TIL/issues/44"
*/
