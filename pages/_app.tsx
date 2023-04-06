import Head from 'next/head'
import Layout from '../components/global/layout'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://kestrel.idxhome.com/ihf-kestrel.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ihfKestrel = window.ihfKestrel || {}; ihfKestrel.config = { platform: "custom", activationToken: "3779C949-155D-6043-0911FD9A208A875D" };`,
          }}
        />
        <script src="/jquery.min.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
    jQuery.noConflict();
    jQuery(document).ready(function () {
      alert('The DOM is ready');
    });
  `}}></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
