import { queryAllPosts } from "../../lib/queries"
import { getClient } from "../../lib/sanity.server"
import Link from "next/link"
import Layout from "../../components/global/layout"
import Header from "../../components/templates/header"
import PostPreview from "../../components/templates/blog/post-preview"
import Seo from "../../components/global/seo"

export async function getStaticProps({ preview = false }) {

    /* check if the project id has been defined by fetching the vercel envs */
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        const blogQuery = await getClient(preview).fetch(queryAllPosts)

        return {
            props: { preview, blogQuery },
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

export default function BlogIndex({ blogQuery }) {
    return (
        <Layout>
            <Seo
                title={blogQuery?.pageSettings?.blog?.seo?.title_tag || 'The Blog | ' + blogQuery?.profileSettings?.company_name}
                description={blogQuery?.pageSettings?.blog?.seo?.meta_description}
                image={blogQuery?.pageSettings?.blog?.headerImageData?.asset?.url ?? blogQuery.appearances?.defaultHeaderBanner?.asset?.url}
                company_name={blogQuery?.profileSettings?.company_name}
                twitterHandle={blogQuery?.profileSettings?.seo?.twitterHandle}
                ogType="website"
                favicon={blogQuery?.appearances?.favicon}
                themeColor={blogQuery?.appearances?.themeColor}
            />
            <Header
                title={blogQuery?.pageSettings?.blog?.title || 'The Blog'}
                image={blogQuery?.pageSettings?.blog?.headerImageData?.asset?.url ?? blogQuery.appearances?.defaultHeaderBanner?.asset?.url}
                blurData={blogQuery?.pageSettings?.blog?.headerImageData?.asset?.lqip ?? blogQuery.appearances?.defaultHeaderBanner?.asset?.lqip}
                altText={blogQuery?.pageSettings?.blog?.headerImageData?.asset?.altText ?? blogQuery.appearances?.defaultHeaderBanner?.asset?.altText}
            />
            <div className="section">
                <div className="container">
                    <div className="flex justify-center">
                        <div className="p-10">
                            <div className={`grid gap-10 ${blogQuery.blog !== 0 ? 'md:grid-cols-2' : ''}`}>
                                {blogQuery.blog !== 0 ?
                                    blogQuery?.blog.map((node) => {
                                        return (
                                            <>
                                                <PostPreview
                                                    key={node._id}
                                                    title={node.title}
                                                    coverImage={node.coverImage}
                                                    slug={node.slug}
                                                    date={node.date}
                                                    author={node.author}
                                                    excerpt={node.excerpt}
                                                    altText={node.coverImageData?.altText}
                                                    blurData={node.coverImageData?.lqip}
                                                />
                                            </>
                                        )
                                    })
                                    :
                                    <h2 className="h3 text-center">No articles have been published check back later</h2>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}