// pages/ihomefinder.js
import { useEffect } from 'react';

const IhomefinderPage = () => {

  return (
    <div id="ihomefinder-embed">
        <div dangerouslySetInnerHTML={{
            __html: `<script>document.currentScript.replaceWith(ihfKestrel.render());</script>`
        }}/>
  </div>
  )
};

IhomefinderPage.getInitialProps = async () => ({});

export default IhomefinderPage;
