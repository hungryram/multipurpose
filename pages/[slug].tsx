import { useRouter } from 'next/router'

// TEMPLATES
import Header from '../components/templates/header'
import Layout from '../components/global/layout'
import Seo from '../components/global/seo'


import { pagesSlugsQuery, pageQuery } from '../lib/queries'
import { urlForImage, usePreviewSubscription } from '../lib/sanity'
import { getClient } from '../lib/sanity.server'
import { PageProps } from '../types'
import NotFound from "../pages/404"
import MainBody from '../components/templates/main-body'


interface Props {
    data: { page: PageProps }
    preview: any
}

export default function Pages(props: Props) {

    const { data: initialData, preview } = props
    const router = useRouter()

    const slug = initialData?.page?.pages?.slug.current
    const { data } = usePreviewSubscription(pageQuery, {
        params: { slug },
        initialData: initialData?.page,
        enabled: preview && !!slug,
    })
    const page = data


    if (!router.isFallback && !slug) {
        return <NotFound />
    }

    return (
        <Layout preview={preview}>
            <Seo
                title={page?.pages?.seo?.title_tag ?? page?.pages?.title + ' | ' + page?.profileSettings?.company_name}
                description={page?.pages?.seo?.meta_description}
                image={page?.pages?.headerImageData?.asset?.url ?? page?.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.url}
                company_name={page?.profileSettings?.company_name}
                twitterHandle={page?.profileSettings?.seo?.twitterHandle}
                favicon={page?.appearances?.favicon}
                themeColor={page?.appearances?.themeColor}
                altText={page?.pages?.headerImageData?.asset?.altText ?? page?.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.altText}
            />
            <Header
                title={page?.pages?.title}
                image={page?.pages?.headerImage?.asset !== undefined ? urlForImage(page?.pages?.headerImage).url() : page?.appearances?.defaultHeaderBanner?.asset?.url}
                hideHeader={page?.pages?.headerImage?.hideHeader}
                altText={page?.pages?.headerImageData?.asset?.altText ?? page?.appearances?.defaultHeaderBanner?.asset?.altText}
                blurData={page?.pages?.headerImageData?.asset?.lqip ?? page?.appearances?.defaultHeaderBanner?.asset?.lqip}
                spacing={
                    page?.pages?.headerImage?.spacing === 'small' && 'md:py-14 py-10' ||
                    page?.pages?.headerImage?.spacing === 'medium' && 'md:py-24 py-14' ||
                    page?.pages?.headerImage?.spacing === 'large' && 'md:py-32 py-20'
                }
            />
            <MainBody
                pageBuilder={page?.pages?.pageBuilder}
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

    const page = await getClient(preview).fetch(pageQuery, {
        slug: params.slug,
    })

    return {
        props: {
            preview,
            data: { page },
        },
        // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
        revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
    }
}

export async function getStaticPaths() {
    const paths = await getClient(false).fetch(pagesSlugsQuery)
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true,
    }
}