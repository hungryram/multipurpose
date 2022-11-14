
import Container from '../components/util/container'
import HeroPost from '../components/hero-post'
import Layout from '../components/global/layout'
import MoreStories from '../components/more-stories'
import { indexQuery, homeQuery } from '../lib/queries'
import { usePreviewSubscription } from '../lib/sanity'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import Hero from '../components/templates/hero'
import TextImage from '../components/templates/text-and-image'
import { urlForImage } from '../lib/sanity'
import FeaturedGrid from '../components/templates/featured-grid'
import Section from '../components/util/section'
import Heading from '../components/util/heading'
import Banner from '../components/templates/banner'

export default function Index({
  allPosts: initialAllPosts,
  preview,
  homeSettings
}) {
  const { data: allPosts } = usePreviewSubscription(indexQuery, {
    initialData: initialAllPosts,
    enabled: preview,
  })
  const [heroPost, ...morePosts] = allPosts || []

  const defaultText = '#222'
  const defaultHeader = '#222'
  return (
    <>
      <Layout preview={preview}>

        {homeSettings?.homeDesign?.pageBuilder?.map((section) => {

          const headerColor = {
            color: section.textColor?.headerColor?.hex ?? defaultHeader
          }
          const bodyColor = {
            color: section.textColor?.textColor?.hex ?? defaultText
          }

          const bannerButton = {
            backgroundColor: section.button?.buttonBackground?.hex ?? '#000000',
            color: section.button?.buttonTextColor?.hex ?? '#ffffff'
          }

          const backgroundStyles = {
            background: `${section.background?.backgroundType === 'color' && section?.background?.color?.hex || section.background?.backgroundType === 'image' && `url(${section.background.image ? urlForImage(section?.background?.image).url() : undefined})`}`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }

          if (section._type === 'hero') {
            return (
              <div key={section?._key}>
                <Hero
                  heading={section.heading}
                  subtitle={section.subtitle}
                  image={section.image}
                  blurData={homeSettings.sanityImages.base64 ?? section.image}
                />
              </div>
            )
          }

          if (section._type === 'textandImage') {
            return (
              <div key={section?._key} style={backgroundStyles}>
                <TextImage
                  image={section?.image}
                  altTag={section?.image?.altTag ?? homeSettings?.profileSettings?.company_name}
                  rowReverse={section?.reverseRow}
                  content={section?.content}
                  heading={section?.heading}
                  buttonLink={section?.button?.buttonLink}
                  buttonLabel={section?.button?.buttonText}
                  headerStyle={headerColor}
                  textStyle={bodyColor}
                  textLeft={section?.textLeft}
                />
              </div>
            )
          }

          if (section._type === 'banner') {
            return (
              <Banner
                heading={section.heading}
                text={section?.text}
                key={section._key}
                backgroundStyles={backgroundStyles}
                headerStyle={headerColor}
                textStyle={bodyColor}
                fullWidth={section?.fullWidth}
                removePadding={section?.removePadding}
                buttonText={section?.button?.buttonText}
                buttonLink={section?.button?.buttonLink}
                buttonStyle={bannerButton}
                twoColumn={section?.twoColumn}
              />
            )
          }

          if (section._type === 'featuredGrid') {
            return (
              <div key={section?._key} style={backgroundStyles}>
                <Section>
                  <div className={section?.fullWidth ? null : 'container'}>
                    <div className={`${section.twoColumn ? 'md:flex items-center' : ''}`}>
                      <div className={`${section?.twoColumn ? 'md:w-1/2' : 'w-full'}`}>
                        <Heading
                          heading={section?.heading}
                          body={section?.text}
                          headerStyle={headerColor}
                          textStyle={bodyColor}
                          textAlign={section?.headerLeft}
                        />
                      </div>
                      <div className={`${section?.twoColumn ? 'md:w-1/2' : 'w-full'}`}>
                        <div className={`grid lg:grid-cols-${section?.columnNumber ?? '2'} md:grid-cols-2 grid-cols-1 ${section.removeGap ? 'gap-4' : ''} mt-10`}>
                          {section?.blocks.map((node) => {
                            return (
                              <FeaturedGrid
                                image={node.image}
                                value={node.value}
                                link={node.link}
                                key={node._key}
                                content={node.content}
                                textOutsideImage={section.textOutsideImage}
                                textLeft={section.textLeft}
                                blurData={homeSettings.sanityImages.base64 ?? node.image}
                                textColor={node?.textColor?.hex}
                                borderColor={node?.borderColor?.hex}
                                backgroundColor={node?.backgroundcolor?.hex}
                                imageHeight={
                                  section?.imageHeight === 'small' && '300px' ||
                                  section?.imageHeight === 'medium' && '400px' ||
                                  section?.imageHeight === 'large' && '500px'
                                }
                              />
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </Section>
              </div>
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
    const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
    const homeSettings = await getClient(preview).fetch(homeQuery)

    return {
      props: { allPosts, preview, homeSettings },
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
