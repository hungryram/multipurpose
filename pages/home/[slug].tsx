import { useRouter } from 'next/router'

// TEMPLATES
import Layout from '../../components/global/layout'
import Seo from '../../components/global/seo'
import MainBody from '../../components/templates/main-body'

import { homeSlugsQuery, queryHome } from '../../lib/queries'
import { usePreviewSubscription } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'
import { HomeProps } from '../../types'
import NotFound from '../404'

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
  const page = data

  if (!router.isFallback && !slug) {
    return <NotFound />
  }

  return (
    <Layout preview={preview}>
      <Seo
        robotIndex="nofollow, noindex"
      />

      <MainBody
        pageBuilder={page?.homeDesign?.pageBuilder}
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