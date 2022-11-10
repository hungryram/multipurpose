import Head from 'next/head'
import useSWR from "swr"
import { appearances } from "../../lib/queries";
import SanityClient from "@sanity/client";

// TEMPLATES
import Loading from "../templates/loading";
import Navbar from "./navbar";
import Footer from "./footer"
import Error from '../templates/error';
import Alert from '../alert';

export default function Layout({ children, preview }: any) {

    const client = SanityClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: '2022-11-08'
      });

    
    const { data, error } = useSWR(appearances, query => client.fetch(query))
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
                            --primary-button-background: ${data.appearances?.primaryButtonBg};
                            --primary-button-text: ${data.appearances?.primaryButtonText};
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
            />
            {/* {preview && <Alert preview={preview} />} */}
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
            />
        </>
    )
}