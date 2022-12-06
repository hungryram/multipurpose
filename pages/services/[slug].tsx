import { useRouter } from 'next/router'

// TEMPLATES
import Header from '../../components/templates/header'
import Layout from '../../components/global/layout'

import Seo from '../../components/global/seo'
import MainBody from '../../components/templates/main-body'

import { servicesSlugsQuery, queryServiceCurrentPage } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'
import { ServiceProps } from '../../types'
import NotFound from '../404'



interface Props {
    data: { services: ServiceProps }
    preview: any
}

export default function ServicePages(props: Props) {

    const { data: initialData, preview } = props
    const router = useRouter()

    const slug = initialData?.services?.services?.slug.current
    const { data } = usePreviewSubscription(queryServiceCurrentPage, {
        params: { slug },
        initialData: initialData?.services,
        enabled: preview && !!slug,
    })
    const page = data


    if (!router.isFallback && !slug) {
        return <NotFound />
    }

    return (
        <Layout preview={preview}>
            <Seo
                title={page?.services?.seo?.title_tag}
                description={page?.services?.seo?.meta_description}
                image={page?.services?.headerImageData?.asset?.url ?? page?.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.url}
                company_name={page?.profileSettings?.company_name}
                twitterHandle={page?.profileSettings?.seo?.twitterHandle}
                favicon={page?.appearances?.favicon}
                themeColor={page?.appearances?.themeColor}
                altText={page?.services?.headerImageData?.asset?.altText ?? page?.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.altText}
            />
            <Header
                title={page?.services?.title}
                image={page?.services?.headerImage?.asset !== undefined ? urlForImage(page?.services?.headerImage).url() : page?.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.url}
                hideHeader={page?.services?.headerImage?.hideHeader}
                blurData={page?.services?.headerImageData?.asset?.lqip ?? page?.appearances?.defaultHeaderBanner?.asset?.lqip}
                altText={page?.services?.headerImageData?.asset?.altText ?? page?.appearances?.defaultHeaderBanner?.asset?.altText}
                spacing={
                    page?.services?.headerImage?.spacing === 'small' && 'md:py-14 py-10' ||
                    page?.services?.headerImage?.spacing === 'medium' && 'md:py-24 py-14' ||
                    page?.services?.headerImage?.spacing === 'large' && 'md:py-32 py-20'
                }
            />

            <MainBody
                pageBuilder={page?.services?.pageBuilder}
                // FIRST TREE
                email={page?.profileSettings?.contact_information?.email}
                phone_number={page?.profileSettings?.contact_information?.phone_number}
                address={page?.profileSettings?.address?.address}
                city={page?.profileSettings?.address?.city}
                state={page?.profileSettings?.address?.state}
                zip_code={page?.profileSettings?.address?.zip_code}
                // SOCIAL
                facebook={page?.profileSettings?.social?.facebook}
                youtube={page?.profileSettings?.social?.youtube}
                instagram={page?.profileSettings?.social?.instagram}
                twitter={page?.profileSettings?.social?.twitter}
                reddit={page?.profileSettings?.social?.reddit}
                linkedin={page?.profileSettings?.social?.linkedin}
                yelp={page?.profileSettings?.social?.yelp}
                pinterest={page?.profileSettings?.social?.pinterest}
                tiktok={page?.profileSettings?.social?.tiktok}
                zillow={page?.profileSettings?.social?.zillow}
                size={page?.profileSettings?.social?.size}
                // FORMS
                emailAlerts={page?.profileSettings?.settings?.emailAlerts}
                sendFrom={page?.profileSettings?.settings?.sendFrom}
                emailBcc={page?.profileSettings?.settings?.emailBcc}
                emailCc={page?.profileSettings?.settings?.emailCc}
                // PAGE FOLDERS
                allServices={page?.allServices}
                allTestimonial={page?.allTestimonial}
                allBlog={page?.allBlog}
                allTeam={page?.allTeam}
            />

        </Layout>
    )
}

export async function getStaticProps({ params, preview = false }) {

    const services = await getClient(preview).fetch(queryServiceCurrentPage, {
        slug: params.slug,
    })

    return {
        props: {
            preview,
            data: { services },
        },
        // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
        revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
    }
}

export async function getStaticPaths() {
    const paths = await getClient(false).fetch(servicesSlugsQuery)
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true,
    }
}