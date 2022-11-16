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
    const bgLoader = data.appearances?.loaderImage

    return (
        <>
            <Head>
                <style>
                    {`
                        :root {

                            --primary-accent: ${data.appearances?.primaryAccent};

                            --footer-background-color: ${data.appearances?.footerBg};
                            --footer-header-color: ${data.appearances?.footerHeader};
                            --footer-text-color: ${data.appearances?.footerText};
                            --primary-button-background: ${data.appearances?.primaryButtonBg ?? '#000000'};
                            --primary-button-text: ${data.appearances?.primaryButtonText ?? '#ffffff'};
                            --secondary-color: ${data.appearances?.secondaryColor};

                            --header-background-color: ${data.appearances?.navBgColor ? data.appearances?.navBgColor : 'transparent'};
                            --header-navigation-color: ${data.appearances?.navColor};

                            --loading-background-color: ${data.appearances?.loaderColor};
                            --loading-image: url(${bgLoader});
                        
                        }
                    `}
                </style>
            </Head>
            <Navbar 
                company_name={data.profileSettings?.company_name}
                logo={data.appearances?.branding?.logo}
                logoWidth={data.appearances?.branding?.logoWidth}
                navItems={data.appearances?.header?.navItems}
                ctaLink={data.appearances.header?.ctaLink}
                ctaText={data.appearances.header?.ctaText}
                backgroundColor={data.appearances.navColor}
            />
            {preview && <Alert preview={preview} />}
            <main>
                {children}
            </main>
            <Footer 
                footerText={data.appearances?.footer?.footerText}
                logos={data.appearances?.footer?.footerLogo}
                company_name={data.profileSettings.company_name}
                altTag={data.appearances?.footer?.footerLogo?.altTag}
                email={data.profileSettings?.contact_information?.email}
                phone={data.profileSettings?.contact_information?.phone_number}
                website={data.profileSettings?.contact_information?.website}
                office={data.profileSettings?.contact_information?.office_number}
                address={data.profileSettings?.address?.address}
                city={data.profileSettings?.address?.city}
                state={data.profileSettings?.address?.state}
                zipCode={data.profileSettings?.address?.zip_code}
                content={data.appearances?.footer?.footerText}
                links={data.appearances?.footer?.quickLinks}
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