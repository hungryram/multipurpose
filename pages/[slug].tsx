import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

// UTIL
import Container from '../components/util/container'
import Section from '../components/util/section'

// TEMPLATES
import Layout from '../components/global/layout'
import Hero from '../components/templates/hero'

import { pagesSlugsQuery, pageQuery } from '../lib/queries'
import { urlForImage, usePreviewSubscription } from '../lib/sanity'
import { getClient } from '../lib/sanity.server'
import ContactPage from '../components/templates/contact'
import Header from '../components/templates/header'
import { PageProps } from '../types'
import Banner from '../components/templates/banner'



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
    const page = data || {}

  
    if (!router.isFallback && !slug) {
      return <ErrorPage statusCode={404} />
    }
    return (
        <Layout preview={preview}>
            <Header 
                title={page?.pages?.title}
                image={page?.pages?.headerImage}
            />
            {page?.pages?.pageBuilder?.map((section) => {

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