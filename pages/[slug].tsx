import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'

// UTIL
import Container from '../components/util/container'
import Section from '../components/util/section'

// TEMPLATES
import Layout from '../components/global/layout'
import Hero from '../components/templates/hero'
import Form from '../components/templates/form'

import { pagesSlugsQuery, pageQuery } from '../lib/queries'
import { urlForImage, usePreviewSubscription } from '../lib/sanity'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import ContactPage from '../components/templates/contact'
import Header from '../components/templates/header'

export default function Pages({data, preview}) {

    const {data: page} = usePreviewSubscription(pageQuery, {
        params: {slug: data.page?.pages?.slug.current},
        initialData: data.page.pages,
        enabled: preview && data.page?.pages?.slug.current,
      })

    return (
        <Layout preview={preview}>
            <Header 
                title={page?.pages?.title}
                image={page?.pages?.headerImage}
            />
            {page?.pages?.pageBuilder.map((section) => {

                if (section._type === 'hero') {
                    return (
                        <Hero
                            heading={section.heading}
                            subtitle={section.subtitle}
                            image={section.image}
                            key={section._key}
                        />
                    )
                }

                if (section._type === 'contactPage') {
                    return (
                        <ContactPage
                            heading={section.heading}
                            key={section._key}
                        />
                    )
                }

            })}
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