import { useRouter } from 'next/router'

// TEMPLATES
import Header from '../../components/templates/header'
import Layout from '../../components/global/layout'
import Seo from '../../components/global/seo'

import { teamSlugsQuery, queryTeamCurrentPage } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'
import { TeamProps } from '../../types'
import ContentEditor from '../../components/templates/contenteditor'
import TeamCard from '../../components/templates/team-card'
import NotFound from '../404'



interface Props {
    data: { team: TeamProps }
    preview: any
}

export default function TeamPages(props: Props) {

    const { data: initialData, preview } = props
    const router = useRouter()

    const slug = initialData?.team?.team?.slug.current
    const { data } = usePreviewSubscription(queryTeamCurrentPage, {
        params: { slug },
        initialData: initialData?.team,
        enabled: preview && !!slug,
    })
    const page = data


    if (!router.isFallback && !slug) {
        return <NotFound />
    }
    return (
        <Layout preview={preview}>
            <Seo
                title={page?.team?.seo?.title_tag ?? page?.team?.name + ' | ' + page?.profileSettings?.company_name}
                description={page?.team?.seo?.meta_description}
                image={page?.team?.imageData?.asset?.url}
                company_name={page?.profileSettings?.company_name}
                twitterHandle={page?.profileSettings?.seo?.twitterHandle}
                favicon={page?.appearances?.favicon}
                themeColor={page?.appearances?.themeColor}
                altText={page?.team?.imageData?.asset?.altText ?? page?.team?.name}
                />
            <Header
                title={page?.team?.name}
                image={page?.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.url}
                altText={page?.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.altText}
                blurData={page?.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.lqip}
            />
            <div className="section">
                <div className="container">
                    <div className="md:flex md:space-x-10 md:space-y-0 space-y-10">
                        <div className="md:w-1/3">
                            <TeamCard 
                                name={page?.team?.name}
                                position={page?.team?.position}
                                image={page?.team?.image?.asset !== undefined && urlForImage(page.team?.image).url()}
                                blurData={page?.team?.imageData?.asset?.lqip}
                                altText={page?.team?.imageData?.asset?.altText}
                                phone={page?.team?.contactInformation?.phoneNumber}
                                email={page?.team?.contactInformation?.email}

                            />
                        </div>
                        <div className="md:w-2/3 content">
                            {page?.team?.about &&
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