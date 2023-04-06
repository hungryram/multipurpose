import Head from 'next/head'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
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
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
