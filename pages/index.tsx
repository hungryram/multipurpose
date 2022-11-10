
import Container from '../components/util/container'
import HeroPost from '../components/hero-post'
import Layout from '../components/global/layout'
import MoreStories from '../components/more-stories'
import { indexQuery, homeQuery } from '../lib/queries'
import { usePreviewSubscription } from '../lib/sanity'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import Hero from '../components/templates/hero'

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
  return (
    <>
      <Layout preview={preview}>

          {homeSettings?.homeDesign?.pageBuilder?.map((section) => {

            if (section._type === 'hero') {
              return (
                <div key={section?._key}>
                  <Hero 
                    heading={section.heading}
                    subtitle={section.subtitle}
                    image={section.image}
                  />
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
