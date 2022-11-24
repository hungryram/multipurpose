import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import Layout from '../../components/global/layout'
import Header from '../../components/templates/header'
import MoreStories from '../../components/templates/blog/more-stories'
import PostBody from '../../components/templates/blog/post-body'
import PostHeader from '../../components/templates/blog/post-header'
import PostTitle from '../../components/templates/blog/post-title'
import { postQuery, postSlugsQuery } from '../../lib/queries'
import { usePreviewSubscription } from '../../lib/sanity'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { PostProps } from '../../types'
import Seo from '../../components/global/seo'

interface Props {
  data: { post: PostProps; morePosts: any; appearances: any, profileSettings: any }
  preview: any
  seoData: any
}

export default function Post(props: Props) {
  const { data: initialData, preview } = props
  const router = useRouter()
  const slug = initialData?.post?.slug
  const { data } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: initialData,
    enabled: preview && !!slug,
  })
  const { post, morePosts, appearances, profileSettings } = data || {}

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Header 
        image={post?.coverImage}
        blurData={post?.lqip}
        altText={post?.altText}
      />
      <Seo 
        title={post?.seo?.title_tag}
        description={post?.seo?.meta_description}
        image={post?.coverImage ?? post?.profileSettings?.seo?.defaultImageBanner}
        company_name={profileSettings?.company_name}
        twitterHandle={profileSettings?.seo?.twitterHandle}
        ogType="article"
        favicon={appearances?.favicon}
        themeColor={appearances?.themeColor}
      />
      <div className="section">
        <div className="container">
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article>
                <PostHeader
                  title={post?.title}
                  coverImage={post?.coverImage}
                  date={post?.date}
                  author={post?.author}
                  altText={post?.altText}
                  blurData={post?.lqip}
                />
                <PostBody content={post.content} />
              </article>
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  const { post, morePosts, profileSettings, appearances } = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  })

  return {
    props: {
      preview,
      data: {
        post,
        morePosts: overlayDrafts(morePosts),
        profileSettings,
        appearances
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export async function getStaticPaths() {
  const paths = await getClient(false).fetch(postSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}
