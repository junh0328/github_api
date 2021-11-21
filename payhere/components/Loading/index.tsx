import React from 'react'

export type Props = {
  comment: string
}

const Loading = ({ comment }: Props) => {
  return (
    <div style={{ width: '100%', height: '95vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h4>{comment}</h4>
    </div>
  )
}

export default Loading
