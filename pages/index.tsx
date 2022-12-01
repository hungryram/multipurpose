
import { homePageQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'
import { urlForImage } from '../lib/sanity'

// TEMPLATES
import Layout from '../components/global/layout'
import FeaturedGrid from '../components/templates/featured-grid'
import Banner from '../components/templates/banner'
import DisclosureSection from '../components/templates/disclosure'
import FullWidthTextImage from '../components/templates/full-width-text-image'
import Gallery from '../components/templates/gallery'
import Testimonials from '../components/templates/testimonials'
import Hero from '../components/templates/hero'
import TextImage from '../components/templates/text-and-image'
import LeadForm from '../components/templates/lead-form'
import Pricing from '../components/templates/pricing'
import Seo from '../components/global/seo'
import TeamSection from '../components/templates/team-section'
import BlogSection from '../components/templates/blog-section'
import IconSection from '../components/templates/icon-section'
import ServiceSection from '../components/templates/service-section'
import ContactPage from '../components/templates/contact'

export default function Index({
  preview,
  homeSettings
}) {

  const defaultText = 'var(--website-text-color)'
  const defaultHeader = 'var(--website-text-color)'
  return (
    <>
      <Layout preview={preview}>
        <Seo
          title={homeSettings.profileSettings?.seo?.title_tag}
          description={homeSettings.profileSettings?.seo?.meta_description}
          company_name={homeSettings.profileSettings?.company_name}
          twitterHandle={homeSettings?.profileSettings?.seo?.twitterHandle}
          favicon={homeSettings?.appearances?.favicon}
          themeColor={homeSettings?.appearances?.themeColor}
          image={homeSettings.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.url}
          altText={homeSettings.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.altText}
        />
        {homeSettings?.homeAppearance?.homePage?.pageBuilder?.map((section) => {

          const headerColor = {
            color: section?.background?.textColor?.headerColor?.hex ?? defaultHeader
          }
          const bodyColor = {
            color: section?.background?.textColor?.textColor?.hex ?? defaultText
          }

          const backgroundStyles = {
            backgroundColor: `${section.background?.background?.backgroundType === 'color' &&
              section?.background?.background?.color?.hex}`,
            backgroundImage: `${section.background?.background?.backgroundType === 'image' &&
              `linear-gradient(rgba(
          ${section?.background?.background?.imageOverlayColor?.rgb.r ?? '0'}, 
          ${section?.background?.background?.imageOverlayColor?.rgb.g ?? '0'}, 
          ${section?.background?.background?.imageOverlayColor?.rgb.b ?? '0'}, 
          ${section?.background?.background?.imageOverlayColor?.rgb.a ?? '0.2'}), 
          rgba(
          ${section?.background?.background?.imageOverlayColor?.rgb.r ?? '0'}, 
          ${section?.background?.background?.imageOverlayColor?.rgb.g ?? '0'}, 
          ${section?.background?.background?.imageOverlayColor?.rgb.b ?? '0'}, 
          ${section?.background?.background?.imageOverlayColor?.rgb.a ?? '0.2'})), 
          url(${section.backgroundImage?.image?.asset?.url})`}`,
          }


          if (section._type === 'hero') {
            return (
              <Hero
                key={section._key}
                body={section?.content}
                altText={section?.imageData?.asset?.altText}
                textStyle={section?.textColor?.textColor?.hex}
                image={section?.imageData?.asset?.url}
                blurData={section?.imageData?.asset?.lqip}
                buttonLink={section?.buttonLinking}
                buttonText={section?.buttonLinking?.buttonText}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                imageHeight={
                  section?.imageHeight === 'small' && '400px' ||
                  section?.imageHeight === 'medium' && '600px' ||
                  section?.imageHeight === 'large' && '100vh'
                }
              />
            )
          }

          if (section._type === 'textandImage') {
            return (
              <TextImage
                key={section._key}
                heading={section?.heading}
                content={section?.content}
                image={section?.imageData?.asset?.url}
                blurData={section?.imageData?.asset?.lqip}
                buttonLink={section?.buttonLinking}
                buttonText={section?.buttonLinking?.buttonText}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                altText={section?.imageData?.asset?.altText}
                rowReverse={section?.reverseRow}
                headerStyle={headerColor}
                textStyle={bodyColor}
                textLeft={section?.textLeft}
                backgroundStyles={backgroundStyles}
              />
            )
          }

          if (section._type === 'banner') {
            return (
              <Banner
                key={section._key}
                heading={section.heading}
                content={section?.content}
                backgroundStyles={backgroundStyles}
                headerStyle={headerColor}
                textStyle={bodyColor}
                fullWidth={section?.fullWidth}
                removePadding={section?.removePadding}
                buttonText={section?.buttonLinking?.buttonText}
                buttonLink={section?.buttonLinking}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                twoColumn={section?.twoColumn}
              />
            )
          }

          if (section._type === 'fullWidthTextImage') {
            return (
              <FullWidthTextImage
                key={section._key}
                heading={section?.heading}
                altText={section?.altText}
                content={section?.content}
                image={section?.image}
                buttonText={section?.buttonLinking?.buttonText}
                buttonLink={section?.buttonLinking}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                textStyle={bodyColor}
                headerStyle={headerColor}
                textLeft='false'
                columnReverse={section?.reverseColumn}
                backgroundStyles={backgroundStyles}
              />
            )
          }

          if (section._type === 'featuredGrid') {
            return (
              <FeaturedGrid
                key={section._key}
                heading={section?.heading}
                content={section?.text}
                blocks={section?.blockImages}
                textOutsideImage={section?.textOutsideImage}
                centerTextGrid={section?.centerTextGrid}
                blockLeft={section?.blockLeft}
                columnNumber={section?.columnNumber}
                imageHeight={
                  section?.imageHeight === 'small' && '300px' ||
                  section?.imageHeight === 'medium' && '400px' ||
                  section?.imageHeight === 'large' && '500px'
                }
                removeGap={section?.removeGap}
                removePadding={section?.removePadding}
                twoColumn={section?.twoColumn}
                textLeft={section?.textLeft}
                fullWidth={section?.fullWidth}
                buttonText={section?.buttonLinking?.buttonText}
                buttonLink={section?.buttonLinking}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                textStyle={bodyColor}
                headerStyle={headerColor}
                backgroundStyles={backgroundStyles}
              />
            )
          }

          if (section._type === 'disclosureSection') {
            return (
              <DisclosureSection
                key={section._key}
                heading={section?.heading}
                content={section?.content}
                disclosure={section?.disclosures}
                disclosureBackgroundColor={section?.disclosureBackgroundColor}
                disclosureTextColor={section?.disclosureTextColor}
                disclosureContentColor={section?.disclosureContentColor}
                twoColumn={section?.twoColumn}
                textLeft={section?.textLeft}
                buttonText={section?.buttonLinking?.buttonText}
                buttonLink={section?.buttonLinking}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                textStyle={bodyColor}
                headerStyle={headerColor}
                backgroundStyles={backgroundStyles}
              />

            )
          }

          if (section._type === 'gallery') {
            return (
              <Gallery
                key={section._key}
                heading={section?.heading}
                content={section?.content}
                images={section?.childImage}
                altText={section?.childImage}
                animation={section?.animation ?? 'fade'}
                fullWidth={section?.fullWidth}
                textColor={section?.textColor?.hex}
                disableNavigation={section?.disableNavigation}
                disablePagination={section?.disablePagination}
                removePadding={section?.removePadding}
                buttonText={section?.buttonLinking?.buttonText}
                buttonLink={section?.buttonLinking}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                textStyle={bodyColor}
                headerStyle={headerColor}
                backgroundStyles={backgroundStyles}

              />
            )
          }

          if (section._type === 'testimonialBuilder') {
            return (
              <Testimonials
                key={section._key}
                heading={section?.heading}
                testimonial={homeSettings.allTestimonial}
                content={section?.content}
                carousel={section?.carousel}
                textLeft={section?.textLeft}
                cardTextColor={section?.cardTextColor?.hex}
                cardBackground={section?.cardBackground?.hex}
                bodyColor={bodyColor}
                arrowColor={section?.background?.textColor?.textColor?.hex}
                buttonText={section?.buttonLinking?.buttonText}
                buttonLink={section?.buttonLinking}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                textStyle={bodyColor}
                headerStyle={headerColor}
                backgroundStyles={backgroundStyles}
              />
            )
          }

          if (section._type === 'leadForm') {
            return (
              <LeadForm
                key={section._key}
                heading={section?.heading}
                content={section?.content}
                buttonText={section?.buttonLinking?.buttonText}
                buttonLink={section?.buttonLinking}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                textStyle={bodyColor}
                headerStyle={headerColor}
                backgroundStyles={backgroundStyles}
                paddingSize={
                  section?.paddingSizing === 'large' ? 'md:py-32 py-20' : 'py-0'
                }
                // FORMS
                emailAlerts={homeSettings.profileSettings?.settings?.emailAlerts}
                sendFrom={homeSettings.profileSettings?.settings?.sendFrom}
                emailBcc={homeSettings.profileSettings?.settings?.emailBcc}
                emailCc={homeSettings.profileSettings?.settings?.emailCc}
              />
            )
          }

          if (section._type === 'pricing') {
            return (
              <Pricing
                key={section._key}
                heading={section?.heading}
                content={section?.content}
                packages={section?.packages}
                columnNumber={section?.columnNumber}
                buttonText={section?.buttonLinking?.buttonText}
                buttonLink={section?.buttonLinking}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                textStyle={bodyColor}
                headerStyle={headerColor}
                backgroundStyles={backgroundStyles}
              />
            )
          }

          if (section._type === 'teamDisplay') {
            return (
              <TeamSection
                key={section._key}
                heading={section?.heading}
                content={section?.content}
                team={homeSettings.allTeam}
                carousel={section?.carousel}
                buttonLink={section?.buttonLinking}
                buttonText={section?.buttonLinking?.buttonText}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                textStyle={bodyColor}
                headerStyle={headerColor}
                backgroundStyles={backgroundStyles}
              />
            )
          }

          if (section._type === 'blogDisplay') {
            return (
              <BlogSection
                key={section._key}
                heading={section?.heading}
                content={section?.content}
                blog={homeSettings?.allBlog}
                carousel={section?.carousel}
                buttonLink={section?.buttonLinking}
                buttonText={section?.buttonLinking?.buttonText}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                textStyle={bodyColor}
                headerStyle={headerColor}
                backgroundStyles={backgroundStyles}
              />
            )
          }

          if (section._type === 'iconSection') {
            return (
              <IconSection
                key={section._key}
                heading={section?.heading}
                content={section?.text}
                blocks={section?.blockImages}
                textLeft={section?.textLeft}
                columnNumber={section?.columnNumber}
                buttonText={section?.buttonLinking?.buttonText}
                buttonLink={section?.buttonLinking}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                textStyle={bodyColor}
                headerStyle={headerColor}
                backgroundStyles={backgroundStyles}
              />
            )
          }

          if (section._type === 'codeBlock') {
            return (
              <div key={section._key}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${section?.code}`
                  }}
                />
              </div>
            )
          }

          if (section._type === 'contactPage') {
            return (
              <ContactPage
                heading={section.heading}
                content={section.text}
                key={section._key}
                email={homeSettings.profileSettings?.contact_information?.email}
                phone_number={homeSettings.profileSettings?.contact_information?.phone_number}
                address={homeSettings.profileSettings?.address?.address}
                city={homeSettings.profileSettings?.address?.city}
                state={homeSettings.profileSettings?.address?.state}
                zipCode={homeSettings.profileSettings?.address?.zip_code}
                facebook={homeSettings.profileSettings?.social?.facebook}
                youtube={homeSettings.profileSettings?.social?.youtube}
                instagram={homeSettings.profileSettings?.social?.instagram}
                twitter={homeSettings.profileSettings?.social?.twitter}
                reddit={homeSettings.profileSettings?.social?.reddit}
                linkedin={homeSettings.profileSettings?.social?.linkedin}
                yelp={homeSettings.profileSettings?.social?.yelp}
                pinterest={homeSettings.profileSettings?.social?.pinterest}
                tiktok={homeSettings.profileSettings?.social?.tiktok}
                zillow={homeSettings.profileSettings?.social?.zillow}
                size={homeSettings.profileSettings?.social?.size}
                // FORMS
                emailAlerts={homeSettings.profileSettings?.settings?.emailAlerts}
                sendFrom={homeSettings.profileSettings?.settings?.sendFrom}
                emailBcc={homeSettings.profileSettings?.settings?.emailBcc}
                emailCc={homeSettings.profileSettings?.settings?.emailCc}
              />
            )
          }

          if (section._type === 'servicesDisplay') {
            return (
              <ServiceSection
                key={section._key}
                heading={section?.heading}
                content={section?.content}
                services={homeSettings.allServices}
                carousel={section?.carousel}
                buttonLink={section?.buttonLinking}
                buttonText={section?.buttonLinking?.buttonText}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                textStyle={bodyColor}
                headerStyle={headerColor}
                backgroundStyles={backgroundStyles}
              />
            )
          }

        })}
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
