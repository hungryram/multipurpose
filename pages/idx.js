import { useEffect } from 'react';
import Navbar from '../components/global/navbar';
import Footer from '../components/global/footer';
import { getClient } from '../lib/sanity.server';
import { appearances } from '../lib/queries';
import Head from 'next/head';
import Header from '../components/templates/header';

export async function getStaticProps({ preview = false }) {
    const idx_body = `{idx_body}`

    /* check if the project id has been defined by fetching the vercel envs */
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        const appearanceQuery = await getClient(false).fetch(appearances)


        return {
            props: { preview, appearanceQuery, idx_body },
            // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
            revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
        }
    }

    /* when the client isn't set up */
    return {
        props: {idx_body},
        revalidate: undefined,
    }
}

export default function IHomefinderEmbed({appearanceQuery, idx_body}) {
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
            <Header />
            <div className="section">
                <div className="container">
                    <div className="idxTest">
                        <h1>Test IDX BODY</h1>
                        {/* First div is for version 10 */}
                        {/* <div dangerouslySetInnerHTML={{ __html: '<script>document.currentScript.replaceWith(ihfKestrel.render());</script>' }} /> */}
                        <div dangerouslySetInnerHTML={{
                            __html: idx_body
                        }}/>
                    </div>
                </div>
            </div>
            <div className="section" style={{
                backgroundColor: 'black'
            }}>
                <div className="container">
                    <h1>FOOTER</h1>
                </div>
            </div>
        </>
    );
};