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
