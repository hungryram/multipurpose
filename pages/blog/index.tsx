import { queryAllPosts } from "../../lib/queries"
import { getClient } from "../../lib/sanity.server"
import Link from "next/link"
import Layout from "../../components/global/layout"
import Header from "../../components/templates/header"
import PostPreview from "../../components/templates/blog/post-preview"

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
            <Header 
                title="Blog"
                image={blogQuery.header.image}
            />
            <div className="section">
                <div className="container">
                    <div className="flex justify-center">
                        <div className="p-10">
                            <div className="grid md:grid-cols-2 gap-10">
                            {blogQuery.blog ?
                                    blogQuery?.blog.map((node) => {
                                        return (
                                            <>
                                                <PostPreview 
                                                    title={node.title}
                                                    coverImage={node.coverImage}
                                                    slug={node.slug}
                                                    date={node.date}
                                                    author={node.author}
                                                    excerpt={node.excerpt}
                                                />
                                            </>
                                        )
                                    })
                                    :
                                    <h2 className="h3">No blog found</h2>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}