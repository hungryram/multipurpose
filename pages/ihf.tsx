// pages/ihomefinder.js
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

export default function IHF({appearanceQuery, idx_body}) {
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
                <style>
                    {`
                        :root {

                            --primary-accent: ${appearanceQuery?.appearances?.primaryAccent ?? '#cccccc'};

                            --footer-background-color: ${appearanceQuery?.appearances?.footerBg ?? '#0d1321'};
                            --footer-header-color: ${appearanceQuery?.appearances?.footerHeader ?? '#ffffff'};
                            --footer-text-color: ${appearanceQuery?.appearances?.footerText ?? '#9b9b9b'};
                            --primary-button-background: ${appearanceQuery?.appearances?.primaryButtonBg ?? 'transparent'};
                            --primary-button-text: ${appearanceQuery?.appearances?.primaryButtonText ?? '#000000'};
                            --secondary-button-background: ${appearanceQuery?.appearances?.secondaryButtonBg ?? 'transparent'};
                            --secondary-button-text: ${appearanceQuery?.appearances?.secondaryButtonText ?? '#cccccc'};
                            --secondary-color: ${appearanceQuery?.appearances?.secondaryColor ?? '#cccccc'};

                            --header-background-color: ${appearanceQuery?.appearances?.navBgColor ? appearanceQuery?.appearances?.navBgColor : 'transparent'};
                            --header-navigation-color: ${appearanceQuery?.appearances?.navColor ?? '#ffffff'};
                            --mobile-icon-color: ${appearanceQuery?.appearances?.mobileIconColor ?? '#ffffff'};

                            --loading-background-color: ${appearanceQuery?.appearances?.loaderColor ?? '#0e0e0e'};
                            --loading-image: url(${appearanceQuery?.appearances?.loaderImage});

                            --website-body-color: ${appearanceQuery?.appearances?.websiteBodyColor ?? '#fff'};
                            --website-text-color: ${appearanceQuery?.appearances?.websiteTextColor ?? '#222'};

                            --button-radius: ${`${appearanceQuery?.appearances?.buttonRadius ?? 4}px`};
                            --button-y-padding: ${`${appearanceQuery?.appearances?.buttonYPadding ?? 16}px`};
                            --button-x-padding: ${`${appearanceQuery?.appearances?.buttonXPadding ?? 50}px`};
                            
                            --announcementbar-background-color: ${appearanceQuery?.appearances?.announcementBar?.announcementBgColor};
                            --announcementbar-text-color: ${appearanceQuery?.appearances?.announcementBar?.announcementTextColor};
                        }
                    `}
                </style>
            </Head>
            <Navbar
                company_name={appearanceQuery?.profileSettings?.company_name}
                logo={appearanceQuery?.appearances?.branding?.logo}
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
                        }}/>
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
