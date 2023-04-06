import Head from 'next/head'
import useSWR from "swr"
import { appearances } from "../../lib/queries";
import { getClient } from '../../lib/sanity.server';

// TEMPLATES
import Loading from "../templates/loading";
import Navbar from "./navbar";
import Footer from "./footer"
import Error from '../templates/error';
import Alert from '../alert';
import Analytics from './analytics';

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

                            --footer-background-color: ${data.appearances?.footerBg ?? '#0d1321'};
                            --footer-header-color: ${data.appearances?.footerHeader ?? '#ffffff'};
                            --footer-text-color: ${data.appearances?.footerText ?? '#9b9b9b'};
                            --primary-button-background: ${data.appearances?.primaryButtonBg ?? 'transparent'};
                            --primary-button-text: ${data.appearances?.primaryButtonText ?? '#000000'};
                            --secondary-button-background: ${data.appearances?.secondaryButtonBg ?? 'transparent'};
                            --secondary-button-text: ${data.appearances?.secondaryButtonText ?? '#cccccc'};
                            --secondary-color: ${data.appearances?.secondaryColor ?? '#cccccc'};

                            --header-background-color: ${data.appearances?.navBgColor ? data.appearances?.navBgColor : 'transparent'};
                            --header-navigation-color: ${data.appearances?.navColor ?? '#ffffff'};
                            --mobile-icon-color: ${data.appearances?.mobileIconColor ?? '#ffffff'};

                            --loading-background-color: ${data.appearances?.loaderColor ?? '#0e0e0e'};
                            --loading-image: url(${data.appearances?.loaderImage});

                            --website-body-color: ${data.appearances?.websiteBodyColor ?? '#fff'};
                            --website-text-color: ${data.appearances?.websiteTextColor ?? '#222'};

                            --button-radius: ${`${data.appearances?.buttonRadius ?? 4}px`};
                            --button-y-padding: ${`${data.appearances?.buttonYPadding ?? 16}px`};
                            --button-x-padding: ${`${data.appearances?.buttonXPadding ?? 50}px`};
                            
                            --announcementbar-background-color: ${data.appearances?.announcementBar?.announcementBgColor};
                            --announcementbar-text-color: ${data.appearances?.announcementBar?.announcementTextColor};
                        }
                    `}
                </style>
            </Head>
                <Analytics
                    googleID={data.profileSettings?.settings?.googleID}
                    facebookPixel={data.profileSettings?.settings?.facebookPixel}
                />
            <Navbar
                company_name={data.profileSettings?.company_name}
                logo={data.appearances?.branding?.logo}
                logoWidth={data.appearances?.branding?.logoWidth}
                mobileLogoWidth={data.appearances?.branding?.mobileLogoWidth}
                navItems={data.appearances?.header?.navItems}
                ctaLink={data?.appearances?.header?.ctaLink}
                ctaText={data.appearances?.header?.ctaText}
                backgroundColor={data.appearances?.navBgColor}
                phone_number={data.profileSettings?.contact_information?.phone_number}
                email={data.profileSettings?.contact_information?.email}
                office_number={data.profileSettings?.contact_information?.office_number}
                // ANNOUNCEMENT
                announcementText={data?.appearances?.announcementBar?.announcement}
                announcementLinkText={data?.appearances?.announcementBar?.announcementBarLink?.text}
                announcementLink={data?.appearances?.announcementBar?.announcementBarLink}
                topHeaderBackground={data?.appearances?.topHeaderBar?.topHeaderBarBgColor}
                topHeaderText={data?.appearances?.topHeaderBar?.topHeaderBarTextColor}
                enableTopHeader={data?.appearances?.topHeaderBar?.enableTopHeaderBar}
            />
            {preview && <Alert preview={preview} />}
            <main>
                {children}
            </main>
            <Footer
                footerText={data.appearances?.footer?.footerText}
                image={data.appearances?.footer?.footerLogo}
                hours={data?.appearances?.footer?.hours}
                monday={data.profileSettings?.hours?.monday}
                tuesday={data.profileSettings?.hours?.tuesday}
                wednesday={data.profileSettings?.hours?.wednesday}
                thursday={data.profileSettings?.hours?.thursday}
                friday={data.profileSettings?.hours?.friday}
                saturday={data.profileSettings?.hours?.saturday}
                sunday={data.profileSettings?.hours?.sunday}
                company_name={data.profileSettings?.company_name}
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
                googleBusiness={data.profileSettings?.social?.googleBusiness}
                facebook={data.profileSettings?.social?.facebook}
                youtube={data.profileSettings?.social?.youtube}
                instagram={data.profileSettings?.social?.instagram}
                twitter={data.profileSettings?.social?.twitter}
                reddit={data.profileSettings?.social?.reddit}
                linkedin={data.profileSettings?.social?.linkedin}
                yelp={data.profileSettings?.social?.yelp}
                pinterest={data.profileSettings?.social?.pinterest}
                tiktok={data.profileSettings?.social?.tiktok}
                zillow={data.profileSettings?.social?.zillow}
                size={data.profileSettings?.social?.size}
                footerDisclaimer={data.appearances?.footer?.footerDisclaimer}
            />
        </>
    )
}