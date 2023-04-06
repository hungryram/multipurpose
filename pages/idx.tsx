import { useEffect } from 'react';
import Navbar from '../components/global/navbar';
import Footer from '../components/global/footer';
import { getClient } from '../lib/sanity.server';
import { appearances } from '../lib/queries';
import Head from 'next/head';
import Header from '../components/templates/header';
import Styles from "../styles/footer.module.css"
import Link from 'next/link';

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

    const FooterComponent = () => {
        return (
            <div style={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "white" }}>
                <footer className={Styles.footer}>
                    <div className="pt-20 pb-10">
                        <h1>Tet</h1>
                    </div>
                </footer>
            </div>
        )
    }

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
                        <h1>Test IDX BODY</h1>
                        {/* First div is for version 10 */}
                        {/* <div dangerouslySetInnerHTML={{ __html: '<script>document.currentScript.replaceWith(ihfKestrel.render());</script>' }} /> */}
                        <div dangerouslySetInnerHTML={{
                            __html: idx_body
                        }} />
                    </div>
                </div>
            </div>
            <Footer
                footerText={appearanceQuery?.appearances?.footer?.footerText}
                image={appearanceQuery?.appearances?.footer?.footerLogo}
                hours={appearanceQuery?.appearances?.footer?.hours}
                monday={appearanceQuery?.profileSettings?.hours?.monday}
                tuesday={appearanceQuery?.profileSettings?.hours?.tuesday}
                wednesday={appearanceQuery?.profileSettings?.hours?.wednesday}
                thursday={appearanceQuery?.profileSettings?.hours?.thursday}
                friday={appearanceQuery?.profileSettings?.hours?.friday}
                saturday={appearanceQuery?.profileSettings?.hours?.saturday}
                sunday={appearanceQuery?.profileSettings?.hours?.sunday}
                company_name={appearanceQuery?.profileSettings?.company_name}
                legal={appearanceQuery?.legal}
                email={appearanceQuery?.profileSettings?.contact_information?.email}
                phone_number={appearanceQuery?.profileSettings?.contact_information?.phone_number}
                office_number={appearanceQuery?.profileSettings?.contact_information?.office_number}
                website={appearanceQuery?.profileSettings?.settings?.websiteName}
                address={appearanceQuery?.profileSettings?.address?.address}
                city={appearanceQuery?.profileSettings?.address?.city}
                state={appearanceQuery?.profileSettings?.address?.state}
                zip_code={appearanceQuery?.profileSettings?.address?.zip_code}
                links={appearanceQuery?.appearances?.footer?.quickLinks}
                googleBusiness={appearanceQuery?.profileSettings?.social?.googleBusiness}
                facebook={appearanceQuery?.profileSettings?.social?.facebook}
                youtube={appearanceQuery?.profileSettings?.social?.youtube}
                instagram={appearanceQuery?.profileSettings?.social?.instagram}
                twitter={appearanceQuery?.profileSettings?.social?.twitter}
                reddit={appearanceQuery?.profileSettings?.social?.reddit}
                linkedin={appearanceQuery?.profileSettings?.social?.linkedin}
                yelp={appearanceQuery?.profileSettings?.social?.yelp}
                pinterest={appearanceQuery?.profileSettings?.social?.pinterest}
                tiktok={appearanceQuery?.profileSettings?.social?.tiktok}
                zillow={appearanceQuery?.profileSettings?.social?.zillow}
                size={appearanceQuery?.profileSettings?.social?.size}
                footerDisclaimer={appearanceQuery?.appearances?.footer?.footerDisclaimer}
            />
        </>
    );
};