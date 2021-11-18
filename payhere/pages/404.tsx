import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter()
  return (
    <div>
      <h1>잘못된 접근이에요 🥲</h1>
      <button onClick={() => router.back()}>이전 페이지로</button>
    </div>
  )
}
export default NotFound
