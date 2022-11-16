import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

// UTIL
import Link from 'next/link'
import Image from 'next/image'

// TEMPLATES
import Header from '../../components/templates/header'
import Layout from '../../components/global/layout'
import Hero from '../../components/templates/hero'
import FeaturedGrid from '../../components/templates/featured-grid'
import Heading from '../../components/util/heading'
import Banner from '../../components/templates/banner'
import DisclosureSection from '../../components/templates/disclosure'

import { legalSlugsQuery, queryLegalCurrentPage } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'
import ContactPage from '../../components/templates/contact'
import { LegalProps } from '../../types'
import ContentEditor from '../../components/templates/contenteditor'



interface Props {
    data: { legal: LegalProps }
    preview: any
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


    // if (!router.isFallback && !slug) {
    //     return <ErrorPage statusCode={404} />
    // }

    const defaultText = '#222'
    const defaultHeader = '#222'
    return (
        <Layout preview={preview}>
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