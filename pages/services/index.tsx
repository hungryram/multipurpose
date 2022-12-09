import { queryServices } from "../../lib/queries"
import { getClient } from "../../lib/sanity.server"
import Layout from "../../components/global/layout"
import Header from "../../components/templates/header"
import Seo from "../../components/global/seo"
import ServiceCard from "../../components/templates/service-card"

export async function getStaticProps({ preview = false }) {

    /* check if the project id has been defined by fetching the vercel envs */
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        const serviceQuery = await getClient(preview).fetch(queryServices)

        return {
            props: { preview, serviceQuery },
            // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
            revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
        }
    }

    /* when the client isn't set up */
    return {
        props: {},
        revalidate: undefined,
    }
}


export default function ServiceIndex({ serviceQuery }) {
    return (
        <Layout>
            <Seo
                title={serviceQuery?.pageSettings?.services?.seo?.title_tag ?? serviceQuery?.pageSettings?.services?.title ?? 'Services | ' + serviceQuery?.profileSettings?.company_name}
                description={serviceQuery?.pageSettings?.services?.seo?.meta_description}
                image={serviceQuery?.pageSettings?.services?.headerImageData?.asset?.url ?? serviceQuery?.profileSettings?.seo?.defaultImageData?.defaultImageBanner?.asset?.url}
                altText={serviceQuery?.pageSettings?.services?.headerImageData?.asset?.altText ?? serviceQuery?.profileSettings?.seo?.defaultImageData?.defaultImageBanner?.asset?.altText}
                company_name={serviceQuery?.profileSettings?.company_name}
                twitterHandle={serviceQuery?.profileSettings?.seo?.twitterHandle}
                ogType="website"
                favicon={serviceQuery?.appearances?.favicon}
                themeColor={serviceQuery?.appearances?.themeColor}
            />
            <Header
                title={serviceQuery?.pageSettings?.services?.title ?? 'Services'}
                image={serviceQuery?.pageSettings?.services?.headerImageData?.asset?.url ?? serviceQuery?.appearances?.defaultHeaderBanner?.asset?.url}
                blurData={serviceQuery?.pageSettings?.services?.headerImageData?.asset?.lqip ?? serviceQuery?.appearances?.defaultHeaderBanner?.asset?.lqip}
                altText={serviceQuery?.pageSettings?.services?.headerImageData?.asset?.altText ?? serviceQuery?.appearances?.defaultHeaderBanner?.asset?.altText}
            />
            <div className="section">
                <div className="container">
                    {serviceQuery?.services !== 0 ?
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
                            {serviceQuery.services?.map((node) => {
                                return (
                                    <>
                                        <ServiceCard
                                            key={node._id}
                                            title={node.title}
                                            slug={node.slug}
                                            headerImage={node.headerImageData?.asset?.url}
                                            blurData={node.headerImageData?.asset?.lqip}
                                            altText={node.headerImageData?.asset?.altText}
                                        />
                                    </>
                                )
                            })}
                        </div>
                        :
                        <h2 className="h2 text-center">No Services added. Check back later</h2>
                    }
                </div>
            </div>
        </Layout>
    )
}