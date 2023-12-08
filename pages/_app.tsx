import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components'
import Footer from '@components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer/>
    </>
  )
}

export default MyApp
