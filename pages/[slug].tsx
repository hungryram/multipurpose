import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

// TEMPLATES
import Header from '../components/templates/header'
import Layout from '../components/global/layout'
import Hero from '../components/templates/hero'
import FeaturedGrid from '../components/templates/featured-grid'
import Banner from '../components/templates/banner'
import DisclosureSection from '../components/templates/disclosure'
import Seo from '../components/global/seo'
import FullWidthTextImage from '../components/templates/full-width-text-image'
import TextImage from '../components/templates/text-and-image'
import Gallery from '../components/templates/gallery'
import Testimonials from '../components/templates/testimonials'
import Pricing from '../components/templates/pricing'
import LeadForm from '../components/templates/lead-form'

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
            <Seo
                title={page?.pages?.seo?.title_tag}
                description={page?.pages?.seo?.meta_description}
                image={page?.pages?.headerImage ?? page?.profileSettings?.seo?.defaultImageBanner}
                company_name={page?.profileSettings?.company_name}
                twitterHandle={page?.profileSettings?.seo?.twitterHandle}
                favicon={page?.appearances?.favicon}
                themeColor={page?.appearances?.themeColor}
            />
            <Header
                title={page?.pages?.title}
                image={page?.pages?.headerImage}
                hideHeader={page?.pages?.headerImage?.hideHeader}
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
                            testimonial={page.testimonialAll}
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
                            key={section._key}
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
                            key={section._key}
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
                            office_number={page.profileSettings?.contact_information?.office_number}
                            address={page.profileSettings?.address?.address}
                            city={page.profileSettings?.address?.city}
                            state={page.profileSettings?.address?.state}
                            zip_code={page.profileSettings?.address?.zip_code}
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