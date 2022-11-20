
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

export default function Index({
  preview,
  homeSettings
}) {

  const defaultText = 'var(--website-text-color)'
  const defaultHeader = 'var(--website-text-color)'


  return (
    <>
      <Layout preview={preview}>
        {homeSettings?.appearances?.homePage?.pageBuilder?.map((section) => {

          const headerColor = {
            color: section?.background?.textColor?.headerColor?.hex ?? defaultHeader
          }
          const bodyColor = {
            color: section?.background?.textColor?.textColor?.hex ?? defaultText
          }

          const bannerButton = {
            backgroundColor: section.button?.buttonBackground?.hex ?? '#000000',
            color: section.button?.buttonTextColor?.hex ?? '#ffffff'
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
                  url(${section.background?.background.image ? urlForImage(section?.background?.background?.image).url() : undefined})`}`,
          }

          if (section._type === 'hero') {
            console.log(section.textColor.textColor.hex)
            return (
              <Hero
                key={section._key}
                body={section?.content}
                textStyle={section?.textColor?.textColor?.hex}
                image={section.image}
                buttonLink={section?.button?.buttonLink}
                buttonLabel={section?.button?.buttonText}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                blurData={homeSettings.sanityImages.base64 ?? section.image}
                imageHeight={
                  section?.imageHeight === 'small' && 'h-96' ||
                  section?.imageHeight === 'medium' && 'h-[600px]' ||
                  section?.imageHeight === 'large' && 'h-screen'
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
                image={section?.image}
                buttonLink={section?.button?.buttonLink}
                buttonLabel={section?.button?.buttonText}
                buttonBackground={section?.button?.buttonBackground?.hex}
                buttonTextColor={section?.button?.buttonTextColor?.hex}
                altTag={section?.image?.altTag ?? homeSettings?.profileSettings?.company_name}
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
                buttonText={section?.button?.buttonText}
                buttonLink={section?.button?.buttonLink}
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
                content={section?.content}
                image={section?.image}
                buttonText={section?.button?.buttonText}
                buttonLink={section?.button?.buttonLink}
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
                blocks={section?.blocks}
                textOutsideImage={section?.textOutsideImage}
                centerTextGrid={section?.centerTextGrid}
                blockLeft={section?.blockLeft}
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
                buttonText={section?.button?.buttonText}
                buttonLink={section?.button?.buttonLink}
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
                buttonText={section?.button?.buttonText}
                buttonLink={section?.button?.buttonLink}
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
                images={section?.images}
                animation={section?.animation ?? 'fade'}
                fullWidth={section?.fullWidth}
                textColor={section?.textColor?.hex}
                disableNavigation={section?.disableNavigation}
                disablePagination={section?.disablePagination}
                removePadding={section?.removePadding}
                buttonText={section?.button?.buttonText}
                buttonLink={section?.button?.buttonLink}
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
                testimonial={homeSettings.testimonialAll}
                content={section?.content}
                carousel={section?.carousel}
                bodyColor={bodyColor}
                arrowColor={section?.background?.textColor?.textColor?.hex}
                buttonText={section?.button?.buttonText}
                buttonLink={section?.button?.buttonLink}
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
