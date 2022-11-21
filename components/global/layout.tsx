import Head from 'next/head'
import useSWR from "swr"
import { appearances } from "../../lib/queries";
import SanityClient from "@sanity/client";
import { getClient } from '../../lib/sanity.server';

// TEMPLATES
import Loading from "../templates/loading";
import Navbar from "./navbar";
import Footer from "./footer"
import Error from '../templates/error';
import Alert from '../alert';

export default function Layout({ children, preview }: any) {

    
    const { data, error } = useSWR(appearances, query => getClient(false).fetch(query))
    if (error) return <Error />;
    if (!data) return <Loading />;
    return (
        <>
            <Head>
                <style>
                    {`
                        :root {

                            --primary-accent: ${data.appearances?.primaryAccent ?? '#cccccc'};

                            --footer-background-color: ${data.appearances?.footerBg ?? '0e0e0e'};
                            --footer-header-color: ${data.appearances?.footerHeader ?? '#ffffff'};
                            --footer-text-color: ${data.appearances?.footerText ?? '#9b9b9b'};
                            --primary-button-background: ${data.appearances?.primaryButtonBg ?? '#000000'};
                            --primary-button-text: ${data.appearances?.primaryButtonText ?? '#ffffff'};
                            --secondary-color: ${data.appearances?.secondaryColor ?? '#cccccc'};

                            --header-background-color: ${data.appearances?.navBgColor ? data.appearances?.navBgColor : 'transparent'};
                            --header-navigation-color: ${data.appearances?.navColor ?? '#ffffff'};
                            --mobile-icon-color: ${data.appearances?.mobileIconColor ?? '#ffffff'};

                            --loading-background-color: ${data.appearances?.loaderColor ?? '#0e0e0e'};
                            --loading-image: url(${data.appearances?.loaderImage});

                            --website-body-color: ${data.appearances?.websiteBodyColor ?? '#fff'};
                            --website-text-color: ${data.appearances?.websiteTextColor ?? '#222'};

                            --button-radius: ${data.appearances.buttonRadius ?? '4px'};
                            --button-y-padding: ${data.appearances.buttonYPadding ?? '16px'};
                            --button-x-padding: ${data.appearances.buttonXPadding ?? '50px'};
                            
                            --announcementbar-background-color: ${data.appearances?.announcementBar?.announcementBgColor};
                            --announcementbar-text-color: ${data.appearances?.announcementBar?.announcementTextColor};
                        }
                    `}
                </style>
            </Head>
            <Navbar 
                company_name={data.profileSettings?.company_name}
                logo={data.appearances?.branding?.logo}
                logoWidth={data.appearances?.branding?.logoWidth}
                mobileLogoWidth={data.appearances?.branding?.mobileLogoWidth}
                navItems={data.appearances?.header?.navItems}
                ctaLink={data?.appearances?.header?.ctaLink}
                ctaText={data.appearances.header?.ctaText}
                backgroundColor={data.appearances?.navBgColor}
                // ANNOUNCEMENT
                announcementText={data?.appearances?.announcementBar?.announcement}
                announcementLinkText={data?.appearances.announcementBar.announcementBarLink.text}
                announcementLink={data?.appearances?.announcementBar?.announcementBarLink}
                
            />
            {preview && <Alert preview={preview} />}
            <main>
                {children}
            </main>
            <Footer 
                footerText={data.appearances?.footer?.footerText}
                image={data.appearances?.footer?.footerLogo}
                company_name={data.profileSettings.company_name}
                legal={data.legal}
                email={data.profileSettings?.contact_information?.email}
                phone_number={data.profileSettings?.contact_information?.phone_number}
                office_number={data.profileSettings?.contact_information?.office_number}
                website={data.profileSettings?.settings?.websiteName}
                address={data.profileSettings?.address?.address}
                city={data.profileSettings?.address?.city}
                state={data.profileSettings?.address?.state}
                zip_code={data.profileSettings?.address?.zip_code}
                links={data.appearances?.footer?.quickLinks}
                googleBusiness={data.profileSettings.social.googleBusiness}
                facebook={data.profileSettings.social.facebook}
                youtube={data.profileSettings.social.youtube}
                instagram={data.profileSettings.social.instagram}
                twitter={data.profileSettings.social.twitter}
                reddit={data.profileSettings.social.reddit}
                linkedin={data.profileSettings.social.linkedin}
                yelp={data.profileSettings.social.yelp}
                pinterest={data.profileSettings.social.pinterest}
                tiktok={data.profileSettings.social.tiktok}
                zillow={data.profileSettings.social.zillow}
                size={data.profileSettings.social.size}
                footerDisclaimer={data.appearances.footer.footerDisclaimer}
            />
        </>
    )
}