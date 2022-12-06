
import { homePageQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'

// TEMPLATES
import Layout from '../components/global/layout'
import Seo from '../components/global/seo'
import MainBody from '../components/templates/main-body'

export default function Index({
  preview,
  homeSettings
}) {

  const schemaMarkup =
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${homeSettings.profileSettings?.company_name}`,
    "description": `${homeSettings.profileSettings?.seo?.meta_description}`,
    "image": `${homeSettings.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.url}`,
    "url": `${homeSettings.profileSettings?.settings?.websiteName}`,
    "telephone": `${homeSettings.profileSettings?.contact_information?.phone_number}`,
    "email": `${homeSettings.profileSettings?.contact_information?.email}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${homeSettings.profileSettings?.address?.address}`,
      "addressLocality": `${homeSettings.profileSettings?.address?.city}`,
      "addressRegion": `${homeSettings.profileSettings?.address?.state}`,
      "postalCode": `${homeSettings.profileSettings?.address?.zip_code}`,
      "addressCountry": `${homeSettings.profileSettings?.address?.state}`
    },
  }

  return (
    <>
      <Layout preview={preview}>
        <Seo
          title={homeSettings.profileSettings?.seo?.title_tag}
          description={homeSettings.profileSettings?.seo?.meta_description}
          schemaMarkup={schemaMarkup}
          company_name={homeSettings.profileSettings?.company_name}
          twitterHandle={homeSettings?.profileSettings?.seo?.twitterHandle}
          favicon={homeSettings?.appearances?.favicon}
          themeColor={homeSettings?.appearances?.themeColor}
          image={homeSettings.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.url}
          altText={homeSettings.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.altText}
        />
        <MainBody
          pageBuilder={homeSettings?.homeAppearance?.homePage?.pageBuilder}
          // FIRST TREE
          email={homeSettings?.profileSettings?.contact_information?.email}
          phone_number={homeSettings?.profileSettings?.contact_information?.phone_number}
          address={homeSettings?.profileSettings?.address?.address}
          city={homeSettings?.profileSettings?.address?.city}
          state={homeSettings?.profileSettings?.address?.state}
          zip_code={homeSettings?.profileSettings?.address?.zip_code}
          // SOCIAL
          facebook={homeSettings?.profileSettings?.social?.facebook}
          youtube={homeSettings?.profileSettings?.social?.youtube}
          instagram={homeSettings?.profileSettings?.social?.instagram}
          twitter={homeSettings?.profileSettings?.social?.twitter}
          reddit={homeSettings?.profileSettings?.social?.reddit}
          linkedin={homeSettings?.profileSettings?.social?.linkedin}
          yelp={homeSettings?.profileSettings?.social?.yelp}
          pinterest={homeSettings?.profileSettings?.social?.pinterest}
          tiktok={homeSettings?.profileSettings?.social?.tiktok}
          zillow={homeSettings?.profileSettings?.social?.zillow}
          size={homeSettings?.profileSettings?.social?.size}
          // FORMS
          emailAlerts={homeSettings?.profileSettings?.settings?.emailAlerts}
          sendFrom={homeSettings?.profileSettings?.settings?.sendFrom}
          emailBcc={homeSettings?.profileSettings?.settings?.emailBcc}
          emailCc={homeSettings?.profileSettings?.settings?.emailCc}
          // PAGE FOLDERS
          allServices={homeSettings?.allServices}
          allTestimonial={homeSettings?.allTestimonial}
          allBlog={homeSettings?.allBlog}
          allTeam={homeSettings?.allTeam}

        />
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {

  /* check if the project id has been defined by fetching the vercel envs */
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const homeSettings = await getClient(preview).fetch(homePageQuery)

    return {
      props: { preview, homeSettings },
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
