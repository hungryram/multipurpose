import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

// UTIL
import Image from 'next/image'

// TEMPLATES
import Header from '../../components/templates/header'
import Layout from '../../components/global/layout'
import Seo from '../../components/global/seo'

import { teamSlugsQuery, queryTeamCurrentPage } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'
import { TeamProps } from '../../types'
import ContentEditor from '../../components/templates/contenteditor'



interface Props {
    data: { team: TeamProps }
    preview: any
}

export default function ServicePages(props: Props) {

    const { data: initialData, preview } = props
    const router = useRouter()

    const slug = initialData?.team?.team?.slug.current
    const { data } = usePreviewSubscription(queryTeamCurrentPage, {
        params: { slug },
        initialData: initialData?.team,
        enabled: preview && !!slug,
    })
    const page = data || {}


    if (!router.isFallback && !slug) {
        return <ErrorPage statusCode={404} />
    }

    console.log(page)
    return (
        <Layout preview={preview}>
            <Seo
                title={page?.team?.seo?.title_tag}
                description={page?.team?.seo?.meta_description}
                image={page?.team?.headerImage ?? page?.profileSettings?.seo?.defaultImageBanner}
                company_name={page?.profileSettings?.company_name}
                twitterHandle={page?.profileSettings?.seo?.twitterHandle}
                favicon={page?.appearances?.favicon}
                themeColor={page?.appearances?.themeColor}
            />
            <Header
                title={page?.team?.name}
                image={page?.team?.headerImage ?? page?.appearances?.defaultImage}
            />
            <div className="section">
                <div className="container">
                    <div className="md:flex md:space-x-10 space-y-10">
                        <div className="md:w-1/3">
                            {page?.team?.image &&
                                <Image
                                    src={urlForImage(page?.team?.image).url()}
                                    width={500}
                                    height={0}
                                    alt={page?.team?.name}
                                    style={{
                                        width: '100%',
                                        height: '500px',
                                        objectFit: 'cover'
                                    }}
                                />
                            }
                        </div>
                        <div className="md:w-2/3">
                            {page.team?.about &&
                                <ContentEditor
                                    content={page?.team?.about}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps({ params, preview = false }) {

    const team = await getClient(preview).fetch(queryTeamCurrentPage, {
        slug: params.slug,
    })

    return {
        props: {
            preview,
            data: { team },
        },
        // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
        revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
    }
}

export async function getStaticPaths() {
    const paths = await getClient(false).fetch(teamSlugsQuery)
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true,
    }
}