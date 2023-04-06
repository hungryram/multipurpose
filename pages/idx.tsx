// pages/ihomefinder.js
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../components/global/layout';

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
            <h1>IDX TEST wlayout</h1>
            <div className="idxTest">
                <div dangerouslySetInnerHTML={{ __html: '<script>document.currentScript.replaceWith(ihfKestrel.render());</script>' }} />
            </div>
        </>
    );
};

IhomefinderPage.getInitialProps = async () => ({});

export default IhomefinderPage;