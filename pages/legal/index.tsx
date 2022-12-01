import { queryLegal } from "../../lib/queries"
import { getClient } from "../../lib/sanity.server"
import Link from "next/link"
import Layout from "../../components/global/layout"
import Header from "../../components/templates/header"
import Seo from "../../components/global/seo"

export async function getStaticProps({ preview = false }) {

    /* check if the project id has been defined by fetching the vercel envs */
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        const legalQuery = await getClient(preview).fetch(queryLegal)

        return {
            props: { preview, legalQuery },
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


export default function LegalIndex({ legalQuery }) {
    return (
        <Layout>
            <Seo
                title={legalQuery?.pageSettings?.legal?.seo?.title_tag ?? legalQuery?.pageSettings?.legal?.title ?? 'Website Policies' + ' | ' + legalQuery.profileSettings?.company_name}
                description={legalQuery?.pageSettings?.legal?.seo?.meta_description}
                image={legalQuery?.pageSettings?.legal?.headerImageData?.asset?.url ?? legalQuery.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.url}
                company_name={legalQuery?.profileSettings?.company_name}
                twitterHandle={legalQuery?.profileSettings?.seo?.twitterHandle}
                favicon={legalQuery?.appearances?.favicon}
                themeColor={legalQuery?.appearances?.themeColor}
                altText={legalQuery?.pageSettings?.legal?.headerImageData?.asset?.altText}
            />
            <Header
                title={legalQuery?.pageSettings?.legal?.title || 'Website Policies'}
                image={legalQuery?.pageSettings?.legal?.headerImageData?.asset?.url ?? legalQuery?.appearances?.defaultHeaderBanner?.asset?.url}
                blurData={legalQuery?.pageSettings?.legal?.headerImageData?.asset?.lqip ?? legalQuery?.appearances?.defaultHeaderBanner?.asset?.lqip}
                altText={legalQuery?.pageSettings?.legal?.headerImageData?.asset?.altText ?? legalQuery?.appearances?.defaultHeaderBanner?.asset?.altText}
            />
            <div className="section">
                <div className="container">
                    <div className="bg-slate-200 flex justify-center">
                        <div className="p-10">
                            <ul>
                                {legalQuery?.legal > 0 ?
                                    legalQuery?.legal.map((node) => {
                                        return (
                                            <li className="bg-white my-2" key={node._id}>
                                                <Link href={`legal/${node.slug}`} className="flex items-center px-20 py-4 transition-all ease-linear font-bold">{node.title}</Link>
                                            </li>
                                        )
                                    })
                                    :
                                    <h2 className="h3">No policies found. Check back later</h2>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}