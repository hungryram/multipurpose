// pages/ihomefinder.js
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../components/global/layout';

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
            <Layout>
                <h1>IDX TEST wlayout</h1>
                <IhomefinderEmbed />
            </Layout>
        </>
    );
};

export default IhomefinderPage;
