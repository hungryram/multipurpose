import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

// TEMPLATES
import Header from '../../components/templates/header'
import Layout from '../../components/global/layout'
import Seo from '../../components/global/seo'

import { legalSlugsQuery, queryLegalCurrentPage } from '../../lib/queries'
import { usePreviewSubscription } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'
import { LegalProps } from '../../types'
import ContentEditor from '../../components/templates/contenteditor'



interface Props {
    data: { legal: LegalProps }
    preview: any,
}

export default function LegalPages(props: Props) {

    const { data: initialData, preview } = props
    const router = useRouter()

    const slug = initialData?.legal?.legal?.slug.current
    const { data } = usePreviewSubscription(queryLegalCurrentPage, {
        params: { slug },
        initialData: initialData?.legal,
        enabled: preview && !!slug,
    })
    const page = data || {}


    if (!router.isFallback && !slug) {
        return <ErrorPage statusCode={404} />
    }
    return (
        <Layout preview={preview}>
            <Seo
                title={page?.seo?.title_tag}
                description={page?.seo?.meta_description}
                image={page?.coverImage ?? page?.profileSettings?.seo?.defaultImageBanner}
                company_name={page?.profileSettings?.company_name}
                twitterHandle={page?.profileSettings?.seo?.twitterHandle}
                ogType="website"
                favicon={page?.appearances?.favicon}
                themeColor={page?.appearances?.themeColor}
            />
            <Header
                title={page?.legal?.title}
                image={page?.legal?.headerImage ?? page?.header?.image}
            />
            <div className="section">
                <div className="container content">
                    {page.legal?.content &&
                        <ContentEditor
                            content={page?.legal?.content}
                        />
                    }
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps({ params, preview = false }) {

    const legal = await getClient(preview).fetch(queryLegalCurrentPage, {
        slug: params.slug,
    })

    return {
        props: {
            preview,
            data: { legal },
        },
        // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
        revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
    }
}

export async function getStaticPaths() {
    const paths = await getClient(false).fetch(legalSlugsQuery)
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true,
    }
}