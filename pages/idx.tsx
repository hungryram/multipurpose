// pages/ihomefinder.js
import { useEffect } from 'react';
import Navbar from '../components/global/navbar';
import Footer from '../components/global/footer';
import { getClient } from '../lib/sanity.server';
import { appearances } from '../lib/queries';
import Head from 'next/head';
import Header from '../components/templates/header';

export async function getStaticProps({ preview = false }) {

    /* check if the project id has been defined by fetching the vercel envs */
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        const appearanceQuery = await getClient(false).fetch(appearances)

        const idx_body = `{idx_body}`

        return {
            props: { preview, appearanceQuery, idx_body },
            // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
            revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
        }
    }

    /* when the client isn't set up */
    return {
        props: {},
        revalidate: undefined,
    }
}

export default function IHomefinderEmbed(appearanceQuery, idx_body) {
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

    console.log(idx_body)
    return (
        <>
            <Head>
                <style>
                    {`
                        :root {

                            --primary-accent: ${appearanceQuery.appearanceQuery?.appearances?.primaryAccent ?? '#cccccc'};

                            --footer-background-color: ${appearanceQuery.appearanceQuery?.appearances?.footerBg ?? '#0d1321'};
                            --footer-header-color: ${appearanceQuery.appearanceQuery?.appearances?.footerHeader ?? '#ffffff'};
                            --footer-text-color: ${appearanceQuery.appearanceQuery?.appearances?.footerText ?? '#9b9b9b'};
                            --primary-button-background: ${appearanceQuery.appearanceQuery?.appearances?.primaryButtonBg ?? 'transparent'};
                            --primary-button-text: ${appearanceQuery.appearanceQuery?.appearances?.primaryButtonText ?? '#000000'};
                            --secondary-button-background: ${appearanceQuery.appearanceQuery?.appearances?.secondaryButtonBg ?? 'transparent'};
                            --secondary-button-text: ${appearanceQuery.appearanceQuery?.appearances?.secondaryButtonText ?? '#cccccc'};
                            --secondary-color: ${appearanceQuery.appearanceQuery?.appearances?.secondaryColor ?? '#cccccc'};

                            --header-background-color: ${appearanceQuery.appearanceQuery?.appearances?.navBgColor ? appearanceQuery.appearanceQuery?.appearances?.navBgColor : 'transparent'};
                            --header-navigation-color: ${appearanceQuery.appearanceQuery?.appearances?.navColor ?? '#ffffff'};
                            --mobile-icon-color: ${appearanceQuery.appearanceQuery?.appearances?.mobileIconColor ?? '#ffffff'};

                            --loading-background-color: ${appearanceQuery.appearanceQuery?.appearances?.loaderColor ?? '#0e0e0e'};
                            --loading-image: url(${appearanceQuery.appearanceQuery?.appearances?.loaderImage});

                            --website-body-color: ${appearanceQuery.appearanceQuery?.appearances?.websiteBodyColor ?? '#fff'};
                            --website-text-color: ${appearanceQuery.appearanceQuery?.appearances?.websiteTextColor ?? '#222'};

                            --button-radius: ${`${appearanceQuery.appearanceQuery?.appearances?.buttonRadius ?? 4}px`};
                            --button-y-padding: ${`${appearanceQuery.appearanceQuery?.appearances?.buttonYPadding ?? 16}px`};
                            --button-x-padding: ${`${appearanceQuery.appearanceQuery?.appearances?.buttonXPadding ?? 50}px`};
                            
                            --announcementbar-background-color: ${appearanceQuery.appearanceQuery?.appearances?.announcementBar?.announcementBgColor};
                            --announcementbar-text-color: ${appearanceQuery.appearanceQuery?.appearances?.announcementBar?.announcementTextColor};
                        }
                    `}
                </style>
            </Head>
            <Navbar
                company_name={appearanceQuery.appearanceQuery?.profileSettings?.company_name}
                logo={appearanceQuery.appearanceQuery?.appearances?.branding?.logo}
                logoWidth={appearanceQuery.appearanceQuery?.branding?.logoWidth}
                mobileLogoWidth={appearanceQuery.appearanceQuery?.branding?.mobileLogoWidth}
                navItems={appearanceQuery.appearanceQuery?.header?.navItems}
                ctaLink={appearanceQuery?.appearanceQuery?.appearances?.header?.ctaLink}
                ctaText={appearanceQuery.appearanceQuery?.appearanceQuery?.header?.ctaText}
                backgroundColor={appearanceQuery.appearanceQuery?.navBgColor}
                phone_number={appearanceQuery.appearanceQuery?.profileSettings?.contact_information?.phone_number}
                email={appearanceQuery.appearanceQuery?.profileSettings?.contact_information?.email}
                office_number={appearanceQuery.appearanceQuery?.profileSettings?.contact_information?.office_number}
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
                        {/* <div dangerouslySetInnerHTML={{ __html: '<script>document.currentScript.replaceWith(ihfKestrel.render());</script>' }} /> */}
                        <div dangerouslySetInnerHTML={{
                            __html: idx_body
                        }}/>
                    </div>
                </div>
            </div>
            <Footer
                footerText={appearanceQuery.appearanceQuery?.appearances?.footer?.footerText}
                image={appearanceQuery.appearanceQuery?.appearances?.footer?.footerLogo}
                hours={appearanceQuery.appearanceQuery?.appearances?.footer?.hours}
                monday={appearanceQuery.appearanceQuery?.profileSettings?.hours?.monday}
                tuesday={appearanceQuery.appearanceQuery?.profileSettings?.hours?.tuesday}
                wednesday={appearanceQuery.appearanceQuery?.profileSettings?.hours?.wednesday}
                thursday={appearanceQuery.appearanceQuery?.profileSettings?.hours?.thursday}
                friday={appearanceQuery.appearanceQuery?.profileSettings?.hours?.friday}
                saturday={appearanceQuery.appearanceQuery?.profileSettings?.hours?.saturday}
                sunday={appearanceQuery.appearanceQuery?.profileSettings?.hours?.sunday}
                company_name={appearanceQuery.appearanceQuery?.profileSettings?.company_name}
                legal={appearanceQuery.appearanceQuery?.legal}
                email={appearanceQuery.appearanceQuery?.profileSettings?.contact_information?.email}
                phone_number={appearanceQuery.appearanceQuery?.profileSettings?.contact_information?.phone_number}
                office_number={appearanceQuery.appearanceQuery?.profileSettings?.contact_information?.office_number}
                website={appearanceQuery.appearanceQuery?.profileSettings?.settings?.websiteName}
                address={appearanceQuery.appearanceQuery?.profileSettings?.address?.address}
                city={appearanceQuery.appearanceQuery?.profileSettings?.address?.city}
                state={appearanceQuery.appearanceQuery?.profileSettings?.address?.state}
                zip_code={appearanceQuery.appearanceQuery?.profileSettings?.address?.zip_code}
                links={appearanceQuery.appearanceQuery?.appearances?.footer?.quickLinks}
                googleBusiness={appearanceQuery.appearanceQuery?.profileSettings?.social?.googleBusiness}
                facebook={appearanceQuery.appearanceQuery?.profileSettings?.social?.facebook}
                youtube={appearanceQuery.appearanceQuery?.profileSettings?.social?.youtube}
                instagram={appearanceQuery.appearanceQuery?.profileSettings?.social?.instagram}
                twitter={appearanceQuery.appearanceQuery?.profileSettings?.social?.twitter}
                reddit={appearanceQuery.appearanceQuery?.profileSettings?.social?.reddit}
                linkedin={appearanceQuery.appearanceQuery?.profileSettings?.social?.linkedin}
                yelp={appearanceQuery.appearanceQuery?.profileSettings?.social?.yelp}
                pinterest={appearanceQuery.appearanceQuery?.profileSettings?.social?.pinterest}
                tiktok={appearanceQuery.appearanceQuery?.profileSettings?.social?.tiktok}
                zillow={appearanceQuery.appearanceQuery?.profileSettings?.social?.zillow}
                size={appearanceQuery.appearanceQuery?.profileSettings?.social?.size}
                footerDisclaimer={appearanceQuery.appearanceQuery?.appearances?.footer?.footerDisclaimer}
            />
        </>
    );
};
