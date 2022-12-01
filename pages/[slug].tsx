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
import TeamSection from '../components/templates/team-section'
import BlogSection from '../components/templates/blog-section'
import IconSection from '../components/templates/icon-section'
import ServiceSection from '../components/templates/service-section'

import { pagesSlugsQuery, pageQuery } from '../lib/queries'
import { usePreviewSubscription } from '../lib/sanity'
import { getClient } from '../lib/sanity.server'
import ContactPage from '../components/templates/contact'
import { PageProps } from '../types'
import NotFound from "../pages/404"


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
        return <NotFound />
    }

    const defaultText = 'var(--website-text-color)'
    const defaultHeader = 'var(--website-text-color)'
    return (
        <Layout preview={preview}>
            <Seo
                title={page?.pages?.seo?.title_tag ?? page?.pages?.title + ' | ' + page?.profileSettings?.company_name}
                description={page?.pages?.seo?.meta_description}
                image={page?.pages?.headerImageData?.asset?.url ?? page.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.url}
                company_name={page?.profileSettings?.company_name}
                twitterHandle={page?.profileSettings?.seo?.twitterHandle}
                favicon={page?.appearances?.favicon}
                themeColor={page?.appearances?.themeColor}
                altText={page?.pages?.headerImageData?.asset?.altText ?? page.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.altText}
            />
            <Header
                title={page?.pages?.title}
                image={page?.pages?.headerImageData?.asset?.url ?? page.appearances?.defaultHeaderBanner?.asset?.url}
                hideHeader={page?.pages?.headerImage?.hideHeader}
                altText={page?.pages?.headerImageData?.asset?.altText ?? page.appearances?.defaultHeaderBanner?.asset?.altText}
                blurData={page?.pages?.headerImageData?.asset?.lqip ?? page.appearances?.defaultHeaderBanner?.asset?.lqip}
            />
            {page?.pages?.pageBuilder?.map((section) => {

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
  url(${section.backgroundImage?.image?.asset?.url})`}`,
                }


                if (section._type === 'hero') {
                    return (
                        <Hero
                            key={section._key}
                            body={section?.content}
                            altText={section?.imageData?.asset?.altText}
                            textStyle={section?.textColor?.textColor?.hex}
                            image={section?.imageData?.asset?.url}
                            blurData={section?.imageData?.asset?.lqip}
                            buttonLink={section?.buttonLinking}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
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
                            image={section?.imageData?.asset?.url}
                            blurData={section?.imageData?.asset?.lqip}
                            buttonLink={section?.button}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            altText={section?.imageData?.asset?.altText}
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
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
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
                            altText={section?.altText}
                            content={section?.content}
                            image={section?.image}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
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
                            blocks={section?.blockImages}
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
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
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
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
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
                            images={section?.childImage}
                            altText={section?.childImage}
                            animation={section?.animation ?? 'fade'}
                            fullWidth={section?.fullWidth}
                            textColor={section?.textColor?.hex}
                            disableNavigation={section?.disableNavigation}
                            disablePagination={section?.disablePagination}
                            removePadding={section?.removePadding}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
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
                            testimonial={page.allTestimonial}
                            content={section?.content}
                            carousel={section?.carousel}
                            textLeft={section?.textLeft}
                            cardTextColor={section?.cardTextColor?.hex}
                            cardBackground={section?.cardBackground?.hex}
                            bodyColor={bodyColor}
                            arrowColor={section?.background?.textColor?.textColor?.hex}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
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
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                            paddingSize={
                                section?.paddingSizing === 'large' ? 'md:py-32 py-20' : 'py-0'
                            }
                            // FORMS
                            emailAlerts={page.profileSettings?.settings?.emailAlerts}
                            sendFrom={page.profileSettings?.settings?.sendFrom}
                            emailBcc={page.profileSettings?.settings?.emailBcc}
                            emailCc={page.profileSettings?.settings?.emailCc}
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
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                        />
                    )
                }

                if (section._type === 'teamDisplay') {
                    return (
                        <TeamSection
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            team={page.allTeam}
                            carousel={section?.carousel}
                            buttonLink={section?.buttonLinking}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                        />
                    )
                }

                if (section._type === 'blogDisplay') {
                    return (
                        <BlogSection
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            blog={page?.allBlog}
                            carousel={section?.carousel}
                            buttonLink={section?.buttonLinking}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                        />
                    )
                }

                if (section._type === 'iconSection') {
                    return (
                        <IconSection
                            key={section._key}
                            heading={section?.heading}
                            content={section?.text}
                            blocks={section?.blockImages}
                            textLeft={section?.textLeft}
                            columnNumber={section?.columnNumber}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
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
                            // FORMS
                            emailAlerts={page.profileSettings?.settings?.emailAlerts}
                            sendFrom={page.profileSettings?.settings?.sendFrom}
                            emailBcc={page.profileSettings?.settings?.emailBcc}
                            emailCc={page.profileSettings?.settings?.emailCc}
                        />
                    )
                }

                if (section._type === 'servicesDisplay') {
                    return (
                        <ServiceSection
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            services={page.allServices}
                            carousel={section?.carousel}
                            buttonLink={section?.buttonLinking}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonBackground={section?.button?.buttonBackground?.hex}
                            buttonTextColor={section?.button?.buttonTextColor?.hex}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
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