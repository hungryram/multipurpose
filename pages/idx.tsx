// pages/ihomefinder.js
import { useEffect } from 'react';
import Navbar from '../components/global/navbar';
import Footer from '../components/global/footer';
import { getClient } from '../lib/sanity.server';
import { appearances } from '../lib/queries';
import Head from 'next/head';
import Header from '../components/templates/header';
import Styles from "../styles/footer.module.css"
import Link from 'next/link';

export async function getServerSideProps({ preview = false }) {
    const idx_body = `{idx_body}`

    /* check if the project id has been defined by fetching the vercel envs */
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        const appearanceQuery = await getClient(false).fetch(appearances)


        return {
            props: { preview, appearanceQuery, idx_body, revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60 },
        }
    }

    /* when the client isn't set up */
    return {
        props: { idx_body },
        revalidate: undefined,
    }
}

export default function IHomefinderEmbed({ appearanceQuery, idx_body }) {
    // useEffect(() => {
    //     // Load the iHomefinder embed code on the client side
    //     const script = document.createElement('script');
    //     script.async = true;
    //     document.body.appendChild(script);

    //     // Replace the script tag with the iHomefinder embed code
    //     script.onload = () => {
    //         document.currentScript.replaceWith(ihfKestrel.render());
    //     };
    // }, []);

    console.log(appearanceQuery?.appearances?.branding?.logo?.asset?.url)
    return (
        <>

            <Navbar
                company_name={appearanceQuery?.profileSettings?.company_name}
                logo={appearanceQuery?.appearances?.branding?.logo?.asset?.url}
                logoWidth={appearanceQuery?.branding?.logoWidth}
                mobileLogoWidth={appearanceQuery?.branding?.mobileLogoWidth}
                navItems={appearanceQuery?.header?.navItems}
                ctaLink={appearanceQuery?.appearanceQuery?.appearances?.header?.ctaLink}
                ctaText={appearanceQuery?.appearanceQuery?.header?.ctaText}
                backgroundColor={appearanceQuery?.navBgColor}
                phone_number={appearanceQuery?.profileSettings?.contact_information?.phone_number}
                email={appearanceQuery?.profileSettings?.contact_information?.email}
                office_number={appearanceQuery?.profileSettings?.contact_information?.office_number}
                // ANNOUNCEMENT
                announcementText={appearanceQuery?.appearanceQuery?.appearances?.announcementBar?.announcement}
                announcementLinkText={appearanceQuery?.appearanceQuery?.appearances?.announcementBar?.announcementBarLink?.text}
                announcementLink={appearanceQuery?.appearanceQuery?.appearances?.announcementBar?.announcementBarLink}
                topHeaderBackground={appearanceQuery?.appearanceQuery?.appearances?.topHeaderBar?.topHeaderBarBgColor}
                topHeaderText={appearanceQuery?.appearanceQuery?.appearances?.topHeaderBar?.topHeaderBarTextColor}
                enableTopHeader={appearanceQuery?.appearanceQuery?.appearances?.topHeaderBar?.enableTopHeaderBar}
            />
            <Header
            />
            <div className="section">
                <div className="container">
                    <div className="idxTest">
                        <div dangerouslySetInnerHTML={{
                            __html: idx_body
                        }} />
                        <h1>Test IDX BODY</h1>
                        {/* First div is for version 10 */}
                        {/* <div dangerouslySetInnerHTML={{ __html: '<script>document.currentScript.replaceWith(ihfKestrel.render());</script>' }} /> */}

                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <h1>FOOTER</h1>
                </div>
            </div>

        </>
    );
};
