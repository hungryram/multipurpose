// pages/ihomefinder.js
import Head from 'next/head';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../components/global/layout'));

const IhomefinderEmbed = () => {
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
    <div className="idxTest">
      <script dangerouslySetInnerHTML={{ __html: 'document.currentScript.replaceWith(ihfKestrel.render());' }} />
    </div>
  );
};

const IhomefinderPage = () => {
  return (
    <>
      <Head>
        <title>My iHomefinder Page</title>
        <script src="https://kestrel.idxhome.com/ihf-kestrel.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.ihfKestrel = window.ihfKestrel || {}; ihfKestrel.config = { platform: "custom", activationToken: "3779C949-155D-6043-0911FD9A208A875D" };` }} />
      </Head>
      <Layout>
        <h1>IDX TEST wlayout</h1>
        <IhomefinderEmbed />
      </Layout>
    </>
  );
};

export default IhomefinderPage;
