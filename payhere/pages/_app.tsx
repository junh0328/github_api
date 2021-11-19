import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import AppLayOut from 'components/AppLayout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <div>
        <AppLayOut />
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
