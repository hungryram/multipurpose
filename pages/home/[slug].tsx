import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

// TEMPLATES
import Layout from '../../components/global/layout'
import Hero from '../../components/templates/hero'
import FeaturedGrid from '../../components/templates/featured-grid'
import Banner from '../../components/templates/banner'
import DisclosureSection from '../../components/templates/disclosure'
import FullWidthTextImage from '../../components/templates/full-width-text-image'
import Seo from '../../components/global/seo'
import TextImage from '../../components/templates/text-and-image'
import LeadForm from '../../components/templates/lead-form'
import Pricing from '../../components/templates/pricing'
import Gallery from '../../components/templates/gallery'
import Testimonials from '../../components/templates/testimonials'

import { homeSlugsQuery, queryHome } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'
import ContactPage from '../../components/templates/contact'
import { HomeProps } from '../../types'



interface Props {
    data: { page: HomeProps }
    preview: any
}

export default function Pages(props: Props) {

    const { data: initialData, preview } = props
    const router = useRouter()

    const slug = initialData?.page?.homeDesign?.slug.current
    const { data } = usePreviewSubscription(queryHome, {
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
            <Seo
                ogType="website"
                robotIndex="nofollow, noindex"
            />

            {page?.homeDesign?.pageBuilder?.map((section) => {

                const headerColor = {
                    color: section?.background?.textColor?.headerColor?.hex ?? defaultHeader
                }
                const bodyColor = {
                    color: section?.background?.textColor?.textColor?.hex ?? defaultText
                }

                const backgroundStyles = {
                    backgroundColor: `${section.background?.background?.backgroundType === 'color' &&
                        section?.background?.background?.color?.hex}`,
                    backgroundImage: `${section.background?.background?.backgroundType === 'image' &&
                        `linear-gradient(rgba(
                            ${section?.background?.background?.imageOverlayColor?.rgb.r ?? '0'}, 
                            ${section?.background?.background?.imageOverlayColor?.rgb.g ?? '0'}, 
                            ${section?.background?.background?.imageOverlayColor?.rgb.b ?? '0'}, 
                            ${section?.background?.background?.imageOverlayColor?.rgb.a ?? '0.2'}), 
                            rgba(
                            ${section?.background?.background?.imageOverlayColor?.rgb.r ?? '0'}, 
                            ${section?.background?.background?.imageOverlayColor?.rgb.g ?? '0'}, 
                            ${section?.background?.background?.imageOverlayColor?.rgb.b ?? '0'}, 
                            ${section?.background?.background?.imageOverlayColor?.rgb.a ?? '0.2'})), 
                            url(${section.background?.background.image ? urlForImage(section?.background?.background?.image).url() : undefined})`}`,
                }


                if (section._type === 'hero') {
                    return (
                        <Hero
                            key={section._key}
                            body={section?.content}
                            textStyle={section?.textColor?.textColor?.hex}
                            image={section.image}
                            buttonLink={section?.button}
                            buttonText={section?.button?.buttonText}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            blurData={page.sanityImages.base64 ?? section.image}
                            imageHeight={
                                section?.imageHeight === 'small' && '400px' ||
                                section?.imageHeight === 'medium' && '600px' ||
                                section?.imageHeight === 'large' && '100vh'
                            }
                        />
                    )
                }

                if (section._type === 'textandImage') {
                    return (
                        <TextImage
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            image={section?.image}
                            buttonLink={section?.button}
                            buttonText={section?.button?.buttonText}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            altTag={section?.image?.altTag ?? page?.profileSettings?.company_name}
                            rowReverse={section?.reverseRow}
                            headerStyle={headerColor}
                            textStyle={bodyColor}
                            textLeft={section?.textLeft}
                            backgroundStyles={backgroundStyles}
                        />
                    )
                }

                if (section._type === 'banner') {
                    return (
                        <Banner
                            key={section._key}
                            heading={section.heading}
                            content={section?.content}
                            backgroundStyles={backgroundStyles}
                            headerStyle={headerColor}
                            textStyle={bodyColor}
                            fullWidth={section?.fullWidth}
                            removePadding={section?.removePadding}
                            buttonText={section?.button?.buttonText}
                            buttonLink={section?.button}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            twoColumn={section?.twoColumn}
                        />
                    )
                }

                if (section._type === 'fullWidthTextImage') {
                    return (
                        <FullWidthTextImage
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            image={section?.image}
                            buttonText={section?.button?.buttonText}
                            buttonLink={section?.button}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            textLeft='false'
                            columnReverse={section?.reverseColumn}
                            backgroundStyles={backgroundStyles}
                        />
                    )
                }

                if (section._type === 'featuredGrid') {
                    return (
                        <FeaturedGrid
                            key={section._key}
                            heading={section?.heading}
                            content={section?.text}
                            blocks={section?.blocks}
                            textOutsideImage={section?.textOutsideImage}
                            centerTextGrid={section?.centerTextGrid}
                            blockLeft={section?.blockLeft}
                            columnNumber={section?.columnNumber}
                            imageHeight={
                                section?.imageHeight === 'small' && '300px' ||
                                section?.imageHeight === 'medium' && '400px' ||
                                section?.imageHeight === 'large' && '500px'
                            }
                            removeGap={section?.removeGap}
                            removePadding={section?.removePadding}
                            twoColumn={section?.twoColumn}
                            textLeft={section?.textLeft}
                            fullWidth={section?.fullWidth}
                            buttonText={section?.button?.buttonText}
                            buttonLink={section?.button}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                        />
                    )
                }

                if (section._type === 'disclosureSection') {
                    return (
                        <DisclosureSection
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            disclosure={section?.disclosures}
                            disclosureBackgroundColor={section?.disclosureBackgroundColor}
                            disclosureTextColor={section?.disclosureTextColor}
                            disclosureContentColor={section?.disclosureContentColor}
                            twoColumn={section?.twoColumn}
                            textLeft={section?.textLeft}
                            buttonText={section?.button?.buttonText}
                            buttonLink={section?.button}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                        />

                    )
                }

                if (section._type === 'gallery') {
                    return (
                        <Gallery
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            images={section?.images}
                            animation={section?.animation ?? 'fade'}
                            fullWidth={section?.fullWidth}
                            textColor={section?.textColor?.hex}
                            disableNavigation={section?.disableNavigation}
                            disablePagination={section?.disablePagination}
                            removePadding={section?.removePadding}
                            buttonText={section?.button?.buttonText}
                            buttonLink={section?.button}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}

                        />
                    )
                }

                if (section._type === 'testimonialBuilder') {
                    return (
                        <Testimonials
                            key={section._key}
                            heading={section?.heading}
                            testimonial={homeSettings.testimonialAll}
                            content={section?.content}
                            carousel={section?.carousel}
                            bodyColor={bodyColor}
                            arrowColor={section?.background?.textColor?.textColor?.hex}
                            buttonText={section?.button?.buttonText}
                            buttonLink={section?.button}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                        />
                    )
                }

                if (section._type === 'leadForm') {
                    return (
                        <LeadForm
                            heading={section?.heading}
                            content={section?.content}
                            buttonText={section?.button?.buttonText}
                            buttonLink={section?.button}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                            paddingSize={
                                section?.paddingSizing === 'large' ? 'md:py-32 py-20' : 'py-0'
                            }
                        />
                    )
                }

                if (section._type === 'pricing') {
                    return (
                        <Pricing
                            heading={section?.heading}
                            content={section?.content}
                            packages={section?.packages}
                            columnNumber={section?.columnNumber}
                            buttonText={section?.button?.buttonText}
                            buttonLink={section?.button}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                        />
                    )
                }

                if (section._type === 'codeBlock') {
                    return (
                        <div key={section._key}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `${section?.code}`
                                }}
                            />
                        </div>
                    )
                }

                if (section._type === 'contactPage') {
                    return (
                        <ContactPage
                            heading={section.heading}
                            content={section.text}
                            key={section._key}
                            email={page.profileSettings?.contact_information?.email}
                            phone_number={page.profileSettings?.contact_information?.phone_number}
                            address={page.profileSettings?.address?.address}
                            city={page.profileSettings?.address?.city}
                            state={page.profileSettings?.address?.state}
                            zipCode={page.profileSettings?.address?.zip_code}
                            facebook={page.profileSettings?.social?.facebook}
                            youtube={page.profileSettings?.social?.youtube}
                            instagram={page.profileSettings?.social?.instagram}
                            twitter={page.profileSettings?.social?.twitter}
                            reddit={page.profileSettings?.social?.reddit}
                            linkedin={page.profileSettings?.social?.linkedin}
                            yelp={page.profileSettings?.social?.yelp}
                            pinterest={page.profileSettings?.social?.pinterest}
                            tiktok={page.profileSettings?.social?.tiktok}
                            zillow={page.profileSettings?.social?.zillow}
                            size={page.profileSettings?.social?.size}
                        />
                    )
                }

            })}
        </Layout>
    )
}

export async function getStaticProps({ params, preview = false }) {

    const page = await getClient(preview).fetch(queryHome, {
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
    const paths = await getClient(false).fetch(homeSlugsQuery)
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true,
    }
}