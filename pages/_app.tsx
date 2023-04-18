import '../styles/index.css'
import { useRouter } from 'next/router'
import Layout from '../components/global/layout'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const isNotAdminPortal = !router.pathname.startsWith('/admin')
  const isIdx = !router.pathname.startsWith('/idx')
  return (
    <>
      {/* <Head>
        <script src="https://kestrel.idxhome.com/ihf-kestrel.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ihfKestrel = window.ihfKestrel || {}; ihfKestrel.config = { platform: "custom", activationToken: "3779C949-155D-6043-0911FD9A208A875D" };`,
          }}
        />
        
      </Head> */}
      {isNotAdminPortal && isIdx ? (
        <Layout preview={pageProps.preview}>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}

export default MyApp
