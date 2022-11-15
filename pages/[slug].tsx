import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

// UTIL
import Container from '../components/util/container'
import Section from '../components/util/section'

// TEMPLATES
import Header from '../components/templates/header'
import Layout from '../components/global/layout'
import Hero from '../components/templates/hero'
import FeaturedGrid from '../components/templates/featured-grid'
import Heading from '../components/util/heading'
import Banner from '../components/templates/banner'
import DisclosureSection from '../components/templates/disclosure'

import { pagesSlugsQuery, pageQuery } from '../lib/queries'
import { urlForImage, usePreviewSubscription } from '../lib/sanity'
import { getClient } from '../lib/sanity.server'
import ContactPage from '../components/templates/contact'
import { PageProps } from '../types'



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

    const defaultText = '#222'
    const defaultHeader = '#222'

    return (
        <Layout preview={preview}>
            <Header
                title={page?.pages?.title}
                image={page?.pages?.headerImage}
            />
            {page?.pages?.pageBuilder?.map((section) => {

                const headerColor = {
                    color: section.textColor?.headerColor?.hex ?? defaultHeader
                }
                const bodyColor = {
                    color: section.textColor?.textColor?.hex ?? defaultText
                }

                const bannerButton = {
                    backgroundColor: section.button?.buttonBackground?.hex ?? '#000000',
                    color: section.button?.buttonTextColor?.hex ?? '#ffffff'
                }

                const backgroundStyles = {
                    background: `${section.background?.backgroundType === 'color' && section?.background?.color?.hex || section.background?.backgroundType === 'image' && `url(${section.background.image ? urlForImage(section?.background?.image).url() : undefined})`}`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }


                if (section._type === 'hero') {
                    return (
                        <Hero
                            heading={section.heading}
                            subtitle={section.subtitle}
                            image={section.image}
                            key={section._key}
                            headerColor={headerColor}
                            bodyColor={bodyColor}
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

                if (section._type === 'banner') {
                    return (
                        <Banner
                            heading={section.heading}
                            text={section?.text}
                            key={section._key}
                            backgroundStyles={backgroundStyles}
                            headerStyle={headerColor}
                            textStyle={bodyColor}
                            fullWidth={section?.fullWidth}
                            removePadding={section?.removePadding}
                            buttonText={section?.button?.buttonText}
                            buttonLink={section?.button?.buttonLink}
                            buttonStyle={bannerButton}
                            twoColumn={section?.twoColumn}
                        />
                    )
                }

                if (section._type === 'featuredGrid') {
                    return (
                        <div key={section?._key} style={backgroundStyles}>
                            <Section>
                                <div className={section?.fullWidth ? null : 'container'}>
                                    <div className={`${section.twoColumn ? 'md:flex items-center' : ''}`}>
                                        <div className={`${section?.twoColumn ? 'md:w-1/2' : 'w-full'}`}>
                                            <Heading
                                                heading={section?.heading}
                                                body={section?.text}
                                                headerStyle={headerColor}
                                                textStyle={bodyColor}
                                                textAlign={section?.headerLeft}
                                            />
                                        </div>
                                        <div className={`${section?.twoColumn ? 'md:w-1/2' : 'w-full'}`}>
                                            <div className={`grid lg:grid-cols-${section?.columnNumber ?? '2'} md:grid-cols-2 grid-cols-1 ${section.removeGap ? 'gap-4' : ''} mt-10`}>
                                                {section?.blocks.map((node) => {
                                                    return (
                                                        <FeaturedGrid
                                                            image={node.image}
                                                            value={node.value}
                                                            link={node.link}
                                                            key={node._key}
                                                            content={node.content}
                                                            textOutsideImage={section.textOutsideImage}
                                                            textLeft={section?.textLeft}
                                                            centerTextGrid={section?.centerTextGrid}
                                                            blurData={homeSettings.sanityImages.base64 ?? node.image}
                                                            textColor={node?.textColor?.hex}
                                                            borderColor={node?.borderColor?.hex}
                                                            backgroundColor={node?.backgroundcolor?.hex}
                                                            imageHeight={
                                                                section?.imageHeight === 'small' && '300px' ||
                                                                section?.imageHeight === 'medium' && '400px' ||
                                                                section?.imageHeight === 'large' && '500px'
                                                            }
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Section>
                        </div>
                    )
                }

                if (section._type === 'disclosureSection') {
                    return (
                        <div className="section" key={section?._key} style={backgroundStyles}>
                            <div className="container">
                                <div className={section?.twoColumn ? 'md:flex md:space-x-20' : ''}>
                                    <div className={section?.twoColumn ? 'md:w-1/2' : ''}>
                                        <Heading
                                            body={section?.content}
                                            textAlign={section?.textLeft}
                                            fullWidth={section?.twoColumn}
                                        />
                                    </div>
                                    <div className={section?.twoColumn ? 'md:w-1/2' : ''}>
                                        <div className="mt-10">
                                            <DisclosureSection
                                                disclosure={section?.disclosures}
                                                disclosureBackgroundColor={section?.disclosureBackgroundColor?.hex}
                                                disclosureTextColor={section?.disclosureTextColor?.hex}
                                                disclosureContentColor={section?.disclosureContentColor?.hex}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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