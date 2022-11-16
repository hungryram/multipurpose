import { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheetDocument } from 'next-sanity/studio'

export default class Document extends ServerStyleSheetDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />

          <script src="https://kestrel.idxhome.com/ihf-kestrel.js" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.ihfKestrel = window.ihfKestrel || { };
                        ihfKestrel.config = {
                            platform: "custom",
                        activationToken: "3779C949-155D-6043-0911FD9A208A875D",};`
                    }}
                />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
