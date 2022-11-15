import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

// UTIL
import Link from 'next/link'

// TEMPLATES
import Header from '../../components/templates/header'
import Layout from '../../components/global/layout'
import Hero from '../../components/templates/hero'
import FeaturedGrid from '../../components/templates/featured-grid'
import Heading from '../../components/util/heading'
import Banner from '../../components/templates/banner'
import DisclosureSection from '../../components/templates/disclosure'

import { servicesSlugsQuery, queryServiceCurrentPage } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'
import ContactPage from '../../components/templates/contact'
import { ServiceProps } from '../../types'
import ContentEditor from '../../components/templates/contenteditor'



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
    const page = data || {}


    if (!router.isFallback && !slug) {
        return <ErrorPage statusCode={404} />
    }

    const defaultText = '#222'
    const defaultHeader = '#222'
    return (
        <Layout preview={preview}>
            <Header
                title={page?.services?.title}
                image={page?.services?.headerImage}
            />
            <div className="section">
                <div className="container">
                    <div className="md:flex md:space-x-10 space-y-10">
                        <div className="md:w-1/3">
                            <div className="p-10 bg-slate-200">
                                <h3 className="font-bold text-xl mb-8">More Services</h3>
                                <ul>
                                    {page.allServices.map((node) => {
                                        return (
                                            <>
                                                <li className="bg-white my-2"><Link href={"/services/" + node.slug.current} className="flex items-center px-4 py-4 hover:bg-orange-600 hover:text-white transition-all ease-linear font-bold">{node.title}</Link></li>
                                            </>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            {page.services?.content &&
                                <ContentEditor
                                    content={page?.services?.content}
                                />
                            }
                            {page?.services?.pageBuilder?.map((section) => {

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
                                            <div className="section">
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
                                            </div>
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
                        </div>
                    </div>
                </div>
            </div>
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