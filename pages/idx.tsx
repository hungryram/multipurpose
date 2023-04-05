// pages/ihomefinder.js
import Head from 'next/head';
import { useEffect } from 'react';

const IhomefinderPage = () => {
  useEffect(() => {
    // Load the iHomefinder embed code on the client side
    const script = document.createElement('script');
    script.async = true;
    document.body.appendChild(script);

    // Replace the script tag with the iHomefinder embed code
    script.onload = () => {
      document.currentScript.replaceWith(ihfKestrel.render());
    };
  }, []);

  return (
    <>
      <Head>
        <script src="https://kestrel.idxhome.com/ihf-kestrel.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ihfKestrel = window.ihfKestrel || {}; ihfKestrel.config = { platform: "custom", activationToken: "3779C949-155D-6043-0911FD9A208A875D" };`,
          }}
        />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: '<script>document.currentScript.replaceWith(ihfKestrel.render());</script>' }} />
    </>
  );
};

IhomefinderPage.getInitialProps = async () => ({});

export default IhomefinderPage;
